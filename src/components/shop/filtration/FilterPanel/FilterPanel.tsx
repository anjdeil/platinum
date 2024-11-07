import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { ApplyButton, ButtonWrap, FilterPanelWrap, ResetButton } from "./styles";

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

export const FilterPanel: FC<FilterPanelPropsType> = ({ attributes, maxPrice, minPrice }) =>
{
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const [chosenAttributes, setChosenAttributes] = useState<ChosenAttributesType>(new Map());
    const router = useRouter();

    /** Updates chosen attributes state */
    const updateChosenAttributes = useCallback(({ key, paramValue, isPrefix }: UpdateAttributesParams) =>
    {
        const newMap = new Map(chosenAttributes);
        console.log(chosenAttributes);

        if (isPrefix)
        {
            const existingSet = newMap.get(key) || new Set<string | number>();

            if (Array.isArray(paramValue))
            {
                paramValue.forEach(value => existingSet.add(value));
            } else
            {
                if (existingSet.has(paramValue))
                {
                    existingSet.delete(paramValue);
                } else
                {
                    existingSet.add(paramValue);
                }
            }
            newMap.set(key, existingSet);
        } else
        {
            const existingSet = new Set<string | number>();
            newMap.set(key, existingSet.add(Array.isArray(paramValue) ? paramValue.toString() : paramValue));
        }
        // console.log(newMap);
        setChosenAttributes(newMap);
    }, [chosenAttributes, setChosenAttributes]);

    /** Updates chosen with url params */
    useEffect(() =>
    {
        const url = new URL(router.asPath, window.location.origin);
        const params = new URLSearchParams(url.search);

        for (let param of params.keys())
        {
            const value = params.get(param);
            const valuesArray = value ? value.split(',').map(item => item.trim()) : [];
            updateChosenAttributes({
                key: param, paramValue: valuesArray, isPrefix: false
            });
        }
    }, [])

    /** Updates chosen by click on attribute */
    const updateCurrentParams = useCallback((paramName: string, paramValue: string | number, isPrefix: boolean) =>
    {
        if (!paramName && !paramValue) return;

        const attr = isPrefix ? 'pa_' + paramName : paramName;

        updateChosenAttributes({ key: attr, paramValue: paramValue, isPrefix });
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
        // console.log(chosenAttributes);

        updateUrlParams();
    }, [chosenAttributes]);

    /** Reset params */
    const onResetClick = useCallback(() =>
    {
        const { slugs } = router.query;
        router.replace({
            pathname: router.pathname,
            query: { slugs }
        });
        setChosenAttributes(new Map());
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
                <ResetButton onClick={onResetClick}>
                    Clear
                </ResetButton>
                <ApplyButton onClick={onApplyClick} >
                    Apply
                </ApplyButton>
            </ButtonWrap>
        </FilterPanelWrap>
    )
}
