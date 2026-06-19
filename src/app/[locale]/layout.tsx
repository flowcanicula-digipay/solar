import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { withBasePath } from '@/lib/assetPath';
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
//
// The production script-src below is intentionally just 'self' as a placeholder —
// scripts/inject-csp-hashes.mjs (run as part of `npm run build`) rewrites it per
// HTML file after export, adding the exact sha256 hashes of every inline <script>
// actually present on that page (JSON-LD plus Next's RSC hydration payloads, which
// differ per route and can't be hashed statically here).
const CSP = [
  "default-src 'none'",
  process.env.NODE_ENV === 'development'
    ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
    : "script-src 'self'",
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
  icons: {
    // No SVG entry here on purpose — browsers (Chrome especially) prefer an
    // SVG favicon over .ico whenever both are declared, which would silently
    // override the intended default (public/favicon.ico).
    icon: [
      { url: withBasePath('/favicon.ico'), sizes: 'any' },
      { url: withBasePath('/assets/favicon/favicon-128.png'), sizes: '128x128', type: 'image/png' },
      { url: withBasePath('/assets/favicon/favicon-64.png'), sizes: '64x64', type: 'image/png' },
    ],
    shortcut: withBasePath('/favicon.ico'),
  },
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
