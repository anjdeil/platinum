import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';

export const BlogPageBreadcrumbs = () => {
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

  return <Breadcrumbs links={breadcrumbsLinks} />;
};
