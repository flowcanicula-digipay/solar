import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PrivacyPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/privacy/page';
import { renderServerPage } from '../renderServerPage';

describe('PrivacyPage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('sets noindex,follow robots metadata (not for search indexing, but linkable)', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('Privacy Policy — SolarTNP');
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  it('renders all six numbered privacy sections', async () => {
    const { container } = await renderServerPage(PrivacyPage, 'en');
    expect(container.querySelectorAll('h2')).toHaveLength(6);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
  });

  it('links back home', async () => {
    await renderServerPage(PrivacyPage, 'en');
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
