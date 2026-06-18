'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const SYSTEM_LIFE_YEARS = 25;

const rows = [
  { size: '5 kWp', savings: '~1,400,000 VND', cost: '~78,000,000 VND', paybackYears: 4.6 },
  { size: '8 kWp', savings: '~2,200,000 VND', cost: '~125,000,000 VND', paybackYears: 4.7 },
  { size: '15 kWp', savings: '~4,800,000 VND', cost: '~230,000,000 VND', paybackYears: 4.0 },
];

export default function PaybackTable() {
  const t = useTranslations('pricing.payback.table');
  const [visible, setVisible] = useState(false);
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-3">
      {rows.map((row, i) => {
        const pct = Math.round((row.paybackYears / SYSTEM_LIFE_YEARS) * 100);
        return (
          <div
            key={row.size}
            className={`rounded-2xl border border-navy-800/10 bg-white p-6 shadow-sm transition-all duration-700 ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: visible ? `${i * 130}ms` : '0ms' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-royal-700">
              {row.size}
            </p>

            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-bold text-navy-950">
                {row.paybackYears}
              </span>
              <span className="text-sm font-medium text-charcoal/50">{t('yearsUnit')}</span>
            </p>
            <p className="text-xs text-charcoal/50">{t('payback')}</p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-cream-50">
              <div
                className="h-2 rounded-full bg-royal-600 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{ width: visible ? `${pct}%` : '0%', transitionDelay: `${i * 130 + 150}ms` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-charcoal/50">
              {pct}% {t('ofSystemLife')}
            </p>

            <dl className="mt-5 space-y-2 border-t border-navy-800/10 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-charcoal/60">{t('savings')}</dt>
                <dd className="font-mono text-navy-950">
                  {row.savings}
                  {t('perMonth')}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-charcoal/60">{t('cost')}</dt>
                <dd className="font-mono text-navy-950">{row.cost}</dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}
