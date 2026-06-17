# CLAUDE.md — SolarTNP Website

This file is the authoritative guide for Claude Code (and any human developer)
working on this project. Read it fully before making any changes. It describes
the business, the stack, the conventions, and every action the owner must take
before going live.

---

## What Is SolarTNP?

**SolarTNP** sells, designs, installs, and maintains solar panel systems for
residential and light-commercial clients in Vietnam. The company is
Japanese-Vietnamese in ownership and supply chain — Japanese-sourced panels and
components, Vietnamese installation team, headquartered in Biên Hòa.

The company is newly established. It has completed **4 real installations** at
the time of launch. The website is deliberately honest about this: credibility
comes from specificity (real system sizes, real locations, real panel brands),
not from inflated project counts.

**Tagline**: *"Japanese-quality solar. Installed right, in Vietnam."*

| Field | Value |
|---|---|
| Company | SolarTNP |
| Industry | Solar energy — residential & light-commercial |
| Services | Panel sales · System design · Installation · Maintenance |
| HQ | Biên Hòa, Đồng Nai, Vietnam |
| Address | Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam |
| Primary email | thuy@tnpgr.vn |
| Alt email | anhkiet3333@yahoo.com |
| Phone | +84 90 333 37 29 |
| Locales | `en` (default), `vi`, `ja` |
| Pages | Home `/`, Pricing `/pricing`, Contact `/contact` |
| Export target | Hostinger shared hosting — `public_html/` |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript — strict mode |
| Styling | Tailwind CSS (npm, not CDN) |
| Icons | Lucide React |
| i18n | next-intl |
| Form backend | Formspree (static-compatible, no server needed) |
| Build output | `next export` → `out/` directory |
| Node version | 20 LTS |

### Critical `next.config.ts` settings

```ts
const nextConfig = {
  output: 'export',         // Static HTML — no Node server in production
  trailingSlash: true,      // /en/pricing/ → index.html — Apache-friendly
  images: {
    unoptimized: true,      // Required for static export
  },
};
```

**Hard rules for static export compatibility:**
- No API routes
- No server actions
- No ISR (`revalidate`)
- No middleware that runs on the server
- No `next/headers` or `next/cookies`
- Every `generateStaticParams` must return all three locales

---

## Project Structure

```
/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/           → hero-bg.svg
│   │   │   ├── process/        → design.svg, installation.svg, aftersales.svg
│   │   │   ├── projects/       → project-1.svg … project-4.svg
│   │   │   ├── quality/        → japanese-quality.svg
│   │   │   └── panels/         → (Phase 2: real panel photos)
│   │   ├── logo/               → logo.svg, logo-light.svg
│   │   ├── og/                 → og-en.svg, og-vi.svg, og-ja.svg
│   │   └── favicon/            → favicon.svg, site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml             → 15 URLs (5 pages × 3 locales; /privacy excluded)
│   └── .htaccess
├── src/
│   ├── app/
│   │   ├── layout.tsx          → Top-level: redirects "/" → "/en/"
│   │   └── [locale]/
│   │       ├── layout.tsx      → Sets html lang, loads Header/Footer, CSP meta
│   │       ├── page.tsx        → Home
│   │       ├── pricing/
│   │       │   └── page.tsx
│   │       ├── contact/
│   │       │   └── page.tsx
│   │       ├── privacy/
│   │       │   └── page.tsx    → noindex, numbered sections 01–06
│   │       ├── regulations/
│   │       │   └── page.tsx    → Decree 135/2024/ND-CP explainer
│   │       └── not-found.tsx   → Special 404 page
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── WhyJapanese.tsx
│   │   ├── ContactForm.tsx
│   │   ├── PricingFAQ.tsx
│   │   ├── PaybackTable.tsx
│   │   ├── RegulationsTable.tsx → Capacity threshold comparison table
│   │   └── SchemaJsonLd.tsx
│   ├── i18n/
│   │   ├── request.ts
│   │   └── routing.ts
│   └── messages/
│       ├── en.json
│       ├── vi.json
│       └── ja.json
├── CLAUDE.md                   ← this file
├── SECURITY.md
├── STORY.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

### Color Palette

| Tailwind token | Hex | Use |
|---|---|---|
| `navy-950` | `#0C1F3F` | Hero, nav, dark section backgrounds |
| `navy-800` | `#1A3461` | Secondary dark backgrounds, card borders |
| `navy-600` | `#2E5096` | Muted text on dark, secondary elements |
| `royal-600` | `#003baf` | **Primary CTA buttons, active links, highlights** |
| `royal-700` | `#002d8a` | Hover/pressed state on royal-600 elements |
| `royal-100` | `#dce8ff` | Badge backgrounds, feature chips, light tints |
| `amber-400` | `#F59E0B` | Sun icon, generation stat highlights — sparingly |
| `cream-50` | `#F8F5EE` | Off-white section backgrounds |
| `charcoal` | `#2D2D2D` | Body text on light backgrounds |
| `white` | `#FFFFFF` | Cards, forms, clean surfaces |

