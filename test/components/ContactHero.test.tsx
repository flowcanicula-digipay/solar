import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactHero from '@/components/ContactHero';

describe('ContactHero', () => {
  it('renders the section with aria-label "Contact hero"', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByRole('region', { name: 'Contact hero' })).toBeInTheDocument();
  });

  it('renders the H1 heading', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByText('Free site visit.')).toBeInTheDocument();
  });

  it('renders the "Free Site Assessment" eyebrow label', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByText('Free Site Assessment')).toBeInTheDocument();
  });

  it('renders the "Request a free assessment" CTA anchor pointing to #form', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    const cta = screen.getByRole('link', { name: 'Request a free assessment' });
    expect(cta).toHaveAttribute('href', '#form');
  });

  it('renders the "See pricing first" link pointing to /pricing', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    const link = screen.getByRole('link', { name: /See pricing first/i });
    expect(link).toHaveAttribute('href', '/pricing');
  });

  it('renders the three stat labels', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByText('free site assessment')).toBeInTheDocument();
    expect(screen.getByText('to receive your quote')).toBeInTheDocument();
    expect(screen.getByText('obligation. Ever.')).toBeInTheDocument();
  });

  it('renders the hero background image as decorative (empty alt)', () => {
    const { container } = render(
      <ContactHero title="Start your solar journey" subtitle="Free site visit." />
    );
    const heroImg = container.querySelector('img') as HTMLImageElement;
    expect(heroImg.alt).toBe('');
  });

  it('renders the scroll cue label', () => {
    render(<ContactHero title="Start your solar journey" subtitle="Free site visit." />);
    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });
});
