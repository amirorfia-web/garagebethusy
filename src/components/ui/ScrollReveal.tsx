'use client'

import { motion, useInView, type UseInViewOptions } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

// ── ScrollReveal wrapper ────────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Delay in seconds */
  delay?: number
  /** Duration in seconds */
  duration?: number
  /** Distance in pixels */
  distance?: number
  /** Trigger once or every time */
  once?: boolean
  /** Root margin for IntersectionObserver */
  margin?: UseInViewOptions['margin']
  className?: string
}

const DIRECTION_MAP = {
  up:    { y: 1, x: 0 },
  down:  { y: -1, x: 0 },
  left:  { y: 0, x: 1 },
  right: { y: 0, x: -1 },
  none:  { y: 0, x: 0 },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  margin = '-60px' as UseInViewOptions['margin'],
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin })
  const dir = DIRECTION_MAP[direction]

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: dir.y * distance,
        x: dir.x * distance,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger container for cards ──────────────────────────────────────────────

interface StaggerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' as UseInViewOptions['margin'] })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Counter animation ────────────────────────────────────────────────────────

interface CounterProps {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' as UseInViewOptions['margin'] })

  // Extract numeric part for animation
  const match = value.match(/^(\d+)(.*)$/)

  if (!match) {
    // Non-numeric value (like "∞" or "Toutes marques") — just fade in
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {value}
      </motion.span>
    )
  }

  const num = parseInt(match[1], 10)
  const suffix = match[2] || ''

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <CounterNumber target={num} active={isInView} />
      {suffix}
    </motion.span>
  )
}

function CounterNumber({ target, active }: { target: number; active: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : undefined}
    >
      {active ? (
        <motion.span
          key={target}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {target}
        </motion.span>
      ) : (
        '0'
      )}
    </motion.span>
  )
}
