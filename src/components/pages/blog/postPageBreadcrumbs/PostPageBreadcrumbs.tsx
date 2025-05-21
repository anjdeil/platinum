import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

type PostPageBreadcrumbsProps = {
  title: string;
};

export const PostPageBreadcrumbs = ({ title }: PostPageBreadcrumbsProps) => {
  const { locale } = useRouter();
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

  return <Breadcrumbs links={breadcrumbsLinks} locale={locale} />;
};
