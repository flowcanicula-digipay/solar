'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

// TODO: owner must replace with their real Formspree sourcing form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_SOURCING_FORM_ID';

/* ─── shared primitives ─────────────────────────────────────────────────── */

const labelClass =
  'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50';

const inputClass =
  'w-full border-0 border-b border-amber-400/30 bg-transparent px-0 py-3 text-[15px] font-light text-navy-950 placeholder:font-light placeholder:text-charcoal/30 transition-colors duration-300 focus:border-amber-400 focus:outline-none focus:ring-0';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/* ─── chip / radio button ────────────────────────────────────────────────── */
function Chip({
  name,
  value,
  defaultChecked,
  required,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  required?: boolean;
}) {
  return (
    <label className="group relative cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        required={required}
        className="peer sr-only"
      />
      <span className="block border border-amber-400/25 px-4 py-2 text-[13px] font-light text-charcoal/70 transition-all duration-200 peer-checked:border-amber-400 peer-checked:bg-amber-400/8 peer-checked:text-navy-950 peer-checked:font-medium group-hover:border-amber-400/60">
        {value}
      </span>
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-400 transition-all duration-300 peer-checked:w-full" />
    </label>
  );
}

/* ─── section divider ────────────────────────────────────────────────────── */
function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">
          {title}
        </p>
        <div className="mt-2 h-px w-12 bg-gradient-to-r from-amber-400 to-transparent" />
      </div>
      {children}
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function SourcingForm() {
  const t = useTranslations('sourcing.form');
  const [status, setStatus] = useState<Status>('idle');

  const marketOptions = t.raw('market.options') as string[];
  const equipmentOptions = t.raw('equipment.options') as string[];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 11.5L8.5 16L18 7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-display text-lg font-semibold text-navy-950">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Form header */}
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">
          Sourcing Inquiry
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
          Tell us what you need.
        </h2>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-400 to-transparent" />
      </div>

      {status === 'error' && (
        <div className="border-l-2 border-red-500 bg-red-50 py-3 pl-4 text-sm text-red-700">
          {t('error')}
        </div>
      )}

      {/* 01 — Company details */}
      <FieldGroup title="01 — Company details">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="sf-companyName" className={labelClass}>
              {t('companyName.label')}
            </label>
            <input
              id="sf-companyName"
              name="companyName"
              type="text"
              required
              maxLength={100}
              placeholder={t('companyName.placeholder')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sf-contactName" className={labelClass}>
              {t('contactName.label')}
            </label>
            <input
              id="sf-contactName"
              name="contactName"
              type="text"
              required
              maxLength={100}
              placeholder={t('contactName.placeholder')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="sf-email" className={labelClass}>
              {t('email.label')}
            </label>
            <input
              id="sf-email"
              name="email"
              type="email"
              required
              maxLength={100}
              placeholder={t('email.placeholder')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sf-phone" className={labelClass}>
              {t('phone.label')}{' '}
              <span className="normal-case tracking-normal text-charcoal/35">(optional)</span>
            </label>
            <input
              id="sf-phone"
              name="phone"
              type="tel"
              maxLength={20}
              placeholder={t('phone.placeholder')}
              className={inputClass}
            />
            <p className="mt-2 text-[11px] text-charcoal/40">{t('phone.hint')}</p>
          </div>
        </div>
      </FieldGroup>

      {/* 02 — Order details */}
      <FieldGroup title="02 — Order details">
        <div>
          <p className={labelClass}>{t('market.label')}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {marketOptions.map((option, i) => (
              <Chip
                key={option}
                name="market"
                value={option}
                defaultChecked={i === 0}
                required
              />
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>{t('equipment.label')}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {equipmentOptions.map((option, i) => (
              <Chip
                key={option}
                name="equipment"
                value={option}
                defaultChecked={i === 0}
                required
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="sf-quantity" className={labelClass}>
            {t('quantity.label')}
          </label>
          <input
            id="sf-quantity"
            name="quantity"
            type="text"
            maxLength={100}
            placeholder={t('quantity.placeholder')}
            className={inputClass}
          />
          <p className="mt-2 text-[11px] text-charcoal/40">{t('quantity.hint')}</p>
        </div>
      </FieldGroup>

      {/* 03 — Notes */}
      <FieldGroup title="03 — Notes">
        <div>
          <label htmlFor="sf-notes" className={labelClass}>
            {t('notes.label')}
          </label>
          <textarea
            id="sf-notes"
            name="notes"
            maxLength={1000}
            rows={4}
            placeholder={t('notes.placeholder')}
            className={`${inputClass} resize-none`}
          />
        </div>
      </FieldGroup>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-400/80 py-1.5 pl-7 pr-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy-950 shadow-[0_0_24px_rgba(245,158,11,0.30)] transition-all duration-200 hover:brightness-105 disabled:opacity-60"
        >
          {t('submit')}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-cream-50 transition-transform group-hover:translate-x-0.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        <p className="text-xs font-light text-charcoal/40">{t('privacy')}</p>
      </div>
    </form>
  );
}
