import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';
import HeroWordSplit from '@/components/HeroWordSplit';
import { Link } from '@/i18n/navigation';

export default function PricingHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section
      className="relative flex min-h-[80vh] items-end overflow-hidden bg-navy-950 text-cream-50 md:min-h-[90vh]"
      aria-label="Pricing hero"
    >
      {/* Layer 1 — hero photo: cinematic zoom-out */}
      <Image
        src={withBasePath('/assets/images/banner/pricing-hero.png')}
        alt=""
        fill
        priority
        className="animate-hero-image-cinematic object-cover"
      />

      {/* Layer 2 — panel grid texture */}
      <div className="panel-grid-bg absolute inset-0" />

      {/* Layer 3 — gradient: heavy at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />

      {/* Layer 4 — rotating heritage-seal watermark */}
      <div
        className="pointer-events-none absolute -right-48 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/heritage-seal.svg')}
          alt=""
          width={640}
          height={640}
          className="animate-spin-slow opacity-[0.045]"
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
        className="radiance-ring pointer-events-none absolute left-[6%] top-1/3 h-[400px] w-[400px] rounded-full bg-amber-400 opacity-[0.05] blur-[140px]"
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
          style={{ animationDelay: '1.1s' }}
        />
      </div>

      {/* Layer 8 — floating pricing motifs */}
      <div
        className="animate-float pointer-events-none absolute right-[20%] top-[10%] hidden lg:block"
        style={
          {
            '--rot': '-12deg',
            animationDelay: '3.5s',
            animationDuration: '9s',
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/solar-panel.svg')}
          alt=""
          width={80}
          height={80}
          className="opacity-[0.20]"
        />
      </div>

      <div
        className="animate-float pointer-events-none absolute right-[10%] top-[52%] hidden md:block"
        style={
          {
            '--rot': '8deg',
            animationDelay: '4.2s',
            animationDuration: '10s',
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/lotus-seal.svg')}
          alt=""
          width={56}
          height={56}
          className="opacity-[0.15]"
        />
      </div>

      <div
        className="animate-float pointer-events-none absolute right-[38%] top-[18%] hidden xl:block"
        style={
          {
            '--rot': '-5deg',
            animationDelay: '5s',
            animationDuration: '12s',
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <Image
          src={withBasePath('/assets/motifs/compass-seal.svg')}
          alt=""
          width={40}
          height={40}
          className="opacity-[0.10]"
        />
      </div>

      {/* Content — bottom-anchored */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:pb-20">
        {/* Eyebrow */}
        <div
          className="animate-fade-up mb-7 flex items-center gap-3"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="h-px w-8 bg-amber-400/60" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-400/70">
            Pricing &amp; Payback
          </span>
        </div>

        {/* H1 — word explosion */}
        <h1 className="max-w-4xl font-display font-bold leading-[1.04] tracking-tight">
          <HeroWordSplit
            text={title}
            className="text-[clamp(2.6rem,6.5vw,4.8rem)] text-cream-50"
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
          className="animate-fade-up mt-5 max-w-[520px] text-base leading-relaxed text-cream-50/60 md:text-lg"
          style={{ animationDelay: '1.5s' }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          className="animate-cta-slide-in mt-9 flex flex-wrap gap-4"
          style={{ animationDelay: '1.8s' }}
        >
          <Link
            href="/contact"
            className="rounded-full bg-royal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-royal-600/20 transition-all duration-200 hover:scale-[1.03] hover:bg-royal-700"
          >
            Get a Free Site Assessment
          </Link>
          <a
            href="#tiers"
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/18 px-7 py-3 text-sm font-semibold text-cream-50/75 backdrop-blur-sm transition-all duration-200 hover:border-cream-50/35 hover:bg-cream-50/5 hover:text-cream-50"
          >
            See pricing
            <ScrollArrow />
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="animate-fade-up mt-14 grid grid-cols-3 gap-6 border-t border-cream-50/10 pt-8 md:w-[520px]"
          style={{ animationDelay: '2s' }}
        >
          {[
            { value: '~4.5', unit: 'yr', label: 'avg. payback period' },
            { value: '25', unit: 'yr', label: 'panel output guarantee' },
            { value: '0%', unit: '', label: 'subcontractors. Ever.' },
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

function ScrollArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 2 L7 12 M3 8 L7 12 L11 8" />
    </svg>
  );
}
