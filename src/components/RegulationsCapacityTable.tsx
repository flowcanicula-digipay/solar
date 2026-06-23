'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface RowData {
  range: string;
  who: string;
  process: string;
  accent: string;
  badge?: string;
}

function CapacityRow({
  row,
  index,
  badge,
}: {
  row: RowData;
  index: number;
  badge?: string;
}) {
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
    <div
      ref={ref}
      className={`group relative border-b border-cream-50/8 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
    >
      {/* Hover amber left bar */}
      <div className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-amber-400 transition-transform duration-300 ease-out group-hover:scale-y-100 origin-top" />

      <div className="grid grid-cols-1 gap-0 px-8 py-10 md:grid-cols-[1fr_auto] md:items-start md:gap-8 lg:grid-cols-[280px_1fr_auto] lg:items-center">
        {/* Capacity range — large mono display */}
        <div className="mb-4 lg:mb-0">
          <p className="font-mono text-[clamp(1.5rem,3.5vw,2.2rem)] font-bold leading-none tracking-tight text-amber-400 transition-opacity duration-300 group-hover:opacity-90">
            {row.range}
          </p>
          {badge && (
            <span className="mt-3 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
              {badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1 lg:flex-row lg:gap-12">
          <div className="min-w-[160px]">
            <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-50/30">
              Who
            </p>
            <p className="text-sm font-medium text-cream-50/80">{row.who}</p>
          </div>
          <div className="flex-1">
            <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-50/30">
              Process
            </p>
            <p className="text-sm leading-relaxed text-cream-50/60">{row.process}</p>
          </div>
        </div>

        {/* Large index number — right side decorative */}
        <p
          className="pointer-events-none hidden select-none font-mono text-[5rem] font-black leading-none text-cream-50/[0.04] transition-colors duration-300 group-hover:text-amber-400/[0.07] lg:block"
          aria-hidden="true"
        >
          0{index + 1}
        </p>
      </div>
    </div>
  );
}

export default function RegulationsCapacityTable() {
  const t = useTranslations('regulations.s4');

  const rows: RowData[] = [
    {
      range: t('row1.range'),
      who: t('row1.who'),
      process: t('row1.process'),
      accent: 'amber',
      badge: 'Our market',
    },
    {
      range: t('row2.range'),
      who: t('row2.who'),
      process: t('row2.process'),
      accent: 'royal',
    },
    {
      range: t('row3.range'),
      who: t('row3.who'),
      process: t('row3.process'),
      accent: 'neutral',
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-50/8 bg-navy-800/30">
      {/* Table header */}
      <div className="border-b border-cream-50/8 bg-navy-800/50 px-8 py-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-50/40">
          Capacity Thresholds — Decree 135/2024/ND-CP
        </p>
      </div>

      {rows.map((row, i) => (
        <CapacityRow key={row.range} row={row} index={i} badge={i === 0 ? row.badge : undefined} />
      ))}
    </div>
  );
}
