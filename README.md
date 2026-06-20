# SolarTNP Website

Marketing site for **SolarTNP** — solar panel sales, system design,
installation, after-sales maintenance, and international equipment sourcing
& shipping (US / Southeast Asia), based in Phú Nhuận, Hồ Chí Minh City,
Vietnam.

Static export built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
and `next-intl` for English / Vietnamese / Japanese localisation.

See [STORY.md](./STORY.md) for the product/content brief and
[SECURITY.md](./SECURITY.md) for the security posture.

## Stack

- Next.js 15 (App Router), static export (`output: 'export'`)
- TypeScript (strict mode)
- Tailwind CSS
- `next-intl` — locales: `en` (default), `vi`, `ja`
- Formspree — static-compatible form backend (separate forms for residential
  leads and B2B sourcing leads)

## Getting started

```bash
node --version   # 20+
npm install
npm run dev      # http://localhost:3000 — redirects to /en/
```

## Build

```bash
npm run build    # builds and exports static site to out/
npx serve out    # preview the static export locally
```

`npm run build` also runs `scripts/inject-csp-hashes.mjs` after `next build`,
which hashes every inline `<script>` in each generated HTML file and writes
the matching `sha256-...` values into that page's Content-Security-Policy
meta tag — the site ships a strict `script-src 'self'` policy with no
`unsafe-inline`.

## Testing

```bash
npm test              # run the unit test suite once (Vitest)
npm run test:watch    # watch mode, reruns on file changes
npm run test:coverage # run once and print the coverage table
```

Unit tests live under `test/`, covering `src/lib`, `src/i18n`, every
component, and every page/layout/not-found file under `src/app`, using
Vitest + React Testing Library + jsdom. `next/image`, `next/font/google`,
`next/navigation`, `@/i18n/navigation`, and `next-intl/server` are mocked in
`test/setup.ts` so Server Components and Client Components can both be
rendered and asserted on directly, without a running Next server.

Coverage thresholds (statements/branches/functions/lines, all 80%) are
enforced in `vitest.config.ts` — `vitest run --coverage` exits non-zero if
any metric falls below that bar. `npm run build` runs this gate before
`next build`, so a coverage regression fails the build (and CI) outright.

## Pages

| Route | Description |
|---|---|
| `/` | Redirects to `/en/` |
| `/[locale]/` | Home |
| `/[locale]/pricing/` | System tiers, payback table, FAQ |
| `/[locale]/contact/` | Free site assessment request form (residential) |
| `/[locale]/sourcing/` | International equipment sourcing & shipping leads (B2B) |
| `/[locale]/privacy/` | Privacy policy (`noindex, follow`) |
| `/[locale]/regulations/` | Decree 135/2024/ND-CP explainer |
| Custom 404 | `src/app/[locale]/not-found.tsx` |

## Deployment

**Production**: built `out/` is uploaded to Hostinger shared hosting
(`public_html/`). The `.htaccess` in `public/.htaccess` (copied into `out/`
on build) handles the HTTPS redirect, the bare `/` → `/en/` rewrite, and
cache headers.

**GitHub Pages**: `.github/workflows/deploy-pages.yml` builds and publishes
`out/` to GitHub Pages on every push to `master`, using a `basePath` of
`/<repo-name>` (set via the `GITHUB_PAGES_BASE_PATH` build env, only used in
that workflow — the Hostinger build stays root-relative). Enable Pages once
per repo: **Settings → Pages → Source: GitHub Actions**.

**Vercel**: the repo also deploys to Vercel as a static export, serving from
the project's domain root (no base path) — same as Hostinger. `vercel.json`
sets `"framework": null` so Vercel treats it as a plain static site rather
than running its Next.js-specific build pipeline (which expects its own
`.next/routes-manifest.json` and otherwise conflicts with the custom `out`
output directory), and pins the build command (`npm run build`) and output
directory (`out`). Vercel auto-deploys on every push once the GitHub repo is
connected to the project; no `GITHUB_PAGES_BASE_PATH` should be set in the
Vercel project's environment variables, since that variable is only meant
for the GitHub Pages sub-path build.

Because `images.unoptimized: true` is required for static export, `next/image`
does not auto-prefix the base path onto plain string `src` values — use the
`withBasePath()` helper from `src/lib/assetPath.ts` for any hardcoded
`/assets/...` path so it resolves under both deployment targets.

## Reminders for myself before launch

This isn't a public-facing notice — just a note to self (and whoever else
ends up working on this repo) so nothing placeholder ships by accident.
Several values are intentionally left as `TODO` (pricing, Formspree form
IDs, business hours, payback table figures). Search the repo for `TODO`
before going live and fill them in for real.

## Author

Jaime Canicula ([jaime.canicula@gmail.com](mailto:jaime.canicula@gmail.com)) —
based in the Philippines, building for clients in Vietnam.