**Amber rule**: `#F59E0B` amber is used in exactly three places —
(1) the sun icon in the logo, (2) solar generation stat numbers/highlights,
(3) the subtle hero radiance pulse. Nowhere else. This restraint makes the
amber feel meaningful (it always means "sun/energy") rather than decorative.

### Typography

| Role | Font | Notes |
|---|---|---|
| Display / H1 / H2 | Playfair Display | Serif — dignified, not corporate |
| Body / UI / H3 | Inter | Clean sans-serif — all sizes |
| Captions / data | Inter Mono | Numbers in the payback table, stats |

Load both from Google Fonts via `next/font/google` in the locale layout.

### Spacing & Layout

- Max content width: `max-w-7xl` (1280px)
- Section vertical padding: `py-24` desktop, `py-14` mobile
- Card border radius: `rounded-2xl`
- Primary CTA button: `rounded-full`, `bg-royal-600`, `hover:bg-royal-700`
- Secondary button (outline): `rounded-full`, `border-2 border-royal-600`,
  `text-royal-600`, `hover:bg-royal-100`

### Signature Element

A slow, gentle radiance pulse on the hero — concentric rings of amber at very
low opacity (4–6%) radiating outward from behind the headline, pulsing on a
4-second loop. This is the one animation on the site. It respects
`prefers-reduced-motion: reduce` (pulse is stopped, rings are static).

---

## The Four Seed Projects

These are the foundation of the Projects section. They must be rendered exactly
as described — honest, specific, no inflation.

### Project 1 — Biên Hòa Residence
- **System size**: 5 kWp grid-tied
- **Panels**: 16 × Panasonic 315W
- **Location**: Private residence, Biên Hòa, Đồng Nai
- **Install duration**: 2 days
- **Key outcome**: Monthly bill reduced from ~1,800,000 VND to ~400,000 VND
- **Notable**: First SolarTNP installation. Tile roof — custom mount designed
  to preserve waterproofing integrity.

### Project 2 — Thủ Đức Townhouse
- **System size**: 8 kWp grid-tied
- **Panels**: 20 × Sharp 400W
- **Location**: 3-storey townhouse, Thủ Đức, Ho Chi Minh City
- **Install duration**: 3 days
- **Key outcome**: ~1,040 kWh/month generation; excess exported to EVN
  under net metering
- **Notable**: Structural load calculation provided before install — client
  was concerned about roof capacity.

### Project 3 — KCN Tam Phước Office
- **System size**: 15 kWp grid-tied
- **Panels**: 30 × Kyocera 500W
- **Location**: Office building, KCN Tam Phước industrial zone, Biên Hòa
- **Install duration**: 4 days
- **Key outcome**: ~60% daytime electricity offset; projected payback ~5.5 years
- **Notable**: EVN grid-connection approval handled end-to-end by SolarTNP —
  3 weeks from application to energisation.

### Project 4 — Long An Family Home
- **System size**: 6.4 kWp grid-tied
- **Panels**: 16 × Sharp 400W
- **Location**: Family home, Tân An, Long An
- **Install duration**: 2 days
- **Key outcome**: ~830 kWh/month; energy net-zero in dry season
- **Notable**: Rural province — SolarTNP coordinated with local EVN office for
  grid approval. Slightly longer timeline than urban installs.

**Honest framing copy** (appears below the project grid):
> "We're a young company. These four projects are where we've started — each
> one done properly, without shortcuts. More are in progress."

---

## i18n Conventions

### Locale routing

```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'vi', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
```

- Bare `/` redirects to `/en/` via root `app/layout.tsx`
- All three locales are always shown in URL path

### Translation key structure

