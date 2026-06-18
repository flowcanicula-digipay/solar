'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';

// TODO: owner must replace with their real Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const inputClass =
  'mt-1.5 w-full rounded-xl border border-navy-800/10 bg-cream-50 px-4 py-3 text-sm text-navy-950 placeholder:text-charcoal/40 transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-royal-600';

const chipClass =
  'flex cursor-pointer items-center gap-2 rounded-lg border border-navy-800/10 bg-cream-50 px-4 py-2.5 text-sm text-navy-950 transition-colors hover:border-royal-300 has-[:checked]:border-royal-600 has-[:checked]:bg-royal-100 has-[:checked]:text-royal-700';

type Status = 'idle' | 'submitting' | 'success' | 'error';

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

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-600/20 bg-green-50 p-6 text-sm text-green-800">
        {t('success')}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="rounded-xl border border-red-600/20 bg-red-50 p-4 text-sm text-red-800">
          {t('error')}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-950">
            {t('name.label')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder={t('name.placeholder')}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-950">
            {t('email.label')}
          </label>
          <input
            id="email"
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
        <label htmlFor="phone" className="block text-sm font-medium text-navy-950">
          {t('phone.label')}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={20}
          placeholder={t('phone.placeholder')}
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-charcoal/50">{t('phone.hint')}</p>
      </div>

      <div>
        <span className="block text-sm font-medium text-navy-950">{t('propertyType.label')}</span>
        <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {propertyTypeOptions.map((option, i) => (
            <label key={option} className={chipClass}>
              <input
                type="radio"
                name="propertyType"
                value={option}
                required
                defaultChecked={i === 0}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="roofArea" className="block text-sm font-medium text-navy-950">
            {t('roofArea.label')}
          </label>
          <input
            id="roofArea"
            name="roofArea"
            type="text"
            maxLength={50}
            placeholder={t('roofArea.placeholder')}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-charcoal/50">{t('roofArea.hint')}</p>
        </div>

        <div>
          <label htmlFor="province" className="block text-sm font-medium text-navy-950">
            {t('province.label')}
          </label>
          <input
            id="province"
            name="province"
            type="text"
            required
            maxLength={100}
            placeholder={t('province.placeholder')}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-charcoal/50">{t('province.hint')}</p>
        </div>
      </div>

      <div>
        <label htmlFor="monthlyBill" className="block text-sm font-medium text-navy-950">
          {t('monthlyBill.label')}
        </label>
        <select id="monthlyBill" name="monthlyBill" className={`${inputClass} cursor-pointer appearance-none`}>
          {monthlyBillOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-charcoal/50">{t('monthlyBill.hint')}</p>
      </div>

      <div>
        <span className="block text-sm font-medium text-navy-950">{t('language.label')}</span>
        <div className="mt-2 flex flex-wrap gap-2.5">
          {languageOptions.map((option, i) => (
            <label key={option} className={chipClass}>
              <input
                type="radio"
                name="language"
                value={option}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-navy-950">
          {t('notes.label')}
        </label>
        <textarea
          id="notes"
          name="notes"
          maxLength={1000}
          rows={4}
          placeholder={t('notes.placeholder')}
          className={`${inputClass} resize-y`}
        />
      </div>

      <p className="text-xs text-charcoal/50">{t('privacy')}</p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-royal-700 disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {t('submit')}
      </button>
    </form>
  );
}
