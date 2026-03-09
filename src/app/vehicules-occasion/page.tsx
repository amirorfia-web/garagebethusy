import type { Metadata } from 'next'
import { Search, ClipboardList, Handshake, Wrench } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import VehicleCard from '@/components/ui/VehicleCard'
import WhatsAppContact from '@/components/ui/WhatsAppContact'
import type { Vehicle } from '@/data/vehicle-types'
import vehiclesData from '@/data/vehicles.json'
import { TEAM, GARAGE, waLink, phoneLink, waVehicleLink, emailVehicleLink } from '@/data/contacts'
import { TripleDot } from '@/components/ui/SectionDivider'
import { StaggerGrid, StaggerCard } from '@/components/ui/AnimatedSections'

export const metadata: Metadata = {
  title: 'Véhicules d\'occasion — Achat & Vente · Lausanne',
  description:
    'Véhicules d\'occasion contrôlés et préparés par notre garage. Toutes marques, prix transparents. Garage de Béthusy-Beaumont, AFGP Sàrl — Lausanne.',
}

// Charger les véhicules visibles depuis le fichier JSON
const VEHICLES = (vehiclesData as Vehicle[]).filter((v) => v.visible)

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════════════════════

function HeroVehicules() {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(170deg, #F8F9FC 0%, #EAF0FF 35%, #F8F9FC 70%)',
        }}
        aria-hidden
      />

      <div className="wrap relative z-[2]">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-blue bg-blue-light border border-blue/18 px-3 py-1 rounded-pill mb-6">
            <span className="w-[5px] h-[5px] rounded-full bg-blue" aria-hidden />
            Occasions
          </div>

          {/* Titre */}
          <h1 className="font-display font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] uppercase text-ink mb-6 tracking-[-0.01em]">
            Des véhicules qu&apos;on connaît.<br />
            <span className="text-blue">
              Pas des inconnues.
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-body-lg text-ink-2 leading-[1.75] mb-6 max-w-[58ch]">
            Des véhicules que nous connaissons — parce que nous les avons contrôlés, entretenus, ou préparés nous-mêmes. Chaque occasion est vendue avec transparence sur son état et son historique.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue">Toutes marques</Badge>
            <Badge variant="success" dot>En stock</Badge>
            <Badge variant="grey">+ AutoScout24</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — GRILLE VÉHICULES
// ══════════════════════════════════════════════════════════════════════════════

