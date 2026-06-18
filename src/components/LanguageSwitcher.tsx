'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher({
  className = '',
}: {
  className?: string;
}) {
  const t = useTranslations('common.languages');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label={t('label')}
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      className={`rounded-md border border-navy-800/15 bg-cream-50 px-3 py-2 text-sm font-medium text-charcoal/80 hover:text-royal-700 focus:outline-none focus:ring-2 focus:ring-royal-600 ${className}`}
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {t(loc)}
        </option>
      ))}
    </select>
  );
}
