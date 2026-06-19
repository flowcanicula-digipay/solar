import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import RegulationsPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/[locale]/regulations/page';
import { renderServerPage } from '../renderServerPage';

describe('RegulationsPage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds metadata from meta.regulations', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('Vietnam Solar Regulations Explained — SolarTNP');
  });

  it('renders the hero and the capacity-threshold table', async () => {
    await renderServerPage(RegulationsPage, 'en');
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('Under 100 kW')).toBeInTheDocument();
  });

  it('renders the s6 checklist items from the translation catalog', async () => {
    const en = (await import('@/messages/en.json')).default as { regulations: { s6: { items: string[] } } };
    await renderServerPage(RegulationsPage, 'en');
    for (const item of en.regulations.s6.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
