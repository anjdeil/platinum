import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';

type PostPageBreadcrumbsProps = {
  title: string;
};

export const PostPageBreadcrumbs = ({ title }: PostPageBreadcrumbsProps) => {
  const t = useTranslations('Breadcrumbs');
  const breadcrumbsLinks = [
    {
      name: t('homePage'),
      url: '/',
    },
    {
      name: t('blogPage'),
      url: '/blog',
    },
    {
      name: title,
      url: '',
    },
  ];

  return <Breadcrumbs links={breadcrumbsLinks} />;
};
