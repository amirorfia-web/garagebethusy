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
  return (
    <form
      id="devis"
      className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO: intégrer l'envoi réel (API route, email, etc.)
        alert('Formulaire envoyé — merci ! Nous vous répondons sous 2h.')
      }}
    >
      <h2 className="font-display font-black text-h3 uppercase text-ink mb-2 leading-none">
        Formulaire de contact
      </h2>
      <p className="text-body-sm text-ink-2 leading-[1.65] mb-8">
        Pour une question, une demande d&apos;information, ou un devis — on vous répond dans les 2 heures ouvrées.
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

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <Button variant="primary" size="lg">
            Envoyer — réponse sous 2h
          </Button>
          <p className="text-[0.72rem] text-ink-3 leading-[1.5]">
            Vos données sont utilisées uniquement pour vous répondre. Aucun démarchage commercial.
          </p>
        </div>
      </div>
    </form>
  )
}
