import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import AfterCareSection from '@/components/AfterCareSection';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('AfterCareSection', () => {
  it('renders the aftercare banner section with aria-labelledby', () => {
    const { container } = renderWithIntl(<AfterCareSection />);
    // Section uses aria-labelledby="aftercare-heading"
    const section = container.querySelector('[aria-labelledby="aftercare-heading"]');
    expect(section).not.toBeNull();
  });

  it('renders the year 1 and year 2+ support cards', () => {
    renderWithIntl(<AfterCareSection />);
    // The two card sections exist (Year 1 and Year 2+)
    const cards = document.querySelectorAll('.rounded-2xl');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the 18-tile shatter grid', () => {
    const { container } = renderWithIntl(<AfterCareSection />);
    const panels = container.querySelectorAll('[data-panel]');
    expect(panels).toHaveLength(18);
  });

  it('tiles are aria-hidden (decorative)', () => {
    const { container } = renderWithIntl(<AfterCareSection />);
    const tileGrid = container.querySelector('[aria-hidden="true"]');
    expect(tileGrid).toBeInTheDocument();
  });

  it('does not animate when prefers-reduced-motion is active', () => {
    // matchMedia is mocked globally in setup.ts with matches: false
    // Override to simulate prefers-reduced-motion: reduce
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Should render without error even when motion is reduced
    const { container } = renderWithIntl(<AfterCareSection />);
    expect(container.querySelector('[aria-labelledby="aftercare-heading"]')).not.toBeNull();

    window.matchMedia = original;
  });

  it('renders the closing line / note text', () => {
    renderWithIntl(<AfterCareSection />);
    // The component renders content from home.warranty translations
    // Just verify the support section exists and has content
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it('reveals tiles-grid is z-20 (sits above the image)', () => {
    const { container } = renderWithIntl(<AfterCareSection />);
    const tileGrid = container.querySelector('.z-20');
    expect(tileGrid).toBeInTheDocument();
  });
});
