'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label:       string
  hint?:       string
  error?:      string
  required?:   boolean
  className?:  string
}

// ── Styles partagés ───────────────────────────────────────────────────────────

export const inputBase =
  'w-full bg-white border-[1.5px] border-border rounded-sm ' +
  'text-ink font-body text-[0.95rem] px-[13px] py-[10px] ' +
  'outline-none transition-[border-color,box-shadow] duration-[140ms] ease-linear ' +
  'shadow-xs placeholder:text-ink-4 ' +
  'focus:border-blue focus:shadow-[0_0_0_3px_rgba(22,73,200,0.12)]'

export const inputError =
  'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(224,36,36,0.10)]'

export const labelBase =
  'text-[0.7rem] font-bold tracking-[0.09em] uppercase text-ink-2'

// ── Composant ────────────────────────────────────────────────────────────────

export default function FormInput({
  label,
  hint,
  error,
  required,
  className,
  ...props
}: FormInputProps) {
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

      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(inputBase, error && inputError, className)}
        {...props}
      />

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
