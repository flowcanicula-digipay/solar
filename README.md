# SolarTNP Website

Marketing site for **SolarTNP** — a Chinese-Japanese-Vietnamese solar panel
sales, design, installation, and maintenance company based in Biên Hòa,
Vietnam.

Static export built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
and `next-intl` for English / Vietnamese / Japanese localisation.

See [CLAUDE.md](./CLAUDE.md) for the full technical spec and conventions,
[STORY.md](./STORY.md) for the product/content brief, and
[SECURITY.md](./SECURITY.md) for the security posture.

## Stack

- Next.js 15 (App Router), static export (`output: 'export'`)
- TypeScript (strict mode)
- Tailwind CSS
- `next-intl` — locales: `en` (default), `vi`, `ja`
- Formspree — static-compatible contact form backend

## Getting started

```bash
node --version   # 20+
npm install
npm run dev      # http://localhost:3000 — redirects to /en/
```

## Build

```bash
npm run build    # outputs static site to out/
npx serve out    # preview the static export locally
```

## Pages

| Route | Description |
|---|---|
| `/` | Redirects to `/en/` |
| `/[locale]/` | Home |
| `/[locale]/pricing/` | System tiers, payback table, FAQ |
| `/[locale]/contact/` | Free site assessment request form |
| `/[locale]/privacy/` | Privacy policy (`noindex, follow`) |
| `/[locale]/regulations/` | Decree 135/2024/ND-CP explainer |
| `/[locale]/404/` | Custom 404 |

## Deployment

**Production**: built `out/` is uploaded to Hostinger shared hosting
(`public_html/`) — see CLAUDE.md's "Deployment" section for the full
hPanel/FTP steps and the required `.htaccess`.

**GitHub Pages**: `.github/workflows/deploy-pages.yml` builds and publishes
`out/` to GitHub Pages on every push to `master`, using a `basePath` of
`/<repo-name>` (set via the `GITHUB_PAGES_BASE_PATH` build env, only used in
that workflow — the Hostinger build stays root-relative). Enable Pages once
per repo: **Settings → Pages → Source: GitHub Actions**.

## Owner action items before launch

Several values are intentionally left as `TODO` placeholders (pricing,
Formspree form ID, business hours, payback table figures). See CLAUDE.md's
"Owner Action Items" section for the full pre-launch checklist.
