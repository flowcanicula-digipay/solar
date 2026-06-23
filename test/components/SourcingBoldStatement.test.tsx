import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SourcingBoldStatement from '@/components/SourcingBoldStatement';
import { triggerIntersections } from '../setup';

const lightParts = [
  { text: 'Factory-level quality.' },
  { text: '\nNot spec-sheet', highlight: true },
  { text: ' quality.' },
];

const darkParts = [
  { text: 'Global network.' },
  { text: '\nNo middlemen.', highlight: true },
];

describe('SourcingBoldStatement', () => {
  describe('light variant (default)', () => {
    it('renders the heading parts', () => {
      render(<SourcingBoldStatement parts={lightParts} />);
      expect(screen.getByText(/Factory-level quality/)).toBeInTheDocument();
      expect(screen.getByText(/Not spec-sheet/)).toBeInTheDocument();
    });

    it('applies text-amber-400 to highlighted parts', () => {
      const { container } = render(<SourcingBoldStatement parts={lightParts} />);
      const highlighted = container.querySelector('.text-amber-400');
      expect(highlighted).not.toBeNull();
      expect(highlighted?.textContent).toContain('Not spec-sheet');
    });

    it('renders the optional label with em-dash prefix', () => {
      render(<SourcingBoldStatement parts={lightParts} label="The advantage" />);
      expect(screen.getByText('— The advantage')).toBeInTheDocument();
    });

    it('renders the optional caption', () => {
      render(<SourcingBoldStatement parts={lightParts} caption="Factory access, passed to you." />);
      expect(screen.getByText('Factory access, passed to you.')).toBeInTheDocument();
    });

    it('does not render caption when not provided', () => {
      const { container } = render(<SourcingBoldStatement parts={lightParts} />);
      expect(container.querySelector('p.italic')).toBeNull();
    });

    it('starts hidden and reveals on intersection', () => {
      const { container } = render(<SourcingBoldStatement parts={lightParts} />);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('does not reveal when isIntersecting is false', () => {
      const { container } = render(<SourcingBoldStatement parts={lightParts} />);
      triggerIntersections(false);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
    });

    it('renders a watermark motif image when motif prop is provided', () => {
      const { container } = render(
        <SourcingBoldStatement parts={lightParts} motif="/assets/motifs/export-crate.svg" />
      );
      const motifImg = Array.from(container.querySelectorAll('img')).find((img) =>
        (img as HTMLImageElement).src.includes('export-crate')
      );
      expect(motifImg).toBeDefined();
    });

    it('does not render a motif image when motif is not provided', () => {
      const { container } = render(<SourcingBoldStatement parts={lightParts} />);
      expect(container.querySelectorAll('img').length).toBe(0);
    });
  });

  describe('dark variant', () => {
    it('renders the heading parts', () => {
      render(<SourcingBoldStatement variant="dark" parts={darkParts} />);
      expect(screen.getByText(/Global network/)).toBeInTheDocument();
      expect(screen.getByText(/No middlemen/)).toBeInTheDocument();
    });

    it('renders the label without em-dash in dark variant', () => {
      render(<SourcingBoldStatement variant="dark" parts={darkParts} label="Our sourcing model" />);
      expect(screen.getByText('Our sourcing model')).toBeInTheDocument();
    });

    it('renders body paragraphs in dark variant', () => {
      render(
        <SourcingBoldStatement
          variant="dark"
          parts={darkParts}
          bodyParagraphs={['First paragraph.', 'Second paragraph.']}
        />
      );
      expect(screen.getByText('First paragraph.')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    });

    it('does not render body paragraphs when not provided', () => {
      render(<SourcingBoldStatement variant="dark" parts={darkParts} />);
      expect(screen.queryByText('First paragraph.')).not.toBeInTheDocument();
    });

    it('renders a bottom rule after revealing', () => {
      const { container } = render(<SourcingBoldStatement variant="dark" parts={darkParts} />);
      triggerIntersections(true);
      expect(container.querySelector('.h-px')).not.toBeNull();
    });

    it('starts hidden and reveals on intersection', () => {
      const { container } = render(<SourcingBoldStatement variant="dark" parts={darkParts} />);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('renders a watermark motif in dark variant when motif provided', () => {
      const { container } = render(
        <SourcingBoldStatement
          variant="dark"
          parts={darkParts}
          motif="/assets/motifs/pallet-wrap.svg"
        />
      );
      const motifImg = Array.from(container.querySelectorAll('img')).find((img) =>
        (img as HTMLImageElement).src.includes('pallet-wrap')
      );
      expect(motifImg).toBeDefined();
    });
  });
});
