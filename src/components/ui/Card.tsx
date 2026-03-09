import React from 'react'
import { cn } from '@/lib/utils'
import Badge, { BadgeProps } from './Badge'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CardProps {
  /** Lucide icon element or fallback string */
  icon:         React.ReactNode
  title:        string
  description:  string
  badge?:       BadgeProps & { children: string }
  ctaLabel?:    string
  onCtaClick?:  () => void
  href?:        string
  className?:   string
}

// ── Styles CTA ────────────────────────────────────────────────────────────────

const ctaClasses =
  'text-[0.8rem] font-bold text-blue cursor-pointer ' +
  'inline-flex items-center gap-1 bg-transparent border-none p-0 ' +
  'transition-transform duration-150 ' +
  'group-hover:translate-x-[3px]'

// ── Composant ────────────────────────────────────────────────────────────────

export default function Card({
  icon,
  title,
  description,
  badge,
  ctaLabel = 'Voir →',
  onCtaClick,
  href,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        'bg-white border border-border rounded-lg overflow-hidden shadow-sm',
        'transition-all duration-[280ms] ease-spring group',
        'hover:-translate-y-[5px] hover:shadow-xl hover:border-blue/20',
        className,
      )}
    >
      {/* Barre bleue en haut */}
      <div className="h-[3px] bg-gradient-to-r from-blue to-blue-mid" />

      {/* Corps */}
      <div className="p-6">
        {/* Icône */}
        <div
          className={cn(
            'w-11 h-11 bg-blue-light rounded-md flex items-center justify-center',
            'text-xl mb-4',
            'transition-transform duration-[250ms] ease-spring',
            'group-hover:scale-110 group-hover:-rotate-[5deg]',
          )}
          aria-hidden
        >
          {icon}
        </div>

        {/* Titre */}
        <h3
          className={cn(
            'font-display font-bold text-[1.25rem] uppercase tracking-[0.04em]',
            'text-ink leading-[1.1] mb-[0.4rem]',
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-[0.82rem] text-ink-2 leading-[1.6]">
          {description}
        </p>
      </div>

      {/* Pied */}
      <footer className="flex items-center justify-between px-6 py-[0.9rem] border-t border-border bg-bg-app">
        {badge ? (
          <Badge {...badge}>{badge.children}</Badge>
        ) : (
          <span />
        )}

        {ctaLabel && (
          href ? (
            <a href={href} className={ctaClasses}>
              {ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={onCtaClick}
              className={ctaClasses}
            >
              {ctaLabel}
            </button>
          )
        )}
      </footer>
    </article>
  )
}
