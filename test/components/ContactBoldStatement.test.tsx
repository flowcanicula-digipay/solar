import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactBoldStatement from '@/components/ContactBoldStatement';
import { triggerIntersections } from '../setup';

const lightParts = [
  { text: 'One conversation.' },
  { text: ' No commitment.', highlight: true },
];

const darkParts = [
  { text: 'Sized to ' },
  { text: 'your roof.', highlight: true },
];

describe('ContactBoldStatement', () => {
  describe('light variant (default)', () => {
    it('renders the heading parts', () => {
      render(<ContactBoldStatement parts={lightParts} />);
      expect(screen.getByText(/One conversation/)).toBeInTheDocument();
      expect(screen.getByText(/No commitment/)).toBeInTheDocument();
    });

    it('applies text-amber-400 to highlighted parts', () => {
      const { container } = render(<ContactBoldStatement parts={lightParts} />);
      const highlighted = container.querySelector('.text-amber-400');
      expect(highlighted).not.toBeNull();
      expect(highlighted?.textContent).toContain('No commitment');
    });

    it('renders the optional label with em-dash prefix', () => {
      render(<ContactBoldStatement parts={lightParts} label="How it starts" />);
      expect(screen.getByText('— How it starts')).toBeInTheDocument();
    });

    it('renders the optional caption', () => {
      render(<ContactBoldStatement parts={lightParts} caption="No hidden costs." />);
      expect(screen.getByText('No hidden costs.')).toBeInTheDocument();
    });

    it('does not render caption when not provided', () => {
      const { container } = render(<ContactBoldStatement parts={lightParts} />);
      expect(container.querySelector('p.italic')).toBeNull();
    });

    it('starts hidden and reveals on intersection', () => {
      const { container } = render(<ContactBoldStatement parts={lightParts} />);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('does not reveal when isIntersecting is false', () => {
      const { container } = render(<ContactBoldStatement parts={lightParts} />);
      triggerIntersections(false);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
    });

    it('renders a watermark motif image when motif prop is provided', () => {
      const { container } = render(
        <ContactBoldStatement parts={lightParts} motif="/assets/motifs/viet-pin.svg" />
      );
      const motifImg = Array.from(container.querySelectorAll('img')).find((img) =>
        (img as HTMLImageElement).src.includes('viet-pin')
      );
      expect(motifImg).toBeDefined();
    });

    it('does not render a motif image when motif is not provided', () => {
      const { container } = render(<ContactBoldStatement parts={lightParts} />);
      expect(container.querySelectorAll('img').length).toBe(0);
    });
  });

  describe('dark variant', () => {
    it('renders the heading parts', () => {
      render(<ContactBoldStatement variant="dark" parts={darkParts} />);
      expect(screen.getByText(/Sized to/)).toBeInTheDocument();
      expect(screen.getByText(/your roof/)).toBeInTheDocument();
    });

    it('renders the label without em-dash in dark variant', () => {
      render(<ContactBoldStatement variant="dark" parts={darkParts} label="Our promise" />);
      expect(screen.getByText('Our promise')).toBeInTheDocument();
    });

    it('renders body paragraphs in dark variant', () => {
      render(
        <ContactBoldStatement
          variant="dark"
          parts={darkParts}
          bodyParagraphs={['First paragraph.', 'Second paragraph.']}
        />
      );
      expect(screen.getByText('First paragraph.')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    });

    it('does not render body paragraphs when not provided', () => {
      render(<ContactBoldStatement variant="dark" parts={darkParts} />);
      expect(screen.queryByText('First paragraph.')).not.toBeInTheDocument();
    });

    it('renders a bottom rule after revealing', () => {
      const { container } = render(<ContactBoldStatement variant="dark" parts={darkParts} />);
      triggerIntersections(true);
      expect(container.querySelector('.h-px')).not.toBeNull();
    });

    it('starts hidden and reveals on intersection', () => {
      const { container } = render(<ContactBoldStatement variant="dark" parts={darkParts} />);
      expect(container.querySelector('.opacity-0')).not.toBeNull();
      triggerIntersections(true);
      expect(container.querySelector('.opacity-0')).toBeNull();
    });

    it('renders a watermark motif in dark variant when motif provided', () => {
      const { container } = render(
        <ContactBoldStatement
          variant="dark"
          parts={darkParts}
          motif="/assets/motifs/lotus-seal.svg"
        />
      );
      const motifImg = Array.from(container.querySelectorAll('img')).find((img) =>
        (img as HTMLImageElement).src.includes('lotus-seal')
      );
      expect(motifImg).toBeDefined();
    });
  });
});
