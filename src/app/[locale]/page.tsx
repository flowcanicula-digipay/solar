import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { PhoneCall, Ruler, HardHat, ShieldCheck, Factory, Handshake, Ship } from 'lucide-react';
import SunIcon from '@/components/SunIcon';
import WarrantyTable from '@/components/WarrantyTable';

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
  { src: '/assets/images/projects/project-1.jpg', key: 'p1' as const },
  { src: '/assets/images/projects/project-2.webp', key: 'p2' as const },
  { src: '/assets/images/projects/project-3.jpg', key: 'p3' as const },
  { src: '/assets/images/projects/project-4.jpg', key: 'p4' as const },
];

const processSteps = [
  { key: 'step1' as const, src: '/assets/images/process/step1-consult.jpg', Icon: PhoneCall },
  { key: 'step2' as const, src: '/assets/images/process/step2-design.jpg', Icon: Ruler },
  { key: 'step3' as const, src: '/assets/images/process/step3-install.jpg', Icon: HardHat },
  { key: 'step4' as const, src: '/assets/images/process/step4-support.jpg', Icon: ShieldCheck },
];

const aboutFeatures = [
  { key: 'point1' as const, Icon: Factory },
  { key: 'point2' as const, Icon: ShieldCheck },
  { key: 'point3' as const, Icon: HardHat },
  { key: 'point4' as const, Icon: Handshake },
];

const ctaGridImages = [
  '/assets/images/cta/grid-1.jpg',
  '/assets/images/cta/grid-2.jpg',
  '/assets/images/cta/grid-3.jpg',
  '/assets/images/cta/grid-4.jpg',
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

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-cream-50">
        <Image
          src="/assets/images/hero/hero-bg.jpg"
          alt={t('hero.imageAlt')}
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-24 md:py-32">
          <div
            className="radiance-ring animate-radiance pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl"
            aria-hidden="true"
          />
          <h1 className="relative max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="relative mt-6 max-w-xl text-lg text-cream-50/80">
            {t('hero.subtitle')}
          </p>
          <div className="relative mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-royal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-royal-700"
            >
              {t('hero.cta')}
            </Link>
            <a
              href="#projects"
              className="rounded-full border-2 border-royal-600 px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-royal-100 hover:text-royal-700"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-label={t('about.title')} className="bg-cream-50 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-royal-700">
                {t('about.label')}
              </p>
              <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
                {t('about.title')}
              </h2>
              <p className="mb-10 mt-6 text-base leading-relaxed text-charcoal/70 lg:text-lg">
                {t('about.body')}
              </p>
              <p className="mb-10 -mt-4 font-display text-lg font-semibold text-navy-950">
                {t('about.closingLine')}
              </p>
              <dl className="grid gap-4 sm:grid-cols-2">
                {aboutFeatures.map(({ key, Icon }) => (
                  <div
                    key={key}
                    className="flex gap-3 rounded-xl border border-navy-800/10 bg-white p-4"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-royal-600"
                      aria-hidden="true"
                    />
                    <dt className="text-sm text-charcoal/80">{t(`about.${key}`)}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex gap-3 rounded-xl border border-royal-600/20 bg-royal-100/60 p-4">
                <Ship className="mt-0.5 h-5 w-5 flex-shrink-0 text-royal-600" aria-hidden="true" />
                <p className="text-sm text-charcoal/80">{t('about.point5')}</p>
              </div>
            </div>
            <figure className="relative">
              <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-2xl sm:h-[520px]">
                <Image
                  src="/assets/images/about/team.jpg"
                  alt={t('about.imageAlt')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-xl bg-royal-600 px-5 py-4 text-white shadow-xl sm:block">
                <ShieldCheck className="h-6 w-6 text-amber-400" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold leading-snug">{t('about.badge')}</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold text-navy-950">{t('process.title')}</h2>
          <p className="mt-3 max-w-2xl text-charcoal/70">{t('process.lead')}</p>

          <ol className="mt-16 flex flex-col gap-16 md:gap-24">
            {processSteps.map(({ key, src, Icon }, i) => (
              <li
                key={key}
                className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16"
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-charcoal/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-4 w-px bg-charcoal/20" />
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-royal-600">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(`process.${key}.title`)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-navy-950">
                    {t(`process.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-charcoal/70">{t(`process.${key}.body`)}</p>
                </div>
                <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80">
                  <Image
                    src={src}
                    alt={t(`process.${key}.imageAlt`)}
                    fill
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-cream-50 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            {t('projects.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-charcoal/70">{t('projects.lead')}</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {projectImages.map(({ src, key }) => (
              <article key={key} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-56 w-full">
                  <Image
                    src={src}
                    alt={t(`projects.${key}.imageAlt`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-navy-950">
                    {t(`projects.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-amber-400">
                    {t(`projects.${key}.size`)}
                  </p>
                  <dl className="mt-4 space-y-1 text-sm text-charcoal/70">
                    <div>{t(`projects.${key}.panels`)}</div>
                    <div>{t(`projects.${key}.location`)}</div>
                    <div>{t(`projects.${key}.duration`)}</div>
                  </dl>
                  <p className="mt-3 text-sm font-medium text-charcoal">
                    {t(`projects.${key}.outcome`)}
                  </p>
                  <p className="mt-3 text-sm italic text-charcoal/60">
                    {t(`projects.${key}.note`)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-charcoal/60">{t('projects.honestNote')}</p>
        </div>
      </section>

      {/* Warranty & After-Sales */}
      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-3 md:items-end">
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl font-bold text-navy-950">
                {t('warranty.title')}
              </h2>
              <p className="mt-3 max-w-2xl text-charcoal/70">{t('warranty.lead')}</p>
            </div>
            <div className="relative h-40 w-full overflow-hidden rounded-2xl md:h-full">
              <Image
                src="/assets/images/process/aftersales.jpg"
                alt={t('warranty.imageAlt')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10">
            <WarrantyTable />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <p className="rounded-2xl bg-cream-50 p-4 text-sm text-charcoal/80">
              {t('warranty.support12mo')}
            </p>
            <p className="rounded-2xl bg-cream-50 p-4 text-sm text-charcoal/80">
              {t('warranty.note')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Japanese Quality */}
      <section className="bg-royal-100 py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-950">
              {t('japanese.title')}
            </h2>
            <p className="mt-4 text-charcoal/80">{t('japanese.body')}</p>
            <ul className="mt-6 space-y-3">
              {(['point1', 'point2', 'point3'] as const).map((key) => (
                <li key={key} className="flex gap-3 text-sm text-charcoal/80">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-royal-600" />
                  {t(`japanese.${key}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src="/assets/images/quality/japanese-precision.svg"
              alt={t('japanese.imageAlt')}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-950 py-16 text-cream-50 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <SunIcon size={36} />
            <h2 className="mt-4 font-display text-3xl font-bold">{t('cta.title')}</h2>
            <p className="mt-3 max-w-md text-cream-50/70">{t('cta.body')}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-royal-600 px-8 py-3 text-sm font-semibold text-white hover:bg-royal-700"
            >
              {cta('freeAssessment')}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ctaGridImages.map((src) => (
              <div key={src} className="relative h-32 overflow-hidden rounded-2xl sm:h-40">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
