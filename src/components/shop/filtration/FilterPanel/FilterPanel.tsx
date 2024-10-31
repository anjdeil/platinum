import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useEffect, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";
import { FilterPanelPropsType } from "@/types/components/shop/filters";
import { FilterAttributes } from "../FilterAttributes/FilterAttributes";
import { FilterPanelWrap } from "./styles";

export const FilterPanel: FC<FilterPanelPropsType> = ({ attributes, maxPrice, minPrice }) =>
{
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const router = useRouter();

    console.log(attributes);

    const updateUrlParams = (newParam: { [key: string]: string | number }) =>
    {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, ...newParam }
        });
    };

    useEffect(() =>
    {
        updateUrlParams({ min_price: priceRange.min, max_price: priceRange.max });
    }, [priceRange])

    const updateMinPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice)
        {
            setPriceRange((prev) => ({ ...prev, min: newValue }));
        }

    }, [priceRange])

    const updateMaxPrice = useCallback((newValue: number) =>
    {
        if (newValue !== priceRange.min && newValue >= 0 && newValue <= maxPrice)
        {
            setPriceRange((prev) => ({ ...prev, max: newValue }));
        }
    }, [priceRange])

    const updateCurrentParams = useCallback((paramName: string, paramValue: string) =>
    {
        if (!paramName && !paramValue) return;
        console.log(`${paramName}: ${paramValue}`)
        updateUrlParams({ [`pa_` + paramName]: paramValue })
    }, [])


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
            </CustomSingleAccordion>
            {attributes.map((attribute) =>
            {
                return (
                    <CustomSingleAccordion title={attribute.name} key={attribute.id}>
                        <FilterAttributes attribute={attribute} onParamsChange={updateCurrentParams} />
                    </CustomSingleAccordion>
                )
            })}
        </FilterPanelWrap>
    )
}