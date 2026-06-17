import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import NotFoundContent from '@/components/NotFoundContent';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NotFoundContent />;
}
