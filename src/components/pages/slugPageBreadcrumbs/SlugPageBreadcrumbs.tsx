import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC } from 'react';

type SlugPageBreadcrumbsProps = {
  title: string;
};

export const SlugPageBreadcrumbs: FC<SlugPageBreadcrumbsProps> = ({
  title,
}) => {
  const { locale } = useRouter();
  const t = useTranslations('Breadcrumbs');
  const breadcrumbsLinks = [
    {
      name: t('homePage'),
      url: '/',
    },
    {
      name: title,
      url: '',
    },
  ];

  return <Breadcrumbs links={breadcrumbsLinks} locale={locale} />;
};
