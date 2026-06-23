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

  it('renders the hero section', async () => {
    await renderServerPage(RegulationsPage, 'en');
    expect(screen.getByRole('region', { name: 'Regulations hero' })).toBeInTheDocument();
  });

  it('renders the capacity thresholds section header', async () => {
    await renderServerPage(RegulationsPage, 'en');
    expect(screen.getAllByText(/Capacity Thresholds/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the building compliance checklist items', async () => {
    await renderServerPage(RegulationsPage, 'en');
    expect(screen.getByText('Construction law compliance')).toBeInTheDocument();
    expect(screen.getByText('Land-use rights status')).toBeInTheDocument();
    expect(screen.getByText('Fire safety standards')).toBeInTheDocument();
  });

  it('renders the "01 — The Core Rule" section', async () => {
    await renderServerPage(RegulationsPage, 'en');
    expect(screen.getByText('01 — The Core Rule')).toBeInTheDocument();
  });
});
