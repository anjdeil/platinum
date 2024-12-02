import CategoriesBlock from '@/components/pages/main/CategoriesBlock/CategoriesBlock';
import { CategoriesSectionData } from '@/types/components/sections/index';
import { RecommendContainer, StyledText, TitleBlock } from '../styles';
import { Title } from '@/styles/components';
import { StyledContainer } from './styles';

type CategoriesSectionProps = Omit<CategoriesSectionData, '_type'>;

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  subtitle,
  title,
  categories_bars,
}) => {
  return (
    <StyledContainer>
      <RecommendContainer>
        <TitleBlock>
          <StyledText>{subtitle}</StyledText>
          <Title as='h4' uppercase>
            {title}
          </Title>
        </TitleBlock>

        <CategoriesBlock categories={categories_bars} />
      </RecommendContainer>
    </StyledContainer>
  );
};
