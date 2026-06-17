'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const t = useTranslations('common.languages');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-charcoal/30">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'font-semibold text-royal-700'
                : 'text-charcoal/60 hover:text-royal-700'
            }
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
