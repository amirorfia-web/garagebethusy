import React from 'react'
import { cn } from '@/lib/utils'

// ── Variantes de séparateurs visuels entre sections ──────────────────────────

interface DividerProps {
  className?: string
}

/** Ligne fine avec point central bleu */
export function DotDivider({ className }: DividerProps) {
  return (
    <div className={cn('flex items-center justify-center py-4', className)} aria-hidden>
      <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-border" />
      <div className="w-2 h-2 rounded-full bg-blue mx-4" />
      <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-border" />
    </div>
  )
}

/** Triple point bleu */
export function TripleDot({ className }: DividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2 py-6', className)} aria-hidden>
      <div className="w-1.5 h-1.5 rounded-full bg-blue/30" />
      <div className="w-2 h-2 rounded-full bg-blue/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-blue/30" />
    </div>
  )
}

/** Vague décorative SVG */
export function WaveDivider({ className }: DividerProps) {
  return (
    <div className={cn('w-full overflow-hidden', className)} aria-hidden>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-[30px] text-border">
        <path
          d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20 V40 H0 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

/** Bande décorative avec icônes auto */
export function AutoIconBand({ className }: DividerProps) {
  const icons = ['🔧', '🚗', '🛞', '🔩', '🏁', '⚙️', '🔧', '🚗', '🛞', '🔩', '🏁', '⚙️']
  return (
    <div className={cn('overflow-hidden py-6 bg-gradient-to-r from-transparent via-blue-light/50 to-transparent', className)} aria-hidden>
      <div className="flex animate-ticker whitespace-nowrap">
        {icons.concat(icons).map((icon, i) => (
          <span key={i} className="text-xl mx-8 opacity-30 select-none">{icon}</span>
        ))}
      </div>
    </div>
  )
}

/** Séparateur géométrique - chevron */
export function ChevronDivider({ className }: DividerProps) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)} aria-hidden>
      <div className="flex items-center gap-1">
        <div className="w-6 h-px bg-blue/20 rotate-[25deg]" />
        <div className="w-8 h-px bg-blue/40 rotate-[25deg]" />
        <div className="w-3 h-3 border-r-2 border-b-2 border-blue/30 rotate-[-45deg]" />
        <div className="w-8 h-px bg-blue/40 -rotate-[25deg]" />
        <div className="w-6 h-px bg-blue/20 -rotate-[25deg]" />
      </div>
    </div>
  )
}

/** Compteur de confiance */
export function TrustBand({ className }: DividerProps) {
  const stats = [
    { value: '20+', label: 'ans d\'expérience' },
    { value: '3', label: 'associés passionnés' },
    { value: '5★', label: 'avis Google' },
    { value: '∞', label: 'marques acceptées' },
  ]
  return (
    <div className={cn('bg-gradient-to-r from-blue to-blue-dark py-8', className)}>
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display font-black text-[2rem] text-white leading-none mb-1">{s.value}</p>
              <p className="text-[0.75rem] text-white/60 uppercase tracking-wider font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
