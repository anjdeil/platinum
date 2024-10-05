import { FC, useEffect, useState } from "react";
import { CustomInputStyle, CustomInputWrapper, CustomRequired } from "./styles";

import { z } from "zod";

export const CustomInput2Schema = z.object({
    fieldName: z.string().optional(),
    inputType: z.union([z.literal('text'), z.literal('textarea')]),
    name: z.string().optional(),
    register: z.any().optional(),
    errors: z.any().optional(),
    isRequire: z.boolean().optional(),
    placeholder: z.string().optional(),
    onChange: z.function().args(z.unknown() as z.ZodType<React.ChangeEvent<HTMLInputElement>>).returns(z.void()).optional(),
    value: z.string().optional(),
    setValue: z.function().args(
        z.any(),
        z.any(),
        z.object({
            shouldValidate: z.boolean().optional(),
            shouldDirty: z.boolean().optional(),
            shouldTouch: z.boolean().optional(),
        }).optional()
    ).returns(z.void()).optional(),
    initialValue: z.string().nullable().optional(),
})

export type CustomInput2Type = z.infer<typeof CustomInput2Schema>;

export const CustomInput2: FC<CustomInput2Type> = (
    {
        errors,
        fieldName,
        name,
        isRequire,
        inputType: type,
        placeholder,
        register,
        onChange,
        value,
        // isText
    }) =>
{
    const registerProps = register ? register(name) : {};
    const [isError, setError] = useState(false);
    useEffect(() =>
    {
        if (!errors || !name)
        {
            setError(false);
            return;
        }

        setError(name in errors);
    }, [errors, name]);

    return (
        <div>
            <CustomInputStyle
                as={'label'}
                isError={isError}
                isTextArea={false}
                isCheckbox={false}
                isPhone={false}>
                <span>
                    {fieldName}
                    {isRequire && <CustomRequired>*</CustomRequired>}
                </span>
                <CustomInputWrapper>
                    <input
                        placeholder={placeholder ? placeholder : ''}
                        type={type}
                        // autoComplete="on"
                        {...registerProps}
                    />
                </CustomInputWrapper>
            </CustomInputStyle>
        </div>
    )
}