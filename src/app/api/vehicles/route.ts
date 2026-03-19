import { NextRequest, NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'
import type { Vehicle } from '@/data/vehicle-types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BLOB_FILENAME = 'vehicles.json'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'garage2024'

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_PASSWORD
}

async function readVehicles(): Promise<Vehicle[]> {
  try {
    // Chercher le blob vehicles.json
    const { blobs } = await list({ prefix: BLOB_FILENAME })
    if (blobs.length === 0) {
      // Fallback: lire le fichier local pour la migration initiale
      const fs = await import('fs/promises')
      const path = await import('path')
      const localPath = path.join(process.cwd(), 'src/data/vehicles.json')
      try {
        const raw = await fs.readFile(localPath, 'utf-8')
        const vehicles = JSON.parse(raw) as Vehicle[]
        // Migrer vers Blob automatiquement
        await writeVehicles(vehicles)
        return vehicles
      } catch {
        return []
      }
    }
    const response = await fetch(blobs[0].url)
    const data = await response.json()
    return data as Vehicle[]
  } catch {
    return []
  }
}

async function writeVehicles(vehicles: Vehicle[]): Promise<void> {
  await put(BLOB_FILENAME, JSON.stringify(vehicles, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  })
}

function generateId(make: string, model: string, year: number): string {
  const slug = `${make}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug}-${Date.now().toString(36)}`
}

// ── GET — Liste publique (vehicules visibles uniquement) ────────────────────

export async function GET(request: NextRequest) {
  const vehicles = await readVehicles()
  const showAll = request.nextUrl.searchParams.get('all') === 'true'

  if (showAll && checkAuth(request)) {
    return NextResponse.json(vehicles)
  }

  const visible = vehicles.filter((v) => v.visible && !v.archived)
  return NextResponse.json(visible)
}

// ── POST — Ajouter un vehicule ──────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const vehicles = await readVehicles()

    const images: string[] = Array.isArray(body.images)
      ? body.images.filter(Boolean)
      : body.image
        ? [body.image]
        : []

    const newVehicle: Vehicle = {
      id: generateId(body.make, body.model, body.year),
      make: body.make,
      model: body.model,
      year: Number(body.year),
      month: body.month != null && body.month !== '' ? Number(body.month) : null,
      km: Number(body.km),
      transmission: body.transmission,
      fuel: body.fuel,
      price: Number(body.price),
      badge: body.badge || 'Disponible',
      badgeVariant: body.badgeVariant || 'blue',
      source: body.source || 'direct',
      description: body.description || null,
      image: images[0] || null,
      images,
      autoscoutUrl: body.autoscoutUrl || null,
      visible: body.visible !== false,
      createdAt: new Date().toISOString(),
    }

    vehicles.unshift(newVehicle)
    await writeVehicles(vehicles)

    return NextResponse.json(newVehicle, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Donnees invalides' }, { status: 400 })
  }
}

// ── PUT — Modifier un vehicule ──────────────────────────────────────────────

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const vehicles = await readVehicles()
    const index = vehicles.findIndex((v) => v.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Vehicule introuvable' }, { status: 404 })
    }

    const updatedImages: string[] = Array.isArray(body.images)
      ? body.images.filter(Boolean)
      : body.image
        ? [body.image]
        : vehicles[index].images ?? []

    vehicles[index] = {
      ...vehicles[index],
      ...body,
      year: Number(body.year ?? vehicles[index].year),
      month: body.month != null && body.month !== '' ? Number(body.month) : (body.month === '' || body.month === null ? null : vehicles[index].month),
      km: Number(body.km ?? vehicles[index].km),
      price: Number(body.price ?? vehicles[index].price),
      image: updatedImages[0] || null,
      images: updatedImages,
    }

    await writeVehicles(vehicles)
    return NextResponse.json(vehicles[index])
  } catch {
    return NextResponse.json({ error: 'Donnees invalides' }, { status: 400 })
  }
}

// ── DELETE — Archiver un vehicule (ou suppression definitive) ───────────────

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const { id, permanent, reason } = await request.json()
    const vehicles = await readVehicles()

    if (permanent) {
      const filtered = vehicles.filter((v) => v.id !== id)
      if (filtered.length === vehicles.length) {
        return NextResponse.json({ error: 'Vehicule introuvable' }, { status: 404 })
      }
      await writeVehicles(filtered)
      return NextResponse.json({ success: true, action: 'deleted' })
    }

    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Vehicule introuvable' }, { status: 404 })
    }

    vehicles[index] = {
      ...vehicles[index],
      archived: true,
      archivedAt: new Date().toISOString(),
      archiveReason: reason || 'supprime',
      visible: false,
    }

    await writeVehicles(vehicles)
    return NextResponse.json({ success: true, action: 'archived' })
  } catch {
    return NextResponse.json({ error: 'Donnees invalides' }, { status: 400 })
  }
}

// ── PATCH — Restaurer un vehicule depuis les archives ───────────────────────

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const vehicles = await readVehicles()
    const index = vehicles.findIndex((v) => v.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Vehicule introuvable' }, { status: 404 })
    }

    vehicles[index] = {
      ...vehicles[index],
      archived: false,
      archivedAt: null,
      archiveReason: null,
      visible: false,
    }

    await writeVehicles(vehicles)
    return NextResponse.json({ success: true, action: 'restored' })
  } catch {
    return NextResponse.json({ error: 'Donnees invalides' }, { status: 400 })
  }
}
