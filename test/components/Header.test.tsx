import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';
import { renderWithIntl } from '../renderWithIntl';

describe('Header', () => {
  it('renders all five nav links', () => {
    renderWithIntl(<Header />);
    for (const label of ['Home', 'Pricing', 'Regulations', 'Sourcing', 'Contact']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it('renders the free assessment CTA', () => {
    renderWithIntl(<Header />);
    expect(screen.getAllByText('Get a Free Site Assessment').length).toBeGreaterThan(0);
  });

  it('hides the mobile menu by default and toggles it open on click', async () => {
    renderWithIntl(<Header />);
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the mobile menu after clicking a nav link in it', async () => {
    renderWithIntl(<Header />);
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });
    await user.click(toggle);

    const mobileLinks = screen.getAllByText('Pricing');
    await user.click(mobileLinks[mobileLinks.length - 1]);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu after clicking the free-assessment CTA in it', async () => {
    renderWithIntl(<Header />);
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });
    await user.click(toggle);

    const ctaLinks = screen.getAllByText('Get a Free Site Assessment');
    await user.click(ctaLinks[ctaLinks.length - 1]);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
