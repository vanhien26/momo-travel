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
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#d82d8b',
          600: '#be185d',
          700: '#9d174d',
          800: '#831843',
          900: '#500724',
          950: '#2d0415',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #500724 0%, #9d174d 40%, #d82d8b 100%)',
        'card-gradient': 'linear-gradient(135deg, #d82d8b 0%, #f472b6 100%)',
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
