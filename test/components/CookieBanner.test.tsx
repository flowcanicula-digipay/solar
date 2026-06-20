import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import CookieBanner from '@/components/CookieBanner';
import en from '@/messages/en.json';

const STORAGE_KEY = 'solartnp-cookie-consent';

function renderBanner() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <CookieBanner />
    </NextIntlClientProvider>
  );
}

describe('CookieBanner', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows the banner on first visit', () => {
    renderBanner();
    expect(screen.getByRole('region', { name: 'Got it' })).toBeInTheDocument();
  });

  it('links to the privacy policy', () => {
    renderBanner();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });

  it('hides the banner and persists consent when accepted', async () => {
    renderBanner();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Got it' }));

    expect(screen.queryByRole('region', { name: 'Got it' })).not.toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('accepted');
  });

  it('does not show the banner again once consent was already stored', () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    renderBanner();

    expect(screen.queryByRole('region', { name: 'Got it' })).not.toBeInTheDocument();
  });
});
