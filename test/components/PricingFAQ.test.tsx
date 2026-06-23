import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PricingFAQ from '@/components/PricingFAQ';
import { renderWithIntl } from '../renderWithIntl';
import { triggerIntersections } from '../setup';

describe('PricingFAQ', () => {
  it('renders all 8 question buttons collapsed by default', () => {
    renderWithIntl(<PricingFAQ />);
    expect(
      screen.getByText("Under Vietnam's current rules, how much surplus power can I sell to EVN?")
    ).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);
    for (const button of buttons) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands a question on click (aria-expanded becomes true)', async () => {
    renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [firstQuestion] = screen.getAllByRole('button');
    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('answer container gains max-h class when open', async () => {
    const { container } = renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [firstQuestion] = screen.getAllByRole('button');

    // Before click — all answer wrappers are collapsed
    const answerDivs = container.querySelectorAll('.max-h-0');
    expect(answerDivs.length).toBe(8);

    await user.click(firstQuestion);

    // After click — one answer wrapper is expanded (no longer max-h-0)
    expect(container.querySelectorAll('.max-h-0').length).toBe(7);
  });

  it('collapses the open question again on a second click', async () => {
    const { container } = renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [firstQuestion] = screen.getAllByRole('button');

    await user.click(firstQuestion);
    expect(container.querySelectorAll('.max-h-0').length).toBe(7);

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelectorAll('.max-h-0').length).toBe(8);
  });

  it('only keeps one question open at a time', async () => {
    const { container } = renderWithIntl(<PricingFAQ />);
    const user = userEvent.setup();
    const [first, second] = screen.getAllByRole('button');

    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelectorAll('.max-h-0').length).toBe(7);
  });

  it('reveals FAQ rows once the IntersectionObserver fires', () => {
    const { container } = renderWithIntl(<PricingFAQ />);
    // Before visibility: at least one row div starts with opacity-0 + translate-y-4
    const hiddenRows = container.querySelectorAll('.translate-y-4.opacity-0');
    expect(hiddenRows.length).toBeGreaterThan(0);
    triggerIntersections(true);
    // After visibility: no row divs retain opacity-0 + translate-y-4
    expect(container.querySelectorAll('.translate-y-4.opacity-0').length).toBe(0);
  });

  it('does not reveal rows when IntersectionObserver fires with isIntersecting=false', () => {
    const { container } = renderWithIntl(<PricingFAQ />);
    triggerIntersections(false);
    const hiddenRows = container.querySelectorAll('.translate-y-4.opacity-0');
    expect(hiddenRows.length).toBeGreaterThan(0);
  });

  it('renders the numeric question prefixes (01–08)', () => {
    renderWithIntl(<PricingFAQ />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
  });
});
