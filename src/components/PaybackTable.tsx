'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const SYSTEM_LIFE = 25;

const rows = [
  {
    size: '5 kWp',
    label: 'Small Home',
    savings: 1400000,
    savingsDisplay: '1,400,000',
    cost: '78,000,000',
    costUSD: '$3,100',
    paybackYears: 4.6,
    panels: '~12 panels',
    color: 'from-royal-600/20 to-royal-600/5',
    accent: '#003baf',
  },
  {
    size: '8 kWp',
    label: 'Family Home',
    savings: 2200000,
    savingsDisplay: '2,200,000',
    cost: '125,000,000',
    costUSD: '$5,000',
    paybackYears: 4.7,
    panels: '~20 panels',
    color: 'from-amber-400/20 to-amber-400/5',
    accent: '#F59E0B',
  },
  {
    size: '15 kWp',
    label: 'Office / Commercial',
    savings: 4800000,
    savingsDisplay: '4,800,000',
    cost: '230,000,000',
    costUSD: 'Custom',
    paybackYears: 4.0,
    panels: '~30 panels',
    color: 'from-royal-600/20 to-royal-600/5',
    accent: '#003baf',
  },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function CountUpYears({ target, active, delay }: { target: number; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const val = useCountUp(target * 10, started, 1600);
  return <>{(val / 10).toFixed(1)}</>;
}

function CountUpVND({ target, active, delay }: { target: number; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const val = useCountUp(target, started, 1400);
  return <>{val.toLocaleString()}</>;
}

export default function PaybackTable() {
  const t = useTranslations('pricing.payback.table');
  const [visible, setVisible] = useState(false);
  const [activeRow, setActiveRow] = useState(1); // family home default
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const row = rows[activeRow];
  const freeYears = SYSTEM_LIFE - row.paybackYears;

  return (
    <div ref={ref}>
      {/* ── System size selector ── */}
      <div
        className={`flex gap-0 transition-all duration-700 ease-out motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {rows.map((r, i) => (
          <button
            key={r.size}
            type="button"
            onClick={() => setActiveRow(i)}
            className={`flex-1 border-b-2 px-4 py-4 text-left transition-all duration-200 ${
              activeRow === i
                ? 'border-amber-400 bg-navy-800/30'
                : 'border-navy-800/20 hover:border-navy-800/50 hover:bg-navy-800/10'
            }`}
          >
            <p
              className={`font-mono text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeRow === i ? 'text-amber-400' : 'text-cream-50/40'
              }`}
            >
              {r.size}
            </p>
            <p
              className={`mt-0.5 text-sm font-semibold transition-colors ${
                activeRow === i ? 'text-cream-50' : 'text-cream-50/50'
              }`}
            >
              {r.label}
            </p>
          </button>
        ))}
      </div>

      {/* ── Main payback display ── */}
      <div
        className={`mt-0 border border-t-0 border-navy-800/20 transition-all duration-700 ease-out motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ transitionDelay: '120ms' }}
      >
        {/* Big number hero */}
        <div className="relative overflow-hidden bg-navy-950 px-8 py-14 text-cream-50 md:px-14">
          {/* Faint radiance behind the number */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ backgroundColor: `${row.accent}18` }}
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            {/* Left — the number */}
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cream-50/35">
                Estimated payback period
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  className="font-display font-bold leading-none tabular-nums"
                  style={{
                    fontSize: 'clamp(4.5rem, 12vw, 8rem)',
                    color: row.accent,
                  }}
                >
                  <CountUpYears target={row.paybackYears} active={visible} delay={200} />
                </span>
                <span className="font-display text-2xl font-bold text-cream-50/40">years</span>
              </div>

              {/* Timeline bar */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-cream-50/30">
                  <span>Year 0</span>
                  <span>Year {Math.round(row.paybackYears)}</span>
                  <span>Year 25</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-cream-50/8">
                  {/* Payback segment */}
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-[1800ms] ease-out motion-reduce:transition-none"
                    style={{
                      width: visible ? `${(row.paybackYears / SYSTEM_LIFE) * 100}%` : '0%',
                      backgroundColor: row.accent,
                      transitionDelay: '400ms',
                    }}
                  />
                  {/* Free generation segment */}
                  <div
                    className="absolute top-0 h-full rounded-r-full bg-amber-400/30 transition-[width,left] duration-[1800ms] ease-out motion-reduce:transition-none"
                    style={{
                      left: visible ? `${(row.paybackYears / SYSTEM_LIFE) * 100}%` : '0%',
                      width: visible ? `${(freeYears / SYSTEM_LIFE) * 100}%` : '0%',
                      transitionDelay: '600ms',
                    }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-cream-50/40">
                  <span style={{ color: row.accent }}>← paying off</span>
                  <span className="text-amber-400/70">free power →</span>
                </div>
              </div>

              {/* Free years callout */}
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/8 px-5 py-2.5">
                <span className="font-mono text-xl font-bold text-amber-400">
                  {freeYears.toFixed(1)}
                </span>
                <span className="text-sm text-cream-50/60">
                  years of free electricity after payback
                </span>
              </div>
            </div>

            {/* Right — the numbers that make it real */}
            <div className="space-y-0 divide-y divide-cream-50/8">
              <div className="pb-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cream-50/30">
                  Est. monthly saving
                </p>
                <p className="mt-1.5 font-mono text-2xl font-bold text-cream-50">
                  <CountUpVND target={row.savings} active={visible} delay={300} />
                  <span className="ml-1 text-sm font-normal text-cream-50/40">VND/mo</span>
                </p>
              </div>

              <div className="py-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cream-50/30">
                  System cost
                </p>
                <p className="mt-1.5 font-mono text-2xl font-bold text-cream-50">
                  {row.cost}
                  <span className="ml-1 text-sm font-normal text-cream-50/40">VND</span>
                </p>
                <p className="mt-0.5 font-mono text-xs text-cream-50/30">≈ {row.costUSD} USD</p>
              </div>

              <div className="py-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cream-50/30">
                  System size
                </p>
                <p className="mt-1.5 font-mono text-2xl font-bold text-cream-50">
                  {row.size}
                </p>
                <p className="mt-0.5 font-mono text-xs text-cream-50/30">{row.panels}</p>
              </div>

              <div className="pt-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cream-50/30">
                  Panel output guarantee
                </p>
                <p className="mt-1.5 font-mono text-2xl font-bold text-amber-400">25 years</p>
                <p className="mt-0.5 font-mono text-xs text-cream-50/30">≤ 0.45% annual degradation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip — the emotional closer */}
        <div className="border-t border-navy-800/20 bg-navy-800/20 px-8 py-5 md:px-14">
          <p className="text-sm text-cream-50/50">
            <span className="font-semibold text-cream-50/80">These are estimates</span> — actual
            savings depend on your roof orientation, household load, and EVN tariffs at the time of
            install. We provide a calculation specific to your bill at the free site assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
