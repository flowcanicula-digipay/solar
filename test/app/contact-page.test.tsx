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

  it('renders the contact form', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
  });

  it('renders business contact details in the sidebar', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getAllByText('thuy@tnpgr.vn').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('+84 90 333 37 29').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the "next steps" sidebar with three numbered steps', async () => {
    const { container } = await renderServerPage(ContactPage, 'en');
    expect(container.querySelectorAll('ol li').length).toBeGreaterThanOrEqual(3);
  });

  it('renders the ContactHero section', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByRole('region', { name: 'Contact hero' })).toBeInTheDocument();
  });

  it('renders the "01 — Reach Us Directly" section heading', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByText('01 — Reach Us Directly')).toBeInTheDocument();
  });

  it('renders the "02 — Request a Free Site Assessment" section heading', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByText('02 — Request a Free Site Assessment')).toBeInTheDocument();
  });

  it('renders the "03 — Why SolarTNP" section heading', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByText('03 — Why SolarTNP')).toBeInTheDocument();
  });

  it('renders the final CTA section with "Let\'s look at your roof."', async () => {
    await renderServerPage(ContactPage, 'en');
    expect(screen.getByText("Let's look at your roof.")).toBeInTheDocument();
  });

  it('renders motif icons in the "Prefer to call?" sidebar card', async () => {
    const { container } = await renderServerPage(ContactPage, 'en');
    const motifImgs = Array.from(container.querySelectorAll('img')).filter((img) =>
      (img as HTMLImageElement).src.includes('contact-')
    );
    expect(motifImgs.length).toBeGreaterThanOrEqual(4);
  });
});
