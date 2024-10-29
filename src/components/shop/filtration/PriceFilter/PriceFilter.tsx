import { FC, useCallback, useState } from "react";
import { CustomInput } from "@/components/global/forms/CustomInput";
import { Slider } from "@mui/material";
import { Divider, PriceFilterContainer } from "./styles";

interface PriceFilter
{
    minPrice: number;
    maxPrice: number;
    onInputChange: (_: Event, newValue: number | number[]) => void;
}

export const PriceFilter: FC<PriceFilter> = ({ minPrice, maxPrice, onInputChange }) =>
{
    return (
        <>
            <Slider
                getAriaLabel={() => 'Price filter range'}
                value={[minPrice, maxPrice]}
                min={20}
                max={1000}
                onChange={onInputChange}
            />
            <PriceFilterContainer>
                <CustomInput value={minPrice} />
                <Divider />
                <CustomInput value={maxPrice} />
                <p>zł</p>
            </PriceFilterContainer>
        </>
    )
}  