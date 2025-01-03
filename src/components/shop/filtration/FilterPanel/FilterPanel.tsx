import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { FilterPanelWrap } from './styles';
import ColorsFilter from '../ColorsFilter/ColorsFilter';
import { FilterActionButtons } from '../filterActionButtons';

/**
 * @todo
 * Fix slider (juniors)
 * Fix button layout (after review)
 * Layout (after review)
 *  */

type ChosenAttributesType = Map<string, Set<string | number>>;

type UpdateAttributesParams = {
  key: string;
  paramValue: (string | number)[] | string | number;
  isPrefix: boolean;
};

export const FilterPanel: FC<FilterPanelPropsType> = ({
  attributes,
  maxPrice,
  minPrice,
}) => {
  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });
  const [chosenAttributes, setChosenAttributes] =
    useState<ChosenAttributesType>(new Map());
  const router = useRouter();

  /** Updates chosen attributes state */
  const updateChosenAttributes = useCallback(
    ({ key, paramValue, isPrefix }: UpdateAttributesParams) => {
      const newMap = new Map(chosenAttributes);

      if (isPrefix) {
        const existingSet = newMap.get(key) || new Set<string | number>();

        if (Array.isArray(paramValue)) {
          paramValue.forEach(value => existingSet.add(value));
        } else {
          if (existingSet.has(paramValue)) {
            existingSet.delete(paramValue);
          } else {
            existingSet.add(paramValue);
          }
        }

        if (existingSet.size === 0) {
          newMap.delete(key);
        } else {
          newMap.set(key, existingSet);
        }
      } else {
        const existingSet = new Set<string | number>();
        if (Array.isArray(paramValue)) {
          paramValue.forEach(value => existingSet.add(value));
        } else {
          existingSet.add(paramValue);
        }
        newMap.set(key, existingSet);
      }

      setChosenAttributes(newMap);
    },
    [chosenAttributes, setChosenAttributes]
  );

  /** Updates chosen with url params */
  useEffect(() => {
    const url = new URL(router.asPath, window.location.origin);
    const params = new URLSearchParams(url.search);

    for (let param of params.keys()) {
      const value = params.get(param);
      const valuesArray = value
        ? value.split(',').map(item => item.trim())
        : [];
      updateChosenAttributes({
        key: param,
        paramValue: valuesArray,
        isPrefix: false,
      });
    }
  }, []);

  /** Updates chosen by click on attribute */
  const updateCurrentParams = useCallback(
    (paramName: string, paramValue: string | number, isPrefix: boolean) => {
      if (!paramName && !paramValue) return;

      const attr = isPrefix ? 'pa_' + paramName : paramName;

      updateChosenAttributes({ key: attr, paramValue: paramValue, isPrefix });
    },
    [updateChosenAttributes]
  );

  /** Updates url params by chosen */
  const updateUrlParams = useCallback(() => {
    const params = Object.fromEntries(
      Array.from(chosenAttributes.entries())
        .filter(([key, set]) => set.size > 0) // Удаляем пустые параметры
        .map(([key, set]) => [key, Array.from(set).join(',')])
    );

    if (!Array.isArray(router?.query?.slugs)) return;

    const newSlugs = router?.query?.slugs?.filter(
      slug => slug !== 'page' && Number.isNaN(+slug)
    );

    const newQuery: Record<string, string | string[]> = {
      slugs: newSlugs,
      ...router.query,
      ...params,
    };

    // Remove empty parameters from newQuery
    Object.keys(newQuery).forEach(key => {
      if (newQuery[key] === undefined || newQuery[key] === '') {
        delete newQuery[key];
      }
    });

    // Remove parameters that no longer exist in chosenAttributes
    Object.keys(router.query).forEach(key => {
      if (!params[key] && key !== 'slugs') {
        delete newQuery[key];
      }
    });

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  }, [chosenAttributes, router, priceRange]);

  /** Apply params */
  const onApplyClick = useCallback(() => {
    updateUrlParams();
  }, [chosenAttributes]);

  /** Reset params */
  const onResetClick = useCallback(() => {
    const { slugs } = router.query;
    router.replace({
      pathname: router.pathname,
      query: { slugs },
    });
    setChosenAttributes(new Map());
  }, [chosenAttributes]);

  /** Reset color params */
  // const onResetColor = useCallback(() => {
  //   const { slugs, ...params } = router.query;
  //   const newQuery: Record<string, string | string[]> = slugs ? { slugs } : {};

  //   Object.keys(params).forEach(key => {
  //     if (!key.startsWith('pa_colour')) {
  //       if (params[key] !== undefined) {
  //         newQuery[key] = params[key];
  //       }
  //     }
  //   });

  //   router.replace({
  //     pathname: router.pathname,
  //     query: newQuery,
  //   });

  //   const newChosenAttributes = new Map(chosenAttributes);
  //   newChosenAttributes.delete('pa_colour');
  //   setChosenAttributes(newChosenAttributes);
  // }, [chosenAttributes, router.query]);

  const updateMinPrice = useCallback(
    (newValue: number) => {
      if (
        newValue !== priceRange.min &&
        newValue >= 0 &&
        newValue <= maxPrice &&
        newValue <= priceRange.max // Убедимся, что min <= max
      ) {
        setPriceRange(prev => ({ ...prev, min: newValue }));
        setChosenAttributes(prev => {
          const updatedAttributes = new Map(prev);
          updatedAttributes.set('min_price', new Set([newValue.toString()]));
          return updatedAttributes;
        });
      }
    },
    [priceRange, maxPrice]
  );

  const updateMaxPrice = useCallback(
    (newValue: number) => {
      if (
        newValue !== priceRange.max &&
        newValue >= 0 &&
        newValue <= maxPrice &&
        newValue >= priceRange.min // Убедимся, что max >= min
      ) {
        setPriceRange(prev => ({ ...prev, max: newValue }));
        setChosenAttributes(prev => {
          const updatedAttributes = new Map(prev);
          updatedAttributes.set('max_price', new Set([newValue.toString()]));
          return updatedAttributes;
        });
      }
    },
    [priceRange, maxPrice]
  );

  // /** Reset price params */
  // const onResetPrice = useCallback(() => {
  //   const { slugs, ...params } = router.query;
  //   const newQuery: Record<string, string | string[]> = slugs ? { slugs } : {};

  //   // Remove price parameters
  //   Object.keys(params).forEach(key => {
  //     if (key !== 'min_price' && key !== 'max_price') {
  //       if (params[key] !== undefined) {
  //         newQuery[key] = params[key];
  //       }
  //     }
  //   });

  //   router.replace({
  //     pathname: router.pathname,
  //     query: newQuery,
  //   });

  //   // Resetting the price values ​​in the state
  //   setPriceRange({ min: minPrice, max: maxPrice });
  //   updateCurrentParams('min_price', minPrice, false);
  //   updateCurrentParams('max_price', maxPrice, false);
  // }, [minPrice, maxPrice, router.query, updateCurrentParams]);

  /** Reset specific params */
  const onResetParams = useCallback(
    (key: string, type?: 'color' | 'price' | 'attributes') => {
      const { slugs, ...params } = router.query;
      const newQuery: Record<string, string | string[]> = slugs
        ? { slugs }
        : {};

      // Удаляем параметры в зависимости от типа или ключа
      Object.keys(params).forEach(paramKey => {
        if (type && params[paramKey] !== undefined) {
          if (type === 'color' && !paramKey.startsWith('pa_colour')) {
            newQuery[paramKey] = params[paramKey];
          } else if (
            type === 'price' &&
            paramKey !== 'min_price' &&
            paramKey !== 'max_price'
          ) {
            newQuery[paramKey] = params[paramKey];
          } else if (
            type === 'attributes' &&
            paramKey.startsWith('pa_') &&
            paramKey !== 'pa_colour'
          ) {
            newQuery[paramKey] = params[paramKey];
          }
        } else if (paramKey !== key && params[paramKey] !== undefined) {
          newQuery[paramKey] = params[paramKey];
        }
      });

      router.replace({
        pathname: router.pathname,
        query: newQuery,
      });

      // Удаляем параметры из состояния
      const newChosenAttributes = new Map(chosenAttributes);
      if (type) {
        if (type === 'color') {
          newChosenAttributes.delete('pa_colour');
        } else if (type === 'price') {
          newChosenAttributes.delete('min_price');
          newChosenAttributes.delete('max_price');
        } else if (type === 'attributes') {
          Array.from(newChosenAttributes.keys()).forEach(attrKey => {
            if (attrKey.startsWith('pa_') && attrKey !== 'pa_colour') {
              newChosenAttributes.delete(attrKey);
            }
          });
        }
      } else {
        newChosenAttributes.delete(key);
      }
      setChosenAttributes(newChosenAttributes);

      // Сбрасываем значения цены в состоянии, если тип 'price'
      if (type === 'price') {
        setPriceRange({ min: minPrice, max: maxPrice });
      }
    },
    [chosenAttributes, router.query, minPrice, maxPrice, updateCurrentParams]
  );
  // const onResetParams = useCallback(
  //   (type: 'color' | 'price' | 'attributes') => {
  //     const { slugs, ...params } = router.query;
  //     const newQuery: Record<string, string | string[]> = slugs
  //       ? { slugs }
  //       : {};

  //     // Remove parameters depending on the type
  //     Object.keys(params).forEach(key => {
  //       if (type === 'color' && !key.startsWith('pa_colour')) {
  //         if (params[key] !== undefined) {
  //           newQuery[key] = params[key];
  //         }
  //       } else if (
  //         type === 'price' &&
  //         key !== 'min_price' &&
  //         key !== 'max_price'
  //       ) {
  //         if (params[key] !== undefined) {
  //           newQuery[key] = params[key];
  //         }
  //       } else if (
  //         type === 'attributes' &&
  //         key.startsWith('pa_') &&
  //         key !== 'pa_colour'
  //       ) {
  //         if (params[key] !== undefined) {
  //           newQuery[key] = params[key];
  //         }
  //       }
  //     });

  //     router.replace({
  //       pathname: router.pathname,
  //       query: newQuery,
  //     });

  //     // Remove parameters from the state
  //     const newChosenAttributes = new Map(chosenAttributes);
  //     if (type === 'color') {
  //       newChosenAttributes.delete('pa_colour');
  //     } else if (type === 'price') {
  //       updateCurrentParams('min_price', minPrice, false);
  //       updateCurrentParams('max_price', maxPrice, false);
  //     } else if (type === 'attributes') {
  //       Array.from(newChosenAttributes.keys()).forEach(key => {
  //         if (key.startsWith('pa_') && key !== 'pa_colour') {
  //           newChosenAttributes.delete(key);
  //         }
  //       });
  //     }
  //     setChosenAttributes(newChosenAttributes);

  //     // Reset price values ​​in state if type is 'price'
  //     if (type === 'price') {
  //       setPriceRange({ min: minPrice, max: maxPrice });
  //     }
  //   },
  //   [chosenAttributes, router.query, minPrice, maxPrice, updateCurrentParams]
  // );

  console.log(chosenAttributes);
  return (
    <FilterPanelWrap>
      <FilterPanelWrap>
        <CustomSingleAccordion title={'Price'}>
          <PriceFilter
            currentMin={priceRange.min}
            currentMax={priceRange.max}
            minPrice={minPrice}
            maxPrice={maxPrice}
            updateMaxPrice={updateMaxPrice}
            updateMinPrice={updateMinPrice}
            onReset={() => onResetParams('price', 'price')}
            onApply={onApplyClick}
          />
        </CustomSingleAccordion>
        {attributes.map(attribute => {
          const attrName = `pa_${attribute.slug}`;
          const existingSet = chosenAttributes.get(attrName);
          const currentAttr = existingSet ? [...existingSet] : [];

          return (
            <CustomSingleAccordion title={attribute.name} key={attribute.id}>
              {attributes && attribute.slug === 'colour' ? (
                <ColorsFilter
                  attribute={attribute}
                  onParamsChange={updateCurrentParams}
                  currentAttribute={currentAttr}
                  onReset={() => onResetParams(attrName, 'color')}
                  onApply={onApplyClick}
                />
              ) : (
                <FilterAttributes
                  attribute={attribute}
                  onParamsChange={updateCurrentParams}
                  currentAttribute={currentAttr}
                  onReset={() => onResetParams(attrName)}
                  onApply={onApplyClick}
                />
              )}
            </CustomSingleAccordion>
          );
        })}
      </FilterPanelWrap>
      <FilterActionButtons onReset={onResetClick} />
    </FilterPanelWrap>
  );
};
