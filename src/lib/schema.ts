const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SolarTNP',
  alternateName: 'TNP Co.,Ltd',
  image: 'https://www.solartnp.com/assets/og/og-en.svg',
  '@id': 'https://www.solartnp.com',
  url: 'https://www.solartnp.com',
  telephone: '+84903333729',
  email: 'thuy@tnpgr.vn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '529/14 Huỳnh Văn Bánh',
    addressLocality: 'Phú Nhuận',
    addressRegion: 'Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: ['Đồng Nai', 'Ho Chi Minh City', 'Vietnam'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '08:00',
    closes: '17:30',
  },
  priceRange: '$$',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Solar panel installation',
  provider: {
    '@type': 'LocalBusiness',
    name: 'SolarTNP',
  },
  areaServed: ['Đồng Nai', 'Ho Chi Minh City', 'Vietnam'],
  description:
    'Design, supply, and installation of grid-tied solar systems — trusted sourcing, Japanese standards, Vietnamese craft.',
};

const sourcingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'International solar equipment sourcing and shipping',
  provider: {
    '@type': 'LocalBusiness',
    name: 'SolarTNP',
  },
  areaServed: ['United States', 'Southeast Asia'],
  description:
    'Sourcing and shipping of solar equipment to clients across the US and Southeast Asia, through SolarTNP’s global supplier network.',
};

// Rendered verbatim as inline <script type="application/ld+json"> text in
// SchemaJsonLd.tsx. Kept here (rather than inline) so layout.tsx can hash
// these exact strings to populate the CSP script-src allowlist — strict
// `script-src 'self'` blocks inline scripts, including JSON-LD, unless
// allowed by hash or nonce.
export const jsonLdScripts: string[] = [
  JSON.stringify(localBusinessSchema),
  JSON.stringify(serviceSchema),
  JSON.stringify(sourcingServiceSchema),
];
