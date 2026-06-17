import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import SunIcon from '@/components/SunIcon';

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
      <section className="bg-cream-50 py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-950">
              {t('about.title')}
            </h2>
            <p className="mt-4 text-charcoal/80">{t('about.body')}</p>
          </div>
          <ul className="space-y-4 self-center">
            {(['point1', 'point2', 'point3', 'point4'] as const).map((key) => (
              <li key={key} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-royal-600" />
                <span className="text-sm text-charcoal/80">{t(`about.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-navy-950 py-14 text-cream-50 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">{t('process.title')}</h2>
          <p className="mt-3 max-w-2xl text-cream-50/70">{t('process.lead')}</p>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {(['step1', 'step2', 'step3'] as const).map((step, i) => (
              <li key={step} className="rounded-2xl border border-cream-50/10 p-6">
                <span className="font-display text-3xl font-bold text-royal-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t(`process.${step}.title`)}</h3>
                <p className="mt-2 text-sm text-cream-50/70">{t(`process.${step}.body`)}</p>
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
              src="/assets/images/quality/japanese-quality.svg"
              alt={t('japanese.imageAlt')}
              fill
              className="object-contain p-6"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-950 py-16 text-center text-cream-50">
        <div className="mx-auto max-w-2xl px-6">
          <SunIcon size={40} className="mx-auto" />
          <h2 className="mt-4 font-display text-3xl font-bold">{t('cta.title')}</h2>
          <p className="mt-3 text-cream-50/70">{t('cta.body')}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-royal-600 px-8 py-3 text-sm font-semibold text-white hover:bg-royal-700"
          >
            {cta('freeAssessment')}
          </Link>
        </div>
      </section>
    </>
  );
}
