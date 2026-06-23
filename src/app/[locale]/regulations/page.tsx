import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import RegulationsHero from '@/components/RegulationsHero';
import RegulationsBoldStatement from '@/components/RegulationsBoldStatement';
import RegulationsCapacityTable from '@/components/RegulationsCapacityTable';
import RegulationsHandlesStrip from '@/components/RegulationsHandlesStrip';
import Reveal from '@/components/Reveal';
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
  const cta = await getTranslations('common.cta');
  const items = t.raw('s6.items') as string[];

  return (
    <>
      {/* ── Hero ── */}
      <RegulationsHero title={t('title')} subtitle={t('subtitle')} />

      {/* ── 01 — Self-Consumption First (light) ── */}
      <section id="rules" className="bg-cream-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              01 — The Core Rule
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              {t('s1.heading')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-charcoal/70 lg:text-lg">
              {t('s1.body')}
            </p>
          </Reveal>

          {/* Callout card */}
          <Reveal delay={240}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-navy-950/8 bg-navy-950">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-cream-50/8 p-8 md:border-b-0 md:border-r">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                    The intent
                  </p>
                  <p className="mt-4 font-display text-xl font-bold leading-snug text-cream-50">
                    Solar is for your roof, not for the grid.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream-50/55">
                    Decree 135 was designed to prevent oversized export farms. Your system must match your actual electricity consumption — which is exactly how a properly engineered system should be sized anyway.
                  </p>
                </div>
                <div className="p-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                    In practice
                  </p>
                  <p className="mt-4 font-display text-xl font-bold leading-snug text-cream-50">
                    SolarTNP sizes to your load, not to a template.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream-50/55">
                    Every SolarTNP system begins with an energy audit of your actual consumption. This isn't compliance theatre — it's the right way to design a solar system.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bold statement 1 (light) — the 20% rule ── */}
      <RegulationsBoldStatement
        variant="light"
        label="The surplus rule"
        motif="/assets/motifs/solar-panel.svg"
        parts={[
          { text: 'You own the sun.' },
          { text: '\nEVN gets ' },
          { text: '20%.', highlight: true },
          { text: ' Maximum.' },
        ]}
        caption="The surplus cap is real — and it changes the financial logic. Self-consumption savings are the story now, not export revenue."
      />

      {/* ── 02 — Surplus Cap (dark) ── */}
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              02 — {t('s2.heading')}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-16">
            <Reveal delay={80}>
              <p className="text-base leading-relaxed text-cream-50/65">
                {t('s2.body')}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-cream-50/8 bg-navy-800/40 p-8">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                  Hard cap
                </p>
                <p className="mt-4 font-mono text-5xl font-black text-amber-400 lg:text-6xl">
                  20<span className="text-3xl text-amber-400/60">%</span>
                </p>
                <p className="mt-2 text-sm font-medium text-cream-50/60">
                  {t('s2.cap')}
                </p>
                <div className="mt-6 h-px w-full bg-cream-50/8" />
                <p className="mt-4 text-xs text-cream-50/40">
                  Compensated at the preceding year's average electricity market price — not the old high feed-in tariff.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 — Off-Grid Exception (light) ── */}
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              03 — {t('s3.heading')}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-950 lg:text-4xl">
              Go fully off-grid. No limits.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-charcoal/70">
              {t('s3.body')}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 inline-flex items-start gap-4 rounded-2xl border border-navy-950/8 bg-white p-6 shadow-sm">
              <img
                src={withBasePath('/assets/motifs/off-grid.svg')}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="mt-0.5 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-navy-950">Ask about full off-grid systems</p>
                <p className="mt-1 text-sm text-charcoal/55">
                  Remote properties, backup power, or full energy independence — SolarTNP designs battery-backed off-grid systems with no capacity ceiling.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bold statement 2 (dark) — compliance as design ── */}
      <RegulationsBoldStatement
        variant="dark"
        label="The compliance reality"
        motif="/assets/motifs/compass-seal.svg"
        parts={[
          { text: 'The rules are ' },
          { text: 'strict.', highlight: true },
          { text: '\nThe paperwork is ' },
          { text: 'ours.', highlight: true },
        ]}
        bodyParagraphs={[
          "Decree 135 requires DOIT notification, EVN grid inspection, and building compliance checks before your system can connect. This is not a formality — it's a real multi-agency process.",
          "SolarTNP manages every step end-to-end. You sign the installation contract. We handle the bureaucracy. We've done it before — including rural province EVN offices.",
        ]}
      />

      {/* ── 04 — Capacity Thresholds (dark) ── */}
      <section className="bg-navy-950 pb-0 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              04 — {t('s4.heading')}
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              Three tiers. One clear path.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cream-50/50">
              Every installation in Vietnam falls into one of these three categories. For residential and most commercial — that's under 100 kW — the process is straightforward.
            </p>
          </Reveal>
          <div className="mt-12">
            <RegulationsCapacityTable />
          </div>
        </div>

        {/* Amber rule before next section */}
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <div className="h-px w-full bg-cream-50/8" />
        </div>
      </section>

      {/* ── 05 — Building Compliance (dark, continued) ── */}
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              05 — {t('s5.heading')}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-16">
            <Reveal delay={80}>
              <p className="text-base leading-relaxed text-cream-50/65">
                {t('s5.body')}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-7">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                  What we check during site assessment
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Construction law compliance',
                    'Land-use rights status',
                    'Fire safety standards',
                    'Environmental regulations',
                    'Structural roof load capacity',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream-50/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 — How SolarTNP Handles This (dark strip) ── */}
      <section className="bg-navy-950 pb-0">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              06 — {t('s6.heading')}
            </p>
            <h2 className="font-display text-3xl font-bold text-cream-50 lg:text-4xl">
              End-to-end. No gaps.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cream-50/50">
              No leading solar installer in Vietnam, no subcontractors, no part-managed paperwork. SolarTNP owns every step from site visit to grid connection.
            </p>
          </Reveal>
        </div>

        <RegulationsHandlesStrip />
      </section>

      {/* ── Sources & Disclaimer ── */}
      <section className="border-t border-navy-800/10 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="rounded-2xl border border-navy-800/8 bg-cream-50 p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-navy-950/40">
                {t('sources.label')}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{t('sources.note')}</p>
              <p className="mt-2 text-xs text-charcoal/40">{t('sources.lastVerified')}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-xs leading-relaxed text-charcoal/40">{t('disclaimer')}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy-950 py-20 text-center text-cream-50">
        <Reveal className="mx-auto max-w-2xl px-6">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
            Ready?
          </p>
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            We handle the compliance. You enjoy the savings.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-50/60">
            Every SolarTNP install includes DOIT notification, EVN connection, and full building compliance check — at no extra cost.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-block bg-amber-400 px-8 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-amber-400/90"
            >
              {cta('freeAssessment')}
            </Link>
            <Link
              href="/pricing"
              className="inline-block border border-cream-50/30 px-8 py-3.5 text-sm font-semibold text-cream-50/80 transition-colors hover:border-cream-50/60 hover:text-cream-50"
            >
              See pricing →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
