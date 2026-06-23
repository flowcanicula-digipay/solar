import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';
import SourcingForm from '@/components/SourcingForm';
import SourcingHero from '@/components/SourcingHero';
import SourcingBoldStatement from '@/components/SourcingBoldStatement';
import SourcingHandlesStrip from '@/components/SourcingHandlesStrip';
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
  const t = await getTranslations({ locale, namespace: 'meta.sourcing' });
  return { title: t('title'), description: t('description') };
}

export default async function SourcingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sourcing');
  const biz = await getTranslations('common.business');

  return (
    <>
      {/* ── Hero ── */}
      <SourcingHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* ── Bold statement 1 (light) — the sourcing advantage ── */}
      <SourcingBoldStatement
        variant="light"
        label="The advantage"
        motif="/assets/motifs/export-crate.svg"
        parts={[
          { text: 'Factory-level quality.' },
          { text: '\nNot spec-sheet', highlight: true },
          { text: ' quality.' },
        ]}
        caption="SolarTNP evaluates panels at the manufacturing level — not just the datasheet. That access flows directly to our sourcing clients."
      />

      {/* ── 01 — Channels strip ── */}
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
              WhatsApp or email — we respond to B2B enquiries within one business day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <SourcingHandlesStrip />
        </div>
      </section>

      {/* ── Bold statement 2 (dark) — the sourcing promise ── */}
      <SourcingBoldStatement
        variant="dark"
        label="Our sourcing model"
        motif="/assets/motifs/pallet-wrap.svg"
        parts={[
          { text: 'Global network.' },
          { text: '\nNo middlemen.', highlight: true },
        ]}
        bodyParagraphs={[
          "We source direct from manufacturers across the global solar supply chain — panels, inverters, mounting hardware, cabling. The same network we use for our own Vietnamese installs.",
          "You get factory pricing, Japanese-standard QC evaluation, and a single point of contact for freight and customs to the US or Southeast Asia.",
        ]}
      />

      {/* ── 02 — Form ── */}
      <section id="form" className="bg-cream-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              02 — Request a Sourcing Quote
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('hero.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-charcoal/60">
              Tell us what you need and where it&apos;s going. We&apos;ll come back with availability and pricing within one business day.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            {/* Form card */}
            <div className="rounded-2xl border border-navy-800/10 bg-white p-8 shadow-lg lg:p-10">
              <SourcingForm />
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
                  Prefer to reach out directly?
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
                      src={withBasePath('/assets/motifs/contact-mail.svg')}
                      alt=""
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{biz('altEmail')}</span>
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
                  <div className="absolute inset-0 bg-[url('/assets/motifs/heritage-seal.svg')] bg-contain bg-right bg-no-repeat" />
                </div>
                <p className="relative text-xs leading-relaxed text-cream-50/70 italic">
                  {t('sidebar.trust')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 03 — Why source through SolarTNP ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              03 — Why Source Through SolarTNP
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              The same standards. A different direction.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '01',
                heading: 'Manufacturing-level evaluation',
                body: 'We assess panel quality at the factory, not the spec sheet. Degradation curves, laminate quality, cell binning — evaluated before purchase.',
                motif: '/assets/motifs/inspect-mark.svg',
              },
              {
                num: '02',
                heading: 'Competitive factory pricing',
                body: 'Direct supplier relationships built through our own install programme. No distributor margin between you and the source.',
                motif: '/assets/motifs/blueprint-seal.svg',
              },
              {
                num: '03',
                heading: 'US & Southeast Asia freight',
                body: 'We handle logistics end-to-end — container booking, freight, customs documentation, and last-mile coordination to your port or warehouse.',
                motif: '/assets/motifs/export-crate.svg',
              },
              {
                num: '04',
                heading: 'Full equipment range',
                body: 'Panels, inverters (string & micro), mounting rails, stainless fasteners, DC/AC cabling, connectors, and combiner boxes. Single-source for complete BOM.',
                motif: '/assets/motifs/solar-panel.svg',
              },
              {
                num: '05',
                heading: 'Japanese-standard QC mindset',
                body: 'The same standard that governs our Vietnamese installs applies to what leaves our supply chain. No component that fails our own threshold ships to a client.',
                motif: '/assets/motifs/compass-seal.svg',
              },
              {
                num: '06',
                heading: 'One contact. All the way through.',
                body: 'From first enquiry to delivery confirmation — one point of contact. No handoffs between departments. No lost threads.',
                motif: '/assets/motifs/journey-link.svg',
              },
            ].map((card) => (
              <Reveal key={card.num}>
                <div className="group rounded-2xl border border-navy-800/08 bg-cream-50 p-7 transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="font-display text-4xl font-bold leading-none text-navy-800/10 transition-colors duration-300 group-hover:text-royal-100">
                      {card.num}
                    </span>
                    <img
                      src={card.motif}
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      className="opacity-50 transition-opacity duration-300 group-hover:opacity-80"
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
            Tell us what you need.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-50/60">
            Equipment type, quantity, destination — rough figures are fine. We&apos;ll respond within one business day.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#form"
              className="inline-flex items-center gap-2 bg-amber-400 px-8 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-amber-400/90"
            >
              Request a sourcing quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-block border border-cream-50/30 px-8 py-3.5 text-sm font-semibold text-cream-50/80 transition-colors hover:border-cream-50/60 hover:text-cream-50"
            >
              Residential installs →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
