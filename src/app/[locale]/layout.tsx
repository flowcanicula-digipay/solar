import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { withBasePath } from '@/lib/assetPath';
import { buildCsp } from '@/lib/csp';
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

const CSP = buildCsp();

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Individual pages only set `title`/`description` in their own
// generateMetadata — Next merges those with whatever's returned here rather
// than replacing it, so every page inherits this default `openGraph`/
// `twitter` image unless it explicitly sets its own.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale;
  const ogImage = withBasePath(`/assets/og/og-${ogLocale}.svg`);

  return {
    title: 'SolarTNP',
    metadataBase: new URL('https://www.solartnp.com'),
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
    openGraph: {
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // generateStaticParams only ever produces en/vi/ja for the static export,
  // so an unsupported locale (or this segment missing entirely) never gets a
  // prerendered file in production — Apache's 404 handler covers that case.
  // In `next dev`, though, this route renders on demand for any value, so
  // without this guard an unsupported locale silently renders with the
  // wrong `lang` attribute and fallback English copy instead of routing
  // the visitor somewhere sane.
  if (!routing.locales.includes(locale as Locale)) {
    redirect(`/${routing.defaultLocale}/`);
  }

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
