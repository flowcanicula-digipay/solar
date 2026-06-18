import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import PaybackTable from '@/components/PaybackTable';
import PricingFAQ from '@/components/PricingFAQ';
import PageHero from '@/components/PageHero';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.pricing' });
  return { title: t('title'), description: t('description') };
}

const tierKeys = ['small', 'medium', 'large'] as const;

const includedImages = [
  '/assets/images/aftersales/warranty.png',
  '/assets/images/process/step1-consult.jpg',
  '/assets/images/process/step3-install.jpg',
  '/assets/images/about/company-team.jpg',
  '/assets/images/process/step4-support.jpg',
  '/assets/images/process/aftersales.jpg',
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pricing');
  const cta = await getTranslations('common.cta');
  const items = t.raw('included.items') as string[];

  return (
    <>
      <PageHero
        image="/assets/images/banner/pricing-hero.png"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {tierKeys.map((key) => (
              <div
                key={key}
                className="flex flex-col rounded-2xl border border-navy-800/10 bg-white p-8 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-royal-700">
                  {t(`tiers.${key}.tagline`)}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy-950">
                  {t(`tiers.${key}.name`)}
                </h2>
                <p className="mt-1 font-mono text-sm text-charcoal/60">
                  {t(`tiers.${key}.size`)}
                </p>
                <p className="mt-4 flex-1 text-sm text-charcoal/70">
                  {t(`tiers.${key}.description`)}
                </p>
                <p className="mt-6 text-sm font-semibold text-navy-950">
                  {t(`tiers.${key}.price`)}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center gap-1 rounded-full bg-royal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-royal-700"
                >
                  {cta('getQuote')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20">
        <div className="pointer-events-none absolute inset-0 select-none">
          <Image
            src="/assets/images/hero/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-navy-950/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
              {t('included.label')}
            </p>
            <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
              {t('included.title')}
            </h2>
          </div>
          <ul className="flex flex-wrap justify-center gap-4">
            {items.map((item, i) => (
              <li
                key={item}
                className="group relative h-40 w-[calc(50%-8px)] cursor-default overflow-hidden rounded-2xl sm:h-44 sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
              >
                <Image
                  src={includedImages[i % includedImages.length]}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover brightness-[0.45] transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-royal-600/70" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 p-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-royal-600/80 transition-colors duration-300 group-hover:bg-royal-600">
                    <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium leading-snug text-white">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            {t('payback.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-charcoal/70">{t('payback.note')}</p>
          <div className="mt-8">
            <PaybackTable />
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-navy-950">{t('faq.title')}</h2>
          <div className="mt-8">
            <PricingFAQ />
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 text-center text-cream-50">
        <div className="mx-auto max-w-2xl px-6">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-royal-600 px-8 py-3 text-sm font-semibold text-white hover:bg-royal-700"
          >
            {cta('freeAssessment')}
          </Link>
        </div>
      </section>
    </>
  );
}
