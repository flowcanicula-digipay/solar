import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';
import RootPage from '@/app/page';
import GlobalNotFound, { metadata as notFoundMetadata } from '@/app/not-found';
import en from '@/messages/en.json';

describe('app/layout (root pass-through)', () => {
  it('renders children unchanged, with no html/body of its own', () => {
    const result = RootLayout({ children: <div>hello</div> });
    expect(result).toEqual(<div>hello</div>);
  });
});

describe('app/page (bare "/" redirect)', () => {
  it('redirects to /en/', () => {
    expect(() => RootPage()).toThrow('NEXT_REDIRECT:/en/');
  });
});

describe('app/not-found (global fallback)', () => {
  it('is not indexed and not followed', () => {
    expect(notFoundMetadata.robots).toEqual({ index: false, follow: false });
  });

  it('always renders the English copy with locale-prefixed links', () => {
    const { container } = render(<GlobalNotFound />);

    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
    expect(screen.getByText(en.notFound.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: en.notFound.goHome })).toHaveAttribute('href', '/en/');
    expect(screen.getByRole('link', { name: en.notFound.contact })).toHaveAttribute(
      'href',
      '/en/contact/'
    );
  });
});
