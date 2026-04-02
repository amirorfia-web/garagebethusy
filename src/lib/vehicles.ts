import { list } from '@vercel/blob'
import type { Vehicle } from '@/data/vehicle-types'

const BLOB_FILENAME = 'vehicles.json'

/** URL cachée en mémoire pour éviter un appel list() à chaque requête */
let cachedBlobUrl: string | null = null

/**
 * Lit les véhicules depuis le Vercel Blob Store.
 * Optimisé : cache l'URL du blob après le premier list(),
 * puis fetch direct pour les appels suivants (0 appel Blob API).
 */
export async function readVehicles(): Promise<Vehicle[]> {
  try {
    // Si on a l'URL en cache, fetch directement (0 appel Blob API)
    if (cachedBlobUrl) {
      const response = await fetch(cachedBlobUrl, { cache: 'no-store' })
      if (response.ok) {
        return await response.json() as Vehicle[]
      }
      // URL invalide — reset le cache
      cachedBlobUrl = null
    }

    // Premier appel : list() pour trouver l'URL, puis cache
    const { blobs } = await list({ prefix: BLOB_FILENAME, limit: 1 })
    if (blobs.length === 0) {
      return []
    }
    cachedBlobUrl = blobs[0].url
    const response = await fetch(cachedBlobUrl, { cache: 'no-store' })
    return await response.json() as Vehicle[]
  } catch (err) {
    console.error('readVehicles error:', err)
    return []
  }
}

/** Invalide le cache URL (à appeler après un write) */
export function invalidateVehiclesCache() {
  cachedBlobUrl = null
}

/**
 * Retourne uniquement les véhicules visibles et non archivés.
 */
export async function getVisibleVehicles(): Promise<Vehicle[]> {
  const vehicles = await readVehicles()
  return vehicles.filter((v) => v.visible && !v.archived)
}
