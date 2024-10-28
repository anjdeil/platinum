import { FC } from "react";
import { StyledInput } from "./styles";
import { CustomInput } from "@/components/global/forms/CustomInput";
import { CustomInputStyle, CustomInputWrapper, Input } from "@/components/global/forms/CustomInput/styles";

interface PriceFilter
{
    maxPrice: number;
    minPrice: number;
}



export const PriceFilter: FC<PriceFilter> = ({ maxPrice, minPrice }) =>
{
    return (
        <div>
            <div>
                <CustomInputStyle
                    as={'label'}
                    isError={false}
                    isTextArea={false}
                    isCheckbox={false}
                    isPhone={false}>
                    <CustomInputWrapper>
                        <Input
                            as={'input'}
                            type={'number'}
                            isCheckbox={false}
                            isError={false} />
                    </CustomInputWrapper>
                </CustomInputStyle>
            </div>
            <p>zł</p>
        </div>
    )
}  