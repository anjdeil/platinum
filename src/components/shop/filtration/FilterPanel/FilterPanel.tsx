import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useAppSelector } from '@/store';
import { FilterPanelPropsType } from '@/types/components/shop/filters';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import ColorsFilter from '../ColorsFilter/ColorsFilter';
import { FilterAttributes } from '../FilterAttributes/FilterAttributes';
import { PriceFilter } from '../PriceFilter';
import { FilterPanelWrap, ResetButton } from './styles';
import { PriceFilterSkeleton } from '../priceFilterSkeleton/PriceFilterSkeleton';
import { useSearchParams } from 'next/navigation';

/**
 * @todo
 * Fix slider (juniors)
 * Fix button layout (after review)
 * Layout (after review)
 *  */

export const FilterPanel: FC<FilterPanelPropsType> = ({
  attributes,
  minPrice,
  maxPrice,
}) => {
  const router = useRouter();
  const t = useTranslations('Archive');
  const searchParams = useSearchParams();

  //------------- Attributes Filters
  const handleChangeAttribute = (
    key: string,
    paramValue: string,
    isPrefix: boolean
  ) => {
    const { slugs, ...params } = router.query;
    if (!Array.isArray(slugs)) return;

    const newSlugs = slugs.filter(
      slug => slug !== 'page' && Number.isNaN(+slug)
    );

    const prefixedKey = isPrefix ? `pa_${key}` : key;

    const currentValues =
      typeof params[prefixedKey] === 'string'
        ? params[prefixedKey].split(',')
        : [];

    const newValues = currentValues.includes(paramValue)
      ? currentValues.filter(value => value !== paramValue)
      : [...currentValues, paramValue];

    if (newValues.length === 0) {
      delete params[prefixedKey];

      const { [prefixedKey]: _, ...updatedParams } = params;

      router.push({
        pathname: router.pathname,
        query: {
          slugs: newSlugs,
          ...updatedParams,
        },
      });
    } else {
      params[prefixedKey] = newValues.join(',');

      router.push({
        pathname: router.pathname,
        query: {
          slugs: newSlugs,
          ...params,
          [prefixedKey]: newValues.join(','),
        },
      });
    }
  };
  //------------- Attributes Filters

  //------------- Price Filter
  const {
    currentCurrency,
    convertCurrency,
    convertToDefaultCurrency,
    currencyCode,
    isLoading,
  } = useCurrencyConverter();

  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const [initialPriceRange, setInitialPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  // const { min_price, max_price } = router.query;

  useEffect(() => {
    const convertPrices = async () => {
      const convertedMin = await convertCurrency(minPrice);
      const convertedMax = await convertCurrency(maxPrice);

      setInitialPriceRange({ min: convertedMin, max: convertedMax });
      setPriceRange({ min: convertedMin, max: convertedMax });
    };

    convertPrices();
  }, [minPrice, maxPrice, currentCurrency, selectedCurrency]);

  useEffect(() => {
    const { min_price, max_price } = router.query;
    const convertPricesFromUrl = async () => {
      if (min_price && max_price) {
        const convertedMin = await convertCurrency(
          parseFloat(min_price as string)
        );
        const convertedMax = await convertCurrency(
          parseFloat(max_price as string)
        );
        setPriceRange({
          min: convertedMin,
          max: convertedMax,
        });
      } else if (min_price && !max_price) {
        const convertedMin = await convertCurrency(
          parseFloat(min_price as string)
        );
        setPriceRange({
          min: convertedMin,
          max: initialPriceRange.max,
        });
      } else if (!min_price && max_price) {
        const convertedMax = await convertCurrency(
          parseFloat(max_price as string)
        );
        setPriceRange({
          min: initialPriceRange.min,
          max: convertedMax,
        });
      } else {
        setPriceRange({
          min: initialPriceRange.min,
          max: initialPriceRange.max,
        });
      }
    };

    convertPricesFromUrl();
  }, [router.query, initialPriceRange]);

  const updateMinPrice = async (newValue: number) => {
    const convertedValue = await convertToDefaultCurrency(newValue);
    const { slugs, ...params } = router.query;
    const newSlugs = Array.isArray(slugs)
      ? slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug))
      : [];

    if (newValue === initialPriceRange.min) {
      delete params.min_price;
      setPriceRange(prev => ({ ...prev, min: initialPriceRange.min }));

      router.push({
        pathname: router.pathname,
        query: {
          ...params,
          slugs: newSlugs,
        },
      });
    } else {
      setPriceRange(prev => ({ ...prev, min: newValue }));

      router.push({
        pathname: router.pathname,
        query: {
          ...params,
          slugs: newSlugs,
          min_price: convertedValue.toFixed(2),
        },
      });
    }
  };

  const updateMaxPrice = async (newValue: number) => {
    const convertedValue = await convertToDefaultCurrency(newValue);
    const { slugs, ...params } = router.query;
    const newSlugs = Array.isArray(slugs)
      ? slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug))
      : [];

    if (newValue === initialPriceRange.max) {
      delete params.max_price;
      setPriceRange(prev => ({ ...prev, max: initialPriceRange.max }));

      router.push({
        pathname: router.pathname,
        query: {
          ...params,
          slugs: newSlugs,
        },
      });
    } else {
      setPriceRange(prev => ({ ...prev, max: newValue }));

      router.push({
        pathname: router.pathname,
        query: {
          ...params,
          slugs: newSlugs,
          max_price: convertedValue.toFixed(2),
        },
      });
    }
  };

  // const onResetPriceFilter = useCallback(() => {
  //   setPriceRange({ min: minPrice, max: maxPrice }); // Сбросим в значения по умолчанию

  //   const { slugs, ...params } = router.query;
  //   const newSlugs = Array.isArray(slugs)
  //     ? slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug))
  //     : [];

  //   delete params.min_price;
  //   delete params.max_price;

  //   router.push({
  //     pathname: router.pathname,
  //     query: {
  //       ...params,
  //       slugs: newSlugs,
  //     },
  //   });
  // }, [minPrice, maxPrice, router]);

  //------------- Price Filter

  //------------- Reset Filters
  const onResetParams = () => {
    const { slugs } = router.query;

    router.push({
      pathname: router.pathname,
      query: {
        slugs: Array.isArray(slugs)
          ? slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug))
          : [],
      },
    });
  };
  //------------- Reset Filters

  return (
    <FilterPanelWrap>
      <FilterPanelWrap>
        <CustomSingleAccordion title={t('price')}>
          {isLoading ? (
            <PriceFilterSkeleton />
          ) : (
            <PriceFilter
              currencyCode={currencyCode}
              currentMin={priceRange.min}
              currentMax={priceRange.max}
              minPrice={initialPriceRange.min}
              maxPrice={initialPriceRange.max}
              updateMaxPrice={updateMaxPrice}
              updateMinPrice={updateMinPrice}
              // onReset={onResetPriceFilter}
            />
          )}
        </CustomSingleAccordion>
        {attributes.map(attribute => {
          const attrName = `pa_${attribute.slug}`;
          const currentAttr = searchParams.get(attrName)?.split(',') || [];

          return (
            <CustomSingleAccordion title={t(attribute.name)} key={attribute.id}>
              {attributes && attribute.slug === 'colour' ? (
                <ColorsFilter
                  attribute={attribute}
                  onParamsChange={handleChangeAttribute}
                  currentAttribute={currentAttr}
                />
              ) : (
                <FilterAttributes
                  attribute={attribute}
                  onParamsChange={handleChangeAttribute}
                  currentAttribute={currentAttr}
                />
              )}
            </CustomSingleAccordion>
          );
        })}
      </FilterPanelWrap>
      {Boolean(attributes.length) && (
        <ResetButton onClick={onResetParams}>{t('clearFilter')}</ResetButton>
      )}
    </FilterPanelWrap>
  );
};
