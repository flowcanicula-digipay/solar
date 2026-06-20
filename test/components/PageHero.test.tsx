import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PageHero from '@/components/PageHero';
import { renderWithIntl } from '../renderWithIntl';

describe('PageHero', () => {
  it('renders the title and the common hero label', () => {
    renderWithIntl(<PageHero image="/assets/images/banner/contact-hero.jpg" title="Get a Free Site Assessment" />);
    expect(screen.getByRole('heading', { name: 'Get a Free Site Assessment' })).toBeInTheDocument();
    expect(screen.getByText('SolarTNP — Phú Nhuận, Hồ Chí Minh')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    renderWithIntl(
      <PageHero image="/assets/images/banner/contact-hero.jpg" title="Title" subtitle="A helpful subtitle" />
    );
    expect(screen.getByText('A helpful subtitle')).toBeInTheDocument();
  });

  it('omits the subtitle paragraph entirely when not provided', () => {
    const { container } = renderWithIntl(
      <PageHero image="/assets/images/banner/contact-hero.jpg" title="Title" />
    );
    // Only the eyebrow + title paragraphs/headings should be present, no third text block.
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('applies the same slow zoom movement used on the contact/sourcing hero images', () => {
    const { container } = renderWithIntl(
      <PageHero image="/assets/images/banner/pricing-hero.png" title="Title" />
    );
    expect(container.querySelector('img')).toHaveClass('animate-hero-zoom', 'motion-reduce:animate-none');
  });
});
