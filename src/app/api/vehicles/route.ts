import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import type { Vehicle } from '@/data/vehicle-types'
import { readVehicles } from '@/lib/vehicles'

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

async function writeVehicles(vehicles: Vehicle[]): Promise<void> {
  await put(BLOB_FILENAME, JSON.stringify(vehicles, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
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
  } catch (err) {
    console.error('POST /api/vehicles error:', err)
    return NextResponse.json({ error: `Erreur: ${err instanceof Error ? err.message : 'inconnue'}` }, { status: 500 })
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

    const existing = vehicles[index]

    // Mise à jour partielle : ne toucher que les champs envoyés
    // Si seul { id, visible } est envoyé, on ne modifie que visible
    const isPartialUpdate = Object.keys(body).length <= 3 // id + visible (+ éventuellement un autre)

    if (isPartialUpdate && 'visible' in body && !('make' in body)) {
      // Toggle visibilité uniquement
      vehicles[index] = { ...existing, visible: body.visible }
    } else {
      // Mise à jour complète (formulaire d'édition)
      const updatedImages: string[] = Array.isArray(body.images)
        ? body.images.filter(Boolean)
        : body.image
          ? [body.image]
          : existing.images ?? []

      vehicles[index] = {
        ...existing,
        ...body,
        year: Number(body.year ?? existing.year),
        month: body.month != null && body.month !== '' ? Number(body.month) : (body.month === '' || body.month === null ? null : existing.month),
        km: Number(body.km ?? existing.km),
        price: Number(body.price ?? existing.price),
        image: updatedImages[0] || null,
        images: updatedImages,
      }
    }

    await writeVehicles(vehicles)
    return NextResponse.json(vehicles[index])
  } catch (err) {
    console.error('PUT /api/vehicles error:', err)
    return NextResponse.json({ error: `Erreur PUT: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 })
  }
}

// ── DELETE — Archiver un vehicule (ou suppression definitive) ───────────────

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, permanent, reason } = body

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    }

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
  } catch (err) {
    console.error('DELETE /api/vehicles error:', err)
    return NextResponse.json({ error: `Erreur DELETE: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 })
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
  } catch (err) {
    console.error('PATCH /api/vehicles error:', err)
    return NextResponse.json({ error: `Erreur PATCH: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 })
  }
}
