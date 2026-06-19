import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import NotFoundPage, { generateStaticParams, metadata } from '@/app/[locale]/404/page';
import { renderServerPage } from '../renderServerPage';

describe('[locale]/404 page', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('is followable but not indexed (so the URL itself never ranks)', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it('renders the styled NotFoundContent for the requested locale', async () => {
    await renderServerPage(NotFoundPage, 'en');
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('This page went off-grid.')).toBeInTheDocument();
  });
});
