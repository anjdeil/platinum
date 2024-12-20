import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';

type BlogTitleProps = {
  title: string;
};

export const BlogTitle = ({ title }: BlogTitleProps) => {
  const t = useTranslations('Breadcrumbs');

  return (
    <Title as={'h1'} uppercase>
      {t(title)}
    </Title>
  );
};
