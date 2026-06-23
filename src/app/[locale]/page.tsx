import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import {
  PhoneCall,
  Ruler,
  HardHat,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { GlobeUSIcon, GlobeSEAIcon, JunkBoatIcon } from '@/components/icons/SiteIcons';
import SunIcon from '@/components/SunIcon';
import WarrantyTimeline from '@/components/WarrantyTimeline';
import AfterCareSection from '@/components/AfterCareSection';
import Reveal from '@/components/Reveal';
import MarqueeTicker from '@/components/MarqueeTicker';
import HeroWordSplit from '@/components/HeroWordSplit';
import HeroSubtitleSplit from '@/components/HeroSubtitleSplit';
import { withBasePath } from '@/lib/assetPath';
import { SHOW_PROJECTS } from '@/lib/featureFlags';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return { title: t('title'), description: t('description') };
}

const projectImages = [
  { src: withBasePath('/assets/images/projects/project-1.jpg'), key: 'p1' as const },
  { src: withBasePath('/assets/images/projects/project-2.webp'), key: 'p2' as const },
  { src: withBasePath('/assets/images/projects/project-3.jpg'), key: 'p3' as const },
  { src: withBasePath('/assets/images/projects/project-4.jpg'), key: 'p4' as const },
];

const processSteps = [
  {
    key: 'step1' as const,
    src: withBasePath('/assets/images/process/step1-consult.jpg'),
    Icon: PhoneCall,
    motif: 'consultation.svg',
  },
  {
    key: 'step2' as const,
    src: withBasePath('/assets/images/process/step2-design.jpg'),
    Icon: Ruler,
    motif: 'blueprint-seal.svg',
  },
  {
    key: 'step3' as const,
    src: withBasePath('/assets/images/process/step3-install.jpg'),
    Icon: HardHat,
    motif: 'installation.svg',
  },
  {
    key: 'step4' as const,
    src: withBasePath('/assets/images/process/step4-support.jpg'),
    Icon: ShieldCheck,
    motif: 'handover.svg',
  },
];

const aboutFeatures = [
  { key: 'point1' as const, motif: 'export-crate.svg' },
  { key: 'point2' as const, motif: 'compass-seal.svg' },
  { key: 'point3' as const, motif: 'luban-ruler.svg' },
  { key: 'point4' as const, motif: 'heritage-bond.svg' },
];

