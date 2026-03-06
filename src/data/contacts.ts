// ══════════════════════════════════════════════════════════════════════════════
// CONTACTS — Source unique de vérité pour tous les numéros et coordonnées
// Modifiez uniquement ce fichier pour mettre à jour les contacts sur tout le site
// ══════════════════════════════════════════════════════════════════════════════

export const GARAGE = {
  name: 'Garage de Béthusy-Beaumont',
  company: 'AFGP Sàrl',
  address: 'Avenue de Béthusy 27',
  city: '1005 Lausanne',
  country: 'Suisse',
  since: 2006,
  /** Numéro général du garage (ligne fixe) */
  phone: '+41 21 312 29 26',
  phoneRaw: '41213122926',
  /** Email général */
  email: 'info@garagebethusy.com',
  /** Google Maps */
  mapsUrl: 'https://maps.app.goo.gl/YOUR_MAP_LINK',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.5!2d6.6434!3d46.5197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c2e3b1e3b3b3b%3A0x1234567890abcdef!2sAv.%20de%20B%C3%A9thusy%2027%2C%201005%20Lausanne!5e0!3m2!1sfr!2sch!4v1700000000000!5m2!1sfr!2sch',
  /** Google My Business */
  googleReviewsUrl: 'https://g.page/garage-bethusy/review',
  /** AutoScout24 */
  autoscoutUrl: 'https://www.autoscout24.ch',
  /** Horaires */
  hours: [
    { days: 'Lun–Jeu', time: '7h30–12h / 13h30–18h' },
    { days: 'Vendredi', time: '7h30–12h / 13h30–16h' },
    { days: 'Sam–Dim', time: 'Fermé' },
  ],
} as const

export interface TeamMember {
  name: string
  fullName: string
  role: string
  phone: string
  phoneRaw: string
  waMessage: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Alex',
    fullName: 'Alessandro',
    role: 'Fondateur & Associé',
    phone: '+41 79 129 55 91',
    phoneRaw: '41791295591',
    waMessage: 'Bonjour Alex, je vous contacte depuis le site du garage.',
  },
  {
    name: 'Valon',
    fullName: 'Valon',
    role: 'Associé',
    phone: '+41 79 000 00 01',
    phoneRaw: '41790000001',
    waMessage: 'Bonjour Valon, je vous contacte depuis le site du garage.',
  },
  {
    name: 'Brah',
    fullName: 'Brah',
    role: 'Associé',
    phone: '+41 79 000 00 02',
    phoneRaw: '41790000002',
    waMessage: 'Bonjour Brah, je vous contacte depuis le site du garage.',
  },
]

/** Lien WhatsApp pour un membre de l'équipe */
export function waLink(member: TeamMember, customMessage?: string): string {
  const msg = encodeURIComponent(customMessage ?? member.waMessage)
  return `https://wa.me/${member.phoneRaw}?text=${msg}`
}

/** Lien tel: pour le numéro général */
export function phoneLink(): string {
  return `tel:${GARAGE.phone.replace(/\s/g, '')}`
}

/** Lien mailto: pour l'email du garage */
export function emailLink(subject?: string, body?: string): string {
  let link = `mailto:${GARAGE.email}`
  const params: string[] = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  if (params.length > 0) link += `?${params.join('&')}`
  return link
}

/** Lien WhatsApp pour un véhicule spécifique */
export function waVehicleLink(make: string, model: string, year: number, km: number, price: number): string {
  const member = TEAM[0]
  const msg = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par la ${make} ${model} (${year}, ${new Intl.NumberFormat('fr-CH').format(km)} km) à ${new Intl.NumberFormat('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 }).format(price)} vue sur votre site. Est-elle toujours disponible ?`
  )
  return `https://wa.me/${member.phoneRaw}?text=${msg}`
}

/** Lien email pour un véhicule spécifique */
export function emailVehicleLink(make: string, model: string, year: number): string {
  return emailLink(
    `Demande pour ${make} ${model} ${year}`,
    `Bonjour,\n\nJe suis intéressé(e) par la ${make} ${model} (${year}) que j'ai vue sur votre site.\n\nMerci de me recontacter.\n\nCordialement`
  )
}
