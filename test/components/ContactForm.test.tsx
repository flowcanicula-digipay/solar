import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';
import { renderWithIntl } from '../renderWithIntl';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders the required fields', () => {
    renderWithIntl(<ContactForm />);
    expect(screen.getByLabelText('Full name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Province / City')).toBeRequired();
  });

  it('phone is optional', () => {
    renderWithIntl(<ContactForm />);
    expect(screen.getByLabelText(/Phone/)).not.toBeRequired();
  });

  it('renders the property type chip options from the translation catalog', () => {
    renderWithIntl(<ContactForm />);
    expect(screen.getByText('House / Villa')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  it('shows a success message and hides the form after a successful submit', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });
    renderWithIntl(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Full name'), 'Nguyen Van A');
    await user.type(screen.getByLabelText('Email'), 'a@example.com');
    await user.type(screen.getByLabelText('Province / City'), 'Biên Hòa');
    await user.click(screen.getByRole('button', { name: /Request Free Assessment/ }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: /Request Free Assessment/ })).not.toBeInTheDocument();
  });

  it('shows an error message and keeps the form visible when the request fails', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false });
    renderWithIntl(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Full name'), 'Nguyen Van A');
    await user.type(screen.getByLabelText('Email'), 'a@example.com');
    await user.type(screen.getByLabelText('Province / City'), 'Biên Hòa');
    await user.click(screen.getByRole('button', { name: /Request Free Assessment/ }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Request Free Assessment/ })).toBeInTheDocument();
    });
  });

  it('shows an error message when the request throws (network failure)', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('network down'));
    renderWithIntl(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Full name'), 'Nguyen Van A');
    await user.type(screen.getByLabelText('Email'), 'a@example.com');
    await user.type(screen.getByLabelText('Province / City'), 'Biên Hòa');
    await user.click(screen.getByRole('button', { name: /Request Free Assessment/ }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Request Free Assessment/ })).toBeInTheDocument();
    });
  });
});
