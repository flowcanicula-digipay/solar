import { getLocale, getTranslations } from 'next-intl/server';
import NotFoundView from '@/components/NotFoundView';
import { withBasePath } from '@/lib/assetPath';

export default async function NotFoundContent() {
  const t = await getTranslations('notFound');
  const locale = await getLocale();

  return (
    <NotFoundView
      eyebrow={t('eyebrow')}
      fourOhFour={t('fourofour')}
      tagline={t('tagline')}
      body={t('body')}
      goHomeLabel={t('goHome')}
      goHomeHref={withBasePath(`/${locale}/`)}
      contactLabel={t('contact')}
      contactHref={withBasePath(`/${locale}/contact/`)}
      footer={t('footer')}
    />
  );
}
