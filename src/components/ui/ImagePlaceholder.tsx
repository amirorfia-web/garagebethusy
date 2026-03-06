import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export type ImageRatio = '16/9' | '4/3' | '1/1' | '3/4'

export interface ImagePlaceholderProps {
  /** Ratio d'affichage */
  ratio?:     ImageRatio
  /** Description précise de la photo attendue (ex: "Façade du garage Avenue de Béthusy") */
  label:      string
  /** Marque comme image prioritaire (LCP) */
  priority?:  boolean
  /** Hauteur fixe en px (remplace le ratio si défini) */
  height?:    number
  className?: string
}

// ── Ratio → padding-bottom (% intrinsèque) ───────────────────────────────────

const ratioPadding: Record<ImageRatio, string> = {
  '16/9': '56.25%',
  '4/3':  '75%',
  '1/1':  '100%',
  '3/4':  '133.33%',
}

// ── Icône caméra SVG ──────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue/40 mb-2"
      aria-hidden
    >
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function ImagePlaceholder({
  ratio     = '16/9',
  label,
  priority  = false,
  height,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full bg-blue-light rounded-lg overflow-hidden',
        'flex flex-col items-center justify-center',
        className,
      )}
      style={
        height
          ? { height: `${height}px` }
          : { paddingBottom: ratioPadding[ratio] }
      }
      role="img"
      aria-label={label}
      data-priority={priority || undefined}
    >
      {/* Contenu centré (position absolue pour fonctionner avec le padding-bottom) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <CameraIcon />
        <span className="text-[0.72rem] font-semibold text-blue/60 text-center leading-snug max-w-[80%]">
          {label}
        </span>
      </div>
    </div>
  )
}
