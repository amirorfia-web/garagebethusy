'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import { inputBase, inputError, labelBase } from './FormInput'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string
  label: string
}

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label:        string
  options:      SelectOption[]
  placeholder?: string    // Texte de l'option vide (ex: "Choisir…")
  hint?:        string
  error?:       string
  required?:    boolean
  className?:   string
}

// ── Icône chevron (SVG inline data-url → Tailwind bg-image) ──────────────────

// Encodé directement dans la classe, identique au style guide
const selectIcon =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 4.5L11 1' stroke='%237D89A3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")] " +
  'bg-no-repeat bg-[right_13px_center] pr-9 appearance-none'

// ── Composant ────────────────────────────────────────────────────────────────

export default function FormSelect({
  label,
  options,
  placeholder = 'Choisir…',
  hint,
  error,
  required,
  className,
  ...props
}: FormSelectProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-[0.4rem]">
      <label htmlFor={id} className={labelBase}>
        {label}
        {required && (
          <span className="text-blue ml-[2px]" aria-hidden>
            *
          </span>
        )}
      </label>

      <select
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(inputBase, selectIcon, error && inputError, className)}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && !error && (
        <p id={`${id}-hint`} className="text-[0.7rem] text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="text-[0.7rem] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
