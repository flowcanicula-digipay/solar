import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import en from '@/messages/en.json';
import vi from '@/messages/vi.json';
import ja from '@/messages/ja.json';

const catalogs = { en, vi, ja } as const;

type PageProps = { params: Promise<{ locale: string }> };
type ServerPage = (props: PageProps) => Promise<ReactElement>;

// Server Component pages are async functions returning JSX. Calling them
// directly (no Next runtime needed) works fine for the page itself, but two
// things still need help outside of Next's actual RSC pipeline:
//
// 1) Several child components (PageHero, ContactForm, WarrantyTimeline, ...)
//    are Client Components using next-intl's `useTranslations`, which needs
//    a NextIntlClientProvider in the tree — normally supplied by
//    `[locale]/layout.tsx`, which these page-level tests intentionally skip.
// 2) A page can itself return an unresolved async Server Component element
//    (e.g. `[locale]/404/page.tsx` returning `<NotFoundContent />`) — React's
//    plain client renderer can't mount that, so it's resolved ahead of time.
async function resolveAsyncElement(element: ReactElement): Promise<ReactElement> {
  let current = element;
  while (typeof current.type === 'function' && current.type.constructor.name === 'AsyncFunction') {
    current = await (current.type as (props: unknown) => Promise<ReactElement>)(current.props);
  }
  return current;
}

export async function renderServerPage(Page: ServerPage, locale: keyof typeof catalogs = 'en') {
  setRequestLocale(locale);
  const element = await resolveAsyncElement(await Page({ params: Promise.resolve({ locale }) }));
  return render(
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      {element}
    </NextIntlClientProvider>
  );
}
