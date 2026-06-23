import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { withBasePath } from '@/lib/assetPath';
import PaybackTable from '@/components/PaybackTable';
import PricingFAQ from '@/components/PricingFAQ';
import PricingTiers from '@/components/PricingTiers';
import PricingBoldStatement from '@/components/PricingBoldStatement';
import PricingHero from '@/components/PricingHero';
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
  const t = await getTranslations({ locale, namespace: 'meta.pricing' });
  return { title: t('title'), description: t('description') };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pricing');
  const cta = await getTranslations('common.cta');

  return (
    <>
      {/* ── Hero ── */}
      <PricingHero title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* ── 01 — Pricing tiers ── */}
      <section id="tiers" className="bg-cream-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              01 — Choose Your System
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('tiers.selectLabel')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-charcoal/60">
              Every system is sized to your actual load — not to a tier template. The sizes below are
              starting points; your final design may differ.
            </p>
          </Reveal>
          <div className="mt-12">
            <PricingTiers />
          </div>
        </div>
      </section>

      {/* ── Bold statement 1 (light) — pricing honesty ── */}
      <PricingBoldStatement
        variant="light"
        label="How we quote"
        motif="/assets/motifs/lotus-seal.svg"
        parts={[
          { text: "We don't guess at a number " },
          { text: 'and hope it holds', highlight: true },
          { text: ' — every quote is ' },
          { text: 'scoped to your project first', highlight: true },
          { text: ', then priced ' },
          { text: 'without padding', highlight: true },
          { text: '.' },
        ]}
        caption="One conversation. One honest number. No retainer games."
      />

      {/* ── 02 — What's included ── */}
      <section className="bg-navy-950 pb-0 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              02 — Always Included
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              {t('included.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cream-50/60">
              No hidden add-ons after the quote. Everything below is part of every SolarTNP installation.
            </p>
          </Reveal>
        </div>

        <IncludedStrip />
      </section>

      {/* ── Bold statement 2 (dark) — brand promise ── */}
      <PricingBoldStatement
        variant="dark"
        label="Our promise"
        motif="/assets/motifs/solar-panel.svg"
        parts={[
          { text: 'Priced to ' },
          { text: 'your roof.', highlight: true },
          { text: '\nNot to ' },
          { text: 'a template.', highlight: true },
        ]}
        bodyParagraphs={[
          "We're solar engineers first — site assessment, system design, and installation built around how Vietnamese homes and businesses actually use their power.",
          "Once installed, nobody watches over your system for longer or more carefully. That's not a slogan. It's how we built the business.",
        ]}
      />

      {/* ── 03 — Payback ── */}
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              03 — Payback Estimates
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              {t('payback.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cream-50/50">{t('payback.note')}</p>
          </Reveal>
          <div className="mt-12">
            <PaybackTable />
          </div>
        </div>
      </section>

      {/* ── 04 — FAQ ── */}
      <section className="border-t border-navy-800/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              04 — {t('faq.title')}
            </p>
            <h2 className="font-display text-2xl font-bold text-navy-950 lg:text-3xl">
              Common questions, straight answers.
            </h2>
          </Reveal>
          <div className="mt-10">
            <PricingFAQ />
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
            {t('finalCta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-50/60">{t('finalCta.body')}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-block bg-amber-400 px-8 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-amber-400/90"
            >
              {cta('freeAssessment')}
            </Link>
            <Link
              href="/sourcing"
              className="inline-block border border-cream-50/30 px-8 py-3.5 text-sm font-semibold text-cream-50/80 transition-colors hover:border-cream-50/60 hover:text-cream-50"
            >
              International Sourcing →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ── Always-Included portrait strip (TNP-style) ── */
const includedItems = [
  {
    label: 'Site assessment & energy audit',
    photo: '/assets/images/process/step1-consult.jpg',
    motif: '/assets/motifs/consultation.svg',
  },
  {
    label: 'System design',
    photo: '/assets/images/process/step2-design.jpg',
    motif: '/assets/motifs/blueprint-seal.svg',
  },
  {
    label: 'Japanese-standard installation',
    photo: '/assets/images/process/step3-install.jpg',
    motif: '/assets/motifs/installation.svg',
  },
  {
    label: 'EVN & DOIT paperwork',
    photo: '/assets/images/process/step4-support.jpg',
    motif: '/assets/motifs/documentation.svg',
  },
  {
    label: 'Monitoring app setup',
    photo: '/assets/images/quality/japanese-precision.jpg',
    motif: '/assets/motifs/handover.svg',
  },
  {
    label: '12 months free callouts',
    photo: '/assets/images/process/aftersales.jpg',
    motif: '/assets/motifs/lotus-seal.svg',
  },
];

function IncludedStrip() {
  return (
    <div className="mt-14 flex overflow-x-auto">
      {includedItems.map((item, i) => (
        <div
          key={item.label}
          className="group relative min-w-[200px] flex-1"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Portrait photo */}
          <div className="relative h-[420px] w-full overflow-hidden md:h-[500px]">
            <Image
              src={withBasePath(item.photo)}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover brightness-[0.55] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.7]"
            />
            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            {/* Vertical separator */}
            {i < includedItems.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-px bg-cream-50/10" />
            )}
            {/* Motif — centered in card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                <Image
                  src={withBasePath(item.motif)}
                  alt=""
                  aria-hidden="true"
                  width={72}
                  height={72}
                  className="opacity-80 drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Label below photo */}
          <div className="border-t border-cream-50/10 bg-navy-950 px-4 py-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-cream-50/70 transition-colors duration-300 group-hover:text-amber-400">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
