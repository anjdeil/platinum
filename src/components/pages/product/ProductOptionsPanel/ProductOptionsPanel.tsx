import { ProductOptionsPanelType } from '@/types/pages/product/productOptionsPanel';
import { filterFirstAttributeOptions } from '@/utils/filterFirstAttributeOptions';
import { getSaleVariation } from '@/utils/getSaleVariation';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import ColorVariations from '../ColorVariations/ColorVariations';
import ProductVariations from '../ProductVariations/ProductVariations';

export const ProductOptionsPanel: FC<ProductOptionsPanelType> = ({
  attributes,
  defaultAttributes,
  variations,
}) => {
  const [chosenOptions, setChosenOptions] = useState(new Map());
  const router = useRouter();

  const filteredAttributes = useMemo(
    () => filterFirstAttributeOptions(attributes, variations),
    [attributes, variations]
  );

  /** Sanitize chosen options */
  const sanitizeChosenOptions = useCallback(
    (optionsMap: Map<string, string>) => {
      const newMap = new Map(optionsMap);

      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];

        const prevSelected = Array.from(newMap.entries()).filter(([slug]) => {
          const index = attributes.findIndex(a => a.slug === slug);
          return index >= 0 && index < i;
        });

        const filteredVariations = variations.filter(variation =>
          prevSelected.every(([slug, value]) =>
            variation.attributes.some(
              a => a.slug === slug && a.option === value
            )
          )
        );

        const validOptions = new Set<string>();
        filteredVariations.forEach(variation => {
          const match = variation.attributes.find(a => a.slug === attr.slug);
          if (match) validOptions.add(match.option);
        });

        const selected = newMap.get(attr.slug);
        if (!selected || !validOptions.has(selected)) {
          const fallback = attr.options.find(opt => validOptions.has(opt.slug));
          if (fallback) {
            newMap.set(attr.slug, fallback.slug);
          } else {
            newMap.delete(attr.slug);
          }
        }
      }

      return newMap;
    },
    [attributes, variations]
  );

  /** Set default attributes */
  const setDefaultAttributes = useCallback(() => {
    const newMap = new Map();

    const urlParams = router.query;

    let hasUrlParams = false;

    Object.entries(urlParams).forEach(([key, value]) => {
      if (key !== 'slug' && typeof value === 'string') {
        newMap.set(key, value);
        hasUrlParams = true;
      }
    });

    if (!hasUrlParams) {
      const saleVariation = getSaleVariation(variations);
      if (saleVariation) {
        saleVariation.attributes.forEach(item =>
          newMap.set(item.slug, item.option)
        );
      } else {
        defaultAttributes.forEach(item => newMap.set(item.slug, item.option));
      }
    }

    const sanitizedMap = sanitizeChosenOptions(newMap);

    setChosenOptions(prev => {
      const prevStr = JSON.stringify(Array.from(prev.entries()));
      const newStr = JSON.stringify(Array.from(sanitizedMap.entries()));

      return prevStr !== newStr ? sanitizedMap : prev;
    });
  }, [router.query, variations, defaultAttributes, sanitizeChosenOptions]);

  useEffect(() => {
    setDefaultAttributes();
  }, []);

  /** Update chosen options by click on option */
  function updateChosenOptions(attr: string, option: string) {
    const newMap = new Map(chosenOptions);
    newMap.set(attr, option);
    const sanitized = sanitizeChosenOptions(newMap);
    setChosenOptions(sanitized);
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
      {filteredAttributes.map((attr, index) => {
        let filteredAttr = attr;

        if (index > 0) {
          const prevSelected = Array.from(chosenOptions.entries()).filter(
            ([slug]) => {
              const currentAttrIndex = attributes.findIndex(
                a => a.slug === slug
              );
              return currentAttrIndex >= 0 && currentAttrIndex < index;
            }
          );

          const filteredVariations = variations.filter(variation => {
            return prevSelected.every(([key, value]) => {
              const match = variation.attributes.find(
                attr => attr.slug === key
              );
              return match?.option === value;
            });
          });

          const optionSlugs = new Set<string>();
          filteredVariations.forEach(variation => {
            const match = variation.attributes.find(a => a.slug === attr.slug);
            if (match) optionSlugs.add(match.option);
          });

          filteredAttr = {
            ...attr,
            options: attr.options.filter(opt => optionSlugs.has(opt.slug)),
          };
        }

        if (attr.slug === 'colour') {
          return (
            <ColorVariations
              key={attr.id}
              attr={filteredAttr}
              currentVariation={chosenOptions.get(attr.slug)}
              onChange={updateChosenOptions}
            />
          );
        }

        return (
          <ProductVariations
            key={attr.id}
            attr={filteredAttr}
            currentVariation={chosenOptions.get(attr.slug)}
            onChange={updateChosenOptions}
          />
        );
      })}
    </>
  );
};
