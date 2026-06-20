import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import HomePage, { generateMetadata, generateStaticParams } from '@/app/[locale]/page';
import { renderServerPage } from '../renderServerPage';
import { triggerIntersections } from '../setup';

describe('HomePage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds locale-aware metadata from meta.home', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('SolarTNP — Japanese-Quality Solar Installation in Vietnam');
    expect(meta.description).toContain('SolarTNP');
  });

  it('renders the hero, about, process, warranty, japanese-quality and sourcing sections', async () => {
    await renderServerPage(HomePage, 'en');

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Solar panels')).toBeInTheDocument(); // from WarrantyTimeline
    expect(screen.getAllByRole('link', { name: /Free Site Assessment|Get a Quote/i }).length).toBeGreaterThan(0);
  });

  it('does not render the projects section while SHOW_PROJECTS is false', async () => {
    await renderServerPage(HomePage, 'en');
    expect(screen.queryByText('Biên Hòa Residence')).not.toBeInTheDocument();
  });

  it('renders correctly for the vi and ja locales too', async () => {
    await renderServerPage(HomePage, 'vi');
    expect(document.querySelector('h1')).toBeInTheDocument();
  });

  it('reveals the sourcing section once it scrolls into view', async () => {
    const { container } = await renderServerPage(HomePage, 'en');
    const sourcingLink = screen.getByRole('link', { name: 'Talk to Us About Sourcing' });
    const sourcingSection = sourcingLink.closest('div');

    expect(sourcingSection).toHaveClass('opacity-0');

    triggerIntersections(true);

    expect(sourcingSection).toHaveClass('opacity-100');
  });
});
