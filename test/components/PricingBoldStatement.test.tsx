import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PricingBoldStatement from '@/components/PricingBoldStatement';
import { triggerIntersections } from '../setup';

const lightParts = [
  { text: 'How we ' },
  { text: 'quote', highlight: true },
  { text: ' is how we work.' },
];

const darkParts = [
  { text: 'Our ' },
  { text: 'promise', highlight: true },
  { text: ' to you.' },
];

describe('PricingBoldStatement', () => {
  describe('light variant (default)', () => {
    it('renders the heading parts', () => {
      render(<PricingBoldStatement parts={lightParts} />);
      // Parts may have trailing/leading spaces — match via regex
      expect(screen.getByText(/How we/)).toBeInTheDocument();
      expect(screen.getByText('quote')).toBeInTheDocument();
      expect(screen.getByText(/is how we work/)).toBeInTheDocument();
    });

    it('applies text-amber-400 class to highlighted parts', () => {
      const { container } = render(<PricingBoldStatement parts={lightParts} />);
      const highlighted = container.querySelector('.text-amber-400');
      expect(highlighted).not.toBeNull();
      expect(highlighted?.textContent).toBe('quote');
    });

    it('renders the optional label with em-dash prefix', () => {
      render(<PricingBoldStatement parts={lightParts} label="How we quote" />);
      expect(screen.getByText('— How we quote')).toBeInTheDocument();
    });

    it('renders the optional caption', () => {
      render(<PricingBoldStatement parts={lightParts} caption="No hidden costs." />);
      expect(screen.getByText('No hidden costs.')).toBeInTheDocument();
    });

    it('does not render label or caption when not provided', () => {
      const { container } = render(<PricingBoldStatement parts={lightParts} />);
      // No italic caption paragraph
      expect(container.querySelector('p.italic')).toBeNull();
    });

    it('starts hidden and reveals on intersection', () => {
      const { container } = render(<PricingBoldStatement parts={lightParts} />);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('does not reveal when isIntersecting is false', () => {
      const { container } = render(<PricingBoldStatement parts={lightParts} />);
      triggerIntersections(false);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
    });

    it('renders a watermark motif image when motif prop is provided', () => {
      const { container } = render(
        <PricingBoldStatement parts={lightParts} motif="/assets/motifs/heritage-seal.svg" />
      );
      const imgs = container.querySelectorAll('img');
      const motifImg = Array.from(imgs).find((img) =>
        (img as HTMLImageElement).src.includes('heritage-seal')
      );
      expect(motifImg).toBeDefined();
    });

    it('does not render a motif image when motif is not provided', () => {
      const { container } = render(<PricingBoldStatement parts={lightParts} />);
      const imgs = container.querySelectorAll('img');
      expect(imgs.length).toBe(0);
    });
  });

  describe('dark variant', () => {
    it('renders the heading parts in dark variant', () => {
      render(<PricingBoldStatement variant="dark" parts={darkParts} />);
      expect(screen.getByText(/Our/)).toBeInTheDocument();
      expect(screen.getByText('promise')).toBeInTheDocument();
    });

    it('renders the label without em-dash in dark variant', () => {
      render(<PricingBoldStatement variant="dark" parts={darkParts} label="Our promise" />);
      expect(screen.getByText('Our promise')).toBeInTheDocument();
    });

    it('renders body paragraphs in dark variant', () => {
      render(
        <PricingBoldStatement
          variant="dark"
          parts={darkParts}
          bodyParagraphs={['First paragraph.', 'Second paragraph.']}
        />
      );
      expect(screen.getByText('First paragraph.')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    });

    it('does not render body paragraphs section when not provided', () => {
      render(<PricingBoldStatement variant="dark" parts={darkParts} />);
      // No extra paragraphs beyond the heading parts
      expect(screen.queryByText('First paragraph.')).not.toBeInTheDocument();
    });

    it('renders a bottom rule hr line after revealing', () => {
      const { container } = render(
        <PricingBoldStatement variant="dark" parts={darkParts} />
      );
      triggerIntersections(true);
      // The bottom rule div transitions from opacity-0 → opacity-100
      const rule = container.querySelector('.h-px');
      expect(rule).not.toBeNull();
    });

    it('starts hidden and reveals on intersection (dark variant)', () => {
      const { container } = render(
        <PricingBoldStatement variant="dark" parts={darkParts} />
      );
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('renders a watermark motif in dark variant when motif provided', () => {
      const { container } = render(
        <PricingBoldStatement
          variant="dark"
          parts={darkParts}
          motif="/assets/motifs/lotus-seal.svg"
        />
      );
      const imgs = container.querySelectorAll('img');
      const motifImg = Array.from(imgs).find((img) =>
        (img as HTMLImageElement).src.includes('lotus-seal')
      );
      expect(motifImg).toBeDefined();
    });
  });
});
