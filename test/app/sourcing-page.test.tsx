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

  it('renders the B2B sourcing form', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByLabelText('Company name')).toBeInTheDocument();
  });

  it('renders business contact details in the sidebar', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getAllByText('thuy@tnpgr.vn').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('+84 90 333 37 29').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the SourcingHero section', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByRole('region', { name: 'Sourcing hero' })).toBeInTheDocument();
  });

  it('renders the "01 — Reach Us Directly" section heading', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByText('01 — Reach Us Directly')).toBeInTheDocument();
  });

  it('renders the "02 — Request a Sourcing Quote" section heading', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByText('02 — Request a Sourcing Quote')).toBeInTheDocument();
  });

  it('renders the "03 — Why Source Through SolarTNP" section heading', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getByText('03 — Why Source Through SolarTNP')).toBeInTheDocument();
  });

  it('renders the "next steps" sidebar with three numbered steps', async () => {
    const { container } = await renderServerPage(SourcingPage, 'en');
    expect(container.querySelectorAll('ol li').length).toBeGreaterThanOrEqual(3);
  });

  it('renders the final CTA with "Tell us what you need."', async () => {
    await renderServerPage(SourcingPage, 'en');
    expect(screen.getAllByText('Tell us what you need.').length).toBeGreaterThanOrEqual(1);
  });

  it('renders motif icons in the "Prefer to reach out directly?" sidebar card', async () => {
    const { container } = await renderServerPage(SourcingPage, 'en');
    const motifImgs = Array.from(container.querySelectorAll('img')).filter((img) =>
      (img as HTMLImageElement).src.includes('contact-')
    );
    expect(motifImgs.length).toBeGreaterThanOrEqual(4);
  });
});
