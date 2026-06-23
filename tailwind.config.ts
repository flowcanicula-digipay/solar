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
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Georgia', 'serif'],
        mono: ['var(--font-inter-mono)', 'ui-monospace', 'monospace'],
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
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--rot, 0deg))', opacity: '0.35' },
          '50%': { transform: 'translateY(-16px) rotate(var(--rot, 0deg))', opacity: '0.85' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(245,158,11,0.25)' },
          '50%': { textShadow: '0 0 40px rgba(245,158,11,0.5)' },
        },
        'scale-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.55' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        /* ── SkogMoc-inspired hero animations ── */
        'hero-image-cinematic': {
          '0%': { opacity: '0', transform: 'scale(1.18)' },
          '30%': { opacity: '0.18' },
          '100%': { opacity: '0.18', transform: 'scale(1)' },
        },
        'word-explode-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(5) translateY(60%) rotate(var(--wrot, 0deg))',
            filter: 'blur(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0) rotate(0deg)',
            filter: 'blur(0px)',
          },
        },
        'word-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(110%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accent-slide-down': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'header-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'cta-slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        radiance: 'radiance 4s ease-in-out infinite',
        'radiance-slow': 'radiance 6s ease-in-out infinite',
        'fade-up': 'fade-up 1s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'pop-in 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'hero-zoom': 'hero-zoom 14s ease-out forwards',
        float: 'float 7s ease-in-out infinite',
        glow: 'glow 3.5s ease-in-out infinite',
        'scale-in': 'scale-in 0.8s cubic-bezier(0.16,1,0.3,1) both',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'slide-up-fade': 'slide-up-fade 0.9s cubic-bezier(0.16,1,0.3,1) both',
        /* ── SkogMoc-inspired hero animations ── */
        'hero-image-cinematic': 'hero-image-cinematic 2.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'word-explode-in': 'word-explode-in 1.4s cubic-bezier(0.175,0.885,0.32,1.275) both',
        'word-slide-up': 'word-slide-up 0.9s cubic-bezier(0,0.55,0.45,1) both',
        'accent-slide-down': 'accent-slide-down 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'header-slide-in': 'header-slide-in 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'cta-slide-in': 'cta-slide-in 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
    },
  },
  plugins: [],
};

export default config;
