import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ServiceNav from '@/components/ui/ServiceNav'
import { TEAM, GARAGE, waLink, phoneLink } from '@/data/contacts'

export const metadata: Metadata = {
  title: 'Nos prestations — Mécanique, Carrosserie, Pneus & Vitrage · Lausanne',
  description:
    'Révision, freins, distribution, carrosserie, peinture, pneus, pare-brise — toutes marques à Lausanne. Devis gratuit. Garage de Béthusy-Beaumont, AFGP Sàrl.',
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════════════════════

function HeroServices() {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Bande bleue subtile en fond */}
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
            Ce qu&apos;on fait
          </div>

          {/* Titre */}
          <h1 className="font-display font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] uppercase text-ink mb-6 tracking-[-0.01em]">
            Des prestations complètes.<br />
            <span className="text-blue">
              Une équipe qui en répond.
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-body-lg text-ink-2 leading-[1.75] mb-6 max-w-[58ch]">
            Du changement de plaquettes à la remise en peinture intégrale — on prend en charge votre véhicule du début à la fin, avec un interlocuteur unique et un devis clair avant chaque intervention.
          </p>

          {/* Badges info */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-2 text-[0.8rem] text-ink-2 bg-white border border-border rounded-md px-4 py-2.5 shadow-xs">
              <span aria-hidden>🚗</span>
              Véhicule de courtoisie disponible pendant votre réparation.
            </div>
            <div className="inline-flex items-center gap-2 text-[0.8rem] text-ink-2 bg-white border border-border rounded-md px-4 py-2.5 shadow-xs">
              <span aria-hidden>🏢</span>
              Ouvert aux entreprises — flottes, devis dédiés.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — ENGAGEMENT (devis)
// ══════════════════════════════════════════════════════════════════════════════

function EngagementSection() {
  return (
    <section className="bg-white border-y border-border py-14 md:py-20">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
              Notre engagement
            </p>
            <h2 className="font-display font-black text-h2 uppercase text-ink mb-5 leading-none">
              Un devis, c&apos;est un engagement.
            </h2>
            <div className="space-y-4 text-body text-ink-2 leading-[1.7]">
              <p>
                Avant chaque intervention, vous recevez un prix ferme. Pas d&apos;estimation approximative qui gonfle en cours de route. Si une surprise apparaît une fois le véhicule ouvert, on vous appelle avant de continuer — vous décidez.
              </p>
              <p>
                C&apos;est notre façon de travailler depuis le premier jour.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
            <Image
              src="/images/devis-client.png"
              alt="Mécanicien préparant un devis avec le client dans l'atelier"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SÉPARATEUR VISUEL ENTRE CATÉGORIES — bannière photo pleine largeur
// ══════════════════════════════════════════════════════════════════════════════

interface CategoryBannerProps {
  icon: string
  label: string
  imageSrc?: string
  /** Fallback gradient when no image is set */
  gradient?: string
  dark?: boolean
}

function CategoryBanner({ icon, label, imageSrc, gradient, dark }: CategoryBannerProps) {
  // With image: full photo banner with dark overlay
  if (imageSrc) {
    return (
      <div className="relative h-[160px] md:h-[200px] overflow-hidden">
        {/* Photo background */}
        <Image
          src={imageSrc}
          alt={label}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/40" />
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="wrap flex items-center gap-4">
            <span className="text-3xl md:text-4xl drop-shadow-lg" aria-hidden>{icon}</span>
            <div>
              <span className="font-display font-black text-[clamp(1.3rem,3vw,2rem)] uppercase tracking-[0.06em] text-white drop-shadow-md">
                {label}
              </span>
              <div className="w-12 h-[3px] bg-blue rounded-full mt-2" />
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F8F9FC] to-transparent" />
      </div>
    )
  }

  // Without image: colored placeholder banner ready for future photos
  const bg = gradient || 'linear-gradient(135deg, #0d1529 0%, #1a2240 40%, #1649C8 100%)'
  return (
    <div
      className="relative h-[120px] md:h-[150px] overflow-hidden"
      style={{ background: bg }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />
      {/* Decorative circle */}
      <div
        className="absolute -right-[5%] -top-[30%] w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: 'rgba(22,73,200,0.15)' }}
        aria-hidden
      />
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="wrap flex items-center gap-4">
          <span className="text-3xl md:text-4xl drop-shadow-lg" aria-hidden>{icon}</span>
          <div>
            <span className="font-display font-black text-[clamp(1.3rem,3vw,2rem)] uppercase tracking-[0.06em] text-white drop-shadow-md">
              {label}
            </span>
            <div className="w-12 h-[3px] bg-blue-glow rounded-full mt-2" />
          </div>
        </div>
      </div>
      {/* Bottom fade into page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F8F9FC] to-transparent" />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT DE PRESTATION (sous-service)
// ══════════════════════════════════════════════════════════════════════════════

interface ServiceItemProps {
  title: string
  description: string
  price?: string
}

function ServiceItem({ title, description, price }: ServiceItemProps) {
  return (
    <div className="bg-white border border-border rounded-lg p-5 shadow-xs hover:shadow-sm hover:border-blue/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h4 className="font-display font-bold text-[0.95rem] uppercase tracking-[0.03em] text-ink leading-tight">
          {title}
        </h4>
        {price && (
          <span className="text-[0.75rem] font-bold text-blue bg-blue-light px-2.5 py-1 rounded-pill whitespace-nowrap">
            {price}
          </span>
        )}
      </div>
      <p className="text-[0.82rem] text-ink-2 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT LISTE DÉTAILLÉE (bullet list pliable)
// ══════════════════════════════════════════════════════════════════════════════

interface DetailListProps {
  items: string[]
}

function DetailList({ items }: DetailListProps) {
  return (
    <details className="group mt-6">
      <summary className="text-[0.8rem] font-bold text-blue cursor-pointer select-none inline-flex items-center gap-1.5 hover:text-blue-dark transition-colors">
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Voir toutes les prestations de cette catégorie
      </summary>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-[0.8rem] text-ink-2 leading-[1.6] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue/25"
          >
            {item}
          </li>
        ))}
      </ul>
    </details>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// EN-TÊTE DE SECTION (numérotée)
// ══════════════════════════════════════════════════════════════════════════════

interface ServiceSectionHeaderProps {
  number: string
  icon: string
  tag: string
  title: string
  chapeau: string
}

function ServiceSectionHeader({ number, icon, tag, title, chapeau }: ServiceSectionHeaderProps) {
  return (
    <div className="relative pb-6 mb-8">
      {/* Numéro décoratif */}
      <span
        aria-hidden
        className="absolute top-[-1.2rem] right-0 select-none pointer-events-none font-display font-black leading-none text-transparent text-[clamp(4rem,9vw,8rem)]"
        style={{ WebkitTextStroke: '1px #DDE3F0' }}
      >
        {number}
      </span>

      {/* Tag */}
      <p className="text-[0.68rem] font-bold tracking-[0.15em] uppercase text-blue mb-2 relative z-[1]">
        <span aria-hidden className="mr-1.5">{icon}</span>
        {tag}
      </p>

      {/* Titre */}
      <h2 className="font-display font-black uppercase tracking-[0.02em] text-ink text-[clamp(1.8rem,3.5vw,2.6rem)] leading-none mb-4 relative z-[1]">
        {title}
      </h2>

      {/* Chapeau */}
      <p className="text-[0.88rem] text-ink-2 leading-[1.65] max-w-[62ch] relative z-[1]">
        {chapeau}
      </p>

      {/* Barre bleue */}
      <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-blue rounded-full" />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2b — INCLUS DANS CHAQUE ENTRETIEN (bien visible en haut)
// ══════════════════════════════════════════════════════════════════════════════

function InclusEntretienBand() {
  return (
    <section className="wrap py-10 md:py-14">
      <div className="bg-gradient-to-r from-blue-light to-blue-glow border border-blue/15 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-3xl shadow-xs shrink-0">
          ✨
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-[1.15rem] uppercase tracking-[0.03em] text-ink mb-1">
            Inclus dans chaque entretien
          </h3>
          <p className="text-[0.9rem] text-ink-2 leading-[1.65]">
            <strong>Lavage intérieur et extérieur offert</strong> avec tout entretien réalisé dans notre garage. Et pendant la réparation, un <strong>véhicule de courtoisie</strong> est à votre disposition sur demande.
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — MÉCANIQUE & ENTRETIEN
// ══════════════════════════════════════════════════════════════════════════════

const MECANIQUE_DETAILS = [
  'Vidange moteur (huile + filtre)',
  'Remplacement filtres (air, habitacle, carburant)',
  'Remplacement bougies d\'allumage',
  'Remplacement courroie accessoires (alternateur, direction assistée, climatisation)',
  'Remplacement rotules, biellettes, silent-blocs',
  'Remplacement roulements de roue',
  'Remplacement joints de cardan / soufflets',
  'Remplacement pompe à eau',
  'Remplacement thermostat',
  'Remplacement radiateur / faisceau de refroidissement',
  'Remplacement joint de culasse',
  'Révision ou remplacement boîte de vitesses (manuelle / automatique)',
  'Remplacement pompe à huile',
  'Remplacement vase d\'expansion',
  'Remplacement plaquettes de frein (AV / AR)',
  'Remplacement disques de frein (AV / AR)',
  'Purge et remplacement liquide de frein',
  'Réparation système ABS / ESP',
  'Diagnostic électronique (lecture et effacement de codes OBD)',
  'Remplacement batterie (y compris batteries lithium / hybride)',
  'Remplacement alternateur',
  'Remplacement démarreur',
  'Remplacement capteurs (O2, ABS, pression, température…)',
  'Remplacement ou codage calculateurs',
  'Contrôle et recharge climatisation (fluide R134a / R1234yf)',
  'Remplacement compresseur de clim',
]

function MecaniqueSection() {
  return (
    <section className="wrap py-20 md:py-28" id="mecanique">
      <ServiceSectionHeader
        number="01"
        icon="🔧"
        tag="Mécanique & Entretien"
        title="L'entretien, c'est notre cœur de métier."
        chapeau="L'entretien régulier est le meilleur investissement que vous puissiez faire pour votre véhicule. On s'occupe de l'essentiel — avec rigueur, et sans vous faire remplacer ce qui n'en a pas besoin."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ServiceItem
          title="Révision complète"
          description="Vidange, filtres huile et habitacle, bougies, niveaux — tout ce qu'il faut pour rouler l'esprit tranquille."
        />
        <ServiceItem
          title="Freins"
          description="Contrôle de l'usure, remplacement des plaquettes et disques, purge du liquide de frein. On n'attend pas que ça grince pour agir."
        />
        <ServiceItem
          title="Distribution"
          description="Courroie ou chaîne de distribution : une intervention critique que beaucoup de garages sous-estiment. Nous la réalisons dans les délais constructeurs, avec les pièces d'origine ou équivalentes."
        />
        <ServiceItem
          title="Embrayage"
          description="Diagnostic précis, remplacement complet si nécessaire. Devis obligatoire — le prix varie selon le véhicule."
        />
        <ServiceItem
          title="Amortisseurs & liaisons au sol"
          description="Remplacement des amortisseurs, rotules, biellettes et Silent Blocs. Votre sécurité commence par le sol."
        />
        <ServiceItem
          title="Diagnostic électronique"
          description="Lecture et effacement des codes erreur, identification des pannes cachées. On ne remplace pas au hasard — on diagnostique d'abord."
        />
        <ServiceItem
          title="Batterie"
          description="Vérification de charge, remplacement toutes marques et technologies (AGM, EFB, lithium)."
        />
        <ServiceItem
          title="Climatisation"
          description="Contrôle du circuit, recharge en fluide frigorigène si nécessaire. Entretien conseillé tous les 2 ans."
        />
        <ServiceItem
          title="Boîte de vitesses"
          description="Vidange et remplacement de l'huile de boîte, manuelle ou automatique."
        />
        <ServiceItem
          title="Échappement"
          description="Remplacement partiel ou complet, selon l'état et la réglementation en vigueur."
        />
        <ServiceItem
          title="Courroie accessoires"
          description="Alternateur, direction assistée, climatisation — on remplace la courroie avant qu'elle vous laisse en plan."
        />
        <ServiceItem
          title="Préparation expertise MFK"
          description="On prépare votre véhicule pour le contrôle technique — diagnostic préalable, corrections ciblées, présentation en état."
        />
      </div>

      <DetailList items={MECANIQUE_DETAILS} />

      <div className="mt-8">
        <Button variant="primary" as="a" href="/contact#devis">
          Demander un devis mécanique
        </Button>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — CARROSSERIE & PEINTURE
// ══════════════════════════════════════════════════════════════════════════════

const CARROSSERIE_DETAILS = [
  'Réparation carrosserie (chocs, bosses, déformations)',
  'Débosselage sans peinture (PDR — Paintless Dent Repair)',
  'Retouche peinture (teinte localisée)',
  'Peinture complète (teinte totale)',
  'Remplacement d\'éléments de carrosserie (ailes, portières, pare-chocs…)',
  'Réparation ou remplacement pare-chocs (AV / AR)',
  'Protection peinture (film PPF, céramique)',
  'Anti-rouille / traitement des bas de caisse',
  'Traitement des creux et cavités (Dinitrol / équivalent)',
  'Nettoyage et réfection des joints de carrosserie',
  'Polissage et lustrage',
  'Reconditionnement phares (jaunissement)',
]

function CarrosserieSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28" id="carrosserie">
      <div className="wrap">
        <ServiceSectionHeader
          number="02"
          icon="🎨"
          tag="Carrosserie & Peinture"
          title="Un résultat invisible, c'est le meilleur résultat."
          chapeau="Un choc, une rayure, une déformation — ça arrive. Ce qui compte, c'est le résultat final. Notre atelier carrosserie travaille à la teinte exacte de votre véhicule, pour un rendu invisible."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ServiceItem
            title="Réparation carrosserie"
            description="Chocs, enfoncements, déformations — on redonne à votre carrosserie sa forme et son aspect d'origine."
          />
          <ServiceItem
            title="Peinture retouche"
            description="Intervention ciblée sur une zone abîmée, teinte préparée en atelier pour un résultat identique à l'original."
          />
          <ServiceItem
            title="Peinture complète"
            description="Remise en peinture intégrale du véhicule — préparation soignée, cabine de peinture, finition professionnelle."
          />
          <ServiceItem
            title="Débosselage sans peinture (PDR)"
            description="Pour les petits enfoncements sans altération de la peinture : une technique rapide et économique, sans passer par la cabine."
          />
          <ServiceItem
            title="Protection carrosserie"
            description="Traitement de surface, film de protection, préparation au vernissage."
          />
        </div>

        {/* Note tarifaire */}
        <div className="bg-blue-light border border-blue/15 rounded-md p-4 text-[0.82rem] text-ink-2 leading-[1.6] mb-4">
          <strong className="text-ink">Note tarifaire :</strong> Les prestations carrosserie font systématiquement l&apos;objet d&apos;un devis — le prix dépend de la surface, de la teinte et de l&apos;étendue des dommages. Devis gratuit, réponse sous 24h.
        </div>

        <DetailList items={CARROSSERIE_DETAILS} />

        <div className="mt-8">
          <Button variant="primary" as="a" href="/contact#devis">
            Demander un devis carrosserie
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — PNEUS & GÉOMÉTRIE
// ══════════════════════════════════════════════════════════════════════════════

const PNEUS_DETAILS = [
  'Montage et démontage de pneus — dès CHF 25.– / pneu',
  'Montage de roues complètes — dès CHF 50.– / roue',
  'Équilibrage de roues',
  'Permutation AV/AR (rotation des pneus)',
  'Géométrie (parallélisme 2 ou 4 roues)',
  'Remplacement de jantes (acier / alliage)',
  'Réparation de crevaison (bouchon / rustine)',
  'Stockage / gardiennage de roues saisonnières',
  'Retrait et repose des roues saisonnières',
]

function PneusSection() {
  return (
    <section className="wrap py-20 md:py-28" id="pneus">
      <ServiceSectionHeader
        number="03"
        icon="🛞"
        tag="Pneus & Géométrie"
        title="La base de votre sécurité — au sol."
        chapeau="Des pneus en bon état et une géométrie correcte — c'est la base de la sécurité routière, et l'une des meilleures façons de préserver vos freins et votre direction."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ServiceItem
          title="Montage / démontage de pneu"
          description="Toutes dimensions, toutes marques."
          price="Dès CHF 25.–/pneu"
        />
        <ServiceItem
          title="Montage de roue complète"
          description="Jante + pneu montés ensemble."
          price="Dès CHF 50.–/roue"
        />
        <ServiceItem
          title="Équilibrage"
          description="Inclus dans le montage ou réalisé séparément. Un équilibrage précis, c'est moins de vibrations et des pneus qui durent plus longtemps."
        />
        <ServiceItem
          title="Géométrie (parallélisme)"
          description="Contrôle et réglage de l'alignement des roues. Indispensable après un choc ou le remplacement d'éléments de direction."
        />
        <ServiceItem
          title="Permutation de pneus"
          description="Rotation pour une usure uniforme et une durée de vie prolongée."
        />
        <ServiceItem
          title="Gardiennage saisonnier"
          description="Stockage de vos jantes et pneus entre les saisons. Retrait et repose inclus — vous apportez votre voiture, on s'occupe du reste."
        />
      </div>

      <DetailList items={PNEUS_DETAILS} />

      <div className="mt-8">
        <Button variant="primary" as="a" href="/contact">
          Prendre rendez-vous pour les pneus
        </Button>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — PARE-BRISE & VITRAGE
// ══════════════════════════════════════════════════════════════════════════════

const VITRAGE_DETAILS = [
  'Remplacement pare-brise',
  'Réparation éclat / fissure de pare-brise (résine)',
  'Remplacement vitres latérales, lunette arrière',
  'Remplacement rétroviseurs (glace + boîtier)',
  'Dépose / repose lève-vitre électrique',
]

function VitrageSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28" id="vitrage">
      <div className="wrap">
        <ServiceSectionHeader
          number="04"
          icon="🪟"
          tag="Pare-brise & Vitrage"
          title="Sécurité et visibilité, sans compromis."
          chapeau="Un pare-brise fissuré ou un vitrage cassé, c'est un problème de sécurité — et souvent pris en charge par l'assurance. On intervient rapidement, avec des vitres adaptées à votre modèle."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ServiceItem
            title="Remplacement de pare-brise"
            description="Dépose et repose complète, calibrage des systèmes d'aide à la conduite si nécessaire (ADAS). Prise en charge assurance possible."
          />
          <ServiceItem
            title="Vitrages latéraux"
            description="Remplacement des vitres de portières et vitres coulissantes — toutes marques."
          />
          <ServiceItem
            title="Lunette arrière"
            description="Remplacement avec reconnexion du chauffage arrière."
          />
        </div>

        {/* Note pratique */}
        <div className="bg-blue-light border border-blue/15 rounded-md p-4 text-[0.82rem] text-ink-2 leading-[1.6] mb-4">
          <strong className="text-ink">Note pratique :</strong> Vérifiez votre police d&apos;assurance avant de nous contacter — beaucoup de contrats couvrent le remplacement du pare-brise sans franchise. Nous pouvons vous guider dans les démarches.
        </div>

        <DetailList items={VITRAGE_DETAILS} />

        <div className="mt-8">
          <Button variant="primary" as="a" href="/contact#devis">
            Demander un devis vitrage
          </Button>
        </div>
      </div>
    </section>
  )
}

// (Section motos supprimée — le garage ne fait plus de réparation moto)

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — GARDIENNAGE & STOCKAGE + INCLUS
// ══════════════════════════════════════════════════════════════════════════════

function GardiennageSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28" id="gardiennage">
      <div className="wrap">
        <ServiceSectionHeader
          number="06"
          icon="📦"
          tag="Gardiennage & Stockage"
          title="On prend soin de ce que vous nous confiez."
          chapeau="Changement de saison, séjour prolongé, véhicule de collection — on prend soin de ce que vous nous confiez."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <ServiceItem
            title="Stockage de roues et jantes"
            description="Vos pneus hiver ou été stockés dans un espace sécurisé entre deux saisons. Retrait et repose inclus à chaque changement."
          />
          <ServiceItem
            title="Gardiennage de véhicule"
            description="Sur demande et selon disponibilité."
          />
        </div>

        <div className="mt-6">
          <Button variant="ghost" as="a" href={phoneLink()}>
            Nous contacter pour le gardiennage
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — DÉPANNAGE
// ══════════════════════════════════════════════════════════════════════════════

function PanneSection() {
  return (
    <section className="wrap py-20 md:py-28" id="panne">
      <ServiceSectionHeader
        number="07"
        icon="📞"
        tag="En cas de panne"
        title="Un problème ? Appelez-nous."
        chapeau="Vous êtes en panne à Lausanne ou dans les environs ? Appelez-nous directement — on vous conseille par téléphone et on organise la suite ensemble : diagnostic, prise en charge au garage, ou orientation vers le bon interlocuteur."
      />

      <div className="bg-blue-light border border-blue/15 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 mb-6">
        <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-3xl shadow-xs shrink-0">
          📱
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-[1.1rem] uppercase tracking-[0.03em] text-ink mb-1">
            Le bon réflexe en cas de panne
          </h3>
          <p className="text-[0.88rem] text-ink-2 leading-[1.65]">
            Appelez-nous au <strong>{GARAGE.phone}</strong> ou contactez-nous sur WhatsApp. On évalue la situation avec vous et on vous dit quoi faire — pas de panique, pas de frais inutiles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ServiceItem
          title="Conseil téléphonique"
          description="On vous guide : est-ce que c'est roulable ? Faut-il couper le moteur ? Qu'est-ce qui peut attendre et qu'est-ce qui ne peut pas ?"
        />
        <ServiceItem
          title="Prise en charge au garage"
          description="Si votre véhicule peut être amené au garage, on le prend en charge pour un diagnostic rapide et une réparation dans les meilleurs délais."
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" as="a" href={phoneLink()}>
          Appeler le garage
        </Button>
        <Button variant="whatsapp" as="a" href={waLink(TEAM[0])} target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </Button>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — TARIFS INDICATIFS
// ══════════════════════════════════════════════════════════════════════════════

function TarifsSection() {
  return (
    <section className="bg-white border-y border-border py-14 md:py-20">
      <div className="wrap">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
            Tarifs indicatifs
          </p>
          <h2 className="font-display font-black text-h3 uppercase text-ink mb-3 leading-none">
            Quelques repères de prix
          </h2>
          <p className="text-body-sm text-ink-2 leading-[1.65]">
            Les prestations complexes (embrayage, distribution, carrosserie, etc.) nécessitent un devis — prix non affichés en ligne.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-blue-light">
              <span className="font-display font-bold text-[0.9rem] uppercase text-ink">Prestation</span>
              <span className="font-display font-bold text-[0.9rem] uppercase text-ink">Prix indicatif</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-white">
              <span className="text-[0.88rem] text-ink-2">Montage pneu (à l&apos;unité)</span>
              <span className="text-[0.88rem] font-bold text-blue">Dès CHF 25.–</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-white">
              <span className="text-[0.88rem] text-ink-2">Montage roue complète</span>
              <span className="text-[0.88rem] font-bold text-blue">Dès CHF 50.–</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-white">
              <span className="text-[0.88rem] text-ink-2">Devis technique</span>
              <span className="text-[0.88rem] font-bold text-blue">Dès CHF 100.–*</span>
            </div>
          </div>
          <p className="text-[0.75rem] text-ink-3 mt-3 text-center">
            * Remboursé si travaux effectués dans notre garage.
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — BLOC B2B (entreprises)
// ══════════════════════════════════════════════════════════════════════════════

function B2BSection() {
  return (
    <section className="wrap py-20 md:py-28" id="entreprises">
      <div className="bg-gradient-to-br from-ink to-[#1a2240] rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Cercle décoratif */}
        <div
          className="absolute -top-[15%] -right-[8%] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'rgba(22,73,200,0.12)' }}
          aria-hidden
        />

        <div className="relative z-10 max-w-2xl">
          <Badge variant="blue">Entreprises</Badge>
          <h2 className="font-display font-black text-[clamp(1.6rem,3vw,2.4rem)] uppercase text-white leading-none mt-4 mb-5">
            Vous gérez une flotte de véhicules ?
          </h2>
          <p className="text-[0.92rem] text-white/70 leading-[1.7] mb-8">
            Nous travaillons avec des entreprises lausannoises pour l&apos;entretien régulier de leurs véhicules professionnels. Devis dédiés, interlocuteur unique, facturation simplifiée.
          </p>
          <p className="text-[0.92rem] text-white/70 leading-[1.7] mb-8">
            Prenez contact pour discuter d&apos;un partenariat adapté à vos besoins.
          </p>
          <Button variant="primary" as="a" href="/contact#devis">
            Nous contacter pour un devis entreprise
          </Button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — CTA BAS DE PAGE
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
          Votre prestation n&apos;est pas listée ici ?
        </h2>
        <p className="text-[0.92rem] text-white/70 leading-relaxed max-w-[56ch] mx-auto mb-8">
          Appelez-nous ou écrivez-nous — si on peut s&apos;en occuper, on vous le dit. Si ce n&apos;est pas notre spécialité, on vous oriente vers le bon interlocuteur.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="secondary" size="lg" as="a" href="/contact#devis" className="bg-white border-white text-ink hover:bg-blue-light hover:text-blue hover:border-blue-light">
            Demander un devis
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
// PAGE SERVICES
// ══════════════════════════════════════════════════════════════════════════════

export default function ServicesPage() {
  return (
    <>
      <HeroServices />
      <ServiceNav />
      <EngagementSection />
      <InclusEntretienBand />

      {/* imageSrc — ajouter le chemin de la photo pour chaque catégorie */}
      <CategoryBanner icon="🔧" label="Mécanique & Entretien" imageSrc="/images/interieur-2.webp" />
      <MecaniqueSection />

      <CategoryBanner icon="🎨" label="Carrosserie & Peinture" imageSrc="/images/interieur-1.webp" />
      <CarrosserieSection />

      <CategoryBanner icon="🛞" label="Pneus & Géométrie" />
      <PneusSection />

      <CategoryBanner icon="🪟" label="Pare-brise & Vitrage" />
      <VitrageSection />

      <CategoryBanner icon="📦" label="Gardiennage & Stockage" />
      <GardiennageSection />

      <CategoryBanner icon="📞" label="En cas de panne" />
      <PanneSection />

      <TarifsSection />

      <CategoryBanner icon="🏢" label="Entreprises & Flottes" />
      <B2BSection />

      <CtaBottom />
    </>
  )
}
