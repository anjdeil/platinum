import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export const BlogPageBreadcrumbs = () => {
  const { locale } = useRouter();
  const t = useTranslations('Breadcrumbs');
  const breadcrumbsLinks = [
    {
      name: t('homePage'),
      url: '/',
    },
    {
      name: t('blogPage'),
      url: '',
    },
  ];

  return <Breadcrumbs links={breadcrumbsLinks} locale={locale} />;
};
