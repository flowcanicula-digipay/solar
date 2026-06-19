import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ContactPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/contact/page';
import { renderServerPage } from '../renderServerPage';

describe('ContactPage', () => {
  it('generates static params for all three locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds metadata from meta.contact', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.title).toBe('Request a Free Site Assessment — SolarTNP');
  });

  it('renders the contact form and the business sidebar', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
    expect(screen.getByText('+84 90 333 37 29')).toBeInTheDocument();
  });

  it('renders the "next steps" sidebar with three numbered steps', async () => {
    const { container } = await renderServerPage(ContactPage, 'en');
    expect(container.querySelectorAll('ol li')).toHaveLength(3);
  });
});
