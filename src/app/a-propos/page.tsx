import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatStrip from '@/components/ui/StatStrip'
import WhatsAppContact from '@/components/ui/WhatsAppContact'
import { TEAM as TEAM_CONTACTS, waLink } from '@/data/contacts'

export const metadata: Metadata = {
  title: 'À propos — Garage indépendant à Lausanne depuis 2006 · AFGP Sàrl',
  description:
    'Trois associés, un garage, vingt ans de métier. Alessandro, Valon et Brah — mécaniciens et carrossiers à Lausanne depuis 2006. Découvrez notre histoire.',
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════════════════════

function HeroAPropos() {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Fond dégradé subtil */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(170deg, #F8F9FC 0%, #EAF0FF 35%, #F8F9FC 70%)',
        }}
        aria-hidden
      />

      <div className="wrap relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-blue bg-blue-light border border-blue/18 px-3 py-1 rounded-pill mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-blue" aria-hidden />
              Notre histoire
            </div>

            {/* Titre */}
            <h1 className="font-display font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] uppercase text-ink mb-6 tracking-[-0.01em]">
              Un garage fondé<br />
              <span className="text-blue">
                sur la confiance.
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-body-lg text-ink-2 leading-[1.75] max-w-[54ch]">
              Pas un réseau, pas une franchise. Un garage indépendant, tenu par trois hommes qui se connaissent depuis le début de leur carrière — et qui ont décidé de la construire ensemble.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full rounded-xl shadow-lg overflow-hidden">
            <Image
              src="/images/equipe.png"
              alt="Les trois associés du Garage de Béthusy-Beaumont"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — L'HISTOIRE
// ══════════════════════════════════════════════════════════════════════════════

function HistoireSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
            <Image
              src="/images/interieur-1.webp"
              alt="L'atelier du Garage de Béthusy-Beaumont — vue intérieure"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          {/* Texte */}
          <div>
            <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
              Depuis 2006
            </p>
            <h2 className="font-display font-black text-h2 uppercase text-ink mb-6 leading-none">
              Comment trois mécaniciens sont devenus associés.
            </h2>
            <div className="space-y-4 text-body text-ink-2 leading-[1.7]">
              <p>
                Alessandro a ouvert le garage en 2006, à l&apos;entrée de Lausanne. Ce n&apos;était pas un projet de croissance rapide ni une opportunité financière — c&apos;était simplement l&apos;envie de travailler bien, à son compte, avec les gens en qui il avait confiance.
              </p>
              <p>
                Valon et Brah ont d&apos;abord travaillé ici en tant qu&apos;apprentis. Alessandro les a formés, ils ont appris le métier entre ces murs. Avec le temps et l&apos;expérience, l&apos;évidence s&apos;est imposée : ils n&apos;allaient pas partir travailler ailleurs. Ils allaient rester — en tant qu&apos;associés.
              </p>
              <p>
                Aujourd&apos;hui, le garage tourne avec trois personnes qui se connaissent profondément, qui partagent la même conception du travail, et qui répondent chacune directement à leurs clients. Pas de standardiste, pas de service client externalisé. Vous parlez à quelqu&apos;un qui sait exactement ce qu&apos;il fait.
              </p>
              <p>
                C&apos;est ce qui a construit la fidélité de notre clientèle. Et c&apos;est ce qui la maintient.
              </p>
            </div>
          </div>
        </div>

        {/* StatStrip */}
        <div className="mt-14">
          <StatStrip
            stats={[
              { value: '2006', label: 'Année de fondation' },
              { value: '3', label: 'Associés lausannois' },
              { value: '20 ans', label: 'D\'expérience cumulée' },
              { value: 'Toutes marques', label: 'Toutes origines' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — L'ÉQUIPE (3 profils)
// ══════════════════════════════════════════════════════════════════════════════

interface TeamMemberProps {
  name: string
  role: string
  description: string[]
  phone: string
  waMessage: string
  imageSrc: string
  imageAlt: string
}

const TEAM_PAGE_DATA: { description: string[]; imageSrc: string; imageAlt: string }[] = [
  {
    description: [
      'Alessandro a fondé le garage en 2006 après plusieurs années dans le secteur automobile lausannois. Ce qu\'il a voulu créer dès le départ : un garage où les clients comprennent ce qui est fait sur leur véhicule, et où le prix annoncé ne change pas sans explication.',
      'Vingt ans plus tard, c\'est toujours la même exigence — et c\'est lui qui la porte chaque matin.',
    ],
    imageSrc: '/images/alex.png',
    imageAlt: 'Alessandro — Fondateur du Garage de Béthusy-Beaumont',
  },
  {
    description: [
      'Valon a commencé ici comme apprenti. Il connaît ce garage mieux que la plupart des bâtiments qu\'il a traversés. Son domaine de prédilection : la mécanique fine, les diagnostics complexes, les problèmes que les autres n\'arrivent pas à identifier.',
      'Ce n\'est pas lui qui fera semblant d\'avoir trouvé si ce n\'est pas le cas.',
    ],
    imageSrc: '/images/valon.png',
    imageAlt: 'Valon — Associé du Garage de Béthusy-Beaumont',
  },
  {
    description: [
      'Brah a suivi le même chemin : apprenti d\'abord, associé ensuite. Il apporte à l\'équipe une rigueur de méthode et un sens du détail qui se voit dans les finitions — en carrosserie comme en mécanique.',
      'Il n\'expédie pas. Il fait.',
    ],
    imageSrc: '/images/brah.png',
    imageAlt: 'Brah — Associé du Garage de Béthusy-Beaumont',
  },
]

const TEAM: TeamMemberProps[] = TEAM_CONTACTS.map((contact, i) => ({
  name: i === 0 ? `${contact.fullName} (${contact.name})` : contact.name,
  role: contact.role,
  phone: contact.phoneRaw,
  waMessage: contact.waMessage,
  ...TEAM_PAGE_DATA[i],
}))

function TeamMember({ name, role, description, phone, waMessage, imageSrc, imageAlt }: TeamMemberProps) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue/20 transition-all duration-200">
      {/* Photo */}
      <div className="relative aspect-[1/1] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-[1.25rem] uppercase tracking-[0.03em] text-ink leading-tight mb-0.5">
          {name}
        </h3>
        <p className="text-[0.78rem] font-bold tracking-[0.1em] uppercase text-blue mb-4">
          {role}
        </p>

        <div className="space-y-3 mb-5">
          {description.map((p, i) => (
            <p key={i} className="text-[0.84rem] text-ink-2 leading-[1.6]">
              {p}
            </p>
          ))}
        </div>

        <WhatsAppContact
          name={name.split(' ')[0]}
          role={role}
          phone={phone}
          message={waMessage}
        />
      </div>
    </div>
  )
}

function EquipeSection() {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
          L&apos;équipe
        </p>
        <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
          Les trois associés.
        </h2>
        <p className="text-body-sm text-ink-2 leading-[1.65]">
          Chacun répond personnellement. Pas d&apos;intermédiaire, pas de délai inutile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {TEAM.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — NOS VALEURS
// ══════════════════════════════════════════════════════════════════════════════

const VALEURS = [
  {
    icon: '🤝',
    title: 'Ce qu\'on dit, on le fait.',
    text: 'Devis ferme avant intervention. Prix facturé = prix annoncé. Si quelque chose change, vous êtes informé avant — pas après.',
  },
  {
    icon: '⏱',
    title: 'Votre temps a de la valeur.',
    text: 'Délais tenus, réponses dans la journée, voiture rendue à l\'heure prévue. On sait que vous n\'avez pas que ça à gérer.',
  },
  {
    icon: '🔧',
    title: 'Vingt ans de métier, pas de raccourcis.',
    text: 'Aucun diagnostic à la va-vite, aucune pièce remplacée sans raison. On travaille avec méthode — parce que c\'est comme ça qu\'on évite les retours au garage.',
  },
]

function ValeursSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28">
      <div className="wrap">
        <div className="mb-12 max-w-2xl">
          <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
            Nos valeurs
          </p>
          <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
            Ce qui guide notre travail.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {VALEURS.map((v) => (
            <div
              key={v.title}
              className="relative bg-bg-app border border-border rounded-xl p-7 hover:border-blue/20 hover:shadow-sm transition-all duration-200"
            >
              {/* Icône */}
              <div className="w-12 h-12 bg-blue-light rounded-lg flex items-center justify-center text-2xl mb-5">
                {v.icon}
              </div>

              <h3 className="font-display font-bold text-[1.05rem] uppercase tracking-[0.03em] text-ink leading-tight mb-3">
                {v.title}
              </h3>
              <p className="text-[0.84rem] text-ink-2 leading-[1.65]">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — LE GARAGE (localisation)
// ══════════════════════════════════════════════════════════════════════════════

function GarageSection() {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Texte */}
        <div>
          <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
            Le garage
          </p>
          <h2 className="font-display font-black text-h2 uppercase text-ink mb-6 leading-none">
            Un emplacement pensé pour vous simplifier la vie.
          </h2>
          <div className="space-y-4 text-body text-ink-2 leading-[1.7] mb-8">
            <p>
              Avenue de Béthusy 27, à l&apos;entrée de Lausanne. Des places de parking disponibles sur place — un avantage concret dans une ville où se garer coûte du temps.
            </p>
            <p>
              Accessible en voiture comme en transport public. Pratique pour déposer le véhicule le matin et reprendre votre journée.
            </p>
          </div>

          {/* Infos pratiques */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg" aria-hidden>📍</span>
              <div>
                <p className="text-[0.88rem] font-semibold text-ink">Garage de Béthusy-Beaumont</p>
                <p className="text-[0.82rem] text-ink-2">Avenue de Béthusy 27 · 1005 Lausanne</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg" aria-hidden>🅿️</span>
              <p className="text-[0.82rem] text-ink-2">Parking gratuit sur place</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg" aria-hidden>🚌</span>
              <p className="text-[0.82rem] text-ink-2">Accessible en transports publics</p>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.8!2d6.643!3d46.523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenue+de+B%C3%A9thusy+27%2C+1005+Lausanne!5e0!3m2!1sfr!2sch!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation du Garage de Béthusy-Beaumont — Avenue de Béthusy 27, 1005 Lausanne"
          />
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — CTA BAS DE PAGE
// ══════════════════════════════════════════════════════════════════════════════

function CtaBottom() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue to-blue-dark py-16 md:py-20">
      {/* Cercle décoratif */}
      <div
        className="absolute -top-[20%] -right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden
      />

      <div className="wrap relative z-10 text-center">
        <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] uppercase text-white leading-none mb-4">
          Envie de savoir si on peut vous aider ?
        </h2>
        <p className="text-[0.92rem] text-white/70 leading-relaxed max-w-[56ch] mx-auto mb-8">
          Appelez, écrivez, ou passez directement. On prend cinq minutes pour écouter ce que vous avez — et vous dire ce qu&apos;on peut faire.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="secondary" size="lg" as="a" href="/contact" className="bg-white border-white text-ink hover:bg-blue-light hover:text-blue hover:border-blue-light">
            Nous contacter
          </Button>
          <Button variant="ghost" size="lg" as="a" href="/contact#devis" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Demander un devis
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE À PROPOS
// ══════════════════════════════════════════════════════════════════════════════

export default function AProposPage() {
  return (
    <>
      <HeroAPropos />
      <HistoireSection />
      <EquipeSection />
      <ValeursSection />
      <GarageSection />
      <CtaBottom />
    </>
  )
}
