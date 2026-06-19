import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PaybackTable from '@/components/PaybackTable';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('PaybackTable', () => {
  it('renders one card per system size', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText('5 kWp')).toBeInTheDocument();
    expect(screen.getByText('8 kWp')).toBeInTheDocument();
    expect(screen.getByText('15 kWp')).toBeInTheDocument();
  });

  it('renders the payback years figure for each row', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText('4.6')).toBeInTheDocument();
    expect(screen.getByText('4.7')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('computes the % of the 25-year system life from paybackYears', () => {
    renderWithIntl(<PaybackTable />);
    // 4.6 / 25 = 18.4% -> rounds to 18%
    expect(screen.getByText('18% of the 25-year system life')).toBeInTheDocument();
  });

  it('renders system cost and savings figures', () => {
    renderWithIntl(<PaybackTable />);
    expect(screen.getByText('~78,000,000 VND')).toBeInTheDocument();
    expect(screen.getByText(/~1,400,000 VND/)).toBeInTheDocument();
  });

  it('reveals the cards once the IntersectionObserver reports visibility', () => {
    const { container } = renderWithIntl(<PaybackTable />);
    const card = container.querySelector('.opacity-0');
    expect(card).not.toBeNull();

    triggerIntersections(true);

    expect(container.querySelector('.opacity-0')).toBeNull();
  });
});
