import { ChangeEvent, FC, useCallback } from "react";
import { CustomInputStyle, CustomInputWrapper, Input } from "../CustomFormInput/styles";

interface CustomInputType {
    defaultValue?: string | number;
    value: string | number;
    onChange: (newValue: number) => void;
}

export const CustomInput: FC<CustomInputType> = ({ defaultValue, value, onChange }) => {
    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return false;
        const newValue = Number(event.target.value);
        onChange(newValue);
    }, [])

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
                        onChange={onInputChange}
                    />
                </CustomInputWrapper>
            </CustomInputStyle>
        </div>
    )
}