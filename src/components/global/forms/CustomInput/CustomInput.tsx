import { FC } from "react";
import { CustomInputStyle, CustomInputWrapper, Input } from "../CustomFormInput/styles";

interface CustomInputType
{
    defaultValue?: string | number;
    value: string | number;
}

export const CustomInput: FC<CustomInputType> = ({ defaultValue, value }) =>
{
    return (
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
                        isError={false}
                        value={value}
                        defaultValue={defaultValue || ""}
                    />
                </CustomInputWrapper>
            </CustomInputStyle>
        </div>
    )
} 