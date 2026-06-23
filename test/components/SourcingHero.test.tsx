import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SourcingHero from '@/components/SourcingHero';

describe('SourcingHero', () => {
  it('renders the section with aria-label "Sourcing hero"', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByRole('region', { name: 'Sourcing hero' })).toBeInTheDocument();
  });

  it('renders the H1 heading', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByText('Direct from factory.')).toBeInTheDocument();
  });

  it('renders the "International Sourcing & Shipping" eyebrow label', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByText('International Sourcing & Shipping')).toBeInTheDocument();
  });

  it('renders the "Request a sourcing quote" CTA anchor pointing to #form', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    const cta = screen.getByRole('link', { name: 'Request a sourcing quote' });
    expect(cta).toHaveAttribute('href', '#form');
  });

  it('renders the "Residential installs" link pointing to /contact', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    const link = screen.getByRole('link', { name: /Residential installs/i });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders the three stat labels', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByText('shipping destinations')).toBeInTheDocument();
    expect(screen.getByText('panel output guarantee')).toBeInTheDocument();
    expect(screen.getByText('for panels & hardware')).toBeInTheDocument();
  });

  it('renders the hero background image as decorative (empty alt)', () => {
    const { container } = render(
      <SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />
    );
    const heroImg = container.querySelector('img') as HTMLImageElement;
    expect(heroImg.alt).toBe('');
  });

  it('renders the scroll cue label', () => {
    render(<SourcingHero title="Solar equipment, sourced globally" subtitle="Direct from factory." />);
    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });
});
