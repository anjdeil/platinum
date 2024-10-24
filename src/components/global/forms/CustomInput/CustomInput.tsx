import { FC, useEffect, useMemo, useState } from "react";
import { CustomError, CustomInputStyle, CustomInputWrapper, CustomRequired, Input, ShowPasswordImage } from "./styles";

import { z } from "zod";

export const CustomInput2Schema = z.object({
    fieldName: z.string().optional(),
    inputTag: z.union([z.literal('input'), z.literal('textarea')]),
    inputType: z.union([z.literal('email'), z.literal('tel'), z.literal('text'), z.literal('checkbox'), z.literal('password'), z.literal('number')]),
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
    defaultValue: z.string().nullable().optional(),
})

{/* <PhoneInput
defaultCountry="pl"
onChange={(value) => { if (setValue) setValue('phoneNumber', value, { shouldValidate: true }); }}
/> */}

export type CustomInputType = z.infer<typeof CustomInput2Schema>;

export const CustomInput: FC<CustomInputType> = (
    {
        errors,
        fieldName,
        name,
        isRequire = true,
        inputTag,
        inputType,
        placeholder,
        register,
        onChange,
        value,
        setValue,
        defaultValue,
    }) => {
    const registerProps = register ? { ...register(name) } : {};

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const passwordImagePath = useMemo(() => isPasswordVisible ? '/images/show-pass.svg' : '/images/hidden-pass.svg', [isPasswordVisible]);

    const [isError, setError] = useState(false);

    useEffect(() => {
        if (!errors || !name) { setError(false); return; }
        setError(name in errors);
    }, [errors, name]);

    useEffect(() => {
        if (defaultValue && defaultValue !== "" && setValue) {
            setValue(name, defaultValue, { shouldValidate: true });
        }
    }, [defaultValue, setValue, name]);

    return (
        <div>
            <CustomInputStyle
                as={'label'}
                isError={isError}
                isTextArea={false}
                isCheckbox={inputType === 'checkbox'}
                isPhone={false}>
                <span>
                    {fieldName}
                    {isRequire && <CustomRequired>*</CustomRequired>}
                </span>
                <CustomInputWrapper>
                    <Input
                        as={inputTag}
                        placeholder={placeholder ? placeholder : ''}
                        {...register(name)}
                        type={isPasswordVisible ? 'text' : inputType}
                        {...registerProps}
                        onChange={onChange} 
                    />
                    {inputType === 'password' &&
                        <ShowPasswordImage
                            src={passwordImagePath}
                            alt={'show or hidden password button'}
                            width={24}
                            height={24}
                            onClick={togglePasswordVisibility}
                            unoptimized={true} />}
                </CustomInputWrapper>
            </CustomInputStyle>
            {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
        </div>
    )
}