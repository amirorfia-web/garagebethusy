'use client'

import React from 'react'
import Link from 'next/link'
import Script from 'next/script'

const GA_ID = 'G-HF43RKDHTB'
const CONSENT_KEY = 'gb-cookie-consent'

type Consent = 'accepted' | 'refused' | null

export default function CookieConsent() {
  const [consent, setConsent] = React.useState<Consent>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent
    if (stored === 'accepted' || stored === 'refused') {
      setConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem(CONSENT_KEY, 'refused')
    setConsent('refused')
    setVisible(false)
  }

  return (
    <>
      {/* Google Analytics — chargé uniquement si consentement accepté */}
      {consent === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Bannière de consentement */}
      {visible && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
          <div className="mx-auto max-w-2xl bg-ink text-white rounded-xl shadow-2xl p-5 sm:p-6 border border-white/10">
            <p className="text-[0.85rem] leading-relaxed text-white/80 mb-4">
              Ce site utilise des cookies d&apos;analyse (Google Analytics) pour comprendre comment
              les visiteurs utilisent le site. Aucune donnée n&apos;est vendue ou partagée à des
              fins publicitaires.{' '}
              <Link href="/politique-confidentialite" className="underline text-white hover:text-blue transition-colors">
                Politique de confidentialit&eacute;
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={accept}
                className="px-5 py-2.5 bg-blue text-white text-sm font-semibold rounded-lg hover:bg-blue/90 transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={refuse}
                className="px-5 py-2.5 bg-white/10 text-white/80 text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
