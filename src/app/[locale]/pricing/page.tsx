import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import PaybackTable from '@/components/PaybackTable';
import PricingFAQ from '@/components/PricingFAQ';

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
      <section className="bg-navy-950 py-16 text-cream-50 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="max-w-2xl font-display text-4xl font-bold">{t('hero.title')}</h1>
          <p className="mt-4 max-w-xl text-cream-50/80">{t('hero.subtitle')}</p>
        </div>
      </section>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-royal-100 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            {t('included.title')}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm text-charcoal/80">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-royal-600" />
                {item}
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
