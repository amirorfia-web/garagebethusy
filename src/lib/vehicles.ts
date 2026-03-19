import { list } from '@vercel/blob'
import type { Vehicle } from '@/data/vehicle-types'

const BLOB_FILENAME = 'vehicles.json'

/**
 * Lit les véhicules depuis le Vercel Blob Store.
 * Utilisé par l'API et les pages serveur.
 */
export async function readVehicles(): Promise<Vehicle[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_FILENAME })
    if (blobs.length === 0) {
      return []
    }
    const response = await fetch(blobs[0].url, { cache: 'no-store' })
    const data = await response.json()
    return data as Vehicle[]
  } catch (err) {
    console.error('readVehicles error:', err)
    return []
  }
}

/**
 * Retourne uniquement les véhicules visibles et non archivés.
 */
export async function getVisibleVehicles(): Promise<Vehicle[]> {
  const vehicles = await readVehicles()
  return vehicles.filter((v) => v.visible && !v.archived)
}
