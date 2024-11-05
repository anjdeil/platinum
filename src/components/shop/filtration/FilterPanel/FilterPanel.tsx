import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { ApplyButton, ButtonWrap, FilterPanelWrap, ResetButton } from "./styles";

/**
 * Price filtration
 * Reset params
 * Fix button
 * Get data from the server
 *  */

export const FilterPanel: FC<FilterPanelPropsType> = ({ attributes, maxPrice, minPrice }) =>
{
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const router = useRouter();
    const chosenAttributes = useMemo(() => new Map(), []);

    /** Updates chosen with url params */
    useEffect(() =>
    {
        const url = new URL(router.asPath, window.location.origin);
        const params = new URLSearchParams(url.search);

        for (let param of params.keys())
        {
            const value = params.get(param);
            const valuesArray = value ? value.split(',').map(item => item.trim()) : [];
            chosenAttributes.set(param, new Set(valuesArray));
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
                    chosenAttributes.get(attr).add(paramValue);
                else
                {
                    chosenAttributes.set(attr, new Set([paramValue]));
                    console.log(chosenAttributes);

                }
            } else
            {
                chosenAttributes.set(attr, new Set([paramValue]));
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
        }, undefined, { shallow: true });
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
                    const currentParam = router.query?.[attrName]?.toString();

                    return (
                        <CustomSingleAccordion title={attribute.name} key={attribute.id}>
                            <FilterAttributes
                                attribute={attribute}
                                onParamsChange={updateCurrentParams}
                                currentAttribute={currentParam || ""}
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
