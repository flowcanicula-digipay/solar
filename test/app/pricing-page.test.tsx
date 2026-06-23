import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PricingPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/pricing/page';
import { renderServerPage } from '../renderServerPage';
import { triggerIntersections } from '../setup';

describe('PricingPage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds metadata from meta.pricing', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('Solar Pricing & Payback — SolarTNP');
  });

  it('renders the pricing tiers, payback table and FAQ', async () => {
    await renderServerPage(PricingPage, 'en');
    // Tier headings
    expect(screen.getByRole('heading', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Large' })).toBeInTheDocument();
    // Payback tab selector — size text may appear multiple times (tab + detail)
    expect(screen.getAllByText('Family Home').length).toBeGreaterThanOrEqual(1);
    // FAQ buttons (8 questions + 3 payback tabs + tier cards)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(3);
  }, 30000);

  it('renders the "Always included" section heading', async () => {
    await renderServerPage(PricingPage, 'en');
    expect(screen.getByRole('heading', { name: 'Always included' })).toBeInTheDocument();
  });

  it('renders the portrait strip included item labels', async () => {
    await renderServerPage(PricingPage, 'en');
    // These labels appear in the strip; some also appear in tier feature list — use getAllByText
    expect(screen.getAllByText('Japanese-standard installation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('EVN & DOIT paperwork').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('12 months free callouts').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the bold statement sections', async () => {
    await renderServerPage(PricingPage, 'en');
    expect(screen.getByText(/How we quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Our promise/i)).toBeInTheDocument();
  });

  it('renders the "Ready to see your number?" final CTA', async () => {
    await renderServerPage(PricingPage, 'en');
    expect(screen.getByRole('heading', { name: 'Ready to see your number?' })).toBeInTheDocument();
  });

  it('reveals the final CTA once it scrolls into view', async () => {
    await renderServerPage(PricingPage, 'en');
    const heading = screen.getByRole('heading', { name: 'Ready to see your number?' });
    const reveal = heading.closest('div');
    expect(reveal).toHaveClass('opacity-0');
    triggerIntersections(true);
    expect(reveal).toHaveClass('opacity-100');
  });
});
