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
    streetAddress: 'Lô 35 đường số 9, KCN Tam Phước',
    addressLocality: 'Biên Hòa',
    addressRegion: 'Đồng Nai',
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
    'Design, supply, and installation of grid-tied solar systems — Chinese sourcing, Japanese standards, Vietnamese craft.',
};

export default function SchemaJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
