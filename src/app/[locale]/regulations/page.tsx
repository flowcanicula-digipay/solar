import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import RegulationsTable from '@/components/RegulationsTable';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.regulations' });
  return { title: t('title'), description: t('description') };
}

/* TODO: Verify regulation content against current decree before going live.
   Last verified: 17 June 2026. Source: Decree 135/2024/ND-CP. If Vietnamese
   solar law has been updated since this date, update the content in
   src/messages/en.json (regulations.* keys) and the equivalent vi.json
   and ja.json keys. */

export default async function RegulationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('regulations');
  const items = t.raw('s6.items') as string[];

  return (
    <>
      <section className="bg-navy-950 py-16 text-cream-50 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="max-w-2xl font-display text-4xl font-bold">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-cream-50/80">{t('subtitle')}</p>
        </div>
      </section>

      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s1.heading')}</h2>
            <p className="mt-3 text-charcoal/80">{t('s1.body')}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s2.heading')}</h2>
            <p className="mt-3 text-charcoal/80">{t('s2.body')}</p>
            <p className="mt-3 font-mono text-sm font-semibold text-royal-700">{t('s2.cap')}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s3.heading')}</h2>
            <p className="mt-3 text-charcoal/80">{t('s3.body')}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s4.heading')}</h2>
            <p className="mt-3 text-charcoal/80">{t('s4.intro')}</p>
            <div className="mt-6">
              <RegulationsTable />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s5.heading')}</h2>
            <p className="mt-3 text-charcoal/80">{t('s5.body')}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">{t('s6.heading')}</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-charcoal/80">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-royal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-800/10 bg-white p-6 text-sm text-charcoal/60">
            <p className="font-semibold text-navy-950">{t('sources.label')}</p>
            <p className="mt-2">{t('sources.note')}</p>
            <p className="mt-2">{t('sources.lastVerified')}</p>
          </div>

          <p className="text-xs text-charcoal/50">{t('disclaimer')}</p>
        </div>
      </section>
    </>
  );
}
