import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion"
import { FC, useCallback, useState } from "react"
import { PriceFilter } from "../PriceFilter"
import { useRouter } from "next/router";

export const FilterPanel: FC = () =>
{
    const [priceRange, setPriceRange] = useState({ min: 14, max: 200 });
    const router = useRouter();

    const updateUrlParams = (newParam: { [key: string]: string | number }) =>
    {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, ...newParam },
        });
    };

    /**Price filter */
    const handleChange = useCallback((_: Event, newValue: number | number[]) =>
    {
        if (!newValue || !Array.isArray(newValue)) return;

        const [minValue, maxValue] = newValue;

        if (minValue !== priceRange.min)
            setPriceRange((prev) => ({ ...prev, min: minValue }));

        if (maxValue !== priceRange.max)
            setPriceRange((prev) => ({ ...prev, max: maxValue }));

        updateUrlParams({ min_price: priceRange.min, max_price: priceRange.max });

    }, [priceRange]);

    return (
        <CustomSingleAccordion title={"Price"}>
            <PriceFilter minPrice={priceRange.min} maxPrice={priceRange.max} onInputChange={handleChange} />
        </CustomSingleAccordion>
    )
}