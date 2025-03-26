import { ProductAttributesType } from '@/types/components/shop/product/products';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  CharacteristicsTableCell,
  CharacteristicsTableRow,
  ProductCharacteristicsContainer,
  ProductCharacteristicsWrapper,
} from './styles';

const ProductCharacteristics: React.FC<{
  attributes: ProductAttributesType[];
}> = ({ attributes }) => {
  const t = useTranslations('Product');
  return (
    <ProductCharacteristicsContainer>
      {attributes.map(item => (
        <ProductCharacteristicsWrapper key={item.id}>
          <CharacteristicsTableRow>{t(item.slug)}</CharacteristicsTableRow>
          <CharacteristicsTableCell>
            {item.options.map(option => option.name).join(', ')}
          </CharacteristicsTableCell>
        </ProductCharacteristicsWrapper>
      ))}
    </ProductCharacteristicsContainer>
  );
};

export default ProductCharacteristics;
