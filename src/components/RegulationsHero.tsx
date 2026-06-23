import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';
import HeroWordSplit from '@/components/HeroWordSplit';
import { Link } from '@/i18n/navigation';

export default function RegulationsHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section
      className="relative flex min-h-[80vh] items-end overflow-hidden bg-navy-950 text-cream-50 md:min-h-[88vh]"
      aria-label="Regulations hero"
    >
      {/* Layer 1 — hero photo */}
      <Image
        src={withBasePath('/assets/images/banner/regulations-hero.jpg')}
        alt=""
        fill
        priority
        className="animate-hero-image-cinematic object-cover"
      />

      {/* Layer 2 — panel grid texture */}
      <div className="panel-grid-bg absolute inset-0" />

      {/* Layer 3 — gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      {/* Layer 4 — rotating heritage-seal watermark */}
      <div
        className="pointer-events-none absolute -right-48 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/compass-seal.svg')}
          alt=""
          width={680}
          height={680}
          className="animate-spin-slow opacity-[0.04]"
        />
      </div>

      {/* Layer 5 — amber accent bar top-right */}
      <div
        className="animate-accent-slide-down absolute right-0 top-0 hidden h-36 w-2.5 bg-amber-400 md:block"
        style={{ animationDelay: '0.2s' }}
        aria-hidden="true"
      />

      {/* Layer 6 — amber radiance glow */}
      <div
        className="radiance-ring pointer-events-none absolute left-[6%] top-1/3 h-[400px] w-[400px] rounded-full bg-amber-400 opacity-[0.04] blur-[160px]"
        aria-hidden="true"
      />

      {/* Layer 7 — concentric pulse rings */}
      <div
        className="pointer-events-none absolute left-[10%] top-[38%]"
        aria-hidden="true"
      >
        <div className="animate-pulse-ring absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/10" />
        <div
          className="animate-pulse-ring absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/06"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* Layer 8 — floating motifs */}
      <div
        className="animate-float pointer-events-none absolute right-[20%] top-[10%] hidden lg:block"
        style={{ '--rot': '-10deg', animationDelay: '3s', animationDuration: '10s' } as React.CSSProperties}
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/documentation.svg')}
          alt=""
          width={80}
          height={80}
          className="opacity-[0.18]"
        />
      </div>

      <div
        className="animate-float pointer-events-none absolute right-[10%] top-[54%] hidden md:block"
        style={{ '--rot': '7deg', animationDelay: '4.5s', animationDuration: '11s' } as React.CSSProperties}
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/blueprint-seal.svg')}
          alt=""
          width={52}
          height={52}
          className="opacity-[0.14]"
        />
      </div>

      <div
        className="animate-float pointer-events-none absolute right-[40%] top-[16%] hidden xl:block"
        style={{ '--rot': '-6deg', animationDelay: '5.5s', animationDuration: '13s' } as React.CSSProperties}
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/inspect-mark.svg')}
          alt=""
          width={38}
          height={38}
          className="opacity-[0.10]"
        />
      </div>

      {/* Content — bottom-anchored */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:pb-20">
        {/* Decree badge */}
        <div
          className="animate-fade-up mb-7 flex items-center gap-3"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="h-px w-8 bg-amber-400/60" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-400/70">
            Decree 135/2024/ND-CP
          </span>
        </div>

        {/* H1 */}
        <h1 className="max-w-4xl font-display font-bold leading-[1.04] tracking-tight">
          <HeroWordSplit
            text={title}
            className="text-[clamp(2.4rem,5.8vw,4.4rem)] text-cream-50"
            baseDelay={0.55}
          />
        </h1>

        {/* Amber divider */}
        <div
          className="animate-scale-in mt-7 h-[2px] w-16 origin-left bg-amber-400"
          style={{ animationDelay: '1.3s' }}
        />

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-5 max-w-[560px] text-base leading-relaxed text-cream-50/60 md:text-lg"
          style={{ animationDelay: '1.5s' }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          className="animate-cta-slide-in mt-9 flex flex-wrap gap-4"
          style={{ animationDelay: '1.8s' }}
        >
          <a
            href="#rules"
            className="rounded-full bg-royal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-royal-600/20 transition-all duration-200 hover:scale-[1.03] hover:bg-royal-700"
          >
            Read the rules
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/18 px-7 py-3 text-sm font-semibold text-cream-50/75 backdrop-blur-sm transition-all duration-200 hover:border-cream-50/35 hover:bg-cream-50/5 hover:text-cream-50"
          >
            Get a free assessment →
          </Link>
        </div>

        {/* Stat strip */}
        <div
          className="animate-fade-up mt-14 grid grid-cols-3 gap-6 border-t border-cream-50/10 pt-8 md:w-[520px]"
          style={{ animationDelay: '2s' }}
        >
          {[
            { value: '<100', unit: 'kW', label: 'simplified notification only' },
            { value: '20', unit: '%', label: 'max surplus to EVN' },
            { value: '0', unit: '', label: 'paperwork you handle yourself' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-2xl font-bold text-amber-400 md:text-3xl">
                {stat.value}
                <span className="ml-0.5 text-base font-semibold text-amber-400/60">
                  {stat.unit}
                </span>
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-cream-50/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="animate-fade-up pointer-events-none absolute bottom-6 right-6 hidden flex-col items-center gap-2 md:flex"
        style={{ animationDelay: '2.4s' }}
        aria-hidden="true"
      >
        <div className="h-10 w-px bg-gradient-to-b from-cream-50/30 to-transparent" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.45em] text-cream-50/25">
          Scroll
        </span>
      </div>
    </section>
  );
}
