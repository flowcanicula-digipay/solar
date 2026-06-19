import { describe, it, expect } from 'vitest';
import { jsonLdScripts } from '@/lib/schema';

describe('jsonLdScripts', () => {
  it('exposes exactly three JSON-LD documents', () => {
    expect(jsonLdScripts).toHaveLength(3);
  });

  it('produces valid, parseable JSON for every entry', () => {
    for (const script of jsonLdScripts) {
      expect(() => JSON.parse(script)).not.toThrow();
    }
  });

  it('every document declares the schema.org context', () => {
    for (const script of jsonLdScripts) {
      expect(JSON.parse(script)['@context']).toBe('https://schema.org');
    }
  });

  it('includes a LocalBusiness entry with the canonical address', () => {
    const localBusiness = jsonLdScripts.map((s) => JSON.parse(s)).find((s) => s['@type'] === 'LocalBusiness');
    expect(localBusiness).toBeDefined();
    expect(localBusiness.address.addressCountry).toBe('VN');
    expect(localBusiness.telephone).toBe('+84903333729');
  });

  it('includes both the install and sourcing Service entries', () => {
    const services = jsonLdScripts.map((s) => JSON.parse(s)).filter((s) => s['@type'] === 'Service');
    expect(services).toHaveLength(2);
    const serviceTypes = services.map((s) => s.serviceType);
    expect(serviceTypes).toContain('Solar panel installation');
    expect(serviceTypes).toContain('International solar equipment sourcing and shipping');
  });

  it('the sourcing service targets US and Southeast Asia, not Vietnam provinces', () => {
    const sourcing = jsonLdScripts
      .map((s) => JSON.parse(s))
      .find((s) => s.serviceType?.includes('sourcing'));
    expect(sourcing.areaServed).toEqual(['United States', 'Southeast Asia']);
  });
});
