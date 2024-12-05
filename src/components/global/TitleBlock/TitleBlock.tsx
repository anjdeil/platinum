import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { StyledText, TitleBlockContainer } from './styles';

interface TitleBlockProps {
  title: string;
  subTitle: string | undefined;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, subTitle }) => {
  const t = useTranslations('Product');

  return (
    <TitleBlockContainer>
      <StyledText>{t(subTitle)}</StyledText>
      <Title as='h4' uppercase>
        {t(title)}
      </Title>
    </TitleBlockContainer>
  );
};

export default TitleBlock;
