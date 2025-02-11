import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useAppSelector } from '@/store';
import { FilterPanelPropsType } from '@/types/components/shop/filters';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import ColorsFilter from '../ColorsFilter/ColorsFilter';
import { FilterActionButtons } from '../filterActionButtons';
import { FilterAttributes } from '../FilterAttributes/FilterAttributes';
import { PriceFilter } from '../PriceFilter';
import { FilterPanelWrap } from './styles';

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
  minPrice,
  maxPrice,
}) => {
  const {
    currentCurrency,
    convertCurrency,
    convertToDefaultCurrency,
    currencyCode,
    isLoading,
  } = useCurrencyConverter();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const t = useTranslations('Archive');

  const [initialPriceRange, setInitialPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    const initializePrices = async () => {
      const convertedMinPrice = await convertCurrency(minPrice);
      const convertedMaxPrice = await convertCurrency(maxPrice);
      setInitialPriceRange({ min: convertedMinPrice, max: convertedMaxPrice });
      setPriceRange({ min: convertedMinPrice, max: convertedMaxPrice });
    };

    initializePrices();
  }, [minPrice, maxPrice, selectedCurrency, currentCurrency]);

  useEffect(() => {
    const updatePrices = async () => {
      const convertedMinPrice = await convertCurrency(minPrice);
      const convertedMaxPrice = await convertCurrency(maxPrice);
      setPriceRange({ min: convertedMinPrice, max: convertedMaxPrice });
    };

    updatePrices();
  }, [currentCurrency, minPrice, maxPrice]);

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
    const updateFromUrl = async (url?: string) => {
      const currentUrl = url
        ? new URL(url, window.location.origin)
        : new URL(window.location.href);
      const params = new URLSearchParams(currentUrl.search);

      // Updating selected attributes
      const newChosenAttributes = new Map<string, Set<string | number>>();
      params.forEach((value, key) => {
        const valuesArray = value.split(',').map(item => item.trim());
        newChosenAttributes.set(key, new Set(valuesArray));
      });

      setChosenAttributes(newChosenAttributes);

      // Updating the price range
      const minPriceParam = params.get('min_price');
      const maxPriceParam = params.get('max_price');
      const convertedMinPrice = minPriceParam
        ? await convertCurrency(parseFloat(minPriceParam))
        : initialPriceRange.min;
      const convertedMaxPrice = maxPriceParam
        ? await convertCurrency(parseFloat(maxPriceParam))
        : initialPriceRange.max;
      setPriceRange({
        min: convertedMinPrice,
        max: convertedMaxPrice,
      });
    };

    // Initialization on page load
    updateFromUrl();

    // Update when changing route
    const handleRouteChange = (url: string) => {
      updateFromUrl(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, minPrice, maxPrice]);

  /** Updates chosen by click on attribute */
  const updateCurrentParams = useCallback(
    (paramName: string, paramValue: string | number, isPrefix: boolean) => {
      if (!paramName && !paramValue) return;

      const attr = isPrefix ? 'pa_' + paramName : paramName;

      updateChosenAttributes({ key: attr, paramValue: paramValue, isPrefix });
    },
    [updateChosenAttributes]
  );

  /** Reset price filters in URL when currency changes */
  useEffect(() => {
    const resetPriceFiltersInUrl = async () => {
      const { slugs, ...params } = router.query;
      const newQuery: Record<string, string | string[]> = slugs
        ? { slugs }
        : {};

      // Remove price filters
      delete params.min_price;
      delete params.max_price;

      Object.keys(params).forEach(paramKey => {
        if (params[paramKey] !== undefined) {
          newQuery[paramKey] = params[paramKey];
        }
      });

      router.replace({
        pathname: router.pathname,
        query: newQuery,
      });

      // Reset price range in state
      const convertedMin = await convertCurrency(minPrice);
      const convertedMax = await convertCurrency(maxPrice);
      setPriceRange({
        min: convertedMin,
        max: convertedMax,
      });
    };

    resetPriceFiltersInUrl();
  }, [currentCurrency]);

  /** Updates url params by chosen */
  const updateUrlParams = useCallback(async () => {
    const params = Object.fromEntries(
      Array.from(chosenAttributes.entries())
        .filter(([key, set]) => set.size > 0) // Remove empty parameters
        .map(([key, set]) => [key, Array.from(set).join(',')])
    );

    if (!Array.isArray(router?.query?.slugs)) return;

    const newSlugs = router.query.slugs.filter(
      slug => slug !== 'page' && Number.isNaN(+slug)
    );

    const newQuery: Record<string, string | string[]> = {
      slugs: newSlugs,
      ...params,
    };

    if (priceRange.min !== initialPriceRange.min) {
      newQuery.min_price = await convertToDefaultCurrency(
        priceRange.min
      ).toString();
    } else if (priceRange.min === initialPriceRange.min) {
      delete newQuery.min_price;
    }

    if (priceRange.max !== initialPriceRange.max) {
      newQuery.max_price = await convertToDefaultCurrency(
        priceRange.max
      ).toString();
    } else if (priceRange.max === initialPriceRange.max) {
      delete newQuery.max_price;
    }

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
  }, [chosenAttributes, router, priceRange, currentCurrency]);

  /** Apply params */
  const onApplyClick = useCallback(() => {
    updateUrlParams();
  }, [chosenAttributes]);

  /** Reset params */
  const onResetClick = useCallback(async () => {
    const { slugs } = router.query;
    router.replace({
      pathname: router.pathname,
      query: { slugs },
    });
    setChosenAttributes(new Map());
    const convertedMin = await convertCurrency(minPrice);
    const convertedMax = await convertCurrency(maxPrice);
    setPriceRange({
      min: convertedMin,
      max: convertedMax,
    });
  }, [router.query, minPrice, maxPrice, convertCurrency]);

  /** Reset specific params */
  const onResetParams = useCallback(
    (key: string, type?: 'color' | 'price' | 'attributes') => {
      const { slugs, ...params } = router.query;
      const newQuery: Record<string, string | string[]> = slugs
        ? { slugs }
        : {};

      // Remove parameters depending on the type or key
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

      // Remove parameters from the state
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

      // Reset price values ​​in state if type is 'price'
      if (type === 'price') {
        setPriceRange(initialPriceRange);
      }
    },
    [chosenAttributes, router.query, initialPriceRange, updateCurrentParams]
  );

  const updateMinPrice = useCallback(
    (newValue: number) => {
      if (
        newValue !== priceRange.min &&
        newValue >= 0 &&
        newValue <= priceRange.max
      ) {
        setPriceRange(prev => ({ ...prev, min: newValue }));
        setChosenAttributes(prev => {
          const updatedAttributes = new Map(prev);
          updatedAttributes.set('min_price', new Set([newValue.toString()]));
          return updatedAttributes;
        });
      }
    },
    [priceRange]
  );

  const updateMaxPrice = useCallback(
    (newValue: number) => {
      if (
        newValue !== priceRange.max &&
        newValue >= 0 &&
        newValue >= priceRange.min
      ) {
        setPriceRange(prev => ({ ...prev, max: newValue }));
        setChosenAttributes(prev => {
          const updatedAttributes = new Map(prev);
          updatedAttributes.set('max_price', new Set([newValue.toString()]));
          return updatedAttributes;
        });
      }
    },
    [priceRange]
  );

  return (
    <FilterPanelWrap>
      <FilterPanelWrap>
        <CustomSingleAccordion title={t('price')}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <PriceFilter
              currencyCode={currencyCode}
              currentMin={priceRange.min}
              currentMax={priceRange.max}
              minPrice={initialPriceRange.min}
              maxPrice={initialPriceRange.max}
              updateMaxPrice={updateMaxPrice}
              updateMinPrice={updateMinPrice}
              onReset={async () => await onResetParams('price', 'price')}
              onApply={onApplyClick}
            />
          )}
        </CustomSingleAccordion>
        {attributes.map(attribute => {
          const attrName = `pa_${attribute.slug}`;
          const existingSet = chosenAttributes.get(attrName);
          const currentAttr = existingSet ? [...existingSet] : [];

          return (
            <CustomSingleAccordion title={t(attribute.name)} key={attribute.id}>
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
      {Boolean(attributes.length) && (
        <FilterActionButtons onReset={onResetClick} />
      )}
    </FilterPanelWrap>
  );
};