```
common.nav.home
common.nav.pricing
common.nav.contact
common.nav.regulations
common.cta.freeAssessment
common.cta.getQuote
common.cta.learnMore
common.footer.tagline
common.footer.address
common.footer.markets
common.footer.privacy

home.hero.title
home.hero.subtitle
home.hero.cta
home.hero.secondaryCta
home.hero.imageAlt
home.about.title
home.about.body
home.about.point1
home.about.point2
home.about.point3
home.about.point4
home.process.title
home.process.lead
home.process.step1.title
home.process.step1.body
home.process.step2.title
home.process.step2.body
home.process.step3.title
home.process.step3.body
home.projects.title
home.projects.lead
home.projects.honestNote
home.projects.p1.title
home.projects.p1.size
home.projects.p1.panels
home.projects.p1.location
home.projects.p1.duration
home.projects.p1.outcome
home.projects.p1.note
home.projects.p1.imageAlt
home.projects.p2.title
... (same structure for p2, p3, p4)
home.japanese.title
home.japanese.body
home.japanese.point1
home.japanese.point2
home.japanese.point3
home.japanese.imageAlt
home.cta.title
home.cta.body
home.cta.button

pricing.hero.title
pricing.hero.subtitle
pricing.tiers.small.name
pricing.tiers.small.tagline
pricing.tiers.small.size
pricing.tiers.small.description
pricing.tiers.small.price          ← TODO: set price range
pricing.tiers.medium.name
pricing.tiers.medium.tagline
pricing.tiers.medium.size
pricing.tiers.medium.description
pricing.tiers.medium.price         ← TODO: set price range
pricing.tiers.large.name
pricing.tiers.large.tagline
pricing.tiers.large.size
pricing.tiers.large.description
pricing.tiers.large.price          ← TODO: set price range
pricing.included.title
pricing.included.items             ← array of strings
pricing.payback.title
pricing.payback.note
pricing.faq.title
pricing.faq.q1.question            ← grid-tied + Decree 135 surplus cap
pricing.faq.q1.answer
... (q1 through q8)

contact.hero.title
contact.hero.subtitle
contact.form.name.label
contact.form.email.label
contact.form.phone.label
contact.form.phone.hint
contact.form.propertyType.label
contact.form.propertyType.options  ← array
contact.form.roofArea.label
contact.form.province.label
contact.form.monthlyBill.label
contact.form.monthlyBill.hint
contact.form.language.label
contact.form.notes.label
contact.form.submit
contact.form.privacy
contact.sidebar.direct.title
contact.sidebar.hours              ← TODO: fill in
contact.sidebar.next.title
contact.sidebar.next.step1
contact.sidebar.next.step2
contact.sidebar.next.step3
contact.sidebar.trust

privacy.title
privacy.lastUpdated
privacy.intro
privacy.s01.heading
privacy.s01.body
privacy.s02.heading
privacy.s02.body
privacy.s03.heading
privacy.s03.body
privacy.s04.heading
privacy.s04.body
privacy.s05.heading
privacy.s05.body
privacy.s06.heading
privacy.s06.body
privacy.backHome

regulations.title
regulations.subtitle
regulations.disclaimer
regulations.s1.heading
regulations.s1.body
regulations.s2.heading
regulations.s2.body
regulations.s2.cap
regulations.s3.heading
regulations.s3.body
regulations.s4.heading
regulations.s4.intro
regulations.s4.row1.range
regulations.s4.row1.who
regulations.s4.row1.process
regulations.s4.row2.range
regulations.s4.row2.who
regulations.s4.row2.process
regulations.s4.row3.range
regulations.s4.row3.who
regulations.s4.row3.process
regulations.s5.heading
regulations.s5.body
regulations.s6.heading
regulations.s6.items              ← array
regulations.sources.label
regulations.sources.note
regulations.sources.lastVerified  ← TODO: update date before launch

notFound.fourofour
notFound.tagline
notFound.body
notFound.goHome
notFound.contact

meta.home.title
meta.home.description
meta.pricing.title
meta.pricing.description
meta.contact.title
meta.contact.description
meta.privacy.title
meta.privacy.description
meta.regulations.title
meta.regulations.description
```

### Translation quality rules

**Vietnamese key terms to use naturally:**
- Solar panels → "tấm pin năng lượng mặt trời" (first mention), "pin mặt trời"
  (subsequent)
- Solar electricity → "điện mặt trời"
- Grid-tied → "hòa lưới điện"
- Electricity bill savings → "tiết kiệm tiền điện"
- Installation → "lắp đặt"
- System design → "thiết kế hệ thống"
- Maintenance → "bảo trì"
- After-sales support → "hỗ trợ sau lắp đặt"
- EVN (grid operator) → "EVN" (everyone knows the acronym)
- Net metering → "bán điện dư lên lưới" (sell surplus to the grid)

**Japanese key terms:**
- Solar panels → ソーラーパネル (first use), 太陽光パネル (alternates)
- Solar power system → 太陽光発電システム
- Grid-tied → 系統連系
- Installation → 設置工事
- Panel brands (Panasonic, Sharp, Kyocera) → always in katakana
- Net metering → 余剰電力売電
- Monitoring app → モニタリングアプリ

---

## Pricing Content (Owner Must Fill In)

The pricing page structure is built. The owner must fill in the actual price
ranges. Find these TODO comments in `src/messages/en.json`:

```jsonc
// TODO: set price range for small system (3–5 kWp)
"pricing.tiers.small.price": "From $X,XXX USD / XXX triệu VND",

// TODO: set price range for medium system (6–10 kWp)
"pricing.tiers.medium.price": "From $X,XXX USD / XXX triệu VND",

// TODO: set price range for large system (11–20 kWp)
"pricing.tiers.large.price": "Custom quote — contact us",
```

