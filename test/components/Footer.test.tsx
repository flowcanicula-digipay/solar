import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { renderWithIntl } from '../renderWithIntl';

describe('Footer', () => {
  it('renders the current year in the copyright line', () => {
    renderWithIntl(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders the quick links nav section', () => {
    renderWithIntl(<Footer />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sourcing').length).toBeGreaterThan(0);
  });

  it('renders business contact details', () => {
    renderWithIntl(<Footer />);
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
  });
});
