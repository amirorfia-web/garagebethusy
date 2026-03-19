import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'garage2024'

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_PASSWORD
}

// Detecter le vrai type d'image via les magic bytes
function detectImageType(buffer: Buffer): string | null {
  if (buffer.length < 12) return null
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return 'jpeg'
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'png'
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return 'webp'
  return null
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10 MB)' },
        { status: 400 },
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const detectedType = detectImageType(buffer)

    const allowedTypes = ['jpeg', 'png', 'webp']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      return NextResponse.json(
        { error: 'Format non supporte. Utilisez JPG, PNG ou WebP.' },
        { status: 400 },
      )
    }

    const timestamp = Date.now().toString(36)
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40)

    const ext = detectedType === 'jpeg' ? 'jpg' : detectedType
    const blobPath = `vehicles/${safeName}-${timestamp}.${ext}`

    const contentTypeMap: Record<string, string> = {
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    }

    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: contentTypeMap[detectedType] || 'image/jpeg',
    })

    return NextResponse.json({ url: blob.url, fileName: blobPath }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 })
  }
}

// ── PUT — Telecharger une image depuis une URL distante ─────────────────────

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const { url } = await request.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 })
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*',
        'Referer': 'https://www.autoscout24.ch/',
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Impossible de telecharger l'image (${res.status})` },
        { status: 502 },
      )
    }

    const bytes = await res.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (buffer.length < 100) {
      return NextResponse.json({ error: 'Image vide ou invalide' }, { status: 400 })
    }

    const detectedType = detectImageType(buffer)
    const allowedTypes = ['jpeg', 'png', 'webp']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      return NextResponse.json(
        { error: "Format d'image non reconnu" },
        { status: 400 },
      )
    }

    const timestamp = Date.now().toString(36)
    const urlName = url.split('/').pop()?.split('?')[0]?.replace(/\.[^.]+$/, '') || 'import'
    const safeName = urlName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 30)

    const ext = detectedType === 'jpeg' ? 'jpg' : detectedType
    const blobPath = `vehicles/${safeName}-${timestamp}.${ext}`

    const contentTypeMap: Record<string, string> = {
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    }

    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: contentTypeMap[detectedType] || 'image/jpeg',
    })

    return NextResponse.json({ url: blob.url, fileName: blobPath }, { status: 201 })
  } catch (err) {
    console.error('Download image error:', err)
    return NextResponse.json({ error: 'Erreur lors du telechargement' }, { status: 500 })
  }
}
