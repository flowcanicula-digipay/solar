import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('common.footer');
  const nav = useTranslations('common.nav');
  const biz = useTranslations('common.business');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800/10 bg-navy-950 text-cream-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <Image
            src="/assets/logo/logo-light.png"
            alt="TNP Co.,Ltd"
            width={120}
            height={120}
            className="h-12 w-auto rounded-md"
          />
          <p className="mt-3 font-display text-lg font-semibold">SolarTNP</p>
          <p className="mt-3 text-sm text-cream-50/70">{t('tagline')}</p>
          <p className="mt-3 text-sm text-cream-50/70">{t('markets')}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cream-50/50">
            {t('company')}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-cream-50/80 hover:text-royal-100">
                {nav('home')}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-cream-50/80 hover:text-royal-100">
                {nav('pricing')}
              </Link>
            </li>
            <li>
              <Link href="/regulations" className="text-cream-50/80 hover:text-royal-100">
                {t('regulations')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cream-50/50">
            {t('contactColumn')}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream-50/80">
            <li>{biz('address')}</li>
            <li>{biz('phone')}</li>
            <li>{biz('email')}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cream-50/50">
            {t('quickLinks')}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-cream-50/80 hover:text-royal-100">
                {nav('contact')}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-cream-50/80 hover:text-royal-100">
                {t('privacy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10 px-6 py-4 text-center text-xs text-cream-50/50">
        © {year} TNP Co.,Ltd. {t('rights')}
      </div>
    </footer>
  );
}
