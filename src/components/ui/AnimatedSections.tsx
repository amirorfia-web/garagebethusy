'use client'

import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import { AnimatedCounter } from './ScrollReveal'
import type { ReactNode } from 'react'

// ── Animated section wrapper (for server components) ──────────────────────

/** Simple scroll reveal wrapper for server component content */
export function RevealSection({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

/** Reveal from left */
export function RevealLeft({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal direction="left" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

/** Reveal from right */
export function RevealRight({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal direction="right" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

/** Staggered card grid */
export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <StaggerContainer className={className}>
      {children}
    </StaggerContainer>
  )
}

export function StaggerCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <StaggerItem className={className}>
      {children}
    </StaggerItem>
  )
}

/** Animated stat counter */
export { AnimatedCounter }
