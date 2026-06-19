import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Home, MessageCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SunIcon from '@/components/SunIcon';
import { withBasePath } from '@/lib/assetPath';

// Fixed (not random) positions/timings so the static export is deterministic —
// every build and every locale renders identical markup.
const particles = [
  { left: '6%', top: '14%', width: 70, rot: 22, duration: '6.2s', delay: '0s' },
  { left: '20%', top: '72%', width: 52, rot: -44, duration: '8.1s', delay: '1.3s' },
  { left: '36%', top: '22%', width: 84, rot: 68, duration: '7s', delay: '0.5s' },
  { left: '53%', top: '83%', width: 46, rot: -18, duration: '9.2s', delay: '2.1s' },
  { left: '66%', top: '9%', width: 76, rot: 82, duration: '6.7s', delay: '0.8s' },
  { left: '77%', top: '55%', width: 40, rot: -62, duration: '7.8s', delay: '1.6s' },
  { left: '89%', top: '31%', width: 62, rot: 37, duration: '8.4s', delay: '0.4s' },
  { left: '13%', top: '48%', width: 34, rot: -55, duration: '5.9s', delay: '1.9s' },
  { left: '43%', top: '63%', width: 72, rot: 14, duration: '7.3s', delay: '2.6s' },
  { left: '82%', top: '78%', width: 44, rot: 73, duration: '6.1s', delay: '0.9s' },
];

export default async function NotFoundContent() {
  const t = await getTranslations('notFound');

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-950 px-6 py-20 text-center text-cream-50 select-none">
      <Image
        src={withBasePath('/assets/images/hero/hero-bg.jpg')}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="animate-hero-zoom object-cover opacity-10 motion-reduce:animate-none"
      />
      <div className="absolute inset-0 bg-navy-950/85" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 60% at 50% 50%, transparent 0%, rgba(12,31,63,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="animate-float pointer-events-none absolute rounded-full"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.width,
              height: Math.max(4, Math.round(p.width / 9)),
              background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.45), transparent)',
              '--rot': `${p.rot}deg`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            } as CSSProperties
          }
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-6 flex items-center justify-center">
          <div
            className="radiance-ring-slow absolute h-24 w-24 rounded-full bg-amber-400"
            aria-hidden="true"
          />
          <SunIcon size={48} />
        </div>

        <p
          className="animate-fade-up mb-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-400"
          style={{ animationDelay: '100ms' }}
        >
          {t('eyebrow')}
        </p>

        <div
          role="img"
          aria-label="404 — page not found"
          className="animate-glow font-display font-bold leading-none text-[clamp(6rem,20vw,12rem)]"
          style={{ WebkitTextStroke: '1.5px rgba(245,158,11,0.65)', color: 'transparent' }}
        >
          {t('fourofour')}
        </div>

        <div className="mt-6 flex w-full max-w-xs items-center gap-4">
          <span
            className="animate-scale-in h-px flex-1 origin-right bg-gradient-to-l from-amber-400/55 to-transparent"
            style={{ animationDelay: '300ms' }}
          />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span
            className="animate-scale-in h-px flex-1 origin-left bg-gradient-to-r from-amber-400/55 to-transparent"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        <h1
          className="animate-fade-up mt-7 font-display text-2xl font-semibold sm:text-3xl"
          style={{ animationDelay: '250ms' }}
        >
          {t('tagline')}
        </h1>
        <p
          className="animate-fade-up mt-3 max-w-md text-cream-50/70"
          style={{ animationDelay: '400ms' }}
        >
          {t('body')}
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: '550ms' }}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full bg-royal-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-royal-700 hover:shadow-xl"
          >
            <Home
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
            {t('goHome')}
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 rounded-full border-2 border-royal-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-all duration-300 hover:scale-105 hover:bg-royal-100 hover:text-royal-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t('contact')}
          </Link>
        </div>
      </div>

      <div
        className="animate-fade-up absolute bottom-7 left-0 right-0 z-10 flex items-center justify-center gap-6 px-6"
        style={{ animationDelay: '900ms' }}
      >
        <span className="h-px w-12 bg-cream-50/15" aria-hidden="true" />
        <span className="text-center text-[10px] uppercase tracking-[0.3em] text-cream-50/40">
          {t('footer')}
        </span>
        <span className="h-px w-12 bg-cream-50/15" aria-hidden="true" />
      </div>
    </section>
  );
}
