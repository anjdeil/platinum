import { StyledText, TitleBlock } from '@/components/sections/styles';
import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';

type BlogTitleProps = {
  title: string;
  subtitle: string;
};

export const BlogHeader = ({ title, subtitle }: BlogTitleProps) => {
  const t = useTranslations('BlogPostPage');

  return (
    <TitleBlock>
      <StyledText>{t(subtitle)}</StyledText>
      <Title as="h4" uppercase>
        {t(title)}
      </Title>
    </TitleBlock>
  );
};
