/**
 * Page de démo — Bibliothèque UI
 * Garage de Béthusy-Beaumont · AFGP Sàrl
 *
 * Accessible via /ui-demo en développement.
 * Présente tous les composants avec leurs variantes.
 */

import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import Button, { WhatsAppIcon } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import VehicleCard from '@/components/ui/VehicleCard'
import WhatsAppContact from '@/components/ui/WhatsAppContact'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import FormTextarea from '@/components/ui/FormTextarea'
import Toast from '@/components/ui/Toast'
import StatStrip from '@/components/ui/StatStrip'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Bibliothèque UI — Dev',
  robots: { index: false },
}

// ── Données de démo ───────────────────────────────────────────────────────────

const SERVICE_PRESTATIONS = [
  {
    icon: '🔧',
    title: 'Mécanique',
    description:
      'Entretien et réparation toutes marques. Diagnostic électronique, freins, distribution, embrayage.',
    badge: { variant: 'grey' as const, children: 'Toutes marques' },
    ctaLabel: 'Voir →',
  },
  {
    icon: '🎨',
    title: 'Carrosserie',
    description:
      'Réparations et retouches peinture de précision. Débosselage sans peinture. Résultat garanti.',
    badge: { variant: 'blue' as const, children: 'Devis gratuit' },
    ctaLabel: 'Voir →',
  },
  {
    icon: '⚙️',
    title: 'Pneus & Géo',
    description:
      'Dès CHF 25.–/pneu, roue complète dès CHF 50.–. Équilibrage, géométrie, gardiennage saisonnier.',
    badge: { variant: 'success' as const, dot: true, children: 'Dispo' },
    ctaLabel: 'Voir →',
  },
]

const VEHICLES = [
  {
    make: 'Volkswagen',
    model: 'Golf VIII GTI',
    year: 2021,
    km: 48000,
    transmission: 'DSG',
    fuel: 'Essence',
    price: 34900,
    imageEmoji: '🚗',
    badge: { variant: 'blue' as const, label: 'Disponible' },
  },
  {
    make: 'BMW',
    model: 'Série 3 330d',
    year: 2022,
    km: 32500,
    transmission: 'Auto',
    fuel: 'Diesel',
    price: 42500,
    imageEmoji: '🚙',
    imageBg: 'linear-gradient(135deg, #e4edff, #ccdeff)',
    badge: { variant: 'success' as const, dot: true, label: 'Nouveau' },
  },
  {
    make: 'Audi',
    model: 'A4 Avant 2.0 TDI',
    year: 2020,
    km: 71000,
    transmission: 'S-Tronic',
    fuel: 'Diesel',
    price: 27800,
    imageEmoji: '🏎️',
    imageBg: 'linear-gradient(135deg, #edf5f0, #d5ede2)',
    badge: { variant: 'grey' as const, label: 'AutoScout24' },
    source: 'autoscout24' as const,
  },
]

const WA_TEAM = [
  { name: 'Alessandro', role: 'Fondateur & Associé', phone: '+41000000000', avatar: '👤' },
  { name: 'Valon',      role: 'Associé',             phone: '+41000000001', avatar: '👤' },
  { name: 'Brah',       role: 'Associé',             phone: '+41000000002', avatar: '👤' },
]

const STATS = [
  { value: '2006',  label: 'Année de fondation' },
  { value: '3',     label: 'Associés lausannois' },
  { value: '100%',  label: 'Toutes marques' },
  { value: '2h',    label: 'Délai de réponse devis' },
]

const SERVICES_OPTIONS = [
  { value: 'mecanique',  label: 'Mécanique & Entretien' },
  { value: 'carrosserie',label: 'Carrosserie & Peinture' },
  { value: 'pneus',      label: 'Pneus & Géométrie' },
  { value: 'pare-brise', label: 'Pare-brise & Vitrage' },
  { value: 'gardiennage',label: 'Gardiennage' },
  { value: 'autre',      label: 'Autre' },
]

