import { ProductOptionsPanelType } from '@/types/pages/product/productOptionsPanel';
import { getSaleVariation } from '@/utils/getSaleVariation';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import ColorVariations from '../ColorVariations/ColorVariations';
import ProductVariations from '../ProductVariations/ProductVariations';

export const ProductOptionsPanel: FC<ProductOptionsPanelType> = ({
  attributes,
  defaultAttributes,
  variations,
}) => {
  const [chosenOptions, setChosenOptions] = useState(new Map());
  const router = useRouter();

  /** Set default attributes */
  const setDefaultAttributes = useCallback(() => {
    const newMap = new Map();

    const saleVariation = getSaleVariation(variations);
    if (saleVariation) {
      saleVariation.attributes.forEach(item =>
        newMap.set(item.slug, item.option)
      );
    } else {
      defaultAttributes.forEach(item => newMap.set(item.slug, item.option));
    }
    setChosenOptions(newMap);
  }, []);

  useEffect(() => {
    setDefaultAttributes();
  }, []);

  /** Update chosen options by click on option */
  function updateChosenOptions(attr: string, option: string) {
    const newMap = new Map(chosenOptions);
    newMap.set(attr, option);
    setChosenOptions(newMap);
  }

  /** Update url params by chosen options */
  const updateUrlParams = useCallback(() => {
    const params = Object.fromEntries(
      Array.from(chosenOptions.entries()).map(([key, value]) => [key, value])
    );

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...params },
      },
      undefined,
      { shallow: true }
    );
  }, [chosenOptions]);

  useEffect(() => {
    updateUrlParams();
  }, [chosenOptions]);

  return (
    <>
      {attributes.map(attr => {
        if (attr.slug === 'colour') {
          return (
            <ColorVariations
              key={attr.id}
              attr={attr}
              currentVariation={chosenOptions.get(attr.slug)}
              onChange={updateChosenOptions}
            />
          );
        }

        return (
          <ProductVariations
            key={attr.id}
            attr={attr}
            currentVariation={chosenOptions.get(attr.slug)}
            onChange={updateChosenOptions}
          />
        );
      })}
    </>
  );
};
