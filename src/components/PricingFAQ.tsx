'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export default function PricingFAQ() {
  const t = useTranslations('pricing.faq');
  const [openKey, setOpenKey] = useState<string | null>(null);
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="divide-y divide-navy-800/10">
      {questionKeys.map((key, i) => {
        const isOpen = openKey === key;
        return (
          <div
            key={key}
            className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : key)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-amber-400"
            >
              {/* Number + question */}
              <div className="flex items-baseline gap-4">
                <span className="flex-shrink-0 font-mono text-xs font-semibold text-navy-600/40 group-hover:text-amber-400/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-base font-semibold leading-snug text-navy-950 group-hover:text-navy-950 sm:text-lg">
                  {t(`${key}.question`)}
                </span>
              </div>

              {/* Lotus expand icon */}
              <span className="flex-shrink-0">
                <LotusToggle open={isOpen} />
              </span>
            </button>

            {/* Answer — animated height */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out motion-reduce:transition-none ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="pb-6 pl-10 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                {t(`${key}.answer`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LotusToggle({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-out ${open ? 'rotate-45' : 'rotate-0'}`}
    >
      {/* Four lotus petals as a plus/cross that rotates to × */}
      <ellipse cx="12" cy="7" rx="2" ry="4.5" fill="currentColor" opacity="0.5" />
      <ellipse cx="12" cy="17" rx="2" ry="4.5" fill="currentColor" opacity="0.5" />
      <ellipse cx="7" cy="12" rx="4.5" ry="2" fill="currentColor" opacity="0.5" />
      <ellipse cx="17" cy="12" rx="4.5" ry="2" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}
