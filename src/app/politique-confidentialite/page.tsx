import type { Metadata } from 'next'
import { GARAGE } from '@/data/contacts'

export const metadata: Metadata = {
  title: 'Politique de confidentialit\u00e9',
  description:
    'Politique de confidentialit\u00e9 et protection des donn\u00e9es du Garage B\u00e9thusy — conform\u00e9ment \u00e0 la Loi f\u00e9d\u00e9rale sur la protection des donn\u00e9es (nLPD).',
}

export default function PolitiqueConfidentialite() {
  return (
    <section className="wrap py-20 max-w-3xl mx-auto">
      <h1 className="font-display font-black text-h2 uppercase text-ink mb-2 leading-none">
        Politique de confidentialit&eacute;
      </h1>
      <p className="text-body-sm text-ink-2 mb-10">
        Derni&egrave;re mise &agrave; jour : avril 2026
      </p>

      <div className="prose prose-sm max-w-none text-ink-2 space-y-8">
        {/* 1. Responsable */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            1. Responsable du traitement
          </h2>
          <p>
            {GARAGE.company}<br />
            {GARAGE.address}<br />
            {GARAGE.city}, {GARAGE.country}<br />
            E-mail : <a href={`mailto:${GARAGE.email}`} className="text-blue hover:underline">{GARAGE.email}</a><br />
            T&eacute;l&eacute;phone : {GARAGE.phone}
          </p>
        </div>

        {/* 2. Base légale */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            2. Base l&eacute;gale
          </h2>
          <p>
            Le traitement de vos donn&eacute;es personnelles est r&eacute;gi par la Loi f&eacute;d&eacute;rale
            sur la protection des donn&eacute;es (LPD, RS 235.1) entr&eacute;e en vigueur le 1er septembre 2023,
            ainsi que son ordonnance (OPDo). Pour les visiteurs de l&rsquo;Espace &eacute;conomique europ&eacute;en,
            le R&egrave;glement g&eacute;n&eacute;ral sur la protection des donn&eacute;es (RGPD) s&rsquo;applique
            &eacute;galement.
          </p>
        </div>

        {/* 3. Données collectées */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            3. Donn&eacute;es collect&eacute;es
          </h2>
          <p className="mb-2">Nous collectons uniquement les donn&eacute;es n&eacute;cessaires &agrave; nos prestations :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Formulaire de contact :</strong> pr&eacute;nom, nom, adresse e-mail, num&eacute;ro de t&eacute;l&eacute;phone
              (facultatif), type de prestation, marque/mod&egrave;le du v&eacute;hicule, message.
            </li>
            <li>
              <strong>Donn&eacute;es de navigation :</strong> adresse IP (anonymis&eacute;e), type de navigateur,
              pages visit&eacute;es, dur&eacute;e de visite — via Google Analytics, uniquement avec votre consentement.
            </li>
          </ul>
        </div>

        {/* 4. Finalités */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            4. Finalit&eacute;s du traitement
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>R&eacute;pondre &agrave; vos demandes de contact et de devis.</li>
            <li>Am&eacute;liorer notre site web gr&acirc;ce aux statistiques anonymis&eacute;es de navigation.</li>
            <li>Respecter nos obligations l&eacute;gales.</li>
          </ul>
          <p className="mt-2">
            Vos donn&eacute;es ne sont <strong>jamais utilis&eacute;es &agrave; des fins de d&eacute;marchage
            commercial</strong> ni vendues &agrave; des tiers.
          </p>
        </div>

        {/* 5. Cookies */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            5. Cookies
          </h2>
          <p className="mb-2">Notre site utilise les cookies suivants :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-surface">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-ink">Cookie</th>
                  <th className="text-left px-3 py-2 font-semibold text-ink">Fournisseur</th>
                  <th className="text-left px-3 py-2 font-semibold text-ink">Finalit&eacute;</th>
                  <th className="text-left px-3 py-2 font-semibold text-ink">Dur&eacute;e</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-3 py-2">_ga, _ga_*</td>
                  <td className="px-3 py-2">Google Analytics</td>
                  <td className="px-3 py-2">Statistiques de visite anonymis&eacute;es</td>
                  <td className="px-3 py-2">2 ans</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2">gb-cookie-consent</td>
                  <td className="px-3 py-2">Garage B&eacute;thusy</td>
                  <td className="px-3 py-2">M&eacute;moriser votre choix de cookies</td>
                  <td className="px-3 py-2">localStorage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            Les cookies d&rsquo;analyse ne sont d&eacute;pos&eacute;s qu&rsquo;apr&egrave;s votre consentement
            explicite. Vous pouvez modifier votre choix &agrave; tout moment en supprimant les donn&eacute;es
            de votre navigateur.
          </p>
        </div>

        {/* 6. Sous-traitants */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            6. Sous-traitants et transfert de donn&eacute;es
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Vercel Inc.</strong> (USA) — H&eacute;bergement du site. Clauses contractuelles
              standard pour le transfert hors Suisse.
            </li>
            <li>
              <strong>Resend Inc.</strong> (USA) — Envoi des e-mails de contact. Clauses contractuelles
              standard.
            </li>
            <li>
              <strong>Google LLC</strong> (USA) — Google Analytics (avec anonymisation IP).
              Donn&eacute;es trait&eacute;es uniquement avec votre consentement.
            </li>
          </ul>
          <p className="mt-2">
            Conform&eacute;ment &agrave; l&rsquo;art. 16 LPD, les transferts vers les &Eacute;tats-Unis sont
            prot&eacute;g&eacute;s par des clauses contractuelles standard et/ou le Swiss-U.S. Data Privacy Framework.
          </p>
        </div>

        {/* 7. Durée de conservation */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            7. Dur&eacute;e de conservation
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Demandes de contact :</strong> conserv&eacute;es le temps n&eacute;cessaire au traitement
              de votre demande, puis supprim&eacute;es dans un d&eacute;lai de 12 mois.
            </li>
            <li>
              <strong>Donn&eacute;es analytiques :</strong> anonymis&eacute;es automatiquement,
              conserv&eacute;es 26 mois par Google Analytics.
            </li>
          </ul>
        </div>

        {/* 8. Droits */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            8. Vos droits
          </h2>
          <p className="mb-2">
            Conform&eacute;ment &agrave; la LPD (art. 25–29), vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Droit d&rsquo;acc&egrave;s :</strong> obtenir une copie de vos donn&eacute;es personnelles.</li>
            <li><strong>Droit de rectification :</strong> corriger des donn&eacute;es inexactes.</li>
            <li><strong>Droit &agrave; l&rsquo;effacement :</strong> demander la suppression de vos donn&eacute;es.</li>
            <li><strong>Droit &agrave; la portabilit&eacute; :</strong> recevoir vos donn&eacute;es dans un format courant.</li>
            <li><strong>Droit d&rsquo;opposition :</strong> vous opposer au traitement de vos donn&eacute;es.</li>
          </ul>
          <p className="mt-2">
            Pour exercer vos droits, contactez-nous par e-mail &agrave;{' '}
            <a href={`mailto:${GARAGE.email}`} className="text-blue hover:underline">{GARAGE.email}</a>.
            Nous r&eacute;pondrons dans un d&eacute;lai de 30 jours.
          </p>
        </div>

        {/* 9. Sécurité */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            9. S&eacute;curit&eacute; des donn&eacute;es
          </h2>
          <p>
            Nous prenons des mesures techniques et organisationnelles appropri&eacute;es pour prot&eacute;ger
            vos donn&eacute;es contre tout acc&egrave;s non autoris&eacute;, toute modification, divulgation
            ou destruction. Le site est accessible exclusivement via HTTPS.
          </p>
        </div>

        {/* 10. Autorité de surveillance */}
        <div>
          <h2 className="font-display font-bold text-lg uppercase text-ink mb-2">
            10. Autorit&eacute; de surveillance
          </h2>
          <p>
            En cas de litige, vous pouvez vous adresser au Pr&eacute;pos&eacute; f&eacute;d&eacute;ral &agrave;
            la protection des donn&eacute;es et &agrave; la transparence (PFPDT) :<br />
            <a
              href="https://www.edoeb.admin.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              www.edoeb.admin.ch
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
