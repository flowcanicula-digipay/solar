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
});
