import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('common.footer');
  const nav = useTranslations('common.nav');
  const biz = useTranslations('common.business');
  const home = useTranslations('home');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800/10 bg-navy-950 text-cream-50">
      <div className="relative flex min-h-[340px] items-center overflow-hidden sm:min-h-[420px]">
        <Image
          src="/assets/images/banner/footer-hero.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/60 to-navy-950/95" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-cream-50">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {home('brandBanner.location')}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-snug sm:text-4xl">
            {t('tagline')}
          </h2>
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-24 bg-cream-50/25" />
            <span className="h-1 w-1 rounded-full bg-amber-400" />
          </div>
          <p className="mt-6 text-xs tracking-[0.2em] text-cream-50/45">
            太陽光発電 ・ 日本基準 ・ ベトナムの職人技
          </p>
          <p className="mt-2 font-display text-sm italic text-cream-50/55">
            Solar done properly. Built to last 25 years.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="inline-block rounded-md bg-cream-50 px-3 py-2">
            <Image
              src="/assets/logo/logo-new.jpg"
              alt="TNP Co.,Ltd"
              width={300}
              height={200}
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-3 font-display text-lg font-semibold">SolarTNP</p>
          <p className="mt-3 text-sm text-cream-50/70">{t('tagline')}</p>
          <a
            href="#"
            aria-label="Facebook"
            className="mt-4 inline-flex text-cream-50/60 transition-colors hover:text-amber-400"
          >
            <Facebook size={18} />
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            {t('quickLinks')}
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
                {nav('regulations')}
              </Link>
            </li>
            <li>
              <Link href="/sourcing" className="text-cream-50/80 hover:text-royal-100">
                {nav('sourcing')}
              </Link>
            </li>
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

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            {t('contactColumn')}
          </p>
          <ul className="mt-3 space-y-3 text-sm text-cream-50/80">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 flex-shrink-0 text-amber-400" aria-hidden="true" />
              <span>{biz('email')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 flex-shrink-0 text-amber-400" aria-hidden="true" />
              <span>{biz('phone')}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-400" aria-hidden="true" />
              <span>{biz('address')}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            {t('marketsLabel')}
          </p>
          <p className="mt-3 text-sm text-cream-50/70">{t('markets')}</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-cream-50/10 px-6 py-4 text-center text-xs text-cream-50/50 sm:flex-row sm:text-left">
        <p>
          © {year} TNP Co.,Ltd. {t('rights')}
        </p>
        <Link href="/privacy" className="hover:text-royal-100">
          {t('privacy')}
        </Link>
      </div>
    </footer>
  );
}
