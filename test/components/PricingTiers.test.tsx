import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PricingTiers from '@/components/PricingTiers';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('PricingTiers', () => {
  it('renders all three tier names as headings', () => {
    renderWithIntl(<PricingTiers />);
    expect(screen.getByRole('heading', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Large' })).toBeInTheDocument();
  });

  it('pre-selects the medium tier (aria-pressed=true)', () => {
    renderWithIntl(<PricingTiers />);
    const cards = screen.getAllByRole('button');
    const mediumCard = cards.find((c) => c.textContent?.includes('Medium'));
    const smallCard = cards.find((c) => c.textContent?.includes('Small'));
    expect(mediumCard).toHaveAttribute('aria-pressed', 'true');
    expect(smallCard).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches selection when a different card is clicked', async () => {
    renderWithIntl(<PricingTiers />);
    const user = userEvent.setup();
    const cards = screen.getAllByRole('button');
    const smallCard = cards.find((c) => c.textContent?.includes('Small'))!;
    await user.click(smallCard);
    expect(smallCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders "Get a Quote" links for small and medium tiers', () => {
    renderWithIntl(<PricingTiers />);
    const links = screen.getAllByRole('link', { name: 'Get a Quote' });
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link).toHaveAttribute('href', expect.stringContaining('/contact'));
    }
  });

  it('renders a "Request a Custom Quote" link for the large tier', () => {
    renderWithIntl(<PricingTiers />);
    const link = screen.getByRole('link', { name: 'Request a Custom Quote' });
    expect(link).toHaveAttribute('href', expect.stringContaining('/contact'));
  });

  it('renders the "Most popular" badge on the medium tier', () => {
    renderWithIntl(<PricingTiers />);
    expect(screen.getByText('Most popular')).toBeInTheDocument();
  });

  it('reveals the tier cards once the IntersectionObserver reports visibility', () => {
    const { container } = renderWithIntl(<PricingTiers />);
    expect(container.querySelector('.opacity-0')).not.toBeNull();
    triggerIntersections(true);
    expect(container.querySelector('.opacity-0')).toBeNull();
  });

  it('selects a card via Enter key (keyboard navigation)', async () => {
    renderWithIntl(<PricingTiers />);
    const user = userEvent.setup();
    const cards = screen.getAllByRole('button');
    const smallCard = cards.find((c) => c.textContent?.includes('Small'))!;
    // Tab to the card and press Enter
    smallCard.focus();
    await user.keyboard('{Enter}');
    expect(smallCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('selects a card via Space key (keyboard navigation)', async () => {
    renderWithIntl(<PricingTiers />);
    const user = userEvent.setup();
    const cards = screen.getAllByRole('button');
    const largeCard = cards.find((c) => c.textContent?.includes('Large'))!;
    largeCard.focus();
    await user.keyboard(' ');
    expect(largeCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not deselect medium when clicking the CTA link inside the card', async () => {
    renderWithIntl(<PricingTiers />);
    const user = userEvent.setup();
    // The CTA div inside the card calls stopPropagation so clicking the link
    // should NOT flip the card selection away from medium
    const cards = screen.getAllByRole('button');
    const mediumCard = cards.find((c) => c.textContent?.includes('Medium'))!;
    expect(mediumCard).toHaveAttribute('aria-pressed', 'true');

    const ctaLink = screen.getAllByRole('link', { name: 'Get a Quote' })[0];
    await user.click(ctaLink);
    // medium should still be selected (stopPropagation kept the card click from firing)
    expect(mediumCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not reveal cards when IntersectionObserver fires with isIntersecting=false', () => {
    const { container } = renderWithIntl(<PricingTiers />);
    triggerIntersections(false);
    expect(container.querySelector('.opacity-0')).not.toBeNull();
  });

  it('renders the indicative price label', () => {
    renderWithIntl(<PricingTiers />);
    const priceLabels = screen.getAllByText('Indicative price range');
    expect(priceLabels.length).toBe(3);
  });
});
