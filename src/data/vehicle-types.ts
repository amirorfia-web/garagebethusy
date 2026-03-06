export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  /** Mois de première mise en circulation (1-12, null si inconnu) */
  month: number | null
  km: number
  transmission: string
  fuel: string
  price: number
  badge: string
  badgeVariant: 'blue' | 'success' | 'grey'
  source: 'direct' | 'autoscout24'
  description: string | null
  /** Ancien champ — rétro-compatibilité */
  image: string | null
  /** Nouveau champ — plusieurs photos */
  images: string[]
  autoscoutUrl: string | null
  visible: boolean
  createdAt: string
}

export type VehicleInput = Omit<Vehicle, 'id' | 'createdAt'>

export const BADGE_OPTIONS = [
  { value: 'Disponible', variant: 'blue' as const },
  { value: 'Nouveau', variant: 'success' as const },
  { value: 'Prix réduit', variant: 'success' as const },
  { value: 'Réservé', variant: 'grey' as const },
  { value: 'AutoScout24', variant: 'grey' as const },
] as const

export const FUEL_OPTIONS = ['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL'] as const
export const TRANSMISSION_OPTIONS = ['Manuelle', 'Auto', 'DSG', 'S-Tronic', 'CVT'] as const
