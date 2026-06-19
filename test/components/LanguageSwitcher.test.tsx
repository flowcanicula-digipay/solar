import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useRouter } from '@/i18n/navigation';
import en from '@/messages/en.json';

function renderSwitcher() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <LanguageSwitcher />
    </NextIntlClientProvider>
  );
}

describe('LanguageSwitcher', () => {
  it('shows the current locale and a closed listbox by default', () => {
    renderSwitcher();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox with all three locale options on click', async () => {
    renderSwitcher();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Language' }));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('marks the current locale as selected in the listbox', async () => {
    renderSwitcher();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Language' }));

    const options = screen.getAllByRole('option');
    const selected = options.find((o) => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveTextContent('English');
  });

  it('navigates to the chosen locale and closes the listbox on selection', async () => {
    renderSwitcher();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Language' }));
    await user.click(screen.getByRole('option', { name: 'Tiếng Việt' }));

    expect(useRouter().replace).toHaveBeenCalledWith('/', { locale: 'vi' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes the listbox on Escape', async () => {
    renderSwitcher();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Language' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes the listbox when clicking outside of it', async () => {
    renderSwitcher();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Language' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
