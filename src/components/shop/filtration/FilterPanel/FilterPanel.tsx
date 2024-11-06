import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { ApplyButton, ButtonWrap, FilterPanelWrap, ResetButton } from "./styles";

/**
 * Reset when you click again on param
 * Reset params
 * Fix button 
 * Layout
 *  */

type ChosenAttributesType = Map<string, Set<string | number>>;

export const FilterPanel: FC<FilterPanelPropsType> = ({ attributes, maxPrice, minPrice }) =>
{
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const [chosenAttributes, setChosenAttributes] = useState<ChosenAttributesType>(new Map());
    const router = useRouter();

    /** Updates chosen attributes state */
    const updateChosenAttributes = (key: string, paramValue: (string | number)[], isPrefix: boolean) =>
    {
        setChosenAttributes(prev =>
        {
            const newMap = new Map(prev);

            if (isPrefix)
            {
                const existingSet = newMap.get(key) || new Set<string | number>();
                paramValue.forEach(value => existingSet.add(value));
                newMap.set(key, existingSet);
            } else
            {
                const existingSet = new Set<string | number>();
                newMap.set(key, existingSet.add(paramValue[0]));
            }

            return newMap;
        });
    };

    /** Updates chosen with url params */
    useEffect(() =>
    {
        const url = new URL(router.asPath, window.location.origin);
        const params = new URLSearchParams(url.search);

        for (let param of params.keys())
        {
            const value = params.get(param);
            const valuesArray = value ? value.split(',').map(item => item.trim()) : [];
            updateChosenAttributes(param, valuesArray, false);
        }
    }, [])

    /** Updates chosen by click on attribute */
    const updateCurrentParams = useCallback((paramName: string, paramValue: string | number, isPrefix: boolean) =>
    {
        if (!paramName && !paramValue) return;

        const attr = isPrefix ? 'pa_' + paramName : paramName;

        if (paramName)
            if (chosenAttributes.has(attr))
            {
                if (isPrefix)
                {
                    updateChosenAttributes(attr, [paramValue], true);
                } else
                {
                    updateChosenAttributes(attr, [paramValue], false);
                }
            } else
            {
                updateChosenAttributes(attr, [paramValue], false);
            }
    }, [chosenAttributes])

    /** Updates url params by chosen */
    const updateUrlParams = useCallback(() =>
    {
        const params = Object.fromEntries(
            Array.from(chosenAttributes.entries())
                .map(([key, set]) => [key, Array.from(set).join(',')])
        );

        router.push({
            pathname: router.pathname,
            query: { ...router.query, ...params }
        });
    }, [chosenAttributes])

    /** Apply params */
    const onApplyClick = useCallback(() =>
    {
        updateUrlParams();
    }, [chosenAttributes]);

    const updateMinPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice && newValue > minPrice)
        {
            setPriceRange((prev) => ({ ...prev, min: newValue }));
            updateCurrentParams('min_price', newValue, false);
        }

    }, [priceRange])

    const updateMaxPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice)
        {
            setPriceRange((prev) => ({ ...prev, max: newValue }));
            updateCurrentParams('max_price', newValue, false);
        }
    }, [priceRange])

    return (
        <FilterPanelWrap>
            <FilterPanelWrap>
                <CustomSingleAccordion title={"Price"}>
                    <PriceFilter
                        currentMin={priceRange.min}
                        currentMax={priceRange.max}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        updateMaxPrice={updateMaxPrice}
                        updateMinPrice={updateMinPrice}
                    />
                </CustomSingleAccordion>
                {attributes.map((attribute) =>
                {
                    const attrName = `pa_${attribute.slug}`;
                    const existingSet = chosenAttributes.get(attrName);
                    const currentAttr = existingSet ? [...existingSet] : [];

                    return (
                        <CustomSingleAccordion title={attribute.name} key={attribute.id}>
                            <FilterAttributes
                                attribute={attribute}
                                onParamsChange={updateCurrentParams}
                                currentAttribute={currentAttr}
                            />
                        </CustomSingleAccordion>
                    )
                })}
            </FilterPanelWrap>
            <ButtonWrap>
                <ResetButton>
                    Clear
                </ResetButton>
                <ApplyButton onClick={onApplyClick} >
                    Apply
                </ApplyButton>
            </ButtonWrap>
        </FilterPanelWrap>
    )
}
