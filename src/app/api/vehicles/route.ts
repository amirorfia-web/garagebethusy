import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import type { Vehicle } from '@/data/vehicle-types'

const DATA_PATH = path.join(process.cwd(), 'src/data/vehicles.json')

// Simple auth check — en production, remplacer par un vrai système d'auth
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'garage2024'

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_PASSWORD
}

async function readVehicles(): Promise<Vehicle[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeVehicles(vehicles: Vehicle[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(vehicles, null, 2), 'utf-8')
}

function generateId(make: string, model: string, year: number): string {
  const slug = `${make}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug}-${Date.now().toString(36)}`
}

// ── GET — Liste publique (véhicules visibles uniquement) ────────────────────

export async function GET(request: NextRequest) {
  const vehicles = await readVehicles()
  const showAll = request.nextUrl.searchParams.get('all') === 'true'

  // Si ?all=true et authentifié, retourner tous les véhicules
  if (showAll && checkAuth(request)) {
    return NextResponse.json(vehicles)
  }

  // Sinon, seulement les véhicules visibles
  const visible = vehicles.filter((v) => v.visible)
  return NextResponse.json(visible)
}

// ── POST — Ajouter un véhicule ──────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const vehicles = await readVehicles()

    // Construire le tableau d'images (rétro-compatibilité)
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
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

// ── PUT — Modifier un véhicule ──────────────────────────────────────────────

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const vehicles = await readVehicles()
    const index = vehicles.findIndex((v) => v.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Véhicule introuvable' }, { status: 404 })
    }

    // Construire le tableau d'images pour la mise à jour
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
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

// ── DELETE — Supprimer un véhicule ──────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const vehicles = await readVehicles()
    const filtered = vehicles.filter((v) => v.id !== id)

    if (filtered.length === vehicles.length) {
      return NextResponse.json({ error: 'Véhicule introuvable' }, { status: 404 })
    }

    await writeVehicles(filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
