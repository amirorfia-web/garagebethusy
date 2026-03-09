'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { CarFront } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge, { BadgeVariant } from './Badge'
import Button from './Button'

// ── Types ────────────────────────────────────────────────────────────────────

export type VehicleSource = 'direct' | 'autoscout24'

export interface VehicleCardProps {
  make:         string
  model:        string
  year:         number
  /** Mois de première mise en circulation (1-12) */
  month?:       number | null
  km:           number
  transmission: string
  fuel?:        string
  price:        number
  /** Description / commentaire libre */
  description?: string | null
  /** URL d'image du véhicule (photo réelle) — rétro-compatibilité */
  imageSrc?:    string
  /** Tableau d'images (nouveau — prioritaire sur imageSrc) */
  images?:      string[]
  /** Emoji de remplacement si pas de photo */
  imageEmoji?:  string
  /** Couleur de fond de la zone image (gradient inline) */
  imageBg?:     string
  source?:      VehicleSource
  badge?: {
    variant:  BadgeVariant
    dot?:     boolean
    label:    string
  }
  /** Lien WhatsApp pré-rempli pour ce véhicule */
  whatsappHref?: string
  /** Lien email pré-rempli pour ce véhicule */
  emailHref?:   string
  onContact?:   () => void
  href?:        string
  className?:   string
}

// ── Helper: formatage CHF ─────────────────────────────────────────────────────

function formatCHF(amount: number): string {
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKm(km: number): string {
  return new Intl.NumberFormat('fr-CH').format(km) + ' km'
}

// ── Carousel d'images ────────────────────────────────────────────────────────

function ImageCarousel({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-full group/carousel">
      {/* Image courante */}
      <Image
        src={images[current]}
        alt={`${alt} — photo ${current + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />

      {/* Flèches (uniquement si > 1 image) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/60 z-20"
            aria-label="Photo précédente"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/60 z-20"
            aria-label="Photo suivante"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i) }}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  i === current ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/70',
                )}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-2 right-2 bg-black/40 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-md z-20">
            {current + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  )
}

// ── WhatsApp icon SVG ────────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── Email icon SVG ───────────────────────────────────────────────────────────

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// ── Composant principal ──────────────────────────────────────────────────────

export default function VehicleCard({
  make,
  model,
  year,
  month,
  km,
  transmission,
  fuel,
  price,
  description,
  imageSrc,
  images,
  imageEmoji,
  imageBg,
  source       = 'direct',
  badge,
  whatsappHref,
  emailHref,
  onContact,
  href,
  className,
}: VehicleCardProps) {
  const isExternal = source === 'autoscout24'

  // Fusionner images array avec imageSrc (rétro-compatibilité)
  const allImages = images && images.length > 0
    ? images
    : imageSrc
      ? [imageSrc]
      : []

  const hasImages = allImages.length > 0

  return (
    <article
      className={cn(
        'bg-white border border-border rounded-lg overflow-hidden shadow-sm',
        'transition-all duration-[280ms] ease-spring',
        'hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      {/* Zone image / carousel */}
      <div
        className="relative w-full h-[200px] border-b border-border overflow-hidden"
        style={
          hasImages
            ? undefined
            : { background: imageBg ?? 'linear-gradient(135deg, #EAF0FF 0%, #dce8ff 100%)' }
        }
      >
        {hasImages ? (
          <ImageCarousel images={allImages} alt={`${make} ${model} ${year}`} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <CarFront size={48} className="text-blue/40" strokeWidth={1.2} aria-label={`${make} ${model}`} />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badge.variant} dot={badge.dot}>
              {badge.label}
            </Badge>
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="px-5 pt-[1.1rem] pb-2">
        {/* Marque */}
        <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-blue mb-[2px]">
          {make}
        </p>

        {/* Modèle */}
        <h3 className="font-display font-extrabold text-[1.3rem] uppercase tracking-[0.02em] text-ink mb-3 leading-none">
          {model}
        </h3>

        {/* Specs */}
        <div className="flex gap-5">
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-3">
              Année
            </p>
            <p className="text-[0.8rem] font-semibold text-ink-2">
              {month ? `${String(month).padStart(2, '0')}.${year}` : year}
            </p>
          </div>
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-3">
              KM
            </p>
            <p className="text-[0.8rem] font-semibold text-ink-2">{formatKm(km)}</p>
          </div>
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-3">
              Boîte
            </p>
            <p className="text-[0.8rem] font-semibold text-ink-2">{transmission}</p>
          </div>
          {fuel && (
            <div>
              <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-3">
                Carb.
              </p>
              <p className="text-[0.8rem] font-semibold text-ink-2">{fuel}</p>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-[0.78rem] text-ink-2 leading-[1.5] mt-3 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Pied — prix + CTA */}
      <footer className="flex items-center justify-between px-5 py-[0.9rem] border-t border-border bg-bg-app gap-2">
        <span className="font-display font-black text-[1.5rem] text-ink tracking-[0.01em]">
          {formatCHF(price)}
        </span>

        <div className="flex items-center gap-2">
          {/* Bouton WhatsApp spécifique au véhicule */}
          {whatsappHref && (
            <Button
              variant="whatsapp"
              size="sm"
              as="a"
              href={whatsappHref}
              target="_blank"
            >
              <WhatsAppIcon />
              Intéressé
            </Button>
          )}

          {/* Bouton Email */}
          {emailHref && (
            <Button
              variant="secondary"
              size="sm"
              as="a"
              href={emailHref}
              className="!px-2.5"
            >
              <EmailIcon />
            </Button>
          )}

          {isExternal ? (
            <Button
              variant="secondary"
              size="sm"
              as="a"
              href={href}
              target="_blank"
            >
              Voir →
            </Button>
          ) : !whatsappHref && !emailHref ? (
            <Button
              variant="primary"
              size="sm"
              onClick={onContact}
              as={href ? 'a' : 'button'}
              href={href}
            >
              Contact
            </Button>
          ) : null}
        </div>
      </footer>
    </article>
  )
}
