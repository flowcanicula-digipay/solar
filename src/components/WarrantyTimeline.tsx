'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Wrench,
  Droplets,
  CircuitBoard,
  Anchor,
  Sun,
  Factory,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const rows: {
  key: 'row4' | 'row5' | 'row2' | 'row3' | 'row1';
  Icon: LucideIcon;
  pct: number;
  highlight?: boolean;
  backedBySolarTNP: boolean;
}[] = [
  { key: 'row4', Icon: Wrench, pct: 8, backedBySolarTNP: true },
  { key: 'row5', Icon: Droplets, pct: 8, backedBySolarTNP: true },
  { key: 'row2', Icon: CircuitBoard, pct: 40, backedBySolarTNP: false },
  { key: 'row3', Icon: Anchor, pct: 40, backedBySolarTNP: true },
  { key: 'row1', Icon: Sun, pct: 100, highlight: true, backedBySolarTNP: false },
];

export default function WarrantyTimeline() {
  const t = useTranslations('home.warranty');
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
    <div ref={ref} className="flex flex-col gap-5">
      {rows.map(({ key, Icon, pct, highlight, backedBySolarTNP }, i) => (
        <div
          key={key}
          className={`flex items-center gap-4 rounded-2xl p-5 transition-all duration-700 ease-out motion-reduce:transition-none ${
            highlight ? 'bg-royal-100/50' : ''
          } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
        >
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
              highlight ? 'bg-royal-600' : 'bg-royal-600/10'
            }`}
          >
            <Icon
              className={`h-5 w-5 ${highlight ? 'text-white' : 'text-royal-600'}`}
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-sm font-semibold text-navy-950">{t(`${key}.component`)}</p>
              <p className="font-mono text-sm font-bold text-royal-700">{t(`${key}.duration`)}</p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-50">
              <div
                className="h-2 rounded-full bg-royal-600 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{ width: visible ? `${pct}%` : '0%', transitionDelay: `${i * 120 + 150}ms` }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/70">{t(`${key}.coverage`)}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-charcoal/40">
                {t('headers.provider')}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  backedBySolarTNP
                    ? 'bg-royal-600 text-white'
                    : 'border border-navy-800/15 bg-cream-50 text-navy-950'
                }`}
              >
                {backedBySolarTNP ? (
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Factory className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {t(`${key}.provider`)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