function VehiculesGrid() {
  return (
    <section className="bg-white border-y border-border py-16 md:py-20">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
              {VEHICLES.length} véhicules disponibles
            </p>
            <h2 className="font-display font-black text-h2 uppercase text-ink leading-none">
              Notre parc actuel
            </h2>
          </div>
          <Button variant="ghost" as="a" href="https://www.autoscout24.ch" target="_blank">
            Voir aussi sur AutoScout24 →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLES.map((v) => {
            // Construire le tableau d'images (rétro-compatibilité)
            const vehicleImages = (v.images && v.images.length > 0)
              ? v.images
              : v.image
                ? [v.image]
                : []

            return (
              <VehicleCard
                key={v.id}
                make={v.make}
                model={v.model}
                year={v.year}
                month={v.month}
                km={v.km}
                transmission={v.transmission}
                fuel={v.fuel}
                price={v.price}
                description={v.description}
                source={v.source}
                images={vehicleImages}
                imageSrc={v.image ?? undefined}
                whatsappHref={waVehicleLink(v.make, v.model, v.year, v.km, v.price)}
                emailHref={emailVehicleLink(v.make, v.model, v.year)}
                badge={v.badge ? {
                  variant: v.badgeVariant,
                  dot: v.badgeVariant === 'success',
                  label: v.badge,
                } : undefined}
                href={v.source === 'autoscout24' && v.autoscoutUrl ? v.autoscoutUrl : undefined}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — NOTRE APPROCHE
// ══════════════════════════════════════════════════════════════════════════════

const APPROCHE = [
  {
    icon: <Search size={22} className="text-blue" strokeWidth={1.8} />,
    title: 'Véhicules inspectés',
    text: 'Chaque véhicule passe par notre atelier avant d\'être mis en vente. Contrôle mécanique, vérification du train roulant, diagnostic électronique.',
  },
  {
    icon: <ClipboardList size={22} className="text-blue" strokeWidth={1.8} />,
    title: 'Historique transparent',
    text: 'On vous dit tout : kilométrage vérifié, historique d\'entretien, éventuels défauts cosmétiques. Pas de mauvaises surprises après l\'achat.',
  },
  {
    icon: <Handshake size={22} className="text-blue" strokeWidth={1.8} />,
    title: 'Prix ferme, sans négociation à l\'envers',
    text: 'Le prix affiché est le bon prix. Il tient compte de l\'état réel du véhicule et du marché. On ne gonfle pas pour laisser « négocier ».',
  },
  {
    icon: <Wrench size={22} className="text-blue" strokeWidth={1.8} />,
    title: 'Garantie atelier',
    text: 'Vous achetez chez un garage, pas chez un revendeur. Si un problème apparaît, vous savez exactement où revenir — et on s\'en occupe.',
  },
]

function ApprocheSection() {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
          Notre approche
        </p>
        <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
          Acheter chez un garage, ça change tout.
        </h2>
        <p className="text-body-sm text-ink-2 leading-[1.65]">
          On ne revend pas des véhicules en lot. On vend des voitures qu&apos;on a eues dans notre atelier — et qu&apos;on peut garantir.
        </p>
      </div>

      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {APPROCHE.map((item) => (
          <StaggerCard key={item.title}>
            <div className="bg-white border border-border rounded-xl p-6 hover:border-blue/20 hover:shadow-sm transition-all duration-200">
              <div className="w-11 h-11 bg-blue-light rounded-lg flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-[0.95rem] uppercase tracking-[0.03em] text-ink leading-tight mb-2">
                {item.title}
              </h3>
              <p className="text-[0.82rem] text-ink-2 leading-[1.6]">
                {item.text}
              </p>
            </div>
          </StaggerCard>
        ))}
      </StaggerGrid>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — VOUS VENDEZ VOTRE VÉHICULE ?
// ══════════════════════════════════════════════════════════════════════════════

function VenteSection() {
  return (
    <section className="bg-white border-y border-border py-16 md:py-20">
      <div className="wrap">
        <div className="bg-gradient-to-br from-ink to-[#1a2240] rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Cercle décoratif */}
          <div
            className="absolute -top-[15%] -right-[8%] w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'rgba(22,73,200,0.12)' }}
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Badge variant="blue">Achat & Reprise</Badge>
              <h2 className="font-display font-black text-[clamp(1.6rem,3vw,2.4rem)] uppercase text-white leading-none mt-4 mb-5">
                Vous vendez votre véhicule ?
              </h2>
              <p className="text-[0.92rem] text-white/70 leading-[1.7] mb-4">
                Nous rachetons des véhicules d&apos;occasion toutes marques — ou nous les proposons en dépôt-vente. Estimation rapide, prix juste, transaction simplifiée.
              </p>
              <p className="text-[0.92rem] text-white/70 leading-[1.7] mb-8">
                Contactez-nous avec les informations de votre véhicule pour une estimation sans engagement.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" as="a" href="/contact#devis">
                  Demander une estimation
                </Button>
                <Button variant="whatsapp" as="a" href={waLink(TEAM[0], 'Bonjour, je souhaite vendre mon véhicule. Pouvez-vous me faire une estimation ?')} target="_blank">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Contact direct */}
            <div className="space-y-3">
              <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-white/40 mb-2">
                Contactez directement un associé
              </p>
              {TEAM.map((member) => (
                <WhatsAppContact
                  key={member.name}
                  name={member.fullName}
                  role={member.role}
                  phone={member.phoneRaw}
                  message={`Bonjour ${member.name}, je souhaite vendre mon véhicule. Pouvez-vous me faire une estimation ?`}
                  className="!bg-white/5 !border-white/10 hover:!bg-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — CTA BAS DE PAGE
// ══════════════════════════════════════════════════════════════════════════════

function CtaBottom() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue to-blue-dark py-16 md:py-20">
      <div
        className="absolute -top-[20%] -right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden
      />

      <div className="wrap relative z-10 text-center">
        <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] uppercase text-white leading-none mb-4">
          Un véhicule vous intéresse ?
        </h2>
        <p className="text-[0.92rem] text-white/70 leading-relaxed max-w-[56ch] mx-auto mb-8">
          Contactez-nous pour organiser un essai, obtenir plus d&apos;informations, ou simplement poser vos questions. On répond dans la journée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="secondary" size="lg" as="a" href="/contact" className="bg-white border-white text-ink hover:bg-blue-light hover:text-blue hover:border-blue-light">
            Nous contacter
          </Button>
          <Button variant="whatsapp" size="lg" as="a" href={waLink(TEAM[0])} target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </Button>
          <Button variant="secondary" size="lg" as="a" href={phoneLink()} className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            {GARAGE.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE VÉHICULES D'OCCASION
// ══════════════════════════════════════════════════════════════════════════════

export default function VehiculesOccasionPage() {
  return (
    <>
      <HeroVehicules />
      <VehiculesGrid />
      <TripleDot />
      <ApprocheSection />
      <VenteSection />
      <CtaBottom />
    </>
  )
}