Then update `vi.json` and `ja.json` with equivalent values in the appropriate
currency/format for each audience.

### Payback Table

A static table showing estimated payback periods. The owner should verify these
numbers with current EVN tariffs before going live. Current draft values:

| System | Est. monthly savings | System cost | Est. payback |
|---|---|---|---|
| 5 kWp | ~1,400,000 VND/month | TODO | TODO years |
| 8 kWp | ~2,200,000 VND/month | TODO | TODO years |
| 15 kWp | ~4,800,000 VND/month | TODO | TODO years |

---

## FAQ Content (Pricing Page)

8 questions reflecting Decree 135/2024/ND-CP accurately. Owner should verify
before launch as Vietnamese solar regulations continue to evolve.

1. **Under Vietnam's current rules, how much surplus power can I sell to EVN?**
   Under Decree 135/2024/ND-CP (effective 2024), surplus electricity exported
   to EVN is capped at **20% of your installed system capacity**. The primary
   purpose of your system must be self-consumption. Surplus is compensated at
   the preceding year's average electricity market price — not the older,
   higher feed-in tariffs. For most residential clients, this means the
   financial case for solar is built primarily on self-consumption savings,
   not export revenue. SolarTNP sizes your system to your actual load so you
   maximise self-consumption and minimise the surplus that hits the 20% cap.

2. **Do I need permits or approvals before installing?**
   Yes. For systems **under 100 kW** (all residential and most small commercial),
   you need to file a simplified notification with the provincial Department of
   Industry and Trade (DOIT) — no full investment approval required. For systems
   **100 kW–1,000 kW**, standard permitting with local authorities applies. For
   systems **over 1,000 kW** selling surplus to the grid, a development
   registration certificate and Power Operation License are required.
   SolarTNP handles the DOIT notification and all EVN grid-connection paperwork
   for systems in the sub-100 kW range — typical timeline: 3–6 weeks from
   submission to energisation.

3. **Does my building need to comply with any requirements?**
   Yes. Under Decree 135/2024/ND-CP, the system must be installed on a building
   that fully complies with construction law, land-use rights, fire safety
   standards, and environmental regulations. SolarTNP conducts a compliance
   check during the free site assessment. We will not proceed on a building
   with unresolved compliance issues — this protects you as much as it
   protects us.

4. **Will the panels withstand typhoons?**
   Our mounting systems are rated for wind loads significantly above Vietnam's
   standard building code minimums. We use Japanese-grade aluminium railing and
   stainless steel fasteners, anchored into roof structure — not just surface
   material. Every install includes a load calculation. We've designed for the
   Vietnamese climate specifically.

5. **What roof types are compatible?**
   We work with concrete flat roofs, Vietnamese tile roofs (ngói), corrugated
   metal (tôn), and composite or fibre-cement roofing. Each type uses a
   different mounting method. We confirm compatibility during the site visit —
   we don't proceed if the roof isn't suitable.

6. **Why Japanese panels over cheaper alternatives?**
   Japanese panels (Panasonic, Sharp, Kyocera) carry 25-year linear output
   guarantees with ≤0.45% annual degradation. At year 25, your panels are still
   producing at least 89% of rated output. Cheap panels often degrade at
   1.5–2% per year — half your output gone within 15 years. Over 25 years, the
   performance gap almost always outweighs the upfront price difference. We
   provide the degradation comparison data to every client so you can make the
   calculation yourself.

7. **What maintenance does a solar system need?**
   Very little. Clean panels 2–4 times per year (dust, bird deposits). Annual
   professional inspection: connections, mounting torque, inverter health.
   SolarTNP offers annual maintenance plans. For the first 12 months after
   installation, all callouts are free.

8. **Can you install outside Biên Hòa and Ho Chi Minh City?**
   Yes, within southern Vietnam. We've completed installations in Đồng Nai and
   Long An. We assess remote locations case by case — travel and accommodation
   are quoted separately for distant provinces.

---

## Privacy Page Content

Modelled directly on the TNP reference site structure. Six numbered sections.
Tone: plain, honest, no legal padding. The numbered headings are a visual design
element (large navy "01" as a display character beside each heading).

