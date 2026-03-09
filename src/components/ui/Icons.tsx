/**
 * Centralized icon mapping — replaces all emojis with lucide-react SVG icons.
 * Blue on light backgrounds, white on dark backgrounds.
 * Sizes: 20px tabs, 24px cards, 32-40px hero/banners
 */

import {
  Wrench,
  Paintbrush,
  CircleDot,
  Shield,
  Warehouse,
  PhoneCall,
  Building2,
  FileCheck,
  CarFront,
  ParkingSquare,
  Star,
  MapPin,
  ClipboardList,
  Smartphone,
  Sparkles,
  Handshake,
  Timer,
  Search,
  Cog,
  Bus,
  type LucideProps,
} from 'lucide-react'
import React from 'react'

// ── Icon Map ────────────────────────────────────────────────────────────────

export const ICON_MAP = {
  mecanique:    Wrench,
  carrosserie:  Paintbrush,
  pneus:        CircleDot,
  vitrage:      Shield,
  gardiennage:  Warehouse,
  panne:        PhoneCall,
  entreprises:  Building2,
  devis:        FileCheck,
  voiture:      CarFront,
  parking:      ParkingSquare,
  star:         Star,
  pin:          MapPin,
  clipboard:    ClipboardList,
  smartphone:   Smartphone,
  sparkles:     Sparkles,
  handshake:    Handshake,
  timer:        Timer,
  search:       Search,
  gear:         Cog,
  bus:          Bus,
} as const

export type IconKey = keyof typeof ICON_MAP

// ── Reusable Icon component ────────────────────────────────────────────────

interface ServiceIconProps extends Omit<LucideProps, 'ref'> {
  name: IconKey
  /** 'sm' = 20px (tabs), 'md' = 24px (cards), 'lg' = 32px (hero), 'xl' = 40px (banners) */
  variant?: 'sm' | 'md' | 'lg' | 'xl'
}

const SIZE_MAP = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
}

export function ServiceIcon({ name, variant = 'md', className, ...props }: ServiceIconProps) {
  const Icon = ICON_MAP[name]
  const size = SIZE_MAP[variant]
  return <Icon size={size} className={className} strokeWidth={1.8} {...props} />
}

// ── Star rating component (replaces ⭐⭐⭐⭐⭐) ────────────────────────────

export function StarRating({ count = 5, size = 14, className = 'text-warn' }: { count?: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  )
}

// ── Icon band (replaces AutoIconBand emojis) ────────────────────────────────

const BAND_ICONS: IconKey[] = ['mecanique', 'voiture', 'pneus', 'gear', 'star', 'mecanique', 'voiture', 'pneus', 'gear', 'star']

export function IconBandItems() {
  return (
    <>
      {BAND_ICONS.concat(BAND_ICONS).map((name, i) => {
        const Icon = ICON_MAP[name]
        return <Icon key={i} size={20} className="mx-8 opacity-30 text-blue shrink-0" strokeWidth={1.5} />
      })}
    </>
  )
}
