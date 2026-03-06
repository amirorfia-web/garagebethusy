'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { TEAM, waLink } from '@/data/contacts'

// ── Animated SVG paths ──────────────────────────────────────────────────────

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#1649C8"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function BackgroundPaths({
  title = 'Votre voiture entre de bonnes mains.',
  subtitle = 'Mécanique, carrosserie, pneus, vitrages — toutes marques, toutes réparations. À l\'entrée de Lausanne, avec une équipe qui connaît son métier depuis vingt ans.',
}: {
  title?: string
  subtitle?: string
}) {
  const words = title.split(' ')

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#F8F9FC]">
      {/* Animated paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1649C8] bg-[#EAF0FF] border border-[#1649C8]/18 px-3 py-1 rounded-full mb-8"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#1649C8] animate-blink" aria-hidden />
            Garage indépendant · Lausanne · Depuis 2006
          </motion.div>

          {/* Title with letter animation */}
          <h1 className="font-display font-black text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.88] uppercase mb-8 tracking-[-0.01em]">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + wordIndex * 0.1 + letterIndex * 0.03,
                      type: 'spring',
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-[#080F28]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-[1rem] md:text-[1.125rem] text-[#3D4A66] leading-[1.75] mb-10 max-w-[56ch] mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <div className="inline-block group relative bg-gradient-to-b from-[#1649C8]/10 to-white/10 p-px rounded-xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Button
                variant="primary"
                size="lg"
                as="a"
                href="/contact"
                className="rounded-[0.65rem] group-hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Prendre rendez-vous
                </span>
                <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 inline-block">
                  →
                </span>
              </Button>
            </div>

            <Button
              variant="secondary"
              size="lg"
              as="a"
              href="/contact#devis"
            >
              Demander un devis
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              as="a"
              href={waLink(TEAM[0])}
              target="_blank"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </Button>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8 flex items-center justify-center gap-2 text-[0.78rem] text-[#7D89A3]"
          >
            <span className="text-[#D97706]">⭐</span>
            Avis clients vérifiés · Google My Business
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
