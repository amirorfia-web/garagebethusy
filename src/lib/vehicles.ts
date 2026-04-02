import { head } from '@vercel/blob'
import type { Vehicle } from '@/data/vehicle-types'

const BLOB_FILENAME = 'vehicles.json'

/** URL cached en mémoire pour éviter un appel head() à chaque requête */
let cachedBlobUrl: string | null = null

/**
 * Lit les véhicules depuis le Vercel Blob Store.
 * Optimisé : utilise head() (1 appel) au lieu de list() + fetch() (2 appels).
 * Cache l'URL du blob en mémoire pour les appels suivants dans la même instance.
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

    // Sinon, récupérer l'URL via head() (1 appel au lieu de list())
    try {
      const blob = await head(BLOB_FILENAME)
      cachedBlobUrl = blob.url
      const response = await fetch(blob.url, { cache: 'no-store' })
      return await response.json() as Vehicle[]
    } catch {
      // Blob n'existe pas encore
      return []
    }
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
