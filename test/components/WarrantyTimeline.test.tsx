import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import WarrantyTimeline from '@/components/WarrantyTimeline';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('WarrantyTimeline', () => {
  it('renders all five warranty rows', () => {
    renderWithIntl(<WarrantyTimeline />);
    expect(screen.getByText('Solar panels')).toBeInTheDocument();
    expect(screen.getByText('25 years')).toBeInTheDocument();
  });

  it('labels the manufacturer-backed rows distinctly from SolarTNP-backed rows', () => {
    renderWithIntl(<WarrantyTimeline />);
    // row1 (panels) is manufacturer-backed -> "Panel manufacturer"
    expect(screen.getByText('Panel manufacturer')).toBeInTheDocument();
  });

  it('renders the "Backed by" column label', () => {
    renderWithIntl(<WarrantyTimeline />);
    expect(screen.getAllByText('Backed by').length).toBeGreaterThan(0);
  });

  it('reveals the rows once the IntersectionObserver reports visibility', () => {
    const { container } = renderWithIntl(<WarrantyTimeline />);
    expect(container.querySelector('.opacity-0')).not.toBeNull();

    triggerIntersections(true);

    expect(container.querySelector('.opacity-0')).toBeNull();
  });

  it('does not reveal rows when IntersectionObserver fires with isIntersecting=false', () => {
    const { container } = renderWithIntl(<WarrantyTimeline />);
    triggerIntersections(false);
    expect(container.querySelector('.opacity-0')).not.toBeNull();
  });

  it('all five rows start with opacity-0 and translate-y-3 before intersection', () => {
    const { container } = renderWithIntl(<WarrantyTimeline />);
    const hiddenRows = container.querySelectorAll('.opacity-0.translate-y-3');
    expect(hiddenRows.length).toBe(5);
  });

  it('progress bars start at width 0% before intersection', () => {
    const { container } = renderWithIntl(<WarrantyTimeline />);
    const bars = container.querySelectorAll<HTMLElement>('[style*="width: 0%"]');
    expect(bars.length).toBeGreaterThanOrEqual(5);
  });

  it('renders SolarTNP-backed rows with the royal blue badge', () => {
    const { container } = renderWithIntl(<WarrantyTimeline />);
    // SolarTNP-backed rows use bg-royal-600 on the badge span
    const solarTNPBadges = container.querySelectorAll('.bg-royal-600');
    // At least the rows with backedBySolarTNP: true (row4, row5, row3 = 3 rows)
    expect(solarTNPBadges.length).toBeGreaterThanOrEqual(3);
  });
});
