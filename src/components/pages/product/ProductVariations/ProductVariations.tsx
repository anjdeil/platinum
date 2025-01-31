import { VariationTitle } from '@/styles/components';
import { ColorVariationsProps } from '@/types/components/shop/product/productVariations';
import React from 'react';
import {
  ProductVariationsContainer,
  VariationListBlock,
  VariationsButton,
} from './styles';
import { useTranslations } from 'next-intl';

const ProductVariations: React.FC<ColorVariationsProps> = ({
  attr,
  currentVariation,
  onChange,
}) => {
  const t = useTranslations('Product');
  return (
    <ProductVariationsContainer>
      <VariationTitle>{t(attr.slug)}</VariationTitle>
      <VariationListBlock>
        {attr.options &&
          attr.options.map(item => (
            <VariationsButton
              key={item.slug}
              active={item.slug === currentVariation}
              onClick={() => onChange(attr.slug, item.slug)}
            >
              {item.slug}
            </VariationsButton>
          ))}
      </VariationListBlock>
    </ProductVariationsContainer>
  );
};

export default ProductVariations;
