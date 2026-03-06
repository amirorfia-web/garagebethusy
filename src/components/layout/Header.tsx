'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { TEAM, GARAGE, phoneLink } from '@/data/contacts'

// ── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: '/',                   label: 'Accueil' },
  { href: '/services',           label: 'Prestations' },
  { href: '/vehicules-occasion', label: "Véhicules d'occasion" },
  { href: '/a-propos',           label: 'À propos' },
  { href: '/contact',            label: 'Contact' },
]

// ── Icône hamburger / croix ───────────────────────────────────────────────────

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <span
        className={cn(
          'block w-full h-[2px] bg-ink rounded-full transition-all duration-300 ease-spring origin-left',
          open && 'rotate-45 translate-x-[1px] -translate-y-[1px]',
        )}
      />
      <span
        className={cn(
          'block w-full h-[2px] bg-ink rounded-full transition-all duration-200',
          open && 'opacity-0 translate-x-2',
        )}
      />
      <span
        className={cn(
          'block w-full h-[2px] bg-ink rounded-full transition-all duration-300 ease-spring origin-left',
          open && '-rotate-45 translate-x-[1px] translate-y-[1px]',
        )}
      />
    </div>
  )
}

// ── Composant Header ──────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Ajouter une ombre quand on scrolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Bloquer le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full',
          'bg-bg-app/92 backdrop-blur-xl',
          'border-b border-border',
          'transition-shadow duration-200',
          scrolled && 'shadow-sm',
        )}
      >
        <div className="wrap flex items-center justify-between h-14 md:h-16">

          {/* ── Logo + Nom ── */}
          <Link href="/" className="flex items-center gap-3 no-underline shrink-0">
            <div className="w-9 h-9 bg-blue rounded-sm flex items-center justify-center font-display font-black text-[1rem] text-white leading-none">
              GB
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-extrabold text-[0.95rem] tracking-[0.05em] uppercase text-ink leading-none block">
                Garage Béthusy-Beaumont
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-3 leading-none">
                AFGP Sàrl · Lausanne · depuis 2006
              </span>
            </div>
          </Link>

          {/* ── Nav desktop ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[0.8rem] font-semibold px-3 py-1.5 rounded-[5px] transition-colors duration-150',
                    isActive
                      ? 'text-blue bg-blue-light'
                      : 'text-ink-2 hover:text-blue hover:bg-blue-light',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* ── CTA desktop + Hamburger mobile ── */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button variant="primary" size="sm" as="a" href="/contact">
                Prendre RDV
              </Button>
            </div>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-blue-light transition-colors"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Overlay mobile ── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* ── Panneau nav mobile ── */}
      <nav
        className={cn(
          'fixed top-14 right-0 bottom-0 z-40 w-[85vw] max-w-[320px]',
          'bg-white border-l border-border shadow-2xl',
          'flex flex-col p-6 pt-8 gap-1',
          'transition-transform duration-300 ease-spring lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Menu mobile"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-[1rem] font-semibold px-4 py-3 rounded-md transition-colors',
                isActive
                  ? 'text-blue bg-blue-light'
                  : 'text-ink hover:text-blue hover:bg-blue-light',
              )}
            >
              {item.label}
            </Link>
          )
        })}

        <hr className="border-border my-4" />

        <Button variant="primary" as="a" href="/contact" className="w-full">
          Prendre rendez-vous
        </Button>
        {/* Appeler le garage */}
        <Button variant="secondary" as="a" href={phoneLink()} className="w-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          {GARAGE.phone}
        </Button>

        {/* WhatsApp — 3 associés */}
        <div className="space-y-1.5">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-ink-3 px-1">
            WhatsApp direct
          </p>
          {TEAM.map((m) => (
            <a
              key={m.name}
              href={`https://wa.me/${m.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-2 hover:bg-[#E8F8EE] hover:text-[#128C7E] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="font-medium">{m.name}</span>
              <span className="text-xs text-ink-3 ml-auto">{m.role}</span>
            </a>
          ))}
        </div>

        {/* Horaires en bas du menu */}
        <div className="mt-auto pt-6 border-t border-border">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-ink-3 mb-1">
            Horaires
          </p>
          <p className="text-[0.78rem] text-ink-2 leading-relaxed">
            {GARAGE.hours[0].days} {GARAGE.hours[0].time}<br />
            {GARAGE.hours[1].days} {GARAGE.hours[1].time}
          </p>
        </div>
      </nav>
    </>
  )
}
