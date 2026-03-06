import React from 'react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

export interface StatItem {
  /** Valeur affichée en grand : "2006", "100%", "3", "2h" */
  value: string
  /** Libellé sous la valeur */
  label: string
}

export interface StatStripProps {
  stats:      StatItem[]   // 4 items recommandés
  className?: string
}

// ── Composant ────────────────────────────────────────────────────────────────

export default function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-blue to-blue-dark',
        'grid grid-cols-2 md:grid-cols-4 gap-6 p-10',
        className,
      )}
    >
      {/* Cercle décoratif en arrière-plan */}
      <div
        className="absolute -top-[30%] -right-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden
      />

      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            'relative',
            // Séparateur vertical entre colonnes (sauf première)
            i > 0 && 'md:before:content-[""] md:before:absolute md:before:left-0 md:before:top-[10%] md:before:h-[80%] md:before:w-px md:before:bg-white/15',
          )}
        >
          <p
            className={cn(
              'font-display font-black text-white leading-none mb-1',
              'text-[3.5rem] tracking-[-0.01em]',
            )}
          >
            {stat.value}
          </p>
          <p className="text-[0.75rem] font-medium text-white/60">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
