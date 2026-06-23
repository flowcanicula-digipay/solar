'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

// TODO: owner must replace with their real Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvjdbjv';

/* ─── shared primitives ─────────────────────────────────────────────────── */

const labelClass =
  'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50';

const inputClass =
  'w-full border-0 border-b border-amber-400/30 bg-transparent px-0 py-3 text-[15px] font-light text-navy-950 placeholder:font-light placeholder:text-charcoal/30 transition-colors duration-300 focus:border-amber-400 focus:outline-none focus:ring-0';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/* ─── custom dropdown ────────────────────────────────────────────────────── */
function Dropdown({
  id,
  name,
  label,
  options,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* hidden real input so FormData picks up the value */}
      <input type="hidden" name={name} value={selected} />

      <p id={`${id}-label`} className={labelClass}>
        {label}
      </p>

      {/* trigger */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between border-0 border-b border-amber-400/30 bg-transparent px-0 py-3 text-left text-[15px] font-light text-navy-950 transition-colors duration-300 focus:border-amber-400 focus:outline-none"
        style={{ borderBottomColor: open ? '#F59E0B' : undefined }}
      >
        <span>{selected}</span>
        {/* animated chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-amber-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* panel */}
      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-amber-400/20 bg-white shadow-[0_16px_40px_-8px_rgba(245,158,11,0.18)]"
        >
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between px-5 py-3.5 text-[14px] font-light transition-colors duration-150 ${
                  isSelected
                    ? 'bg-amber-400/8 text-navy-950'
                    : 'text-charcoal/70 hover:bg-amber-400/5 hover:text-navy-950'
                }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {hint && <p className="mt-2 text-[11px] text-charcoal/40">{hint}</p>}
    </div>
  );
}

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
export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  const propertyTypeOptions = t.raw('propertyType.options') as string[];
  const monthlyBillOptions = t.raw('monthlyBill.options') as string[];
  const languageOptions = t.raw('language.options') as string[];

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
          Free Site Assessment
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
          Tell us about your property.
        </h2>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-400 to-transparent" />
      </div>

      {status === 'error' && (
        <div className="border-l-2 border-red-500 bg-red-50 py-3 pl-4 text-sm text-red-700">
          {t('error')}
        </div>
      )}

      {/* 01 — Your details */}
      <FieldGroup title="01 — Your details">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className={labelClass}>
              {t('name.label')}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder={t('name.placeholder')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="cf-email" className={labelClass}>
              {t('email.label')}
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              maxLength={100}
              placeholder={t('email.placeholder')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            {t('phone.label')}{' '}
            <span className="normal-case tracking-normal text-charcoal/35">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            maxLength={20}
            placeholder={t('phone.placeholder')}
            className={inputClass}
          />
          <p className="mt-2 text-[11px] text-charcoal/40">{t('phone.hint')}</p>
        </div>
      </FieldGroup>

      {/* 02 — Your property */}
      <FieldGroup title="02 — Your property">
        <div>
          <p className={labelClass}>{t('propertyType.label')}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {propertyTypeOptions.map((option, i) => (
              <Chip
                key={option}
                name="propertyType"
                value={option}
                defaultChecked={i === 0}
                required
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-roofArea" className={labelClass}>
              {t('roofArea.label')}
            </label>
            <input
              id="cf-roofArea"
              name="roofArea"
              type="text"
              maxLength={50}
              placeholder={t('roofArea.placeholder')}
              className={inputClass}
            />
            <p className="mt-2 text-[11px] text-charcoal/40">{t('roofArea.hint')}</p>
          </div>
          <div>
            <label htmlFor="cf-province" className={labelClass}>
              {t('province.label')}
            </label>
            <input
              id="cf-province"
              name="province"
              type="text"
              required
              maxLength={100}
              placeholder={t('province.placeholder')}
              className={inputClass}
            />
            <p className="mt-2 text-[11px] text-charcoal/40">{t('province.hint')}</p>
          </div>
        </div>

        <Dropdown
          id="cf-monthlyBill"
          name="monthlyBill"
          label={t('monthlyBill.label')}
          options={monthlyBillOptions}
          hint={t('monthlyBill.hint')}
        />
      </FieldGroup>

      {/* 03 — Preferences */}
      <FieldGroup title="03 — Preferences">
        <div>
          <p className={labelClass}>{t('language.label')}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {languageOptions.map((option, i) => (
              <Chip
                key={option}
                name="language"
                value={option}
                defaultChecked={i === 0}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="cf-notes" className={labelClass}>
            {t('notes.label')}
          </label>
          <textarea
            id="cf-notes"
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
