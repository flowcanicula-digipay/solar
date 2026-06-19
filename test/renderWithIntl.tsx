import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import vi from '@/messages/vi.json';
import ja from '@/messages/ja.json';

const catalogs = { en, vi, ja } as const;

export function renderWithIntl(
  ui: ReactElement,
  { locale = 'en' }: { locale?: keyof typeof catalogs } = {}
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      {ui}
    </NextIntlClientProvider>
  );
}
