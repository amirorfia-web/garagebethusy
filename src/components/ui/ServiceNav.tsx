'use client'

import { useEffect, useRef, useState } from 'react'
import { ServiceIcon, type IconKey } from '@/components/ui/Icons'

const NAV_ITEMS: { id: string; label: string; icon: IconKey }[] = [
  { id: 'mecanique', label: 'Mécanique', icon: 'mecanique' },
  { id: 'carrosserie', label: 'Carrosserie', icon: 'carrosserie' },
  { id: 'pneus', label: 'Pneus', icon: 'pneus' },
  { id: 'vitrage', label: 'Vitrage', icon: 'vitrage' },
  { id: 'gardiennage', label: 'Gardiennage', icon: 'gardiennage' },
  { id: 'panne', label: 'Panne', icon: 'panne' },
  { id: 'entreprises', label: 'Entreprises', icon: 'entreprises' },
]

export default function ServiceNav() {
  const [activeId, setActiveId] = useState<string>('')
  const [isStuck, setIsStuck] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]

    // Track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))

    // Detect when nav is stuck (for shadow)
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setIsStuck(rect.top <= 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{ top: 'var(--header-h, 57px)' }}
      className={`sticky z-40 transition-shadow duration-300 border-b border-border bg-white/95 backdrop-blur-md ${
        isStuck ? 'shadow-md' : ''
      }`}
    >
      <div className="wrap">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2.5 -mx-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-pill text-[0.78rem] font-bold tracking-[0.02em] uppercase transition-all duration-200 shrink-0 ${
                activeId === item.id
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-ink-2 hover:bg-blue-light hover:text-blue'
              }`}
            >
              <ServiceIcon
                name={item.icon}
                variant="sm"
                className={activeId === item.id ? 'text-white' : 'text-blue'}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
