import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PricingHero from '@/components/PricingHero';

describe('PricingHero', () => {
  it('renders the section with aria-label "Pricing hero"', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    expect(screen.getByRole('region', { name: 'Pricing hero' })).toBeInTheDocument();
  });

  it('renders the title via HeroWordSplit', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    // HeroWordSplit splits into words — the text content is still present
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    expect(screen.getByText('Built to last.')).toBeInTheDocument();
  });

  it('renders the "Pricing & Payback" eyebrow label', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    expect(screen.getByText('Pricing & Payback')).toBeInTheDocument();
  });

  it('renders the "Get a Free Site Assessment" CTA link', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    const link = screen.getByRole('link', { name: 'Get a Free Site Assessment' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('/contact'));
  });

  it('renders the "See pricing" anchor link pointing to #tiers', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    const anchor = screen.getByRole('link', { name: /See pricing/i });
    expect(anchor).toHaveAttribute('href', '#tiers');
  });

  it('renders three stat items in the stat strip', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    expect(screen.getByText('avg. payback period')).toBeInTheDocument();
    expect(screen.getByText('panel output guarantee')).toBeInTheDocument();
    expect(screen.getByText('subcontractors. Ever.')).toBeInTheDocument();
  });

  it('renders the ~4.5yr and 25yr and 0% stat values', () => {
    render(<PricingHero title="Transparent pricing" subtitle="Built to last." />);
    expect(screen.getByText('~4.5')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders the hero background image as decorative (empty alt)', () => {
    const { container } = render(
      <PricingHero title="Transparent pricing" subtitle="Built to last." />
    );
    const imgs = container.querySelectorAll('img');
    // First image is the hero background — alt="" (decorative)
    const heroImg = imgs[0] as HTMLImageElement;
    expect(heroImg.alt).toBe('');
  });
});
