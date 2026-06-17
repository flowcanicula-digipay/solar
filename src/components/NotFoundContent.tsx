import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SunIcon from '@/components/SunIcon';

export default async function NotFoundContent() {
  const t = await getTranslations('notFound');

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy-950 px-6 py-20 text-center text-cream-50">
      <Image
        src="/assets/images/hero/panel-grid.svg"
        alt=""
        fill
        className="object-cover opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div
            className="radiance-ring-slow absolute h-64 w-64 rounded-full bg-amber-400"
            aria-hidden="true"
          />
          <SunIcon size={120} />
        </div>

        <p className="mt-6 font-display font-bold text-cream-50 text-[clamp(6rem,20vw,12rem)] leading-none">
          {t('fourofour')}
        </p>

        <p className="mt-4 font-display text-2xl font-semibold">{t('tagline')}</p>
        <p className="mt-3 max-w-md text-cream-50/70">{t('body')}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-royal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-royal-700"
          >
            {t('goHome')}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border-2 border-royal-600 px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-royal-100 hover:text-royal-700"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
