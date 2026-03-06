import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'garage2024'
const UPLOAD_DIR = path.join(process.cwd(), 'public/images/vehicles')

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_PASSWORD
}

// Détecter le vrai type d'image via les magic bytes
function detectImageType(buffer: Buffer): string | null {
  if (buffer.length < 12) return null
  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return 'jpeg'
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'png'
  // WebP: RIFF...WEBP
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return 'webp'
  // HEIF/HEIC: ftyp box at bytes 4-7
  if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) return 'heic'
  return null
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifier la taille (max 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10 MB)' },
        { status: 400 },
      )
    }

    // Lire les bytes et détecter le vrai type
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const detectedType = detectImageType(buffer)

    const allowedTypes = ['jpeg', 'png', 'webp', 'heic']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      return NextResponse.json(
        { error: 'Format non supporté. Utilisez JPG, PNG, WebP ou des photos iPhone.' },
        { status: 400 },
      )
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now().toString(36)
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40)

    // S'assurer que le dossier existe
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    // Si HEIC → convertir en JPEG via sips (macOS) ou écrire tel quel
    let finalFileName: string

    if (detectedType === 'heic') {
      finalFileName = `${safeName}-${timestamp}.jpg`
      const tempPath = path.join(UPLOAD_DIR, `_temp_${timestamp}.heic`)
      const finalPath = path.join(UPLOAD_DIR, finalFileName)

      // Écrire le fichier temporaire HEIC
      await fs.writeFile(tempPath, buffer)

      try {
        // Convertir avec sips (disponible sur macOS)
        await execFileAsync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', tempPath, '--out', finalPath])
        // Supprimer le temp
        await fs.unlink(tempPath).catch(() => {})
      } catch {
        // Si sips n'est pas disponible, garder le fichier original en .heic
        // et essayer une conversion basique
        await fs.rename(tempPath, finalPath).catch(() => {})
        console.warn('sips not available, HEIC saved as-is')
      }
    } else {
      const ext = detectedType === 'jpeg' ? 'jpg' : detectedType
      finalFileName = `${safeName}-${timestamp}.${ext}`
      const finalPath = path.join(UPLOAD_DIR, finalFileName)
      await fs.writeFile(finalPath, buffer)
    }

    // Retourner l'URL publique
    const publicUrl = `/images/vehicles/${finalFileName}`
    return NextResponse.json({ url: publicUrl, fileName: finalFileName }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 })
  }
}

// ── PUT — Télécharger une image depuis une URL distante ─────────────────────
// Utilisé pour importer des photos depuis AutoScout24, etc.

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { url } = await request.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 })
    }

    // Télécharger l'image
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*',
        'Referer': 'https://www.autoscout24.ch/',
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Impossible de télécharger l'image (${res.status})` },
        { status: 502 },
      )
    }

    const bytes = await res.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (buffer.length < 100) {
      return NextResponse.json({ error: 'Image vide ou invalide' }, { status: 400 })
    }

    // Détecter le type
    const detectedType = detectImageType(buffer)
    const allowedTypes = ['jpeg', 'png', 'webp']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      return NextResponse.json(
        { error: 'Format d\'image non reconnu' },
        { status: 400 },
      )
    }

    // Nom de fichier depuis l'URL
    const timestamp = Date.now().toString(36)
    const urlName = url.split('/').pop()?.split('?')[0]?.replace(/\.[^.]+$/, '') || 'import'
    const safeName = urlName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 30)

    const ext = detectedType === 'jpeg' ? 'jpg' : detectedType
    const finalFileName = `${safeName}-${timestamp}.${ext}`
    const finalPath = path.join(UPLOAD_DIR, finalFileName)

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(finalPath, buffer)

    const publicUrl = `/images/vehicles/${finalFileName}`
    return NextResponse.json({ url: publicUrl, fileName: finalFileName }, { status: 201 })
  } catch (err) {
    console.error('Download image error:', err)
    return NextResponse.json({ error: 'Erreur lors du téléchargement' }, { status: 500 })
  }
}
