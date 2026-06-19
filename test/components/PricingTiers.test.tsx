import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PricingTiers from '@/components/PricingTiers';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('PricingTiers', () => {
  it('renders all three tiers by name', () => {
    renderWithIntl(<PricingTiers />);
    expect(screen.getByRole('heading', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Large' })).toBeInTheDocument();
  });

  it('pre-selects the medium tier', () => {
    const { container } = renderWithIntl(<PricingTiers />);
    expect(container.querySelector('#tier-medium')).toBeChecked();
    expect(container.querySelector('#tier-small')).not.toBeChecked();
  });

  it('renders a "Get a Quote" link per tier pointing at /contact', () => {
    renderWithIntl(<PricingTiers />);
    const links = screen.getAllByRole('link', { name: 'Get a Quote' });
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute('href', expect.stringContaining('/contact'));
    }
  });

  it('reveals the tier cards once the IntersectionObserver reports visibility', () => {
    const { container } = renderWithIntl(<PricingTiers />);
    expect(container.querySelector('.opacity-0')).not.toBeNull();

    triggerIntersections(true);

    expect(container.querySelector('.opacity-0')).toBeNull();
  });
});
