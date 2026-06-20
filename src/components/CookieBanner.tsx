'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'solartnp-cookie-consent';

export default function CookieBanner() {
  const t = useTranslations('common.cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t('accept')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800/10 bg-navy-950 px-6 py-4 text-cream-50 shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-cream-50/85">
          {t('message')}{' '}
          <Link href="/privacy" className="underline hover:text-royal-100">
            {t('privacyLink')}
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="flex-shrink-0 rounded-full bg-royal-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-royal-700"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
