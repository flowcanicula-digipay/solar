import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import NotFoundView from '@/components/NotFoundView';
import { withBasePath } from '@/lib/assetPath';
import { buildCsp } from '@/lib/csp';
import en from '@/messages/en.json';
import './globals.css';

// This is Next's root-segment not-found fallback — it renders whenever a URL
// doesn't match any route at all, not even the `[locale]` dynamic segment
// (e.g. a path with no recognizable locale prefix, or one outside any known
// route). The root layout (src/app/layout.tsx) is an intentional pass-through
// with no <html>/<body> — those are normally supplied by `[locale]/layout.tsx` —
// so this fallback must provide them itself, or Next throws "Missing <html>
// and <body> tags in the root layout" and silently swaps in its own bare
// default 404 instead. There's no request-scoped locale here (no `[locale]`
// segment matched), so this always renders the default-locale (English) copy.
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

export const metadata: Metadata = {
  title: 'SolarTNP',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const t = en.notFound;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      <body className="bg-cream-50 font-sans text-charcoal antialiased">
        <NotFoundView
          eyebrow={t.eyebrow}
          fourOhFour={t.fourofour}
          tagline={t.tagline}
          body={t.body}
          goHomeLabel={t.goHome}
          goHomeHref={withBasePath('/en/')}
          contactLabel={t.contact}
          contactHref={withBasePath('/en/contact/')}
          footer={t.footer}
        />
      </body>
    </html>
  );
}
