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
      },
      animation: {
        radiance: 'radiance 4s ease-in-out infinite',
        'radiance-slow': 'radiance 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
