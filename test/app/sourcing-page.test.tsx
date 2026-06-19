import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import SourcingPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/sourcing/page';
import { renderServerPage } from '../renderServerPage';

describe('SourcingPage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds metadata from meta.sourcing', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('International Sourcing & Shipping — SolarTNP');
  });

  it('renders the B2B sourcing form and the business sidebar', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByLabelText('Company name')).toBeInTheDocument();
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
  });
});
