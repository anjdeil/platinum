import { FC, useEffect, useMemo, useState } from "react";
import { CustomError, CustomInputContainer, CustomInputStyle, CustomInputWrapper, CustomRequired, Input, ShowPasswordImage } from "./styles";
import { CustomFormInputType } from "@/types/components/global/forms/customFormInput";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';


export const CustomFormInput: FC<CustomFormInputType> = (
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
        width,
        padding,
        height,
        font,
        label = true
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

    return (
        <CustomInputContainer isCheckbox={inputType === 'checkbox'} width={width}>
            <CustomInputStyle
                as={'label'}
                isError={isError}
                isTextArea={false}
                isCheckbox={inputType === 'checkbox'}
                isPhone={inputType === 'phone'}
                padding={padding}
                font={font}>
                {label &&
                    <span>
                        {fieldName}
                        {isRequire && <CustomRequired>*</CustomRequired>}
                    </span>
                }

                <CustomInputWrapper>
                    {inputType === 'phone' ?
                        <PhoneInput
                            defaultCountry="pl"
                            {...register(name)}
                        // onChange={(value) => { if (setValue) setValue('phoneNumber', value, { shouldValidate: true }); }}
                        />
                        : <Input
                            as={inputTag}
                            placeholder={placeholder ? placeholder : ''}
                            {...register(name)}
                            type={isPasswordVisible ? 'text' : inputType}
                            {...registerProps}
                            height={height}
                        />}
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
        </CustomInputContainer>
    )
}