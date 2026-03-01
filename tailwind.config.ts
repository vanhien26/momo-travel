import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS Configuration – MoMo Travel Hub
 *
 * Design System:
 * - MoMo Brand: Magenta primary (#a50064), warm neutrals
 * - Mobile-first breakpoints (360px base → desktop)
 * - Dark mode via class strategy
 * - Custom animations cho micro-interactions
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        momo: {
          50: '#fef1f7',
          100: '#fde6f1',
          200: '#fccee5',
          300: '#faa5ce',
          400: '#f56daa',
          500: '#ec4489',
          600: '#d9226a',
          700: '#a50064',
          800: '#8a1455',
          900: '#731648',
          950: '#460527',
        },
        travel: {
          sky: '#0ea5e9',
          ocean: '#0369a1',
          sand: '#fbbf24',
          forest: '#059669',
          sunset: '#f97316',
        },
      },
      fontFamily: {
        // Sử dụng CSS variables từ next/font
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '800' }],
        section: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.25', fontWeight: '700' }],
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        section: 'clamp(3rem, 8vw, 6rem)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-right': 'slide-right 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)',
        momo: '0 4px 24px rgba(165,0,100,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
