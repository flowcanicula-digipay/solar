import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderServerPage } from '../renderServerPage';

// SHOW_PROJECTS is off by default until there are more than the 4 seed
// installations (see src/lib/featureFlags.ts). Mocking the flag here, in its
// own file, exercises that branch without affecting the "flag off" coverage
// asserted in home-page.test.tsx.
vi.mock('@/lib/featureFlags', () => ({ SHOW_PROJECTS: true }));

describe('HomePage with SHOW_PROJECTS enabled', () => {
  it('renders all four seed projects', async () => {
    const { default: HomePage } = await import('@/app/[locale]/page');
    await renderServerPage(HomePage, 'en');

    expect(screen.getByText('Biên Hòa Residence')).toBeInTheDocument();
    expect(screen.getByText('Thủ Đức Townhouse')).toBeInTheDocument();
    expect(screen.getByText('KCN Tam Phước Office')).toBeInTheDocument();
    expect(screen.getByText('Long An Family Home')).toBeInTheDocument();
  });
});
