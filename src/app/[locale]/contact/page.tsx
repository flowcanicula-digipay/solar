import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';
import ContactForm from '@/components/ContactForm';
import ContactHero from '@/components/ContactHero';
import ContactBoldStatement from '@/components/ContactBoldStatement';
import ContactHandlesStrip from '@/components/ContactHandlesStrip';
import Reveal from '@/components/Reveal';

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
      {/* ── Hero ── */}
      <ContactHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* ── Bold statement 1 (light) — no obligation ── */}
      <ContactBoldStatement
        variant="light"
        label="How it starts"
        motif="/assets/motifs/viet-pin.svg"
        parts={[
          { text: 'One conversation.' },
          { text: ' No commitment.', highlight: true },
          { text: '\nA site visit ' },
          { text: 'that costs you nothing', highlight: true },
          { text: '.' },
        ]}
        caption="We come to you, assess your roof, measure your load, and tell you exactly what makes sense — before you spend a baht."
      />

      {/* ── 01 — Direct contact strip ── */}
      <section className="bg-navy-950 pb-0 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              01 — Reach Us Directly
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              {t('sidebar.direct.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cream-50/60">
              Zalo, WhatsApp, phone, email — use whatever's fastest for you. We respond the same day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <ContactHandlesStrip />
        </div>
      </section>

      {/* ── Bold statement 2 (dark) — the assessment promise ── */}
      <ContactBoldStatement
        variant="dark"
        label="Our promise"
        motif="/assets/motifs/lotus-seal.svg"
        parts={[
          { text: 'Sized to ' },
          { text: 'your roof.', highlight: true },
          { text: '\nQuoted to ' },
          { text: 'your load.', highlight: true },
        ]}
        bodyParagraphs={[
          "We don't sell a package off a shelf. After the site assessment we know your roof orientation, shading, load profile, and what EVN approval route applies. The quote that follows is for your project — not a range.",
          "No retainer. No deposit before the visit. If the site isn't suitable, we tell you before you commit to anything.",
        ]}
      />

      {/* ── 02 — Form ── */}
      <section id="form" className="bg-cream-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              02 — Request a Free Site Assessment
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('hero.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-charcoal/60">
              Tell us about your property. We&apos;ll confirm a visit time within one business day.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            {/* Form card */}
            <div className="rounded-2xl border border-navy-800/10 bg-white p-8 shadow-lg lg:p-10">
              <ContactForm />
            </div>

            {/* Sticky sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              {/* What happens next */}
              <div className="rounded-2xl border border-navy-800/10 bg-white p-6 shadow-sm">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                  What happens next
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-950">
                  {t('sidebar.next.title')}
                </h3>
                <ol className="mt-5 flex flex-col gap-5">
                  {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-royal-100 font-display text-sm font-bold text-royal-600">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 text-sm leading-relaxed text-charcoal/75">
                        {t(`sidebar.next.${step}`)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Direct contact compact */}
              <div className="rounded-2xl border border-navy-800/10 bg-white p-6 shadow-sm">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                  Prefer to call?
                </p>
                <ul className="mt-4 flex flex-col gap-4 text-sm text-charcoal/75">
                  <li className="flex items-start gap-3">
                    <Image
                      src={withBasePath('/assets/motifs/contact-phone.svg')}
                      alt=""
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{biz('phone')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      src={withBasePath('/assets/motifs/contact-mail.svg')}
                      alt=""
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{biz('email')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      src={withBasePath('/assets/motifs/contact-address.svg')}
                      alt=""
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{biz('address')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      src={withBasePath('/assets/motifs/contact-hours.svg')}
                      alt=""
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{t('sidebar.hours')}</span>
                  </li>
                </ul>
              </div>

              {/* Trust note */}
              <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-6">
                <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]">
                  <div className="absolute inset-0 bg-[url('/assets/motifs/lotus-seal.svg')] bg-contain bg-right bg-no-repeat" />
                </div>
                <p className="relative text-xs leading-relaxed text-cream-50/70 italic">
                  {t('sidebar.trust')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 03 — Japanese standards pledge ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              03 — Why SolarTNP
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              Japanese standards. Vietnamese crew.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '01',
                heading: 'Every bolt, torqued to spec',
                body: 'Japanese electrical standards govern every connection and every mounting point. Nothing is done "close enough."',
                motif: '/assets/motifs/installation.svg',
              },
              {
                num: '02',
                heading: 'We handle the paperwork',
                body: 'DOIT notification, EVN grid inspection, bi-directional metering — SolarTNP manages it end-to-end. You sign the contract, we do the rest.',
                motif: '/assets/motifs/documentation.svg',
              },
              {
                num: '03',
                heading: '25-year horizon',
                body: '5 warranties covering panels, inverter, mounting, workmanship, and roof waterproofing. 12 months free callouts from day one.',
                motif: '/assets/motifs/lotus-seal.svg',
              },
              {
                num: '04',
                heading: 'Sized to your load',
                body: 'Under Decree 135/2024, your system must match your existing load. We design to that standard — which also means you maximise self-consumption savings.',
                motif: '/assets/motifs/blueprint-seal.svg',
              },
              {
                num: '05',
                heading: 'Every project done right.',
                body: 'A young company with a non-negotiable standard. No shortcuts taken — on any job, for any client.',
                motif: '/assets/motifs/inspect-mark.svg',
              },
              {
                num: '06',
                heading: 'Southern Vietnam coverage',
                body: 'Ho Chi Minh City, Đồng Nai, Long An, and surrounding provinces. We coordinate with local EVN offices — including rural installs.',
                motif: '/assets/motifs/viet-pin.svg',
              },
            ].map((card) => (
              <Reveal key={card.num}>
                <div className="group rounded-2xl border border-navy-800/08 bg-cream-50 p-7 transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="font-display text-4xl font-bold leading-none text-navy-800/10 group-hover:text-royal-100 transition-colors duration-300">
                      {card.num}
                    </span>
                    <img
                      src={card.motif}
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      className="opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-950">
                    {card.heading}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal/65">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy-950 py-20 text-center text-cream-50">
        <Reveal className="mx-auto max-w-2xl px-6">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
            Ready?
          </p>
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            Let&apos;s look at your roof.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-50/60">
            Free site assessment. Honest quote. No commitment until you sign.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#form"
              className="inline-flex items-center gap-2 bg-amber-400 px-8 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-amber-400/90"
            >
              Request your free assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/pricing"
              className="inline-block border border-cream-50/30 px-8 py-3.5 text-sm font-semibold text-cream-50/80 transition-colors hover:border-cream-50/60 hover:text-cream-50"
            >
              View pricing →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