// ── Sub-composant : cadre de démo ─────────────────────────────────────────────

function DemoFrame({
  label,
  children,
  dark = false,
}: {
  label:     string
  children:  React.ReactNode
  dark?:     boolean
}) {
  return (
    <div
      className={`relative border border-border rounded-xl p-8 mb-3 shadow-xs ${
        dark ? 'bg-ink' : 'bg-white'
      }`}
    >
      <span className="absolute top-3 right-4 font-mono text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-3">
        {label}
      </span>
      {children}
    </div>
  )
}

// ── Sub-composant : sous-label de section ─────────────────────────────────────

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-3 mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-border after:content-['']">
      {children}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UIDemoPage() {
  return (
    <div className="bg-bg-app min-h-screen">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 h-14 bg-bg-app/90 backdrop-blur-xl border-b border-border flex items-center justify-between px-[clamp(1.5rem,4vw,3rem)]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue rounded-[5px] flex items-center justify-center font-display font-black text-[0.8rem] text-white">
            GB
          </div>
          <span className="font-display font-extrabold text-[0.95rem] tracking-[0.07em] uppercase text-ink">
            Béthusy-Beaumont
          </span>
        </div>
        <span className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-blue bg-blue-light border border-blue/18 px-3 py-1 rounded-pill">
          UI Demo
        </span>
      </nav>

      {/* ── HERO ── */}
      <div className="wrap py-20 mb-10">
        <div className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-blue bg-blue-light border border-blue/18 px-3 py-1 rounded-pill mb-6">
          <span className="w-[5px] h-[5px] rounded-full bg-blue" aria-hidden />
          Bibliothèque de composants
        </div>
        <h1 className="font-display font-black text-[clamp(4rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.01em] uppercase text-ink mb-6">
          Garage de<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #1649C8' }}>
            Béthusy
          </span>
        </h1>
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-3 mb-0.5">Version</p>
            <p className="text-[0.8rem] font-medium text-ink-2">1.0 — Mars 2026</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-3 mb-0.5">Client</p>
            <p className="text-[0.8rem] font-medium text-ink-2">AFGP Sàrl — Alessandro Frulloni</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-3 mb-0.5">Stack</p>
            <p className="text-[0.8rem] font-medium text-ink-2">Next.js 14 · Tailwind · TypeScript</p>
          </div>
        </div>
      </div>

      <div className="wrap pb-32 space-y-28">

        {/* ══════════════════════════════════════════════════════════════════
            01 — COULEURS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="couleurs">
          <SectionHeader
            number="01"
            tag="Identité visuelle"
            title="Couleurs & Tokens"
            description="Palette lumineuse centrée sur le bleu du logo. Fond blanc pour un rendu aéré — gris slate en secondaire."
          />

          <SubLabel>Tokens CSS — variables</SubLabel>
          <DemoFrame label="tokens">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { bg: '#F8F9FC', name: 'Gris App',      token: '--bg',         text: 'rgba(8,15,40,.3)' },
                { bg: '#FFFFFF', name: 'Blanc Fond',    token: '--white',       text: 'rgba(8,15,40,.15)', border: true },
                { bg: '#1649C8', name: 'Bleu Primaire', token: '--blue',        text: 'rgba(255,255,255,.2)' },
                { bg: '#0D2E8F', name: 'Bleu Foncé',    token: '--blue-dark',   text: 'rgba(255,255,255,.2)' },
                { bg: '#2B5CE6', name: 'Bleu Moyen',    token: '--blue-mid',    text: 'rgba(255,255,255,.2)' },
                { bg: '#EAF0FF', name: 'Bleu Léger',    token: '--blue-light',  text: 'rgba(22,73,200,.2)' },
                { bg: '#080F28', name: 'Quasi-Noir',    token: '--ink',         text: 'rgba(255,255,255,.2)' },
                { bg: '#3D4A66', name: 'Gris Texte',    token: '--ink-2',       text: 'rgba(255,255,255,.25)' },
                { bg: '#7D89A3', name: 'Gris Moyen',    token: '--ink-3',       text: 'rgba(255,255,255,.3)' },
                { bg: '#B8C0D4', name: 'Gris Atténué',  token: '--ink-4',       text: 'rgba(8,15,40,.2)' },
                { bg: '#DDE3F0', name: 'Bordure',       token: '--border',      text: 'rgba(8,15,40,.2)', border: true },
                { bg: '#0E9F6E', name: 'Succès',        token: '--success',     text: 'rgba(255,255,255,.3)' },
                { bg: '#D97706', name: 'Avertissement', token: '--warn',        text: 'rgba(255,255,255,.3)' },
                { bg: '#25D366', name: 'WhatsApp',      token: '--wa',          text: 'rgba(255,255,255,.3)' },
              ].map((s) => (
                <div
                  key={s.token}
                  className={`rounded-xl overflow-hidden ${s.border ? 'border border-border' : ''}`}
                >
                  <div
                    className="h-16 flex items-end p-2"
                    style={{ background: s.bg }}
                  >
                    <span
                      className="font-display font-black text-xl tracking-wide uppercase leading-none"
                      style={{ color: s.text }}
                    >
                      {s.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="bg-white px-3 py-2">
                    <p className="text-[0.8rem] font-semibold text-ink">{s.name}</p>
                    <p className="font-mono text-[0.62rem] text-blue">{s.token}</p>
                    <p className="font-mono text-[0.7rem] text-ink-3">{s.bg}</p>
                  </div>
                </div>
              ))}
            </div>
          </DemoFrame>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            02 — TYPOGRAPHIE
        ══════════════════════════════════════════════════════════════════ */}
        <section id="typo">
          <SectionHeader
            number="02"
            tag="Identité typographique"
            title="Typographie"
            description="Barlow Condensed 900 pour l'impact, DM Sans 300/400 pour la lisibilité."
          />

          <SubLabel>Échelle typographique</SubLabel>
          <DemoFrame label="type scale">
            <div className="space-y-4">
              {[
                {
                  tag: 'Display Hero',
                  spec: 'Barlow Condensed 900 · clamp(3.5rem, 8vw, 7rem) · uppercase',
                  sample: (
                    <span className="font-display font-black text-hero uppercase text-ink leading-[0.88]">
                      Garage <em className="not-italic text-blue">Béthusy</em>
                    </span>
                  ),
                },
                {
                  tag: 'H1',
                  spec: 'Barlow Condensed 800 · clamp(2.5rem, 5vw, 4rem)',
                  sample: (
                    <span className="font-display font-extrabold text-h1 uppercase text-ink leading-[0.95]">
                      Réparation toutes marques
                    </span>
                  ),
                },
                {
                  tag: 'H2',
                  spec: 'Barlow Condensed 700 · clamp(1.8rem, 3.5vw, 2.75rem)',
                  sample: (
                    <span className="font-display font-bold text-h2 uppercase text-ink leading-none">
                      Carrosserie & Peinture
                    </span>
                  ),
                },
                {
                  tag: 'H3',
                  spec: 'Barlow Condensed 700 · 1.75rem',
                  sample: (
                    <span className="font-display font-bold text-h3 uppercase text-ink">
                      Montage & Équilibrage des pneus
                    </span>
                  ),
                },
                {
                  tag: 'H4',
                  spec: 'Barlow Condensed 600 · 1.35rem',
                  sample: (
                    <span className="font-display font-semibold text-h4 uppercase text-ink">
                      Remplacement de pare-brise
                    </span>
                  ),
                },
                {
                  tag: 'Body Large',
                  spec: 'DM Sans 300 · 1.125rem · lh 1.75',
                  sample: (
                    <span className="font-body font-light text-body-lg text-ink-2 leading-[1.75]">
                      Nous prenons en charge votre véhicule avec soin et vous tenons informé à chaque étape.
                    </span>
                  ),
                },
                {
                  tag: 'Body',
                  spec: 'DM Sans 400 · 1rem · lh 1.7',
                  sample: (
                    <span className="font-body text-body text-ink-2 leading-[1.7]">
                      Votre voiture mérite un traitement de qualité. Que ce soit pour un simple entretien ou une réparation complexe.
                    </span>
                  ),
                },
                {
                  tag: 'Body Small',
                  spec: 'DM Sans 400 · 0.875rem · lh 1.65',
                  sample: (
                    <span className="font-body text-body-sm text-ink-2 leading-[1.65]">
                      Horaires : Lun–Jeu 7h30–12h / 13h30–18h — Ven 7h30–12h / 13h30–16h — Sam–Dim fermé.
                    </span>
                  ),
                },
                {
                  tag: 'Label / Eyebrow',
                  spec: 'DM Sans 700 · 0.7rem · uppercase · ls +0.14em',
                  sample: (
                    <span className="font-body font-bold text-label uppercase tracking-[0.14em] text-ink-3">
                      Nos services — Lausanne depuis 2006
                    </span>
                  ),
                },
              ].map((t) => (
                <div key={t.tag} className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-white border-b border-border px-4 py-2 flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] font-bold tracking-[0.08em] uppercase text-blue">
                      {t.tag}
                    </span>
                    <span className="font-mono text-[0.6rem] text-ink-3">{t.spec}</span>
                  </div>
                  <div className="bg-bg-app px-7 py-6">{t.sample}</div>
                </div>
              ))}
            </div>
          </DemoFrame>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            03 — COMPOSANTS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="composants">
          <SectionHeader
            number="03"
            tag="Bibliothèque UI"
            title="Composants"
            description="Tous les éléments réutilisables avec leurs variantes et états."
          />

          {/* ── BUTTONS ── */}
          <SubLabel>Boutons — variantes</SubLabel>
          <DemoFrame label="Button">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button variant="primary">Prendre RDV</Button>
              <Button variant="secondary">Demander un devis</Button>
              <Button variant="ghost">Voir les prestations</Button>
              <Button variant="whatsapp">
                <WhatsAppIcon size={14} />
                WhatsApp
              </Button>
            </div>

            <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-ink-3 mb-3">
              Tailles & états
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg">Grand CTA</Button>
              <Button variant="primary" size="md">Standard</Button>
              <Button variant="primary" size="sm">Petit</Button>
              <Button variant="primary" iconOnly size="md" aria-label="Appeler">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </Button>
              <Button variant="secondary" disabled>Indisponible</Button>
            </div>
          </DemoFrame>

          {/* ── BADGES ── */}
          <SubLabel>Badges & Étiquettes</SubLabel>
          <DemoFrame label="Badge">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="blue" dot>Ouvert</Badge>
              <Badge variant="success" dot>Créneau disponible</Badge>
              <Badge variant="warning">Délai 48h</Badge>
              <Badge variant="grey">Toutes marques</Badge>
              <Badge variant="ink">AFGP Sàrl</Badge>
              <Badge variant="blue">Carrosserie</Badge>
              <Badge variant="grey">B2B</Badge>
              <Badge variant="success" dot>Lavage offert</Badge>
            </div>
          </DemoFrame>

          {/* ── STAT STRIP ── */}
          <SubLabel>StatStrip — chiffres clés</SubLabel>
          <StatStrip stats={STATS} className="mb-3" />

          {/* ── SERVICE CARDS ── */}
          <SubLabel>Cards — Prestations</SubLabel>
          <DemoFrame label="Card">
            <div className="card-grid-3">
              {SERVICE_PRESTATIONS.map((s) => (
                <Card key={s.title} {...s} />
              ))}
            </div>
          </DemoFrame>

          {/* ── VEHICLE CARDS ── */}
          <SubLabel>Fiches Véhicules d&apos;occasion</SubLabel>
          <DemoFrame label="VehicleCard">
            <div className="card-grid-3">
              {VEHICLES.map((v) => (
                <VehicleCard key={v.model} {...v} />
              ))}
            </div>
          </DemoFrame>

          {/* ── WA CONTACTS ── */}
          <SubLabel>Contacts WhatsApp — Alex · Valon · Brah</SubLabel>
          <DemoFrame label="WhatsAppContact">
            <div className="card-grid-3">
              {WA_TEAM.map((m) => (
                <WhatsAppContact
                  key={m.name}
                  name={m.name}
                  role={m.role}
                  phone={m.phone}
                  avatar={m.avatar}
                />
              ))}
            </div>
          </DemoFrame>

          {/* ── FORMULAIRE ── */}
          <SubLabel>Formulaire — États & validations</SubLabel>
          <DemoFrame label="Form">
            <div className="max-w-[580px] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Prénom"
                  name="firstname"
                  placeholder="Alessandro"
                  required
                />
                <FormInput
                  label="Nom"
                  name="lastname"
                  placeholder="Frulloni"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="email@exemple.ch"
                  required
                />
                <FormInput
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  placeholder="+41 79 000 00 00"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormSelect
                  label="Prestation"
                  name="service"
                  options={SERVICES_OPTIONS}
                  required
                />
                <FormInput
                  label="Véhicule"
                  name="vehicle"
                  placeholder="ex. VW Golf, BMW 320d…"
                />
              </div>
              <FormTextarea
                label="Message"
                name="message"
                placeholder="Décrivez votre besoin…"
                required
                hint="Plus vous êtes précis, plus notre estimation sera rapide."
              />
              <FormInput
                label="Email (état erreur)"
                name="email_err"
                type="email"
                defaultValue="email-invalide"
                error="Adresse email invalide."
              />
              <Button variant="primary" className="w-full">
                Envoyer — réponse sous 2h →
              </Button>
            </div>
          </DemoFrame>

          {/* ── TOASTS ── */}
          <SubLabel>Notifications Toast</SubLabel>
          <DemoFrame label="Toast">
            <div className="space-y-3 max-w-lg">
              <Toast
                variant="success"
                title="Demande envoyée — réponse sous 2h"
                message="Votre demande a bien été transmise. Un associé vous répondra dans les meilleurs délais."
              />
              <Toast
                variant="error"
                title="Créneau non disponible"
                message="Ce créneau vient d'être pris. Choisissez un autre horaire ou contactez-nous sur WhatsApp."
              />
              <Toast
                variant="info"
                title="Prochain créneau — Mardi 4 mars à 10h"
                message="Cliquez pour réserver ce créneau directement."
              />
            </div>
          </DemoFrame>

          {/* ── SECTION HEADER ── */}
          <SubLabel>SectionHeader — numéro bg, tag, titre</SubLabel>
          <DemoFrame label="SectionHeader">
            <SectionHeader
              number="04"
              tag="Exemple de section"
              title="Nos Prestations"
              description="Exemple de SectionHeader utilisé pour séparer les sections de page."
            />
            <p className="text-body-sm text-ink-3 italic">
              ↑ Le numéro &quot;04&quot; s&apos;affiche en arrière-plan, transparent.
            </p>
          </DemoFrame>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            04 — TOKENS VISUELS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="tokens">
          <SectionHeader
            number="04"
            tag="Fondations UI"
            title="Rayons & Espacement"
            description="Tokens visuels : border-radius et espacements du système."
          />

          <SubLabel>Border radius</SubLabel>
          <DemoFrame label="radius tokens">
            <div className="flex gap-6 flex-wrap items-end">
              {[
                { r: '3px',    label: 'xs · 3px',    tw: 'rounded-xs' },
                { r: '7px',    label: 'sm · 7px',    tw: 'rounded-sm' },
                { r: '10px',   label: 'md · 10px',   tw: 'rounded-md' },
                { r: '14px',   label: 'lg · 14px',   tw: 'rounded-lg' },
                { r: '20px',   label: 'xl · 20px',   tw: 'rounded-xl' },
                { r: '9999px', label: 'pill',         tw: 'rounded-pill w-18' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 bg-blue-light border-2 border-blue/30"
                    style={{ borderRadius: item.r, width: item.r === '9999px' ? '72px' : '56px' }}
                  />
                  <span className="font-mono text-[0.55rem] text-ink-3 text-center whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </DemoFrame>

          <SubLabel>Espacement — échelle 4px</SubLabel>
          <DemoFrame label="spacing tokens">
            <div className="flex flex-wrap items-end gap-5">
              {[4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96].map((sp) => (
                <div key={sp} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-gradient-to-br from-blue to-blue-mid rounded-[3px]"
                    style={{ width: `${sp}px`, height: `${sp}px` }}
                  />
                  <span className="font-mono text-[0.55rem] text-ink-3">{sp}px</span>
                </div>
              ))}
            </div>
          </DemoFrame>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            05 — VOIX & TON
        ══════════════════════════════════════════════════════════════════ */}
        <section id="voix">
          <SectionHeader
            number="05"
            tag="Identité éditoriale"
            title="Voix & Ton"
            description="Le garage parle de confiance sans la réclamer. Direct, concret, chaleureux — jamais corporate."
          />

          <SubLabel>À faire / À éviter</SubLabel>
          <DemoFrame label="tone of voice">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* À faire */}
              <div className="rounded-xl p-6 border-[1.5px] border-[rgba(14,159,110,0.20)] bg-[rgba(14,159,110,0.03)]">
                <p className="text-[0.7rem] font-extrabold tracking-[0.12em] uppercase text-success mb-4">
                  ✓ À faire
                </p>
                {[
                  '"Votre pare-brise est remplacé dans la journée. On vous appelle dès que votre voiture est prête."',
                  '"Depuis 2006, on entretient voitures et carrosseries avec le même soin — et la même transparence."',
                  '"Prix annoncé = prix payé. Aucune mauvaise surprise."',
                ].map((ex) => (
                  <blockquote
                    key={ex}
                    className="bg-white border-l-[3px] border-success rounded-r-md px-4 py-2 mb-2 text-[0.82rem] italic text-ink-2 leading-[1.55] shadow-xs"
                  >
                    {ex}
                  </blockquote>
                ))}
                <ul className="space-y-1 mt-3">
                  {['Direct, concret, factuel', 'Nous / on — proximité sans familiarité', 'Engagements chiffrés, tenus'].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[0.72rem] text-ink-3">
                      <span className="w-[13px] h-[13px] rounded-full bg-[rgba(14,159,110,0.15)] text-success flex items-center justify-center text-[0.55rem] font-extrabold flex-shrink-0 mt-[1px]">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* À éviter */}
              <div className="rounded-xl p-6 border-[1.5px] border-[rgba(224,36,36,0.16)] bg-[rgba(224,36,36,0.03)]">
                <p className="text-[0.7rem] font-extrabold tracking-[0.12em] uppercase text-error mb-4">
                  ✗ À éviter
                </p>
                {[
                  '"Notre entreprise leader vous offre des solutions automobiles optimales et compétitives."',
                  '"Hé les gars, on s\'occupe de votre bagnole en un clin d\'œil !"',
                  '"Tarifs très compétitifs — contactez-nous pour un devis gratuit !"',
                ].map((ex) => (
                  <blockquote
                    key={ex}
                    className="bg-white border-l-[3px] border-error rounded-r-md px-4 py-2 mb-2 text-[0.82rem] italic text-ink-2 leading-[1.55] shadow-xs"
                  >
                    {ex}
                  </blockquote>
                ))}
                <ul className="space-y-1 mt-3">
                  {['Jargon corporate ou institutionnel', 'Familiarité excessive / argot', 'Superlatifs sans preuve'].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[0.72rem] text-ink-3">
                      <span className="w-[13px] h-[13px] rounded-full bg-[rgba(224,36,36,0.10)] text-error flex items-center justify-center text-[0.55rem] font-extrabold flex-shrink-0 mt-[1px]">✗</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoFrame>
        </section>

      </div>
    </div>
  )
}
