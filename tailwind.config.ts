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
          50: '#FFEFF4',   // Hồng -2
          100: '#FEC8DC',  // Hồng -1
          200: '#FF9DBE',  // Hồng (base)
          300: '#F95396',  // Hồng +1
          400: '#A50064',  // Hồng +2 – Hồng MoMo (primary)
          500: '#A50064',  // alias primary cho tiện dùng
          600: '#8C0055',  // darker shade
          700: '#730047',  // dark
          800: '#5A0038',  // darker
          900: '#40002A',  // darkest
          950: '#2D001D',  // near-black
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #40002A 0%, #A50064 40%, #F95396 100%)',
        'card-gradient': 'linear-gradient(135deg, #A50064 0%, #F95396 100%)',
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
