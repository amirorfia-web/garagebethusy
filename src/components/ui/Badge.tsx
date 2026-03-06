import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = 'blue' | 'success' | 'warning' | 'grey' | 'ink'

export interface BadgeProps {
  variant?:  BadgeVariant
  dot?:      boolean        // Petit rond de couleur devant le texte
  children:  React.ReactNode
  className?: string
}

// ── Styles par variante ───────────────────────────────────────────────────────

const base =
  'inline-flex items-center gap-[5px] text-[0.65rem] font-bold ' +
  'tracking-[0.06em] uppercase px-[10px] py-[4px] rounded-pill'

const variants: Record<BadgeVariant, { badge: string; dot: string }> = {
  blue: {
    badge: 'bg-blue-light text-blue border border-blue/20',
    dot:   'bg-blue',
  },
  success: {
    badge: 'bg-[rgba(14,159,110,0.08)] text-success border border-[rgba(14,159,110,0.20)]',
    dot:   'bg-success',
  },
  warning: {
    badge: 'bg-[rgba(217,119,6,0.08)] text-warn border border-[rgba(217,119,6,0.20)]',
    dot:   'bg-warn',
  },
  grey: {
    badge: 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]',
    dot:   'bg-[#475569]',
  },
  ink: {
    badge: 'bg-ink text-white',
    dot:   'bg-white',
  },
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function Badge({
  variant   = 'grey',
  dot       = false,
  children,
  className,
}: BadgeProps) {
  const v = variants[variant]

  return (
    <span className={cn(base, v.badge, className)}>
      {dot && (
        <span
          className={cn('w-[5px] h-[5px] rounded-full flex-shrink-0', v.dot)}
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}
