import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';

type BlogTitleProps = {
  title: string;
  secondTitle?: boolean;
};

export const BlogTitle = ({ title, secondTitle }: BlogTitleProps) => {
  const t = useTranslations('Breadcrumbs');

  return (
    <Title as={secondTitle ? 'h2' : 'h1'} uppercase>
      {t(title)}
    </Title>
  );
};
