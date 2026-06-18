import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { withBasePath } from '@/lib/assetPath';

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
  const common = await getTranslations('common');
  const biz = await getTranslations('common.business');

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[400px] items-center overflow-hidden py-20 text-cream-50 md:min-h-[460px]">
        <Image
          src={withBasePath('/assets/images/banner/contact-hero.jpg')}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/45" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {common('heroLabel')}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream-50/80">{t('hero.subtitle')}</p>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-24 bg-cream-50/25" />
            <span className="h-1 w-1 rounded-full bg-amber-400" />
          </div>
          <p className="mt-6 text-xs tracking-[0.2em] text-cream-50/45">
            太陽光発電 ・ 日本基準 ・ ベトナムの職人技
          </p>
          <p className="mt-2 font-display text-sm italic text-cream-50/55">
            Solar done properly. Built to last 25 years.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-cream-50 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="rounded-2xl border border-navy-800/10 bg-white p-8 shadow-lg lg:p-10">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-sm sm:h-56">
              <Image
                src={withBasePath('/assets/images/contact/vietnam-flags.jpg')}
                alt={t('sidebar.direct.imageAlt')}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="rounded-2xl border border-navy-800/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-navy-950">
                {t('sidebar.direct.title')}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-charcoal/80">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />
                  <span>{biz('address')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />
                  <span>{biz('phone')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />
                  <span>{biz('email')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />
                  <span>{biz('altEmail')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />
                  <span>{t('sidebar.hours')}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-navy-800/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-navy-950">
                {t('sidebar.next.title')}
              </h2>
              <ol className="mt-5 flex flex-col gap-4">
                {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-7 flex-shrink-0 font-display text-2xl font-bold leading-none text-royal-100">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 text-sm text-charcoal/80">
                      {t(`sidebar.next.${step}`)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="rounded-xl bg-royal-100/60 px-4 py-3 text-xs italic leading-relaxed text-navy-950/80">
              {t('sidebar.trust')}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
