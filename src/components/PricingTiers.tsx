'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { withBasePath } from '@/lib/assetPath';

const tierKeys = ['small', 'medium', 'large'] as const;

const tierMotifs = [
  '/assets/motifs/pricing-consult.svg',
  '/assets/motifs/pricing-design.svg',
  '/assets/motifs/pricing-fullservice.svg',
];

const tierNumbers = ['01', '02', '03'];

const tierFeatures: Record<string, string[]> = {
  small: [
    'Site assessment & energy audit',
    'System design for 3–5 kWp',
    'Japanese-standard installation',
    '12 months free callouts',
    'EVN & DOIT paperwork included',
  ],
  medium: [
    'Everything in Small',
    'Structural load calculation',
    'Net-metering optimisation',
    'Monitoring app setup',
    'Priority after-sales support',
  ],
  large: [
    'Everything in Medium',
    'Custom commercial design',
    'EVN grid inspection management',
    'Annual maintenance plan',
    'Dedicated project manager',
  ],
};

export default function PricingTiers() {
  const t = useTranslations('pricing');
  const cta = useTranslations('common.cta');
  const [selected, setSelected] = useState<string>('medium');
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
    <div ref={ref} className="grid gap-8 md:grid-cols-3">
      {tierKeys.map((key, i) => {
        const isSelected = selected === key;
        const isPopular = key === 'medium';
        return (
          <div
            key={key}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => setSelected(key)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(key)}
            className={`relative flex cursor-pointer flex-col rounded-none border transition-all duration-700 ease-out motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } ${
              isSelected
                ? 'border-amber-400 bg-navy-950 text-cream-50'
                : 'border-navy-800/20 bg-white text-navy-950 hover:border-navy-800/50'
            }`}
            style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
          >
            {isSelected && (
              <div className="absolute -top-px left-0 right-0 h-0.5 bg-amber-400" />
            )}
            {isPopular && !isSelected && (
              <div className="absolute -top-px left-0 right-0 h-0.5 bg-navy-800/20" />
            )}

            {/* Numbered header */}
            <div
              className={`flex items-center justify-between border-b px-6 py-4 ${
                isSelected ? 'border-cream-50/10' : 'border-navy-800/10'
              }`}
            >
              <span
                className={`font-mono text-xs font-semibold tracking-widest ${
                  isSelected ? 'text-amber-400' : 'text-navy-600'
                }`}
              >
                {tierNumbers[i]} — {t(`tiers.${key}.tagline`).toUpperCase()}
              </span>
              {isPopular && (
                <span
                  className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                    isSelected
                      ? 'bg-amber-400 text-navy-950'
                      : 'bg-navy-800/10 text-navy-600'
                  }`}
                >
                  Most popular
                </span>
              )}
            </div>

            {/* Motif icon + name */}
            <div className="flex items-start justify-between px-6 pt-8">
              <div>
                <h2
                  className={`font-display text-3xl font-bold leading-tight ${
                    isSelected ? 'text-cream-50' : 'text-navy-950'
                  }`}
                >
                  {t(`tiers.${key}.name`)}
                </h2>
                <p
                  className={`mt-1 font-mono text-sm ${
                    isSelected ? 'text-amber-400' : 'text-navy-600'
                  }`}
                >
                  {t(`tiers.${key}.size`)}
                </p>
              </div>
              <Image
                src={withBasePath(tierMotifs[i])}
                alt=""
                aria-hidden="true"
                width={52}
                height={52}
                className="flex-shrink-0"
              />
            </div>

            {/* Description */}
            <p
              className={`mt-4 px-6 text-sm leading-relaxed ${
                isSelected ? 'text-cream-50/70' : 'text-charcoal/60'
              }`}
            >
              {t(`tiers.${key}.description`)}
            </p>

            {/* Feature list */}
            <ul
              className={`mt-6 space-y-2.5 border-t px-6 pt-6 ${
                isSelected ? 'border-cream-50/10' : 'border-navy-800/10'
              }`}
            >
              {tierFeatures[key].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex-shrink-0">
                    <CheckMotif isSelected={isSelected} />
                  </span>
                  <span className={isSelected ? 'text-cream-50/80' : 'text-charcoal/70'}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div
              className={`mx-6 mt-6 border-t pt-4 ${
                isSelected ? 'border-cream-50/10' : 'border-navy-800/10'
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  isSelected ? 'text-cream-50/50' : 'text-charcoal/40'
                }`}
              >
                Indicative price range
              </p>
              <p
                className={`mt-1 font-mono text-sm font-semibold leading-relaxed ${
                  isSelected ? 'text-amber-400' : 'text-navy-950'
                }`}
              >
                {t(`tiers.${key}.price`)}
              </p>
            </div>

            {/* CTA — pointer-events prevent card click from bubbling into nav */}
            <div className="mt-auto px-6 pb-8 pt-6" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/contact"
                className={`inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-navy-950 hover:bg-amber-400/90'
                    : 'border border-navy-950 bg-transparent text-navy-950 hover:bg-navy-950 hover:text-cream-50'
                }`}
              >
                {key === 'large' ? 'Request a Custom Quote' : cta('getQuote')}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CheckMotif({ isSelected }: { isSelected: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      {/* Lotus-inspired checkmark — four-petal base, upward stroke */}
      <circle
        cx="7"
        cy="7"
        r="6"
        fill={isSelected ? 'rgba(245,158,11,0.15)' : 'rgba(0,59,175,0.08)'}
      />
      <path
        d="M4 7.2 L6.2 9.5 L10 5"
        stroke={isSelected ? '#F59E0B' : '#003baf'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
