import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0C1F3F',
          800: '#1A3461',
          600: '#2E5096',
        },
        royal: {
          600: '#003baf',
          700: '#002d8a',
          100: '#dce8ff',
        },
        amber: {
          400: '#F59E0B',
        },
        cream: {
          50: '#F8F5EE',
        },
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        display: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
        mono: ['var(--font-inter-mono)'],
      },
      maxWidth: {
        '7xl': '1280px',
      },
      keyframes: {
        radiance: {
          '0%, 100%': { opacity: '0.06', transform: 'scale(1)' },
          '50%': { opacity: '0.12', transform: 'scale(1.15)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(36px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(10px)' },
          '70%': { opacity: '1', transform: 'scale(1.04) translateY(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'hero-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        radiance: 'radiance 4s ease-in-out infinite',
        'radiance-slow': 'radiance 6s ease-in-out infinite',
        'fade-up': 'fade-up 1s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'pop-in 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'hero-zoom': 'hero-zoom 12s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
