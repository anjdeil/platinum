import { FC } from "react";
import { StyledInput } from "./styles";
import { CustomInput } from "@/components/global/forms/CustomInput";

interface PriceFilter
{
    maxPrice: number;
    minPrice: number;
}



export const PriceFilter: FC<PriceFilter> = ({ maxPrice, minPrice }) =>
{
    return (
        <div>
            {/* <StyledInput /> */}
            <CustomInput
                isRequire={false}
            />
            <p>zł</p>
        </div>
    )
}  