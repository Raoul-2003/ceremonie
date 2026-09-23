/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soutarah: {
          green:  '#006B3C',
          'green-light': '#00A651',
          'green-dark': '#004D2B',
          gold:   '#C9A84C',
          'gold-light': '#E8C96A',
          'gold-dark': '#A07830',
          cream:  '#F8F5EE',
          dark:   '#1A1A1A',
          gray:   '#4A4A4A',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A07830 100%)',
        'green-gradient': 'linear-gradient(135deg, #004D2B 0%, #006B3C 50%, #00A651 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,75,43,0.85) 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201,168,76,0.4)',
        'gold-lg': '0 0 40px rgba(201,168,76,0.6)',
        'green': '0 0 20px rgba(0,107,60,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
        'card': '0 20px 60px rgba(0,0,0,0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scroll': 'scroll 30s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        glow: {
          '0%':   { textShadow: '0 0 10px #C9A84C, 0 0 20px #C9A84C' },
          '100%': { textShadow: '0 0 20px #C9A84C, 0 0 40px #C9A84C, 0 0 60px #C9A84C' },
        },
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(201,168,76,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(201,168,76,0.7)' },
        },
        flip: {
          '0%':   { transform: 'rotateX(0deg)' },
          '50%':  { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