```
01  What we collect
    When you submit our contact form, we collect your name, email, phone number
    (optional), and project details (property type, location, roof area, monthly
    electricity bill, project notes). We use this solely to respond to your
    enquiry and prepare a quote. We do not collect data automatically through
    cookies beyond a single functional preference cookie for the language banner.

02  How we use your data
    Your contact details are used to respond to your site assessment request,
    prepare and send a quote, and follow up if you haven't received a response.
    We do not use your data for unsolicited marketing. We do not sell, rent,
    or share your data with third parties except where required by law.

03  Data storage
    Contact form submissions are processed via Formspree (formspree.io), a
    third-party form service. Formspree's privacy policy governs data processed
    on their platform. We retain your enquiry details for as long as necessary
    to fulfil your request or as required by Vietnamese law.

04  Cookies
    This website uses a single functional cookie to remember your language or
    privacy banner preference. No tracking cookies, advertising pixels, or
    analytics scripts are used. We do not use Google Analytics or any
    third-party tracking services.

05  Your rights
    You have the right to access, correct, or request deletion of your personal
    data. To exercise these rights, email thuy@tnpgr.vn. We will respond
    within 30 days.

06  Contact us
    For privacy questions: thuy@tnpgr.vn · +84 90 333 37 29
    Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam
```

**Implementation notes:**
- `meta robots: noindex, follow` on this page — not indexed, but followable
- Link in footer on every page: `/[locale]/privacy/`
- No hero image — just the standard header and a clean content column
  (max-w-3xl, centred)
- "Last updated: June 2026" below the H1

---

## 404 Page Design

The 404 is a **designed moment**, not a default error screen. It lives in
`src/app/[locale]/not-found.tsx` (Next.js App Router convention).

**Layout:**
- Full-page navy `#0C1F3F` background — no standard page layout, just footer
- Centred column, vertically centred in viewport
- Large amber sun icon (the logo sun, ~120px, with slow 6-second radiance pulse)
- Below the sun: "404" in Playfair Display, cream `#F8F5EE`, `text-[clamp(6rem,20vw,12rem)]`
  — the number fills but doesn't overflow
- Below the number: the brand-voice tagline (localised):
  - EN: *"This page went off-grid."*
  - VI: *"Trang này đã... mất điện."* — plays on "lost power" / "power cut"
  - JA: *"このページはオフグリッドです。"* — "This page is off-grid"
- Below that: a single body line in Inter, cream at 70% opacity:
  EN: "The URL doesn't exist. Let's get you back somewhere sunny."
- Two buttons, side by side (stacked on mobile):
  - "Go Home" — royal blue `#003baf` filled, rounded-full
  - "Contact Us" — outline, royal blue border, cream text
- Behind everything: a very faint solar panel grid pattern (SVG background,
  `opacity: 0.04`) — subtle texture, not a distraction
- The `prefers-reduced-motion` pulse stops; the sun icon stays static

**Animation spec (radiance pulse):**
```css
@keyframes radiance {
  0%, 100% { opacity: 0.06; transform: scale(1); }
  50%       { opacity: 0.12; transform: scale(1.15); }
}
/* Applied to: concentric ring SVG behind the sun, animation: radiance 6s ease-in-out infinite */
@media (prefers-reduced-motion: reduce) {
  .radiance-ring { animation: none; opacity: 0.06; }
}
```

---

## Vietnam Solar Regulations Reference (Decree 135/2024/ND-CP)

The `/regulations` page content is authored in the translation files. Below
is the factual baseline that all three locale translations must accurately
reflect. Claude Code should use this as ground truth when writing the
translation file content.

### Key facts to represent accurately:

**Self-consumption first**: Systems must be installed primarily for on-site
use. Capacity must generally match the site's existing electricity load at
registration time. This is not a restriction in practice — it means the system
is properly sized.

**20% surplus cap**: Grid-connected systems may only sell a maximum of 20% of
installed capacity back to EVN. Compensation is at the preceding year's average
electricity market price (not the old high feed-in tariff rates).

**Off-grid exception**: Completely grid-disconnected systems have no capacity
limits. Relevant for remote properties or full battery-storage setups.

**Capacity thresholds:**
- < 100 kW: Simplified DOIT notification only. No investment policy approval.
  Covers all residential and most small commercial. (This is SolarTNP's primary
  market.)
- 100 kW – 1,000 kW: Standard local authority permitting.
- > 1,000 kW (1 MW+): Development registration certificate + Power Operation
  License required if selling surplus to the grid.

**Building compliance**: Installation requires the building to be compliant
with construction, land-use, fire safety, and environmental law.

**Sources** (to be listed on the page):
- Decree 135/2024/ND-CP (official)
- SP Global Energy Transition coverage (Oct 2024)
- WFW guidance article
- Vietnam Business Law blog (Jan 2025, Mar 2025)
- Vietnam Law Magazine
- Baker McKenzie InsightPlus

**Legal disclaimer (in translation files, small text at bottom of page):**
EN: "This page summarises our understanding of Decree 135/2024/ND-CP as of
[date]. Solar regulations in Vietnam evolve. This is not legal advice —
consult a licensed energy or construction lawyer for binding guidance."

