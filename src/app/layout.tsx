import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/CookieConsent'
import { GARAGE } from '@/data/contacts'
// WhatsApp sticky supprimé — pas de numéro général unique
import './globals.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: GARAGE.name,
  legalName: GARAGE.company,
  url: 'https://www.garagebethusy.com',
  telephone: GARAGE.phone,
  email: GARAGE.email,
  foundingDate: '2006',
  description:
    'Garage indépendant à Lausanne, toutes marques. Mécanique, carrosserie, pneus, vitrage. Devis transparent, délais tenus.',
  image: 'https://www.garagebethusy.com/images/logo-gb.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: GARAGE.address,
    addressLocality: 'Lausanne',
    postalCode: '1005',
    addressRegion: 'VD',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.521685,
    longitude: 6.646039,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '07:30',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '13:30',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '07:30',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '13:30',
      closes: '16:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    bestRating: '5',
    ratingCount: '50',
  },
  priceRange: 'CHF',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Lausanne',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations garage',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mécanique & Entretien' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carrosserie & Peinture' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pneus & Géométrie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pare-brise & Vitrage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gardiennage & Stockage' } },
    ],
  },
  sameAs: [GARAGE.googleReviewsUrl],
}

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Garage Béthusy - AFGP Sàrl — Mécanique & Carrosserie à Lausanne depuis 2006',
    template: '%s | Garage Béthusy - AFGP Sàrl',
  },
  description:
    "Garage indépendant à Lausanne, toutes marques. Mécanique, carrosserie, pneus, vitrage. Devis transparent, délais tenus. AFGP Sàrl — Avenue de Béthusy 27.",
  keywords: [
    'garage lausanne',
    'mécanique lausanne',
    'carrosserie lausanne',
    'pneus lausanne',
    'voiture occasion lausanne',
    'AFGP Sàrl',
    'Béthusy',
  ],
  openGraph: {
    siteName: 'Garage Béthusy - AFGP Sàrl',
    locale: 'fr_CH',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
