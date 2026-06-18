'use client';

import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const t = useTranslations('common.languages');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  const select = (loc: string) => {
    setOpen(false);
    router.replace(pathname, { locale: loc });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t('label')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/80 transition-colors duration-200 hover:bg-royal-100/60 hover:text-royal-700"
      >
        <Globe className="h-4 w-4 text-royal-600" aria-hidden="true" />
        <span>{t(locale)}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-charcoal/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-36 rounded-lg border border-navy-800/10 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={loc === locale}
              onClick={() => select(loc)}
              className={`block w-full px-3 py-2 text-left text-sm ${
                loc === locale
                  ? 'font-semibold text-royal-700'
                  : 'text-charcoal/80 hover:bg-cream-50 hover:text-royal-700'
              }`}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
