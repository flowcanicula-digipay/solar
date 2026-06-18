import { jsonLdScripts } from '@/lib/schema';

export default function SchemaJsonLd() {
  return (
    <>
      {jsonLdScripts.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}
