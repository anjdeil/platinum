import { VariationTitle } from '@/styles/components';
import { ColorVariationsProps } from '@/types/components/shop/product/productVariations';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  ProductVariationsContainer,
  VariationListBlock,
  VariationsButton,
} from './styles';
import { useAppSelector } from '@/store';

const ProductVariations: React.FC<ColorVariationsProps> = ({
  attr,
  currentVariation,
  onChange,
}) => {
  const t = useTranslations('Product');
  const language = useAppSelector(state => state.languageSlice.code);

  const processName = (name: string) => {
    if (language === 'uk' || language === 'ru') {
      if (name.slice(-2).toLowerCase() === 'mm') {
        return name.slice(0, -2) + 'мм';
      }
    }
    return name;
  };

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
              {processName(item.name)}
            </VariationsButton>
          ))}
      </VariationListBlock>
    </ProductVariationsContainer>
  );
};

export default ProductVariations;
