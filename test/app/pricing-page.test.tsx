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

  it('renders the pricing tiers, included-items list, payback table and FAQ', async () => {
    await renderServerPage(PricingPage, 'en');
    expect(screen.getByRole('heading', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0); // FAQ accordion buttons
    expect(screen.getByText('5 kWp')).toBeInTheDocument(); // PaybackTable
  });

  it('renders the included.items list from the translation catalog', async () => {
    const en = (await import('@/messages/en.json')).default as { pricing: { included: { items: string[] } } };
    await renderServerPage(PricingPage, 'en');
    for (const item of en.pricing.included.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('reveals the "Always included" grid once it scrolls into view', async () => {
    await renderServerPage(PricingPage, 'en');
    const heading = screen.getByRole('heading', { name: 'Always included' });
    const section = heading.closest('div')?.parentElement;

    expect(section).toHaveClass('opacity-0');

    triggerIntersections(true);

    expect(section).toHaveClass('opacity-100');
  });

  it('reveals the "Ready to see your number?" CTA once it scrolls into view', async () => {
    await renderServerPage(PricingPage, 'en');
    const heading = screen.getByRole('heading', { name: 'Ready to see your number?' });
    const section = heading.closest('div');

    expect(section).toHaveClass('opacity-0');

    triggerIntersections(true);

    expect(section).toHaveClass('opacity-100');
  });
});
