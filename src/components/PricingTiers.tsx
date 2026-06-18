'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const tierKeys = ['small', 'medium', 'large'] as const;

export default function PricingTiers() {
  const t = useTranslations('pricing');
  const cta = useTranslations('common.cta');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLFieldSetElement>(null);

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
    <fieldset ref={ref} className="grid gap-8 md:grid-cols-3">
      <legend className="sr-only">{t('tiers.selectLabel')}</legend>
      {tierKeys.map((key, i) => (
        <div
          key={key}
          className={`relative transition-all duration-700 ease-out motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: visible ? `${i * 130}ms` : '0ms' }}
        >
          <input
            type="radio"
            id={`tier-${key}`}
            name="tier"
            defaultChecked={key === 'medium'}
            className="peer sr-only"
          />
          <label
            htmlFor={`tier-${key}`}
            aria-label={t(`tiers.${key}.name`)}
            className="absolute inset-0 cursor-pointer rounded-2xl border border-navy-800/10 bg-white shadow-sm transition-all duration-200 peer-checked:border-royal-600 peer-checked:shadow-xl peer-checked:ring-2 peer-checked:ring-royal-600"
          />
          <span className="pointer-events-none absolute -top-3 right-6 z-10 hidden items-center gap-1 rounded-full bg-royal-600 px-3 py-1 text-xs font-semibold text-white shadow peer-checked:flex">
            <Check className="h-3 w-3" aria-hidden="true" />
            {t('tiers.selectedBadge')}
          </span>
          <div className="pointer-events-none relative flex h-full flex-col p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-royal-700">
              {t(`tiers.${key}.tagline`)}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-navy-950">
              {t(`tiers.${key}.name`)}
            </h2>
            <p className="mt-1 font-mono text-sm text-charcoal/60">{t(`tiers.${key}.size`)}</p>
            <p className="mt-4 flex-1 text-sm text-charcoal/70">
              {t(`tiers.${key}.description`)}
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-950">
              {t(`tiers.${key}.price`)}
            </p>
            <Link
              href="/contact"
              className="pointer-events-auto relative z-10 mt-4 inline-flex items-center justify-center gap-1 rounded-full bg-royal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-700"
            >
              {cta('getQuote')}
            </Link>
          </div>
        </div>
      ))}
    </fieldset>
  );
}
