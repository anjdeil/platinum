import { CustomCategoryAccordion } from '@/components/global/accordions/CustomCategoryAccordion';
import { FilterCategoryWrapper, StyledList, StyledOwnButton } from './styles';

type BlogTitleProps = {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory(name: string | null): void;
};

export const BlogCategoriesList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: BlogTitleProps) => {
  return (
    <>
      <StyledList>
        <StyledOwnButton
          noWrap={true}
          width="auto"
          secondary={selectedCategory !== null}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </StyledOwnButton>
        {categories.map(category => (
          <StyledOwnButton
            noWrap={true}
            width="auto"
            secondary={category !== selectedCategory}
            onClick={() => setSelectedCategory(category)}
            key={category}
          >
            {category}
          </StyledOwnButton>
        ))}
      </StyledList>
      <FilterCategoryWrapper>
        <CustomCategoryAccordion
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </FilterCategoryWrapper>
    </>
  );
};
