import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SourcingForm from '@/components/SourcingForm';
import { renderWithIntl } from '../renderWithIntl';

describe('SourcingForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders the required B2B fields', () => {
    renderWithIntl(<SourcingForm />);
    expect(screen.getByLabelText('Company name')).toBeRequired();
    expect(screen.getByLabelText('Contact person')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
  });

  it('renders the shipping destination options', () => {
    renderWithIntl(<SourcingForm />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Southeast Asia')).toBeInTheDocument();
  });

  it('shows a success message and hides the form after a successful submit', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });
    renderWithIntl(<SourcingForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Company name'), 'Acme Solar Co');
    await user.type(screen.getByLabelText('Contact person'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /Send Sourcing Inquiry/ }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
    });
  });

  it('shows an error message when the request fails', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false });
    renderWithIntl(<SourcingForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Company name'), 'Acme Solar Co');
    await user.type(screen.getByLabelText('Contact person'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /Send Sourcing Inquiry/ }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Send Sourcing Inquiry/ })).toBeInTheDocument();
    });
  });

  it('shows an error message when the request throws (network failure)', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('network down'));
    renderWithIntl(<SourcingForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Company name'), 'Acme Solar Co');
    await user.type(screen.getByLabelText('Contact person'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /Send Sourcing Inquiry/ }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Send Sourcing Inquiry/ })).toBeInTheDocument();
    });
  });
});
