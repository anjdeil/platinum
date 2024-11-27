import { FC, useCallback, useState } from "react";
import { CustomInput } from "@/components/global/forms/CustomInput";
import { Slider } from "@mui/material";
import { Divider, PriceFilterContainer } from "./styles";

interface PriceFilter
{
    currentMin: number;
    currentMax: number;
    minPrice: number;
    maxPrice: number;
    updateMinPrice: (newValue: number) => void;
    updateMaxPrice: (newValue: number) => void;
}

export const PriceFilter: FC<PriceFilter> = (props) =>
{
    const {
        currentMin,
        currentMax,
        minPrice,
        maxPrice,
        updateMinPrice,
        updateMaxPrice
    } = props;

    const handleSliderChange = useCallback((_: Event, newValue: number | number[]) =>
    {
        if (!Array.isArray(newValue)) return;

        if (newValue[0] !== currentMin)
            updateMinPrice(newValue[0]);

        if (newValue[1] !== currentMax)
            updateMaxPrice(newValue[1]);

    }, []);

    return (
        <>
            <Slider
                getAriaLabel={() => 'Price filter range'}
                value={[currentMin, currentMax]}
                min={minPrice}
                max={maxPrice}
                onChange={handleSliderChange}
                step={1}
            />
            <PriceFilterContainer>
                <CustomInput value={currentMin} onChange={updateMinPrice} />
                <Divider />
                <CustomInput value={currentMax} onChange={updateMaxPrice} />
                <p>zł</p>
            </PriceFilterContainer>
        </>
    )
}  