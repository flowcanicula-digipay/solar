import type { Metadata } from 'next';
import { createHash } from 'crypto';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { jsonLdScripts } from '@/lib/schema';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

// In dev, Next.js HMR/react-refresh needs 'unsafe-eval' and inline scripts —
// the strict production CSP below blocks those, so dev mode relaxes script-src.
// The static export (Hostinger/Pages) always uses the strict policy.
//
// frame-ancestors is deliberately omitted here: the CSP spec ignores that
// directive when delivered via <meta> (browsers log a console warning), so
// it's enforced instead via a real HTTP header in public/.htaccess.
// SchemaJsonLd renders these exact strings as inline <script type="application/ld+json">
// tags. Strict `script-src 'self'` blocks inline scripts unless allowed by hash, so we
// hash the fixed, locale-independent JSON-LD payloads here and allowlist them below.
const jsonLdHashes = jsonLdScripts.map(
  (script) => `'sha256-${createHash('sha256').update(script).digest('base64')}'`
);

const CSP = [
  "default-src 'none'",
  process.env.NODE_ENV === 'development'
    ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
    : `script-src 'self' ${jsonLdHashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://formspree.io",
  "img-src 'self' data:",
  "base-uri 'self'",
  'form-action https://formspree.io',
].join('; ');

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'SolarTNP',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      <body className="flex min-h-screen flex-col bg-cream-50 font-sans text-charcoal antialiased">
        <NextIntlClientProvider messages={messages}>
          <SchemaJsonLd />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
