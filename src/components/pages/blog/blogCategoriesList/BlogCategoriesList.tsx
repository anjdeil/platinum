import { CustomCategoryAccordion } from '@/components/global/accordions/CustomCategoryAccordion';
import { FilterCategoryWrapper, StyledList, StyledOwnButton } from './styles';
import AllCategoriesButton from '../blogCategoriesAllButton/BlogCategoriesAllButton';

type Category = {
  name: string;
  slug: string;
};

type BlogTitleProps = {
  categories: Category[];
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
        <AllCategoriesButton
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {categories.map(category => (
          <StyledOwnButton
            noWrap={true}
            width="auto"
            secondary={category.slug !== selectedCategory}
            onClick={() => setSelectedCategory(category.slug)}
            key={category.slug}
          >
            {category.name}
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
