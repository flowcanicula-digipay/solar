import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/[locale]/not-found';
import NotFoundContent from '@/components/NotFoundContent';

describe('[locale]/not-found', () => {
  it('delegates to NotFoundContent', () => {
    const element = NotFound();
    expect(element.type).toBe(NotFoundContent);
  });

  it('renders the styled 404 once NotFoundContent resolves', async () => {
    const element = NotFound();
    render(await (element.type as typeof NotFoundContent)());

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('This page went off-grid.')).toBeInTheDocument();
  });
});