**TODO comment in `/regulations/page.tsx`:**
```tsx
{/* TODO: Verify regulation content against current decree before going live.
    Last verified: [insert date]. Source: Decree 135/2024/ND-CP. If Vietnamese
    solar law has been updated since this date, update the content in
    src/messages/en.json (regulations.* keys) and the equivalent vi.json
    and ja.json keys. */}
```

---

## Contact Form Fields

```
Full name                   → text, required, maxLength=100
Email                       → email, required, maxLength=100
Phone / Zalo / WhatsApp     → tel, optional, maxLength=20
                              hint: "We'll contact you on Zalo or WhatsApp"
Property type               → select, required
  options: "House / Villa", "Townhouse / Shophouse", "Apartment",
           "Office / Commercial", "Factory / Warehouse", "Other"
Approximate roof area       → text, optional, maxLength=50
  hint: "e.g. 60m² or 'not sure yet'"
Province / City             → text, required, maxLength=100
  hint: "e.g. Biên Hòa, Thủ Đức, Long An"
Monthly electricity bill    → select, optional
  options: "Under 500,000 VND", "500,000–1,000,000 VND",
           "1,000,000–2,000,000 VND", "Over 2,000,000 VND", "Not sure"
Preferred follow-up language → radio: "English", "Tiếng Việt", "日本語"
Notes / questions           → textarea, optional, maxLength=1000
```

Submit to Formspree. On success: show inline green confirmation, hide form.
On error: show inline red error, keep form visible.

---

## Schema JSON-LD

### All pages — LocalBusiness

```json
{
  "@type": "LocalBusiness",
  "name": "SolarTNP",
  "description": "Japanese-quality solar panels, installation, and maintenance in Vietnam.",
  "url": "https://solartnp.vn",
  "telephone": "+84903333729",
  "email": "thuy@tnpgr.vn",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lô 35 đường số 9, KCN Tam Phước",
    "addressLocality": "Biên Hòa",
    "addressRegion": "Đồng Nai",
    "addressCountry": "VN"
  },
  "areaServed": ["VN", "JP"],
  "availableLanguage": ["en", "vi", "ja"],
  "priceRange": "$$"
}
```

### Home — three Service entries
- Solar Panel Sales (Bán tấm pin năng lượng mặt trời / ソーラーパネル販売)
- Solar System Installation (Lắp đặt hệ thống điện mặt trời / 太陽光発電システム設置)
- After-Sales Maintenance (Bảo trì sau lắp đặt / アフターサービス・メンテナンス)

### Pricing — FAQPage + Product/Offer for each tier

### Contact — LocalBusiness with full address and both emails

---

## Security

See `SECURITY.md` for full OWASP coverage. Key points:

- **No server in production** — pure static HTML/CSS/JS
- **CSP via meta tag** in `src/app/[locale]/layout.tsx`
  - `script-src 'self'`
  - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
  - `font-src 'self' https://fonts.gstatic.com`
  - `connect-src 'self' https://formspree.io`
  - `img-src 'self' data:`
  - `frame-ancestors 'none'`
- **SchemaJsonLd.tsx** — `dangerouslySetInnerHTML` with hardcoded object only.
  Never pass user input here.
- **ContactForm.tsx** — all inputs have `maxLength` and correct `type`
- **`.htaccess`** — disables directory listing, HTTPS redirect, cache headers

---

## Deployment: Hostinger Shared Hosting

### Build

```bash
npm install
npm run build
# Output: out/
```

### Deploy to Hostinger

Upload `out/` contents to `public_html/`:
- Via hPanel File Manager: zip `out/`, upload, extract into `public_html/`
- Via FTP: use FileZilla, connect with Hostinger FTP credentials from hPanel

The `.htaccess` in `public/.htaccess` will be in `out/` after build and must
be in `public_html/` for URL routing and HTTPS redirect to work.

### Apache `.htaccess` (in `public/.htaccess`)

```apache
# Enforce HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect bare / to /en/
RewriteRule ^$ /en/ [L,R=301]

# Disable directory listing
Options -Indexes

# 404
ErrorDocument 404 /en/index.html

# Cache assets for 1 year
<FilesMatch "\.(svg|png|jpg|webp|ico|woff2)$">
  Header set Cache-Control "max-age=31536000, immutable"
</FilesMatch>

# Cache HTML for 1 hour
<FilesMatch "\.html$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

---

## Owner Action Items

### 🔴 Must-do before launch

#### 1. Set up Formspree
1. Create account at [formspree.io](https://formspree.io)
2. Create form — name it "SolarTNP Contact"
3. Copy form ID (e.g. `xrgnkzab`)
4. In `src/components/ContactForm.tsx`, replace `YOUR_FORM_ID`:
   ```
   https://formspree.io/f/YOUR_FORM_ID  →  https://formspree.io/f/xrgnkzab
   ```
5. Enable spam filtering in Formspree dashboard
6. Submit a test entry and confirm email receipt

#### 2. Fill in pricing numbers
In `src/messages/en.json`, `vi.json`, `ja.json` — find the TODO pricing keys
and fill in your real price ranges. See "Pricing Content" section above.

#### 3. Fill in payback table numbers
In `src/components/PaybackTable.tsx` — update estimated monthly savings and
payback years based on current EVN tariffs. Verify accuracy before going live.

#### 4. Set business hours
Find `// TODO: insert business hours` in `src/messages/en.json`:
```json
"contact.sidebar.hours": "Monday–Saturday, 8:00 AM – 5:30 PM (GMT+7)"
```
Update all three locale files.

