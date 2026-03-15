import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './HeroSearch.js',
  ],
  theme: {
    extend: {
      colors: {
        momo: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #1e3a8a 100%)',
        'card-gradient': 'linear-gradient(135deg, #6d28d9 0%, #3b82f6 100%)',
        'orange-gradient': 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        'green-gradient': 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
