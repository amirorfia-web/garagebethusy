import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SectionHeaderProps {
  /** Numéro décoratif en fond : "01", "02"… */
  number:       string
  /** Petit tag au-dessus du titre : "Bibliothèque UI" */
  tag:          string
  title:        string
  description?: string
  className?:   string
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function SectionHeader({
  number,
  tag,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'relative pb-8 mb-14',
        // Barre bleue en bas
        'after:content-[""] after:absolute after:bottom-0 after:left-0',
        'after:w-12 after:h-[3px] after:bg-blue after:rounded-full',
        className,
      )}
    >
      {/* Numéro décoratif en fond */}
      <span
        aria-hidden
        className={cn(
          'absolute top-[-1.5rem] right-0 select-none pointer-events-none',
          'font-display font-black leading-none tracking-[-0.02em]',
          'text-transparent',
          'text-[clamp(5rem,10vw,9rem)]',
          '[color:transparent] [-webkit-text-stroke:1px_theme(colors.border)]',
        )}
        style={{ WebkitTextStroke: '1px #DDE3F0' }}
      >
        {number}
      </span>

      {/* Tag */}
      <p className="text-[0.68rem] font-bold tracking-[0.15em] uppercase text-blue mb-2">
        {tag}
      </p>

      {/* Titre */}
      <h2
        className={cn(
          'font-display font-black uppercase tracking-[0.02em] text-ink',
          'text-[clamp(2.2rem,4vw,3rem)] leading-none mb-[0.6rem]',
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-[0.875rem] text-ink-2 leading-[1.65] max-w-[56ch]">
          {description}
        </p>
      )}
    </div>
  )
}
