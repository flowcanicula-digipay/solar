import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PricingFAQ from '@/components/PricingFAQ';
import { renderWithIntl } from '../renderWithIntl';

describe('PricingFAQ', () => {
  it('renders all 8 questions collapsed by default', () => {
    renderWithIntl(<PricingFAQ />);
    expect(
      screen.getByText("Under Vietnam's current rules, how much surplus power can I sell to EVN?")
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(8);
    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands a question on click, revealing its answer', async () => {
    renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [firstQuestion] = screen.getAllByRole('button');

    await user.click(firstQuestion);

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Decree 135\/2024\/ND-CP/)).toBeInTheDocument();
  });

  it('collapses the open question again on a second click', async () => {
    renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [firstQuestion] = screen.getAllByRole('button');

    await user.click(firstQuestion);
    await user.click(firstQuestion);

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/Decree 135\/2024\/ND-CP/)).not.toBeInTheDocument();
  });

  it('only keeps one question open at a time', async () => {
    renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });
});
