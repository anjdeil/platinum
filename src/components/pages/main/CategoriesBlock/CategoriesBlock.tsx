import { CategoriesBlockProps } from '@/types/pages/shop';
import { FC } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { CategoriesBlockContainer, CategoriesList } from './styles';

const CategoriesBlock: FC<CategoriesBlockProps> = ({ categories }) => {
  console.log('categories...', categories);
  return (
    <CategoriesBlockContainer>
      <CategoriesList>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <CategoryItem
              key={index}
              imageURL={category.image}
              name={category.title}
              slug={category.slug}
              double={index % 4 > 1}
            />
          ))}
      </CategoriesList>
    </CategoriesBlockContainer>
  );
};

export default CategoriesBlock;
