import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PageHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle?: string;
}) {
  const t = useTranslations('common');

  return (
    <section className="relative flex min-h-[320px] items-center overflow-hidden py-16 text-cream-50 md:min-h-[380px] md:py-20">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p
          className="animate-fade-up mb-3 text-xs font-semibold uppercase tracking-widest text-cream-50/60"
          style={{ animationDelay: '0ms' }}
        >
          {t('heroLabel')}
        </p>
        <h1
          className="animate-fade-up max-w-2xl font-display text-4xl font-bold"
          style={{ animationDelay: '150ms' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-fade-up mt-4 max-w-xl text-cream-50/80"
            style={{ animationDelay: '300ms' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
