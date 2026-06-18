import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactForm from '@/components/ContactForm';
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
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const biz = await getTranslations('common.business');

  return (
    <>
      <PageHero
        image="/assets/images/banner/contact-hero.jpg"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-navy-800/10 bg-white p-8 shadow-sm">
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div className="relative h-44 w-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/customer-support/customer-support-1.jpg"
                alt={t('sidebar.direct.imageAlt')}
                fill
                className="object-cover"
              />
            </div>

            <div className="rounded-2xl border border-navy-800/10 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-navy-950">
                {t('sidebar.direct.title')}
              </h2>
              <dl className="mt-4 space-y-3 text-sm text-charcoal/80">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                    {biz('addressLabel')}
                  </dt>
                  <dd>{biz('address')}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                    {biz('phoneLabel')}
                  </dt>
                  <dd>{biz('phone')}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                    {biz('emailLabel')}
                  </dt>
                  <dd>{biz('email')}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                    {biz('altEmailLabel')}
                  </dt>
                  <dd>{biz('altEmail')}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-charcoal/70">{t('sidebar.hours')}</p>
            </div>

            <div className="rounded-2xl border border-navy-800/10 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-navy-950">
                {t('sidebar.next.title')}
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-charcoal/80">
                {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-royal-600">{i + 1}.</span>
                    {t(`sidebar.next.${step}`)}
                  </li>
                ))}
              </ol>
            </div>

            <p className="rounded-2xl bg-royal-100 p-6 text-sm text-navy-950">
              {t('sidebar.trust')}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