#### 5. Verify and date the regulations page
In `src/app/[locale]/regulations/page.tsx`, find the TODO comment and insert
today's date as the "last verified" date. Read through the regulations content
to confirm it still accurately reflects Decree 135/2024/ND-CP. If anything
has changed (Vietnam updates solar law frequently), edit the relevant
`regulations.*` keys in all three locale files before going live.

Also update `regulations.sources.lastVerified` in the translation files.

#### 6. Update the privacy page "Last updated" date
In `src/messages/en.json` (and vi.json, ja.json):
```json
"privacy.lastUpdated": "June 2026"
```

#### 7. Enable SSL on Hostinger
1. hPanel → SSL → install free Let's Encrypt for your domain
2. The `.htaccess` HTTP→HTTPS redirect then activates automatically

### 🟡 Soon after launch

#### 8. Replace SVG placeholders with real photography
Priority order:
1. `public/assets/images/hero/hero-bg.svg` → wide shot of a completed install
2. `public/assets/images/projects/` → one real photo per project card
3. `public/assets/images/process/` → team photos from install days

Compress to < 200KB per image (use Squoosh.app or TinyPNG).

#### 9. Add more project cards
After each new installation:
1. Add project keys `home.projects.p5.*` (same structure as p1–p4) in all
   three locale files
2. Add a project illustration SVG in `public/assets/images/projects/`
3. Add the card to `src/components/ProjectsGrid.tsx`
4. Remove the "We're just getting started" honest note once you reach 10+ projects

#### 10. Add real testimonials
When clients consent to being quoted, find `{/* TODO: add real testimonials */}`
in the home page. Format: short quote, name, location, project type.

#### 11. Add social media links
Find `{/* TODO: add social URLs */}` in `src/components/Footer.tsx`:
```tsx
href="https://facebook.com/solartnp"
href="https://youtube.com/@solartnp"   // timelapse install videos work very well
```

#### 12. Submit sitemap to Google Search Console
1. Verify domain at search.google.com/search-console
2. Submit `https://yourdomain.com/sitemap.xml`
3. Check for crawl errors after 48 hours

#### 13. Register on Google Business Profile
Register SolarTNP at the Biên Hòa address so local clients can find you on
Maps when searching "lắp điện mặt trời Biên Hòa" or "solar panel installation
Dong Nai".

### 🟢 Nice-to-have later

#### 14. Add Zalo Official Account widget
A Zalo chat widget (floating button) is extremely effective for Vietnamese
residential leads. When adding, update the CSP `script-src` and `connect-src`
in `src/app/[locale]/layout.tsx` to allow the Zalo SDK endpoint.

#### 15. Add a project timelapse video
A 60-second YouTube install timelapse embedded on the projects section is
powerful social proof. If embedding YouTube, update CSP `frame-src` to allow
`https://www.youtube.com`.

