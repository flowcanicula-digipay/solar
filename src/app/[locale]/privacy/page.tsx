import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: true },
  };
}

const sectionKeys = ['s01', 's02', 's03', 's04', 's05', 's06'] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacy');

  return (
    <section className="bg-cream-50 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-bold text-navy-950">{t('title')}</h1>
        <p className="mt-2 text-sm text-charcoal/50">{t('lastUpdated')}</p>
        <p className="mt-6 text-charcoal/80">{t('intro')}</p>

        <div className="mt-12 space-y-10">
          {sectionKeys.map((key, i) => (
            <div key={key} className="flex gap-6">
              <span className="font-display text-4xl font-bold text-navy-950/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-navy-950">
                  {t(`${key}.heading`)}
                </h2>
                <p className="mt-2 text-sm text-charcoal/70">{t(`${key}.body`)}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-sm font-semibold text-royal-700 hover:underline"
        >
          {t('backHome')}
        </Link>
      </div>
    </section>
  );
}
