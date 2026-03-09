import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Wrench, ClipboardList, CarFront, MapPin, Star, Paintbrush, Cog } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import VehicleCard from '@/components/ui/VehicleCard'
import StatStrip from '@/components/ui/StatStrip'
import BackgroundPaths from '@/components/ui/BackgroundPaths'
import { StarRating } from '@/components/ui/Icons'
import type { Vehicle } from '@/data/vehicle-types'
import vehiclesData from '@/data/vehicles.json'
import { TEAM, GARAGE, waLink, phoneLink } from '@/data/contacts'
import { TrustBand } from '@/components/ui/SectionDivider'
import { RevealSection, RevealLeft, RevealRight, StaggerGrid, StaggerCard } from '@/components/ui/AnimatedSections'

// 3 premiers véhicules visibles pour l'aperçu
const PREVIEW_VEHICLES = (vehiclesData as Vehicle[]).filter((v) => v.visible).slice(0, 3)

export const metadata: Metadata = {
  title: 'Garage de Béthusy-Beaumont — Mécanique & Carrosserie à Lausanne depuis 2006',
  description:
    'Garage indépendant à Lausanne, toutes marques. Mécanique, carrosserie, pneus, vitrage. Devis transparent, délais tenus. AFGP Sàrl — Avenue de Béthusy 27.',
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-16">
      {/* Diagonal blue slab (desktop) */}
      <div
        className="hidden md:block absolute top-0 right-[-5%] w-[52%] h-full z-0"
        style={{
          background: 'linear-gradient(160deg, #1649C8 0%, #2B5CE6 100%)',
          clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
        }}
        aria-hidden
      />
      {/* Grid overlay on blue side */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[52%] h-full z-[1] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden
      />

      <div className="wrap relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left — Texte */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-blue bg-blue-light border border-blue/18 px-3 py-1 rounded-pill mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-blue" aria-hidden />
              Garage indépendant · Lausanne · Depuis 2006
            </div>

            {/* Titre */}
            <h1 className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.88] uppercase text-ink mb-6 tracking-[-0.01em]">
              Votre voiture<br />
              <span className="text-blue">
                entre de bonnes mains.
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-body-lg text-ink-2 leading-[1.75] mb-8 max-w-[52ch]">
              Mécanique, carrosserie, pneus, vitrages — toutes marques, toutes réparations. À l&apos;entrée de Lausanne, avec une équipe qui connaît son métier depuis vingt ans.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="primary" size="lg" as="a" href="/contact">
                Prendre rendez-vous
              </Button>
              <Button variant="secondary" size="lg" as="a" href="/contact#devis">
                Demander un devis
              </Button>
            </div>

            {/* Badge confiance */}
            <div className="flex items-center gap-2 text-[0.78rem] text-ink-3">
              <Star size={14} className="text-warn" fill="currentColor" strokeWidth={0} />
              Avis clients vérifiés · Google My Business
            </div>
          </div>

          {/* Right — Photo façade (desktop) */}
          <div className="hidden md:block">
            <div className="relative aspect-[4/3] w-full rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/images/exterieur.png"
                alt="Façade du Garage de Béthusy-Beaumont — Avenue de Béthusy 27, Lausanne"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — BANDE DE RÉASSURANCE
// ══════════════════════════════════════════════════════════════════════════════

const REASSURANCE = [
  { icon: <Wrench size={24} className="text-blue" strokeWidth={1.8} />,        title: 'Toutes marques',         desc: 'Voitures de toutes origines et toutes marques.' },
  { icon: <ClipboardList size={24} className="text-blue" strokeWidth={1.8} />, title: 'Devis transparent',       desc: 'Prix annoncé = prix facturé. Pas de mauvaises surprises.' },
  { icon: <CarFront size={24} className="text-blue" strokeWidth={1.8} />,      title: 'Véhicule de courtoisie',  desc: 'Un véhicule de prêt disponible pendant la durée de votre réparation.' },
  { icon: <MapPin size={24} className="text-blue" strokeWidth={1.8} />,        title: 'Parking gratuit',         desc: 'Entrée de ville, accès facile, places disponibles sur place.' },
]

function ReassuranceStrip() {
  return (
    <section className="bg-white border-y border-border py-10 md:py-12">
      <div className="wrap">
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {REASSURANCE.map((item) => (
            <StaggerCard key={item.title}>
              <div className="flex flex-col gap-2">
                <span aria-hidden>{item.icon}</span>
                <h3 className="font-display font-bold text-[1rem] uppercase tracking-[0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[0.82rem] text-ink-2 leading-[1.55]">
                  {item.desc}
                </p>
              </div>
            </StaggerCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — INTRO GARAGE
// ══════════════════════════════════════════════════════════════════════════════

function IntroSection() {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14">
        {/* Texte */}
        <RevealLeft>
          <h2 className="font-display font-black text-h2 uppercase text-ink mb-6 leading-none">
            Un garage lausannois qui ne fait pas de promesses en l&apos;air.
          </h2>
          <div className="space-y-4 text-body text-ink-2 leading-[1.7]">
            <p>
              Fondé en 2006, le Garage de Béthusy-Beaumont s&apos;est construit sur une seule chose : un travail bien fait, annoncé clairement, livré dans les temps.
            </p>
            <p>
              Chez nous, le diagnostic est honnête. Si la réparation n&apos;est pas nécessaire, on vous le dit. Si elle l&apos;est, on vous explique pourquoi — et on vous donne un prix ferme avant de commencer.
            </p>
            <p>
              Pas de jargon inutile. Pas de surprises sur la facture. Un interlocuteur direct, joignable, qui vous connaît.
            </p>
          </div>
        </RevealLeft>

        {/* Image */}
        <RevealRight>
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
            <Image
              src="/images/interieur-2.webp"
              alt="Intérieur de l'atelier — véhicules en cours de réparation"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </RevealRight>
      </div>

      {/* Stat strip */}
      <StatStrip
        stats={[
          { value: '2006', label: 'Année de fondation' },
          { value: '3',    label: 'Associés lausannois' },
          { value: 'Toutes marques', label: 'Toutes origines' },
          { value: '2h',   label: 'Délai de réponse devis' },
        ]}
      />
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — PRESTATIONS (aperçu, 3 cards)
// ══════════════════════════════════════════════════════════════════════════════

function ServicesPreview() {
  return (
    <section className="bg-white border-y border-border py-16 md:py-20">
      <div className="wrap">
        {/* En-tête */}
        <div className="mb-12 max-w-2xl">
          <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
            Nos prestations
          </p>
          <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
            Ce qu&apos;on fait — et ce qu&apos;on fait bien.
          </h2>
          <p className="text-body-sm text-ink-2 leading-[1.65]">
            De l&apos;entretien courant aux réparations complexes, une prise en charge complète de votre véhicule.
          </p>
        </div>

        {/* Cards */}
        <StaggerGrid className="card-grid-3 mb-10">
          <StaggerCard>
            <Card
              icon={<Wrench size={24} className="text-blue" strokeWidth={1.8} />}
              title="Mécanique & Entretien"
              description="Révision, freins, distribution, embrayage, diagnostic électronique. On intervient sur tous les systèmes — avec les bons outils et l'expérience qui va avec."
              badge={{ variant: 'grey', children: 'Toutes marques' }}
              ctaLabel="Voir les prestations →"
              href="/services"
            />
          </StaggerCard>
          <StaggerCard>
            <Card
              icon={<Paintbrush size={24} className="text-blue" strokeWidth={1.8} />}
              title="Carrosserie & Peinture"
              description="Chocs, rayures, déformations — on remet votre carrosserie dans son état d'origine. Peinture teintée en atelier, résultat garanti."
              badge={{ variant: 'blue', children: 'Devis gratuit' }}
              ctaLabel="Voir les prestations →"
              href="/services"
            />
          </StaggerCard>
          <StaggerCard>
            <Card
              icon={<Cog size={24} className="text-blue" strokeWidth={1.8} />}
              title="Pneus, Vitrage & Plus"
              description="Montage dès CHF 25.–/pneu, géométrie, pare-brise, gardiennage saisonnier. Tout ce qu'il faut pour rouler en sécurité."
              badge={{ variant: 'success', dot: true, children: 'Disponible' }}
              ctaLabel="Voir les prestations →"
              href="/services"
            />
          </StaggerCard>
        </StaggerGrid>

        <div className="text-center">
          <Button variant="ghost" as="a" href="/services">
            Voir toutes nos prestations →
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — AVIS CLIENTS
// ══════════════════════════════════════════════════════════════════════════════

const TESTIMONIALS = [
  {
    quote: 'Réparation rapide, prix conforme au devis, voiture rendue propre. C\'est tout ce qu\'on demande.',
    author: 'Client Google',
  },
  {
    quote: 'J\'y amène mes deux voitures depuis des années. Équipe sérieuse, honnête, jamais de mauvaises surprises.',
    author: 'Client Google',
  },
  {
    quote: 'Ils ont diagnostiqué un problème que deux autres garages n\'avaient pas trouvé. Efficace et transparent.',
    author: 'Client Google',
  },
]

function TestimonialsSection() {
  return (
    <section className="wrap py-16 md:py-20">
      {/* En-tête */}
      <div className="mb-12 max-w-2xl">
        <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
          Témoignages
        </p>
        <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
          Ce que disent nos clients.
        </h2>
        <p className="text-body-sm text-ink-2 leading-[1.65]">
          Des relations qui durent — pas des clients de passage.
        </p>
      </div>

      {/* Grille témoignages */}
      <StaggerGrid className="card-grid-3 mb-10">
        {TESTIMONIALS.map((t, i) => (
          <StaggerCard key={i}>
            <blockquote className="bg-white border border-border rounded-lg p-6 shadow-sm flex flex-col h-full">
              {/* Étoiles */}
              <div className="flex gap-0.5 mb-4 text-warn text-sm">
                <StarRating />
              </div>
              <p className="text-[0.88rem] text-ink leading-[1.6] italic flex-1 mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-[0.72rem] font-bold tracking-[0.08em] uppercase text-ink-3">
                — {t.author}
              </footer>
            </blockquote>
          </StaggerCard>
        ))}
      </StaggerGrid>

      <div className="text-center">
        <Button
          variant="ghost"
          as="a"
          href="https://www.google.com/maps"
          target="_blank"
        >
          Voir tous les avis sur Google →
        </Button>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — CTA CONTACT (bande bleue)
// ══════════════════════════════════════════════════════════════════════════════

function CtaContactBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue to-blue-dark py-16 md:py-20">
      {/* Cercle décoratif */}
      <div
        className="absolute -top-[20%] -right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden
      />

      <div className="wrap relative z-10 text-center">
        <h2 className="font-display font-black text-[clamp(1.8rem,4vw,3rem)] uppercase text-white leading-none mb-4">
          Une question ? Un problème avec votre véhicule ?
        </h2>
        <p className="text-[0.95rem] text-white/70 leading-relaxed max-w-[56ch] mx-auto mb-8">
          Écrivez-nous sur WhatsApp, remplissez le formulaire de devis, ou appelez directement. On répond dans la journée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="secondary" size="lg" as="a" href="/contact#devis" className="bg-white border-white text-ink hover:bg-blue-light hover:text-blue hover:border-blue-light">
            Demander un devis
          </Button>
          <Button variant="ghost" size="lg" as="a" href={phoneLink()} className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Nous contacter
          </Button>
          <Button variant="whatsapp" size="lg" as="a" href={waLink(TEAM[0])} target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — APERÇU VÉHICULES D'OCCASION
// ══════════════════════════════════════════════════════════════════════════════

function VehiclesPreview() {
  return (
    <section className="wrap py-16 md:py-20">
      {/* En-tête */}
      <div className="mb-12 max-w-2xl">
        <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
          Occasions
        </p>
        <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
          Véhicules d&apos;occasion
        </h2>
        <p className="text-body-sm text-ink-2 leading-[1.65]">
          Des véhicules que nous connaissons — parce que nous les avons contrôlés, entretenus, ou préparés nous-mêmes.
        </p>
      </div>

      {/* Cards véhicules — depuis le JSON */}
      <StaggerGrid className="card-grid-3 mb-10">
        {PREVIEW_VEHICLES.map((v) => (
          <StaggerCard key={v.id}>
            <VehicleCard
              make={v.make}
              model={v.model}
              year={v.year}
              km={v.km}
              transmission={v.transmission}
              fuel={v.fuel}
              price={v.price}
              source={v.source}
              imageSrc={v.image ?? undefined}
              badge={v.badge ? {
                variant: v.badgeVariant,
                dot: v.badgeVariant === 'success',
                label: v.badge,
              } : undefined}
              href={v.source === 'autoscout24' && v.autoscoutUrl ? v.autoscoutUrl : undefined}
            />
          </StaggerCard>
        ))}
      </StaggerGrid>

      <div className="text-center">
        <Button variant="ghost" as="a" href="/vehicules-occasion">
          Voir tous les véhicules disponibles →
        </Button>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE ACCUEIL
// ══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      <BackgroundPaths />
      <ReassuranceStrip />
      <IntroSection />
      <ServicesPreview />
      <TrustBand />
      <TestimonialsSection />
      <CtaContactBand />
      <VehiclesPreview />
    </>
  )
}