const ctaGridImages = [
  withBasePath('/assets/images/cta/grid-1.jpg'),
  withBasePath('/assets/images/cta/grid-2.jpg'),
  withBasePath('/assets/images/cta/grid-3.jpg'),
  withBasePath('/assets/images/cta/grid-4.jpg'),
];


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const cta = await getTranslations('common.cta');

  const marqueeItems = [
    'Trusted sourcing. Japanese standards. Vietnamese craft.',
    'Nguồn hàng đáng tin cậy. Tiêu chuẩn Nhật Bản. Tay nghề Việt Nam.',
    '信頼できる調達。日本基準。ベトナムの職人技。',
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      {/*
       * Layout: items-end (content sits at bottom, image fills above) —
       * matches SkogMoc's cinematic bottom-anchored hero composition.
       */}
      <section
        className="relative flex min-h-[80vh] items-end overflow-hidden bg-navy-950 text-cream-50 md:min-h-screen"
        aria-label={t('hero.imageAlt')}
      >
        {/* Layer 1 — hero photo: zooms OUT from 1.18→1 while fading in */}
        <Image
          src={withBasePath('/assets/images/hero/hero-bg.jpg')}
          alt=""
          fill
          priority
          className="animate-hero-image-cinematic object-cover"
        />

        {/* Layer 2 — panel grid texture */}
        <div className="panel-grid-bg absolute inset-0" />

        {/* Layer 3 — gradient: heavy at bottom (where text sits) */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />

        {/* Layer 4 — heritage-seal watermark (right, slow rotation) */}
        <div
          className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 md:block"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/heritage-seal.svg')}
            alt=""
            width={600}
            height={600}
            className="animate-spin-slow opacity-[0.055]"
          />
        </div>

        {/* Layer 5 — amber accent line: top-right, slides down (SkogMoc signature) */}
        <div
          className="animate-accent-slide-down absolute right-0 top-0 hidden h-36 w-2.5 bg-amber-400 md:block"
          style={{ animationDelay: '0.2s' }}
          aria-hidden="true"
        />

        {/* Layer 6 — amber radiance glow */}
        <div
          className="radiance-ring pointer-events-none absolute left-[6%] top-1/3 h-[380px] w-[380px] rounded-full bg-amber-400 opacity-[0.055] blur-[130px]"
          aria-hidden="true"
        />

        {/* Layer 7 — concentric pulse rings */}
        <div
          className="pointer-events-none absolute left-[12%] top-[35%]"
          aria-hidden="true"
        >
          <div className="animate-pulse-ring absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/10" />
          <div
            className="animate-pulse-ring absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/06"
            style={{ animationDelay: '1.1s' }}
          />
        </div>

        {/* Layer 8 — floating cultural motifs */}
        <div
          className="animate-float pointer-events-none absolute right-[18%] top-[12%] hidden lg:block"
          style={{ '--rot': '-14deg', animationDelay: '3.5s', animationDuration: '8s' } as React.CSSProperties}
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/non-la.svg')}
            alt=""
            width={88}
            height={88}
            className="opacity-[0.22]"
          />
        </div>

        <div
          className="animate-float pointer-events-none absolute right-[10%] top-[55%] hidden md:block"
          style={{ '--rot': '9deg', animationDelay: '4s', animationDuration: '9s' } as React.CSSProperties}
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/lotus.svg')}
            alt=""
            width={64}
            height={64}
            className="opacity-[0.18]"
          />
        </div>

        <div
          className="animate-float pointer-events-none absolute right-[40%] top-[20%] hidden xl:block"
          style={{ '--rot': '-6deg', animationDelay: '4.5s', animationDuration: '11s' } as React.CSSProperties}
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/compass-seal.svg')}
            alt=""
            width={44}
            height={44}
            className="opacity-[0.12]"
          />
        </div>

        {/* Content — bottom-anchored */}
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-24 md:pb-20">
          {/* Location eyebrow */}
          <div
            className="animate-fade-up mb-7 flex items-center gap-3"
            style={{ animationDelay: '0.3s' }}
          >
            <Image
              src={withBasePath('/assets/motifs/viet-pin.svg')}
              alt=""
              width={16}
              height={16}
              className="opacity-60"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-400/65">
              Phú Nhuận · Hồ Chí Minh · Vietnam
            </span>
          </div>

          {/* H1 — word explosion, SkogMoc style */}
          <h1 className="max-w-4xl font-display font-bold leading-[1.04] tracking-tight">
            <HeroWordSplit
              text="Trusted sourcing."
              className="text-[clamp(2.4rem,7vw,5rem)] text-cream-50"
              baseDelay={0.65}
            />
            <HeroWordSplit
              text="Japanese standards."
              className="text-[clamp(2.4rem,7vw,5rem)] text-royal-100"
              baseDelay={0.83}
            />
            {/* Line 3: "Vietnamese" + "craft." (amber glow) as individual words */}
            <span className="block text-[clamp(2.4rem,7vw,5rem)] text-cream-50">
              <span className="inline-block">
                <span
                  className="inline-block animate-word-explode-in"
                  style={
                    { animationDelay: '1.01s', '--wrot': '-14deg' } as React.CSSProperties
                  }
                >
                  Vietnamese
                </span>
              </span>
              {' '}
              <span className="inline-block">
                <span
                  className="hero-craft-word inline-block text-amber-400"
                  style={
                    { animationDelay: '1.1s', '--wrot': '8deg' } as React.CSSProperties
                  }
                >
                  craft.
                </span>
              </span>
            </span>
          </h1>

          {/* Amber divider */}
          <div
            className="animate-scale-in mt-7 h-[2px] w-16 origin-left bg-amber-400"
            style={{ animationDelay: '1.6s' }}
          />

          {/* Subtitle — word slide-up */}
          <HeroSubtitleSplit
            text={t('hero.subtitle')}
            className="mt-5 max-w-[540px] text-base leading-relaxed text-cream-50/60 md:text-lg"
          />

          {/* CTAs — slide in from left */}
          <div
            className="animate-cta-slide-in mt-9 flex flex-wrap gap-4"
            style={{ animationDelay: '1.8s' }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-royal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-royal-600/20 transition-all duration-200 hover:scale-[1.03] hover:bg-royal-700"
            >
              {t('hero.cta')}
            </Link>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-cream-50/18 px-7 py-3 text-sm font-semibold text-cream-50/75 backdrop-blur-sm transition-all duration-200 hover:border-cream-50/35 hover:bg-cream-50/5 hover:text-cream-50"
            >
              {t('hero.secondaryCta')}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
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

      {/* ── MARQUEE ──────────────────────────────────────────────── */}
      <MarqueeTicker items={marqueeItems} />

      {/* ── MANIFESTO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream-50 py-20 md:py-28">
        {/* Faint heritage-seal watermark */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 opacity-[0.038]"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/heritage-seal.svg')}
            alt=""
            width={560}
            height={560}
            className="animate-spin-slow"
          />
        </div>
        <div className="lotus-dot-bg absolute inset-0 opacity-35" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[0.45em] text-amber-600">
              — {t('manifesto.label')}
            </p>
            <h2 className="font-display text-[clamp(1.85rem,5vw,3.6rem)] font-bold leading-[1.14] text-navy-950">
              {t('manifesto.pre')}{' '}
              <span className="text-amber-500">{t('manifesto.highlight1')}</span>{' '}
              {t('manifesto.mid')}{' '}
              <span className="text-amber-500">{t('manifesto.highlight2')}</span>
            </h2>
            <p className="mt-8 max-w-sm font-display text-base italic text-charcoal/45">
              {t('manifesto.caption')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT / IDENTITY ─────────────────────────────────────── */}
      <section id="about" aria-label={t('about.title')} className="relative overflow-hidden bg-cream-50 py-16 md:py-28">
        {/* "25" ghost watermark */}
        <span
          className="pointer-events-none absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 select-none font-display text-[22rem] font-bold leading-none text-navy-950/[0.032]"
          aria-hidden="true"
        >
          25
        </span>

        <div className="lotus-dot-bg absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left: text */}
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <Image
                  src={withBasePath('/assets/motifs/heritage-seal.svg')}
                  alt=""
                  width={42}
                  height={42}
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-royal-700">
                    {t('about.label')}
                  </p>
                  <div className="mt-1 h-px w-12 bg-royal-600/30" />
                </div>
              </div>

              <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
                {t('about.title')}
              </h2>

              <p className="mb-3 mt-6 text-base leading-relaxed text-charcoal/68 lg:text-lg">
                {t('about.body')}
              </p>

              <p className="mb-9 font-display text-lg font-semibold italic text-navy-950/80">
                {t('about.closingLine')}
              </p>

              <dl className="grid gap-3 sm:grid-cols-2">
                {aboutFeatures.map(({ key, motif }) => (
                  <div
                    key={key}
                    className="group flex gap-3 rounded-2xl border border-navy-800/10 bg-white p-4 transition-colors duration-200 hover:border-royal-600/20 hover:bg-royal-100/40"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cream-50 transition-colors group-hover:bg-amber-50">
                      <Image
                        src={withBasePath(`/assets/motifs/${motif}`)}
                        alt=""
                        width={22}
                        height={22}
                        aria-hidden="true"
                      />
                    </div>
                    <dt className="pt-1 text-sm leading-relaxed text-charcoal/75">
                      {t(`about.${key}`)}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Right: photo */}
            <Reveal delay={200}>
              <figure className="relative">
                <div className="relative h-[440px] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/20 sm:h-[520px]">
                  <Image
                    src={withBasePath('/assets/images/about/team.jpg')}
                    alt={t('about.imageAlt')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/25 to-transparent" />
                  {/* Corner motif */}
                  <div className="absolute right-4 top-4 opacity-70">
                    <Image
                      src={withBasePath('/assets/motifs/non-la.svg')}
                      alt=""
                      width={36}
                      height={36}
                    />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-5 -left-5 hidden max-w-[210px] rounded-2xl bg-royal-600 px-5 py-4 text-white shadow-xl shadow-royal-600/30 sm:block">
                  <Image
                    src={withBasePath('/assets/motifs/heritage-seal.svg')}
                    alt=""
                    width={28}
                    height={28}
                    className="mb-2"
                  />
                  <p className="text-sm font-semibold leading-snug">{t('about.badge')}</p>
                </div>

                {/* Accent line */}
                <div className="absolute -right-3 top-8 hidden h-24 w-0.5 bg-gradient-to-b from-amber-400/60 to-transparent sm:block" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="process" className="relative overflow-hidden bg-white py-16 md:py-28">
        {/* Faint lotus at center */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/lotus.svg')}
            alt=""
            width={560}
            height={560}
            className="opacity-[0.025]"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-20 max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-royal-700">
              {t('process.label')}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('process.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-charcoal/65">{t('process.lead')}</p>
          </Reveal>

          <ol className="flex flex-col gap-28">
            {processSteps.map(({ key, src, motif }, i) => (
              <li key={key}>
                <Reveal className="grid items-center gap-10 lg:grid-cols-2">
                  {/* Text column */}
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    {/* Step header: motif icon + huge number + label */}
                    <div className="mb-6 flex items-end gap-5">
                      <Image
                        src={withBasePath(`/assets/motifs/${motif}`)}
                        alt=""
                        width={60}
                        height={60}
                        className="flex-shrink-0 opacity-90"
                      />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-royal-600">
                          {t(`process.${key}.title`)}
                        </p>
                        <span className="font-display text-[5.5rem] font-bold leading-none text-royal-100 select-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-4 font-display text-2xl font-bold text-navy-950 lg:text-3xl">
                      {t(`process.${key}.headline`)}
                    </h3>
                    <p className="leading-relaxed text-charcoal/65">
                      {t(`process.${key}.body`)}
                    </p>

                    {/* Decorative amber tick */}
                    <div className="mt-6 h-0.5 w-10 bg-amber-400/50" />
                  </div>

                  {/* Image column */}
                  <figure
                    className={`relative h-80 overflow-hidden rounded-3xl shadow-xl shadow-navy-950/10 lg:h-[420px] ${
                      i % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  >
                    <Image
                      src={src}
                      alt={t(`process.${key}.imageAlt`)}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-950/10 to-transparent" />
                    {/* Step number ghost on image */}
                    <span
                      className="pointer-events-none absolute -bottom-4 -right-3 select-none font-display text-[8rem] font-bold leading-none text-white/[0.07]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      {SHOW_PROJECTS && (
        <section id="projects" className="relative overflow-hidden bg-cream-50 py-16 md:py-28">
          <div className="lotus-dot-bg absolute inset-0 opacity-50" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal className="mb-12">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-royal-700">
                {t('process.label')}
              </p>
              <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
                {t('projects.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-charcoal/65">{t('projects.lead')}</p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {projectImages.map(({ src, key }) => (
                <Reveal key={key}>
                  <article className="group overflow-hidden rounded-3xl bg-white shadow-md shadow-navy-950/6 transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={src}
                        alt={t(`projects.${key}.imageAlt`)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                      <div className="absolute bottom-4 left-5">
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-navy-950">
                          {t(`projects.${key}.size`)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-navy-950">
                        {t(`projects.${key}.title`)}
                      </h3>
                      <dl className="mt-3 space-y-1 text-sm text-charcoal/60">
                        <div>{t(`projects.${key}.panels`)}</div>
                        <div>{t(`projects.${key}.location`)}</div>
                        <div>{t(`projects.${key}.duration`)}</div>
                      </dl>
                      <p className="mt-3 text-sm font-medium text-charcoal">
                        {t(`projects.${key}.outcome`)}
                      </p>
                      <p className="mt-2 text-sm italic text-charcoal/50">
                        {t(`projects.${key}.note`)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-10 max-w-2xl text-sm italic text-charcoal/55">
                {t('projects.honestNote')}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── WARRANTY & AFTER-SALES ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 md:py-28">
        {/* Lotus corner accent */}
        <div
          className="pointer-events-none absolute right-0 top-0 opacity-[0.04]"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/lotus.svg')}
            alt=""
            width={280}
            height={280}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-royal-700">
              {t('about.label')}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('warranty.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-charcoal/65">
              {t('warranty.lead')}
            </p>
          </Reveal>

          <div className="mx-auto max-w-3xl">
            <WarrantyTimeline />
            <p className="mt-6 text-center text-sm italic text-charcoal/50">
              {t('warranty.closingLine')}
            </p>
          </div>

        </div>
      </section>

      <AfterCareSection />

      {/* ── JAPANESE QUALITY ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-800 py-16 text-cream-50 md:py-28">
        {/* Heritage seal rotating watermark */}
        <div
          className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 md:block"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/heritage-seal.svg')}
            alt=""
            width={520}
            height={520}
            className="animate-spin-slow opacity-[0.07]"
          />
        </div>

        {/* Top amber accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />

        {/* Flag motif */}
        <div
          className="animate-float pointer-events-none absolute bottom-10 left-8 hidden xl:block"
          style={{ '--rot': '-8deg', animationDelay: '1.2s' } as React.CSSProperties}
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/flag-vn.svg')}
            alt=""
            width={48}
            height={48}
            className="opacity-[0.16]"
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-400/75">
              Japanese Engineering
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              {t('japanese.title')}
            </h2>
            <p className="mt-5 leading-relaxed text-cream-50/65">{t('japanese.body')}</p>
            <ul className="mt-7 space-y-4">
              {(['point1', 'point2', 'point3'] as const).map((key) => (
                <li key={key} className="flex gap-3 text-sm text-cream-50/75">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  {t(`japanese.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240} className="relative h-72 w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/40 md:h-[420px]">
            <Image
              src={withBasePath('/assets/images/quality/japanese-precision.jpg')}
              alt={t('japanese.imageAlt')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/35 to-transparent" />
            {/* Heritage badge overlay */}
            <div className="absolute right-4 top-4 flex flex-col items-center gap-1 rounded-xl bg-navy-950/75 px-3 py-3 backdrop-blur-sm">
              <Image
                src={withBasePath('/assets/motifs/heritage-seal.svg')}
                alt=""
                width={32}
                height={32}
              />
              <p className="text-[8px] font-semibold uppercase tracking-wider text-cream-50/70">
                Japanese<br />Standard
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom amber accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
      </section>

      {/* ── BOLD BANNER ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-cream-50 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        {/* Faint lotus-seal counter-rotating watermark */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/heritage-bond.svg')}
            alt=""
            width={440}
            height={440}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold leading-[1.06] tracking-tight">
                <span className="block">{t('boldBanner.heading1')}</span>
                <span className="block">{t('boldBanner.heading2')}</span>
                <span className="block text-amber-400">{t('boldBanner.heading3')}</span>
              </h2>
            </Reveal>

            <Reveal delay={180} className="space-y-5 lg:text-center">
              <p className="text-base leading-relaxed text-cream-50/75 lg:text-lg">
                {t('boldBanner.body1')}
              </p>
              <p className="text-base leading-relaxed text-cream-50/50 lg:text-lg">
                {t('boldBanner.body2')}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </section>

      {/* ── INTERNATIONAL SOURCING ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-cream-50">
        <Image
          src={withBasePath('/assets/images/sourcing/sourcing-bg.jpg')}
          alt={t('sourcing.imageAlt')}
          fill
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/96 via-navy-950/82 to-navy-950/45" />

        {/* Floating viet-pin motif */}
        <div
          className="animate-float pointer-events-none absolute right-10 top-10 hidden lg:block"
          style={{ '--rot': '8deg', animationDelay: '1.6s' } as React.CSSProperties}
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/viet-pin.svg')}
            alt=""
            width={64}
            height={64}
            className="opacity-[0.18]"
          />
        </div>

        <Reveal className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-400">
            {t('sourcing.label')}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight lg:text-4xl">
            {t('sourcing.title')}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-50/70 lg:text-lg">
            {t('sourcing.body')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-50/18 bg-cream-50/5 px-4 py-2 text-sm font-medium text-cream-50/85">
              <GlobeUSIcon size={16} className="text-amber-400" />
              {t('sourcing.marketUS')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-50/18 bg-cream-50/5 px-4 py-2 text-sm font-medium text-cream-50/85">
              <GlobeSEAIcon size={16} className="text-amber-400" />
              {t('sourcing.marketSEA')}
            </span>
          </div>

          <Link
            href="/sourcing"
            className="mt-9 inline-flex items-center gap-2 rounded-full border-2 border-royal-600 bg-royal-600/10 px-7 py-3 text-sm font-semibold text-cream-50 transition-colors duration-200 hover:bg-royal-600 hover:text-white"
          >
            <JunkBoatIcon size={16} />
            {t('sourcing.cta')}
          </Link>
        </Reveal>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-16 text-cream-50 md:py-28">
        {/* Lotus-seal watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src={withBasePath('/assets/motifs/lotus-seal.svg')}
            alt=""
            width={520}
            height={520}
            className="animate-spin-slow opacity-[0.028]"
            style={{ animationDirection: 'reverse' } as React.CSSProperties}
          />
        </div>

        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Reveal>
            <SunIcon size={38} />
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight">{t('cta.title')}</h2>
            <p className="mt-3 max-w-md text-cream-50/62">{t('cta.body')}</p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-full bg-royal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-royal-600/25 transition-all duration-200 hover:scale-[1.03] hover:bg-royal-700"
            >
              {cta('freeAssessment')}
            </Link>
          </Reveal>

          <Reveal delay={220} className="grid grid-cols-2 gap-4">
            {ctaGridImages.map((src) => (
              <div key={src} className="relative h-32 overflow-hidden rounded-2xl sm:h-44">
                <Image src={src} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-navy-950/10" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