#### 16. Monitor and update the regulations page
Set a calendar reminder every 6 months to review the `/regulations` content
against any new Vietnamese government decrees or circulars on rooftop solar.
Vietnam has been updating solar law frequently — keeping this page current is
a competitive advantage (most installers don't bother).

#### 17. Add certifications or accreditations
If SolarTNP obtains electrical contractor licences, DOIT registration, or
panel-brand authorised-installer status, add them as trust badges in the footer.
Find `{/* TODO: add trust badges */}` in `src/components/Footer.tsx`.

---

## Development Workflow

### First-time setup
```bash
node --version    # Must be 20+
npm install
npm run dev       # Dev server at http://localhost:3000
                  # Opens at /en/ automatically
```

### Build and preview
```bash
npm run build
npx serve out     # Preview static export locally at http://localhost:3000
```

### Adding a translation string
1. Add key + English value to `src/messages/en.json`
2. Add same key + Vietnamese to `src/messages/vi.json`
3. Add same key + Japanese to `src/messages/ja.json`
4. Use in component: `const t = useTranslations('section'); t('key')`

### Adding a new project card
1. Create project SVG: `public/assets/images/projects/project-5.svg`
2. Add translation keys `home.projects.p5.*` in all three locale files
3. Add the card to `src/components/ProjectsGrid.tsx`

### Checking translation parity
```bash
# Requires jq — checks all keys match between en and vi
diff <(jq '[paths(scalars)] | map(join(".")) | sort' src/messages/en.json) \
     <(jq '[paths(scalars)] | map(join(".")) | sort' src/messages/vi.json)

# Repeat for ja
diff <(jq '[paths(scalars)] | map(join(".")) | sort' src/messages/en.json) \
     <(jq '[paths(scalars)] | map(join(".")) | sort' src/messages/ja.json)
```
Any diff output means a locale file has a missing or extra key. Fix before building.

### Adding a new page
1. Create `src/app/[locale]/new-page/page.tsx` with `generateStaticParams`
   returning all three locales
2. Add `generateMetadata` for locale-aware title and description
3. Add translation keys `newPage.*` in all three locale files
4. Add to nav in `src/components/Header.tsx` (with translation key)
5. Add to footer quick links in `src/components/Footer.tsx`
6. Add the URL to `public/sitemap.xml` (all three locale variants)

### Commit convention
```
feat: add regulations page (Decree 135/2024/ND-CP)
feat: add 404 not-found page with off-grid theme
feat: add privacy page (sections 01–06)
fix: correct hreflang alternate for /ja/pricing
content: update vi translation for pricing FAQ q1 (Decree 135)
asset: generate project-3.svg (KCN Tam Phuoc office)
chore: bump next-intl to 3.x
```

---

## Common Issues

### Build fails — "missing translation key"
next-intl throws at build time if a key exists in `en.json` but is missing
from `vi.json` or `ja.json`. Run the diff command above to find the gap.
The new `privacy.*`, `regulations.*`, and `notFound.*` namespaces are common
sources of parity errors — all three files must have identical structures.

### 404 page not rendering custom design
Next.js App Router uses `not-found.tsx` at the `[locale]` level for locale-aware
404s. Ensure the file is at `src/app/[locale]/not-found.tsx`, not at the root
`src/app/not-found.tsx` (which won't have access to locale context). Also
confirm `generateStaticParams` in the locale layout exports all three locales
so Next.js can statically export the 404 page for each language.

For static export (`output: 'export'`), the `.htaccess` `ErrorDocument 404`
directive must point to the correct locale's 404 HTML:
```apache
ErrorDocument 404 /en/404.html
```
The `not-found.tsx` compiles to `out/en/404.html` (and `/vi/`, `/ja/`) by default.

### Privacy page getting indexed
Confirm `meta robots: noindex, follow` is set via `generateMetadata` in
`src/app/[locale]/privacy/page.tsx`:
```ts
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};
```

### Regulations content out of date
Find `regulations.sources.lastVerified` in `src/messages/en.json` and check
the date. If it's more than 6 months old, review the content against the
current Vietnamese solar decree landscape before the next deployment.

### Images not showing on Hostinger
- Paths must start with `/assets/...` (absolute from root)
- Linux is case-sensitive — `Hero-bg.svg` ≠ `hero-bg.svg`
- Confirm files were uploaded to `public_html/assets/`

### Language switcher navigates to wrong path
Check `localePrefix: 'always'` in `src/i18n/routing.ts`. Also confirm
`useRouter` and `usePathname` are imported from `next-intl` not `next/navigation`.

### Form not submitting
1. Confirm `YOUR_FORM_ID` is replaced with a real Formspree ID
2. Check browser console for CSP violations — if Formspree endpoint is blocked,
   update `connect-src` in the CSP meta tag in `src/app/[locale]/layout.tsx`
3. Check Formspree dashboard spam settings — test submissions may be flagged

### Bare "/" shows Next.js default page
The root `src/app/layout.tsx` should do nothing but redirect to `/en/`:
```ts
// src/app/layout.tsx
import { redirect } from 'next/navigation';
export default function RootLayout() {
  redirect('/en/');
}
```
If it still renders a page, check that `output: 'export'` hasn't broken the
redirect — for static export, a `public/index.html` meta-refresh fallback may
also be needed alongside the `.htaccess` redirect.

### Hero SVG animation not working in Safari
Safari sometimes struggles with SVG `animate` elements inside `<img>` tags.
Use the hero SVG as a CSS `background-image` or as an inline `<svg>` element
directly in the JSX rather than via `<Image src="...svg">`. Inline SVG also
avoids the `unoptimized` image issue with static export.

### `generateStaticParams` missing for a new page
Every page under `[locale]` must export:
```ts
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }];
}
```
Without this, `next build` with `output: 'export'` will error or silently skip
the route, leaving missing HTML files in `out/`.
