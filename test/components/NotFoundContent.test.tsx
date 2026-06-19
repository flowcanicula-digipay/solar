import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundContent from '@/components/NotFoundContent';
import { setRequestLocale } from 'next-intl/server';

describe('NotFoundContent', () => {
  it('renders the English notFound copy and locale-prefixed links by default', async () => {
    render(await NotFoundContent());

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('This page went off-grid.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go Home' })).toHaveAttribute('href', '/en/');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/en/contact/');
  });

  it('uses the ambient locale set via setRequestLocale for its links', async () => {
    setRequestLocale('vi');
    render(await NotFoundContent());

    expect(screen.getByRole('link', { name: 'Về trang chủ' })).toHaveAttribute('href', '/vi/');
    expect(screen.getByRole('link', { name: 'Liên hệ' })).toHaveAttribute('href', '/vi/contact/');
  });
});
