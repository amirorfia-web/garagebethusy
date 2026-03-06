'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info'

export interface ToastProps {
  variant:    ToastVariant
  title:      string
  message?:   string
  onClose?:   () => void
  className?: string
}

// ── Config par variante ───────────────────────────────────────────────────────

const config: Record<
  ToastVariant,
  { wrapper: string; icon: string; iconBg: string; symbol: string; ariaLabel: string }
> = {
  success: {
    wrapper: 'border-[rgba(14,159,110,0.20)]',
    icon:    'text-success',
    iconBg:  'bg-[rgba(14,159,110,0.10)]',
    symbol:  '✓',
    ariaLabel: 'Succès',
  },
  error: {
    wrapper: 'border-[rgba(224,36,36,0.18)]',
    icon:    'text-error',
    iconBg:  'bg-[rgba(224,36,36,0.08)]',
    symbol:  '!',
    ariaLabel: 'Erreur',
  },
  info: {
    wrapper: 'border-[rgba(2,132,199,0.18)]',
    icon:    'text-[#0284C7]',
    iconBg:  'bg-[rgba(2,132,199,0.08)]',
    symbol:  'i',
    ariaLabel: 'Information',
  },
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function Toast({
  variant,
  title,
  message,
  onClose,
  className,
}: ToastProps) {
  const c = config[variant]

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 px-4 py-[0.9rem] rounded-md border bg-white',
        'shadow-[0_2px_8px_rgba(8,15,40,0.06)]',
        c.wrapper,
        className,
      )}
    >
      {/* Icône */}
      <div
        className={cn(
          'w-[22px] h-[22px] rounded-full flex items-center justify-center',
          'flex-shrink-0 text-[0.6rem] font-extrabold',
          c.iconBg,
          c.icon,
        )}
        aria-label={c.ariaLabel}
      >
        {c.symbol}
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <p className="text-[0.82rem] font-bold text-ink mb-[2px] leading-snug">
          {title}
        </p>
        {message && (
          <p className="text-[0.72rem] text-ink-2 leading-[1.5]">{message}</p>
        )}
      </div>

      {/* Bouton fermer */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Fermer"
          className={cn(
            'flex-shrink-0 w-5 h-5 rounded flex items-center justify-center',
            'text-ink-3 text-[0.7rem] hover:text-ink hover:bg-border/60',
            'transition-colors duration-150',
          )}
        >
          ×
        </button>
      )}
    </div>
  )
}
