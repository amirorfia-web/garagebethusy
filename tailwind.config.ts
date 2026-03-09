import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── COULEURS ────────────────────────────────────────────────────────────
      colors: {
        // Fonds & surfaces
        'bg-app':    '#F8F9FC',
        'bg-white':  '#FFFFFF',
        border:      '#DDE3F0',

        // Bleu — accent & actions (couleur du logo)
        blue: {
          DEFAULT: '#1649C8',
          dark:    '#0D2E8F',
          mid:     '#2B5CE6',
          light:   '#EAF0FF',
          glow:    'rgba(22,73,200,0.12)',
        },

        // Quasi-noir & gris hiérarchiques
        ink: {
          DEFAULT: '#080F28',
          2:       '#3D4A66',
          3:       '#7D89A3',
          4:       '#B8C0D4',
        },

        // Statuts système
        success: '#0E9F6E',
        warn:    '#D97706',
        error:   '#E02424',

        // WhatsApp
        wa: '#25D366',
      },

      // ── TYPOGRAPHIE ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body:    ['var(--font-dm)', 'sans-serif'],
      },

      // Échelle typographique du style guide (utilisée via classes utilitaires custom)
      fontSize: {
        // Hero — Barlow Condensed 900 clamp(3.5rem, 8vw, 7rem)
        hero:      ['clamp(3.5rem, 8vw, 7rem)',    { lineHeight: '0.88', letterSpacing: '-0.01em' }],
        // H1 — Barlow Condensed 800
        h1:        ['clamp(2.5rem, 5vw, 4rem)',     { lineHeight: '0.95', letterSpacing: '0.01em' }],
        // H2 — Barlow Condensed 700
        h2:        ['clamp(1.8rem, 3.5vw, 2.75rem)', { lineHeight: '1' }],
        // H3 — Barlow Condensed 700
        h3:        ['1.75rem',  { lineHeight: '1',    letterSpacing: '0.02em' }],
        // H4 — Barlow Condensed 600
        h4:        ['1.35rem',  { lineHeight: '1.1',  letterSpacing: '0.03em' }],
        // Corps
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        body:      ['1rem',     { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65' }],
        // Labels & eyebrows
        label:     ['0.7rem',   { lineHeight: '1',    letterSpacing: '0.14em' }],
        eyebrow:   ['0.68rem',  { lineHeight: '1',    letterSpacing: '0.15em' }],
        tag:       ['0.65rem',  { lineHeight: '1',    letterSpacing: '0.12em' }],
        // Mono
        mono:      ['0.875rem', { lineHeight: '1.6' }],
      },

      // ── RAYONS ──────────────────────────────────────────────────────────────
      borderRadius: {
        xs:   '3px',
        sm:   '7px',
        md:   '10px',
        lg:   '14px',
        xl:   '20px',
        pill: '9999px',
      },

      // ── ESPACEMENTS ─────────────────────────────────────────────────────────
      // Tailwind inclut déjà une échelle complète ; on ajoute les valeurs
      // spécifiques au style guide qui ne correspondent pas aux multiples de 4.
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
      },

      // ── TRANSITION / EASING ─────────────────────────────────────────────────
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // ── OMBRES ──────────────────────────────────────────────────────────────
      boxShadow: {
        xs:   '0 1px 2px rgba(8,15,40,0.05)',
        sm:   '0 1px 4px rgba(8,15,40,0.06)',
        md:   '0 4px 16px rgba(8,15,40,0.08)',
        lg:   '0 8px 24px rgba(8,15,40,0.10)',
        xl:   '0 16px 40px rgba(8,15,40,0.12)',
        '2xl':'0 24px 64px rgba(8,15,40,0.14)',
        // Ombres colorées
        blue:     '0 4px 14px rgba(22,73,200,0.18)',
        'blue-lg':'0 8px 28px rgba(22,73,200,0.28)',
        wa:       '0 3px 10px rgba(37,211,102,0.25)',
        'wa-lg':  '0 6px 18px rgba(37,211,102,0.18)',
      },

      // ── ANIMATIONS ──────────────────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1',  transform: 'scale(1)' },
          '50%':       { opacity: '0.6', transform: 'scale(0.85)' },
        },
        'wa-pulse': {
          '0%':   { transform: 'scale(1)',   opacity: '0.5' },
          '70%':  { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both',
        ticker:     'ticker 22s linear infinite',
        blink:      'blink 2s infinite',
        'wa-pulse': 'wa-pulse 2s ease-out infinite',
      },

      // ── MAX-WIDTH ────────────────────────────────────────────────────────────
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
