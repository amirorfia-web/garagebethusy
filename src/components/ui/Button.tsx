'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  /** Remplace le <button> par un <a> (navigation) */
  as?:       'button' | 'a'
  href?:     string
  target?:   string
  /** Icône seule (carré, sans texte) */
  iconOnly?: boolean
  children:  React.ReactNode
  className?: string
}

// ── Variantes styles ──────────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center gap-2 font-body font-semibold ' +
  'rounded-sm border-none cursor-pointer relative overflow-hidden ' +
  'transition-all duration-[220ms] ease-spring whitespace-nowrap ' +
  'select-none focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-blue focus-visible:ring-offset-2'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-blue text-white ' +
    'shadow-[0_1px_2px_rgba(22,73,200,0.20),0_4px_14px_rgba(22,73,200,0.18)] ' +
    'hover:bg-blue-dark hover:-translate-y-0.5 ' +
    'hover:shadow-[0_6px_22px_rgba(22,73,200,0.30)] ' +
    'active:translate-y-0',

  secondary:
    'bg-white text-ink border border-border ' +
    'hover:border-blue hover:text-blue hover:bg-blue-light ' +
    // Sweep underline — pseudo handled via CSS class below
    'btn-secondary',

  ghost:
    'bg-transparent text-blue border border-blue/30 ' +
    'hover:bg-blue-light hover:border-blue',

  whatsapp:
    'bg-wa text-white ' +
    'shadow-[0_3px_10px_rgba(37,211,102,0.25)] ' +
    'hover:bg-[#1baa51] hover:-translate-y-0.5 ' +
    'active:translate-y-0',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-[15px] py-[7px] text-[0.75rem]',
  md: 'px-[22px] py-[11px] text-[0.85rem]',
  lg: 'px-[30px] py-[14px] text-[0.95rem]',
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'w-8 h-8 p-0',
  md: 'w-10 h-10 p-0',
  lg: 'w-12 h-12 p-0',
}

const disabledClass = 'opacity-40 cursor-not-allowed pointer-events-none'

// ── WhatsApp SVG Icon ─────────────────────────────────────────────────────────

export function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function Button({
  variant  = 'primary',
  size     = 'md',
  iconOnly = false,
  disabled,
  as       = 'button',
  href,
  target,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    iconOnly ? iconOnlySizes[size] : sizes[size],
    disabled && disabledClass,
    className,
  )

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}
