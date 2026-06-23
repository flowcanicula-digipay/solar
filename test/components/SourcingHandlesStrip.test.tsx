import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SourcingHandlesStrip from '@/components/SourcingHandlesStrip';

describe('SourcingHandlesStrip', () => {
  it('renders all four channel panels', () => {
    const { container } = render(<SourcingHandlesStrip />);
    expect(container.querySelectorAll('.group').length).toBe(4);
  });

  it('renders the WhatsApp label', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
  });

  it('renders the Email label', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the US shipping label', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('Shipping: US')).toBeInTheDocument();
  });

  it('renders the Southeast Asia shipping label', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('Shipping: Southeast Asia')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('+84 90 333 37 29')).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
  });

  it('renders the United States destination value', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders the Southeast Asia destination value', () => {
    render(<SourcingHandlesStrip />);
    expect(screen.getByText('Vietnam · Thailand · Philippines')).toBeInTheDocument();
  });

  it('renders a motif image for each panel', () => {
    const { container } = render(<SourcingHandlesStrip />);
    // 4 photos + 4 motifs = 8
    expect(container.querySelectorAll('img').length).toBe(8);
  });

  it('all images are decorative (empty alt)', () => {
    const { container } = render(<SourcingHandlesStrip />);
    container.querySelectorAll('img').forEach((img) => {
      expect((img as HTMLImageElement).alt).toBe('');
    });
  });
});
