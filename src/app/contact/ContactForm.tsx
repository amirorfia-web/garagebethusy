'use client'

import React from 'react'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import FormTextarea from '@/components/ui/FormTextarea'
import Button from '@/components/ui/Button'

const PRESTATIONS = [
  { value: 'mecanique',   label: 'Mécanique' },
  { value: 'carrosserie', label: 'Carrosserie' },
  { value: 'pneus',       label: 'Pneus' },
  { value: 'vitrage',     label: 'Vitrage' },
  { value: 'gardiennage', label: 'Gardiennage' },
  { value: 'occasion',    label: 'Véhicule d\'occasion' },
  { value: 'autre',       label: 'Autre' },
]

export default function ContactForm() {
  const [sending, setSending] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      prenom: (form.elements.namedItem('prenom') as HTMLInputElement).value,
      nom: (form.elements.namedItem('nom') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telephone: (form.elements.namedItem('telephone') as HTMLInputElement).value,
      prestation: (form.elements.namedItem('prestation') as HTMLSelectElement).value,
      vehicule: (form.elements.namedItem('vehicule') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Erreur lors de l\'envoi')
      }

      setSent(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div id="devis" className="bg-white border border-green-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0E9F6E" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="font-display font-black text-xl uppercase text-ink mb-2">Message envoyé !</h3>
        <p className="text-body-sm text-ink-2">Merci pour votre message. Nous vous répondons dans les meilleurs délais.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm text-blue hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form
      id="devis"
      className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="font-display font-black text-h3 uppercase text-ink mb-2 leading-none">
        Formulaire de contact
      </h2>
      <p className="text-body-sm text-ink-2 leading-[1.65] mb-8">
        Pour une question, une demande d&apos;information, ou un devis — on vous répond dans les meilleurs délais.
      </p>

      <div className="space-y-5">
        {/* Ligne 1 : Prénom / Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Prénom"
            name="prenom"
            type="text"
            placeholder="Votre prénom"
            required
          />
          <FormInput
            label="Nom"
            name="nom"
            type="text"
            placeholder="Votre nom"
            required
          />
        </div>

        {/* Ligne 2 : Email / Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="votre@email.ch"
            required
          />
          <FormInput
            label="Téléphone"
            name="telephone"
            type="tel"
            placeholder="+41 79 000 00 00"
          />
        </div>

        {/* Ligne 3 : Prestation / Véhicule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Prestation concernée"
            name="prestation"
            options={PRESTATIONS}
            placeholder="Choisir une prestation…"
          />
          <FormInput
            label="Marque et modèle du véhicule"
            name="vehicule"
            type="text"
            placeholder="Ex: VW Golf VII 1.4 TSI"
          />
        </div>

        {/* Message */}
        <FormTextarea
          label="Votre message"
          name="message"
          placeholder="Décrivez votre besoin, le problème rencontré, ou toute information utile…"
          rows={5}
          required
        />

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <Button variant="primary" size="lg" disabled={sending}>
            {sending ? 'Envoi en cours…' : 'Envoyer'}
          </Button>
          <p className="text-[0.72rem] text-ink-3 leading-[1.5]">
            Vos données sont utilisées uniquement pour vous répondre. Aucun démarchage commercial.
          </p>
        </div>
      </div>
    </form>
  )
}
