import CategoriesBlock from '@/components/pages/main/CategoriesBlock/CategoriesBlock';
import { CategoriesSectionData } from '@/types/components/sections/index';
import { RecommendContainer, SectionContainer } from '../styles';
import { SectionHeader } from '../SectionHeader';

type CategoriesSectionProps = Omit<CategoriesSectionData, '_type'>;

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  subtitle,
  title,
  categories_bars,
}) => {
  return (
    <SectionContainer>
      <RecommendContainer>
        <SectionHeader title={title} subtitle={subtitle} />
        <CategoriesBlock categories={categories_bars} />
      </RecommendContainer>
    </SectionContainer>
  );
};
