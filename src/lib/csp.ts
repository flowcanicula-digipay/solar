// Shared between src/app/[locale]/layout.tsx and the root src/app/not-found.tsx
// fallback so both ship the same policy. frame-ancestors is deliberately
// omitted — the CSP spec ignores that directive when delivered via <meta>,
// so it's enforced instead via a real HTTP header in public/.htaccess.
//
// Production script-src is intentionally just 'self' as a placeholder —
// scripts/inject-csp-hashes.mjs (run as part of `npm run build`) rewrites it
// per HTML file after export, adding the exact sha256 hashes of every inline
// <script> actually present on that page (JSON-LD plus Next's RSC hydration
// payloads, which differ per route and can't be hashed statically here).
export function buildCsp(): string {
  return [
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
}
