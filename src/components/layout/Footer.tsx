import React from 'react'
import Link from 'next/link'
import { GARAGE, TEAM, waLink, phoneLink } from '@/data/contacts'

const NAV_LINKS = [
  { href: '/services',           label: 'Prestations' },
  { href: '/vehicules-occasion', label: 'Véhicules' },
  { href: '/a-propos',           label: 'À propos' },
  { href: '/contact',            label: 'Contact' },
  { href: '/contact',            label: 'Prendre rendez-vous' },
]

// ── Icône WhatsApp ───────────────────────────────────────────────────────────

function WaSmall() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366" aria-hidden className="shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PhoneSmall() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

// ── Composant Footer ─────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      {/* Blue top accent line */}
      <div className="h-1 bg-gradient-to-r from-blue via-blue-mid to-blue" />

      {/* ── Grille principale ── */}
      <div className="wrap py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Colonne 1 — Identité + Téléphone */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue rounded-[5px] flex items-center justify-center font-display font-black text-[0.85rem] text-white">
                GB
              </div>
              <div>
                <p className="font-display font-extrabold text-[0.85rem] tracking-[0.05em] uppercase text-white leading-none">
                  Garage Béthusy-Beaumont
                </p>
              </div>
            </div>
            <p className="text-[0.8rem] leading-relaxed text-white/50 mb-4">
              {GARAGE.company}<br />
              {GARAGE.address}<br />
              {GARAGE.city}<br />
              Depuis {GARAGE.since}
            </p>
            {/* Numéro général */}
            <a
              href={phoneLink()}
              className="inline-flex items-center gap-2 text-[0.82rem] text-white/70 hover:text-white transition-colors"
            >
              <PhoneSmall />
              {GARAGE.phone}
            </a>
          </div>

          {/* Colonne 2 — Horaires */}
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">
              Horaires
            </p>
            <div className="space-y-1.5 text-[0.82rem]">
              {GARAGE.hours.map((h) => (
                <div key={h.days} className="flex justify-between">
                  <span className="text-white/60">{h.days}</span>
                  <span className={h.time === 'Fermé' ? 'text-white/40' : 'text-white/80 font-medium'}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne 3 — Contacts WhatsApp (3 associés) */}
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">
              Contacts WhatsApp
            </p>
            <ul className="space-y-2">
              {TEAM.map((m) => (
                <li key={m.name}>
                  <a
                    href={waLink(m)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.82rem] text-white/70 hover:text-wa transition-colors"
                  >
                    <WaSmall />
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Navigation rapide */}
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">
              Navigation
            </p>
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.82rem] text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Barre légale ── */}
      <div className="border-t border-white/10">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.72rem] text-white/30 text-center sm:text-left">
            © 2026 {GARAGE.company} — {GARAGE.name} · {GARAGE.address} · {GARAGE.city}
          </p>
          <p className="text-[0.65rem] text-white/20">
            Site par Ora Pulse
          </p>
        </div>
      </div>
    </footer>
  )
}
