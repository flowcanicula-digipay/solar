import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocaleLayout, { generateMetadata, generateStaticParams } from '@/app/[locale]/layout';

describe('[locale]/layout', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('uses the requested locale for the og:image when it is supported', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'vi' }) });
    expect(meta.openGraph?.images).toEqual([{ url: '/assets/og/og-vi.svg' }]);
  });

  it('falls back to the default locale og:image for an unsupported locale', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'fr' }) });
    expect(meta.openGraph?.images).toEqual([{ url: '/assets/og/og-en.svg' }]);
  });

  it('sets metadataBase so og/twitter images resolve to absolute URLs', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.metadataBase?.toString()).toBe('https://www.solartnp.com/');
  });

  it('renders the html lang attribute, header, footer, and children for a supported locale', async () => {
    const element = await LocaleLayout({
      children: <div>page content</div>,
      params: Promise.resolve({ locale: 'en' }),
    });
    const { container } = render(element);

    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
    expect(screen.getByText('page content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
  });

  it('redirects to the default locale for an unsupported locale', async () => {
    await expect(
      LocaleLayout({ children: <div />, params: Promise.resolve({ locale: 'fr' }) })
    ).rejects.toThrow('NEXT_REDIRECT:/en/');
  });
});
