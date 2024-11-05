import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { ApplyButton, ButtonWrap, FilterPanelWrap, ResetButton } from "./styles";
import { object } from "zod";

export const FilterPanel: FC<FilterPanelPropsType> = ({ attributes, maxPrice, minPrice }) =>
{
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const router = useRouter();
    const chosenAttributes = new Map();

    /** Adds params to the collection if they are */
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

    /** Updates prams collection */
    const updateCurrentParams = useCallback((paramName: string, paramValue: string | number) =>
    {
        if (!paramName && !paramValue) return;
        const attr = 'pa_' + paramName;
        if (paramName)
            if (chosenAttributes.has(attr))
            {
                chosenAttributes.get(attr).add(paramValue);
            } else
            {
                chosenAttributes.set(attr, new Set([paramValue]));
            }
        // console.log(chosenAttributes);
    }, [])

    /** Apply params */
    const onApplyClick = useCallback(() =>
    {
        updateUrlParams();
    }, [chosenAttributes]);

    // Get current url params
    // Get chosen params
    // If current url params include chosen params
    // Include: get param value and check for difference and update if it needs
    // Not: Add a new param with values

    const updateUrlParams = useCallback(() =>
    {
        // Get params from url
        const currentUrlParams = router.query;

        // Check params from chosen collection 
        for (let key of chosenAttributes)
        {
            const paramName = key[0];
            const chosenValues = chosenAttributes.get(paramName);

            // Check if the param with this name exists
            if (currentUrlParams[paramName])
            {
                const currentUrlParam = currentUrlParams[paramName];
                if (typeof (currentUrlParam) !== 'string') return;
                const paramValues = currentUrlParam.split(",");
                // console.log('urlValues', paramValues);
                // console.log('currentValues', chosenAttributes);
                // const matchingValues = paramValues.filter(value => !chosenValues.has(value));
                const matchingValues = paramValues.filter(value =>
                {
                    console.log(value);
                });
                // console.log(matchingValues);
            } else
            {
                console.log('no Params')
            }


            // for (let i of paramValues)
            // {
            //     console.log(i);
            // }
        }
    }, [chosenAttributes])

    /** Updated url params */
    // const updateUrlParams = (newParam: { [key: string]: string | number }) =>
    // {
    //     router.push({
    //         pathname: router.pathname,
    //         query: { ...router.query, ...newParam }
    //     });
    // };

    const updateMinPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice && newValue > minPrice)
        {
            setPriceRange((prev) => ({ ...prev, min: newValue }));
            // updateCurrentParams('min_price ', newValue);
        }

    }, [priceRange])

    const updateMaxPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice)
        {
            setPriceRange((prev) => ({ ...prev, max: newValue }));
            // updateCurrentParams('max_price ', newValue);
        }
    }, [priceRange])

    return (
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
                <ButtonWrap>
                    <ResetButton>
                        Clear
                    </ResetButton>
                    <ApplyButton onClick={onApplyClick} >
                        Apply
                    </ApplyButton>
                </ButtonWrap>
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
                        <ButtonWrap>
                            <ResetButton>
                                Clear
                            </ResetButton>
                            <ApplyButton onClick={onApplyClick} >
                                Apply
                            </ApplyButton>
                        </ButtonWrap>
                    </CustomSingleAccordion>
                )
            })}
        </FilterPanelWrap>
    )
}
