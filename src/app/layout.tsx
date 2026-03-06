import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppSticky from '@/components/layout/WhatsAppSticky'
import './globals.css'

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
    default: 'Garage de Béthusy-Beaumont — Mécanique & Carrosserie à Lausanne depuis 2006',
    template: '%s | Garage Béthusy-Beaumont',
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
    siteName: 'Garage de Béthusy-Beaumont',
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
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppSticky />
      </body>
    </html>
  )
}
