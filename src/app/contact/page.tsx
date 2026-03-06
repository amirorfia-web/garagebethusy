import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import WhatsAppContact from '@/components/ui/WhatsAppContact'
import ContactForm from './ContactForm'
import { GARAGE, TEAM, waLink, phoneLink } from '@/data/contacts'

export const metadata: Metadata = {
  title: 'Contact — Devis, Rendez-vous & WhatsApp · Lausanne',
  description:
    'Contactez le Garage de Béthusy-Beaumont à Lausanne. Formulaire, WhatsApp direct avec les associés, horaires et adresse. Réponse sous 2h.',
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════════════════════

function HeroContact() {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
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
            Parlez-nous
          </div>

          {/* Titre */}
          <h1 className="font-display font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] uppercase text-ink mb-6 tracking-[-0.01em]">
            On vous répond.<br />
            <span className="text-blue">
              Directement.
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-body-lg text-ink-2 leading-[1.75] max-w-[54ch]">
            Pas de hotline, pas de formulaire qui disparaît dans la nature. Trois associés joignables, une réponse dans la journée.
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — INFORMATIONS PRATIQUES + HORAIRES
// ══════════════════════════════════════════════════════════════════════════════

const HORAIRES = [
  { jour: 'Lundi – Jeudi', matin: '7h30 – 12h00', aprem: '13h30 – 18h00' },
  { jour: 'Vendredi',      matin: '7h30 – 12h00', aprem: '13h30 – 16h00' },
  { jour: 'Samedi – Dimanche', matin: 'Fermé',     aprem: '—' },
]

function InfosSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Colonne gauche : Adresse + Horaires */}
          <div>
            <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
              Informations pratiques
            </p>
            <h2 className="font-display font-black text-h2 uppercase text-ink mb-8 leading-none">
              Venez nous voir.
            </h2>

            {/* Adresse */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-lg" aria-hidden>📍</span>
                <div>
                  <p className="text-[0.95rem] font-semibold text-ink">Garage de Béthusy-Beaumont</p>
                  <p className="text-[0.88rem] text-ink-2">Avenue de Béthusy 27 · 1005 Lausanne</p>
                </div>
              </div>
              <p className="text-[0.82rem] text-ink-3 pl-8">
                Places de stationnement disponibles sur place. Accès facile depuis l&apos;entrée de Lausanne.
              </p>
            </div>

            {/* Téléphone */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <span className="text-lg" aria-hidden>📞</span>
                <div>
                  <p className="text-[0.95rem] font-semibold text-ink">Téléphone</p>
                  <a
                    href={phoneLink()}
                    className="text-[1.15rem] font-bold text-blue hover:underline"
                  >
                    {GARAGE.phone}
                  </a>
                  <p className="text-[0.78rem] text-ink-3 mt-1">
                    Disponible aux heures d&apos;ouverture
                  </p>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-[1rem] uppercase tracking-[0.05em] text-ink mb-4">
                Horaires d&apos;ouverture
              </h3>
              <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                {HORAIRES.map((h) => (
                  <div key={h.jour} className="flex items-center justify-between px-4 py-3 text-[0.85rem]">
                    <span className="font-medium text-ink">{h.jour}</span>
                    <span className="text-ink-2">
                      {h.matin}{h.aprem !== '—' ? ` / ${h.aprem}` : ''}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[0.75rem] text-ink-3 mt-3">
                Pour les urgences en dehors des horaires, contactez-nous sur WhatsApp — on fait notre possible.
              </p>
            </div>
          </div>

          {/* Colonne droite : Map */}
          <div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.8!2d6.643!3d46.523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenue+de+B%C3%A9thusy+27%2C+1005+Lausanne!5e0!3m2!1sfr!2sch!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation du Garage de Béthusy-Beaumont"
              />
            </div>
            <Button variant="ghost" as="a" href="https://www.google.com/maps/search/?api=1&query=Avenue+de+Béthusy+27+1005+Lausanne" target="_blank">
              Ouvrir dans Google Maps →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — CONTACTS WHATSAPP
// ══════════════════════════════════════════════════════════════════════════════

function WhatsAppSection() {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
          WhatsApp
        </p>
        <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
          Écrivez directement à l&apos;un des associés.
        </h2>
        <p className="text-body-sm text-ink-2 leading-[1.65]">
          Chacun répond personnellement. Pas d&apos;intermédiaire, pas de délai inutile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEAM.map((member) => (
          <WhatsAppContact
            key={member.name}
            name={member.fullName}
            role={member.role}
            phone={member.phoneRaw}
            message={member.waMessage}
          />
        ))}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — FORMULAIRE
// ══════════════════════════════════════════════════════════════════════════════

function FormulaireSection() {
  return (
    <section className="bg-white border-y border-border py-20 md:py-28">
      <div className="wrap">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — FAQ
// ══════════════════════════════════════════════════════════════════════════════

interface FaqItem {
  q: string
  a: string
}

interface FaqCategory {
  title: string
  items: FaqItem[]
}

const FAQ_DATA: FaqCategory[] = [
  {
    title: 'Rendez-vous & Disponibilité',
    items: [
      {
        q: 'Comment prendre rendez-vous ?',
        a: 'Directement via le formulaire en ligne, par WhatsApp auprès de l\'un des associés, ou par téléphone pendant les heures d\'ouverture. Pour les interventions simples (pneus, vidange, batterie), on peut souvent vous accueillir rapidement.',
      },
      {
        q: 'Combien de temps à l\'avance faut-il réserver ?',
        a: 'Pour un entretien courant, 2 à 5 jours ouvrés suffisent en général. Pour une carrosserie ou une intervention lourde, comptez une semaine pour que nous puissions planifier correctement.',
      },
      {
        q: 'Puis-je déposer mon véhicule le matin et le reprendre le soir ?',
        a: 'Oui, c\'est notre mode de fonctionnement habituel pour la plupart des interventions. On vous appelle dès que le véhicule est prêt, et on vous confirme l\'heure de restitution à la prise en charge.',
      },
    ],
  },
  {
    title: 'Devis & Tarifs',
    items: [
      {
        q: 'Le devis est-il payant ?',
        a: 'Un devis technique (diagnostic approfondi) est facturé à partir de CHF 100.–. Ce montant est déduit de la facture si vous confiez les travaux au garage. Pour les demandes simples (montage de pneus, remplacement de batterie, etc.), le prix est indiqué directement, sans frais de devis.',
      },
      {
        q: 'Le prix peut-il changer après le devis ?',
        a: 'Non — sauf si on découvre, une fois le véhicule ouvert, quelque chose qui n\'était pas visible lors du diagnostic. Dans ce cas, on vous appelle avant de continuer. Vous décidez. Jamais de surprise sur la facture.',
      },
      {
        q: 'Combien coûte le montage de pneus ?',
        a: 'À partir de CHF 25.– par pneu (montage seul) ou CHF 50.– par roue complète (jante + pneu). Le prix peut varier selon les dimensions.',
      },
    ],
  },
  {
    title: 'Prestations',
    items: [
      {
        q: 'Travaillez-vous sur toutes les marques ?',
        a: 'Oui — toutes marques, toutes origines. Européennes, asiatiques, américaines.',
      },
      {
        q: 'Proposez-vous le remplacement de pare-brise ?',
        a: 'Oui. Nous remplaçons tous types de vitrages — pare-brise, vitres latérales, lunette arrière. Si votre assurance couvre le remplacement, nous pouvons vous aider dans les démarches.',
      },
      {
        q: 'Faites-vous de la carrosserie ?',
        a: 'Oui, atelier carrosserie complet : réparation, peinture teintée en atelier, débosselage sans peinture. Devis gratuit sur présentation du véhicule ou sur photos.',
      },
      {
        q: 'Proposez-vous le gardiennage de pneus entre saisons ?',
        a: 'Oui. Stockage sécurisé entre saisons. Retrait et repose inclus à chaque changement.',
      },
    ],
  },
  {
    title: 'Pratique',
    items: [
      {
        q: 'Y a-t-il du parking sur place ?',
        a: 'Oui — des places sont disponibles directement devant le garage.',
      },
      {
        q: 'Travaillez-vous avec les entreprises ?',
        a: 'Oui. Flottes de véhicules, entretiens réguliers, devis dédiés. Contactez-nous pour discuter d\'un partenariat.',
      },
      {
        q: 'Proposez-vous le lavage du véhicule ?',
        a: 'Un lavage intérieur et extérieur est offert avec tout entretien réalisé dans notre garage.',
      },
    ],
  },
]

function FaqSection() {
  return (
    <section className="wrap py-20 md:py-28" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-eyebrow font-bold tracking-[0.15em] uppercase text-blue mb-2">
            FAQ
          </p>
          <h2 className="font-display font-black text-h2 uppercase text-ink mb-3 leading-none">
            Questions fréquentes
          </h2>
          <p className="text-body-sm text-ink-2 leading-[1.65]">
            Les réponses aux questions qu&apos;on nous pose le plus souvent — pour vous éviter un appel inutile.
          </p>
        </div>

        <div className="space-y-10">
          {FAQ_DATA.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-display font-bold text-[1rem] uppercase tracking-[0.05em] text-ink mb-4 pb-2 border-b-2 border-blue/20">
                {cat.title}
              </h3>
              <div className="divide-y divide-border">
                {cat.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer select-none">
                      <span className="text-[0.92rem] font-semibold text-ink leading-[1.4] group-open:text-blue transition-colors">
                        {item.q}
                      </span>
                      <svg
                        className="w-4 h-4 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-[0.85rem] text-ink-2 leading-[1.65] pb-4 pr-8">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
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
      <div
        className="absolute -top-[20%] -right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden
      />

      <div className="wrap relative z-10 text-center">
        <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] uppercase text-white leading-none mb-4">
          Vous n&apos;avez pas trouvé ce que vous cherchez ?
        </h2>
        <p className="text-[0.92rem] text-white/70 leading-relaxed max-w-[56ch] mx-auto mb-8">
          Appelez-nous directement ou écrivez sur WhatsApp. On est là pour répondre — pas pour faire patienter.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="secondary" size="lg" as="a" href={phoneLink()} className="bg-white border-white text-ink hover:bg-blue-light hover:text-blue hover:border-blue-light">
            Appeler le garage
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
// PAGE CONTACT
// ══════════════════════════════════════════════════════════════════════════════

export default function ContactPage() {
  return (
    <>
      <HeroContact />
      <InfosSection />
      <WhatsAppSection />
      <FormulaireSection />
      <FaqSection />
      <CtaBottom />
    </>
  )
}
