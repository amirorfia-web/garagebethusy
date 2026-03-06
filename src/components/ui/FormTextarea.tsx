'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import { inputBase, inputError, labelBase } from './FormInput'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label:      string
  hint?:      string
  error?:     string
  required?:  boolean
  rows?:      number
  className?: string
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function FormTextarea({
  label,
  hint,
  error,
  required,
  rows = 4,
  className,
  ...props
}: FormTextareaProps) {
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

      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(
          inputBase,
          'resize-y min-h-[88px]',
          error && inputError,
          className,
        )}
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
