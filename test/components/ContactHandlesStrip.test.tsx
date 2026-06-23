import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactHandlesStrip from '@/components/ContactHandlesStrip';

describe('ContactHandlesStrip', () => {
  it('renders all four channel panels', () => {
    const { container } = render(<ContactHandlesStrip />);
    // Four flex children
    expect(container.querySelectorAll('.group').length).toBe(4);
  });

  it('renders the Phone & Zalo label', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('Phone & Zalo')).toBeInTheDocument();
  });

  it('renders the WhatsApp label', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
  });

  it('renders the Email label', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the Office label', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('Office')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getAllByText('+84 90 333 37 29').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the email address', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
  });

  it('renders the office location', () => {
    render(<ContactHandlesStrip />);
    expect(screen.getByText('Phú Nhuận, HCM')).toBeInTheDocument();
  });

  it('renders a motif image for each panel', () => {
    const { container } = render(<ContactHandlesStrip />);
    // Each panel has a photo img + a motif img
    const imgs = container.querySelectorAll('img');
    // 4 photos + 4 motifs = 8
    expect(imgs.length).toBe(8);
  });

  it('all photo images are decorative (empty alt)', () => {
    const { container } = render(<ContactHandlesStrip />);
    container.querySelectorAll('img').forEach((img) => {
      expect((img as HTMLImageElement).alt).toBe('');
    });
  });
});
