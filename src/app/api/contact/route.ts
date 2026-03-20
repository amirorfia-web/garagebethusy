import { NextRequest, NextResponse } from 'next/server'

// ── Destinataire des emails de contact ──────────────────────────────────────
const TO_EMAIL = 'alexfrulloni@garagebethusy.com'
const FROM_NAME = 'Garage Béthusy — Site web'

// ── POST — Recevoir le formulaire de contact ────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prenom, nom, email, telephone, prestation, vehicule, message } = body

    // Validation basique
    if (!prenom || !nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants (prénom, nom, email, message).' },
        { status: 400 },
      )
    }

    // Construire le contenu de l'email
    const subject = `[Site web] Demande de ${prenom} ${nom}${prestation ? ` — ${prestation}` : ''}`
    const text = [
      `Nouvelle demande depuis le site web du Garage Béthusy`,
      ``,
      `Nom : ${prenom} ${nom}`,
      `Email : ${email}`,
      telephone ? `Téléphone : ${telephone}` : null,
      prestation ? `Prestation : ${prestation}` : null,
      vehicule ? `Véhicule : ${vehicule}` : null,
      ``,
      `Message :`,
      message,
      ``,
      `---`,
      `Envoyé depuis garagebethusy.com`,
    ]
      .filter((line) => line !== null)
      .join('\n')

    // ── Envoi via Resend (si clé API configurée) ──────────────────────────
    const resendKey = process.env.RESEND_API_KEY

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: `${FROM_NAME} <contact@garagebethusy.com>`,
          to: TO_EMAIL,
          subject,
          text,
          reply_to: email,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('[contact] Resend error:', err)
        return NextResponse.json({ error: 'Erreur lors de l\'envoi.' }, { status: 500 })
      }

      return NextResponse.json({ success: true, method: 'resend' })
    }

    // ── Fallback : mailto link (pas d'API mail configurée) ────────────────
    // On log quand même côté serveur pour ne pas perdre la demande
    console.log('═══════════════════════════════════════════')
    console.log('[contact] Nouvelle demande de contact')
    console.log('[contact] Destinataire:', TO_EMAIL)
    console.log('[contact] Sujet:', subject)
    console.log(text)
    console.log('═══════════════════════════════════════════')

    return NextResponse.json({
      success: true,
      method: 'logged',
      note: 'Pas de clé RESEND_API_KEY — email loggé côté serveur. Configurez RESEND_API_KEY pour l\'envoi réel.',
    })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
