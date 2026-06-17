'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export default function PricingFAQ() {
  const t = useTranslations('pricing.faq');
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="divide-y divide-navy-800/10 rounded-2xl border border-navy-800/10 bg-white">
      {questionKeys.map((key) => {
        const isOpen = openKey === key;
        return (
          <div key={key}>
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : key)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-navy-950">{t(`${key}.question`)}</span>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-charcoal/50 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-6 pb-5 text-sm text-charcoal/70">{t(`${key}.answer`)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
