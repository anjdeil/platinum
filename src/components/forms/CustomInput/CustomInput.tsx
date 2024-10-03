import { CustomInputType } from "@/types/layouts/forms";
import { FC, FormEvent, use, useCallback, useEffect, useMemo, useState } from "react";
import { CustomInputWrapper, CustomRequired, CustomInputStyle, ShowPasswordImage, CustomError } from "./styles";
import { PhoneInput } from "react-international-phone";


function numericValidate(e: FormEvent<HTMLInputElement>, isPost: boolean)
{
    const regex = isPost ? /[^0-9-]/g : /[^0-9]/g;
    e.currentTarget.value = e.currentTarget.value.replace(regex, '');
}

export const CustomInput: FC<CustomInputType> = ({
    fieldName,
    name,
    register,
    errors,
    isRequire = true,
    isPassword = false,
    isCheckbox = false,
    isNumeric = false,
    isPost = false,
    placeholder,
    onChange,
    value,
    isTextarea = false,
    setValue,
    initialValue,
    checked,
    isPhone = false
}) =>
{
    const [showPassword, setShowPassword] = useState(!isPassword);
    const [inputType, setInputType] = useState('text');
    const toggleShowPassword = useCallback(() => { setShowPassword((prev) => !prev); }, []);
    const [isError, setError] = useState(false);

    useEffect(() =>
    {
        if (isPassword) setInputType(showPassword ? 'text' : 'password');
        if (isCheckbox) setInputType('checkbox');
    }, [isPassword, isCheckbox, showPassword])

    useEffect(() =>
    {
        if (setValue && name && initialValue && initialValue !== '')
            setValue(name, initialValue, { shouldValidate: true });
    }, [initialValue, name, setValue]);

    const showPassPath = useMemo(() => showPassword ? '/images/show-pass.svg' : '/images/hidden-pass.svg', [showPassword]);
    const registerProps = register ? register(name) : {};
    useEffect(() => { setError((errors && name) && name in errors); }, [errors, name]);

    const onInputChange = (e: FormEvent<HTMLInputElement>) =>
    {
        if (isError)
            setError(false);

        if (isNumeric)
            return numericValidate(e, isPost);
    };

    const commonProps = {
        placeholder,
        ...registerProps,
        inputMode: isNumeric ? 'numeric' : undefined,
        patter: isNumeric ? '[0-9]*' : undefined,
        onInput: onInputChange,
        onChange,
        value,
        checked: isCheckbox ? checked : undefined,
        name
    }

    return (
        <div>
            <CustomInputStyle
                as={isPhone ? 'div' : 'label'}
                isError={isError}
                isTextArea={isTextarea}
                isCheckbox={isCheckbox}
                isPhone={isPhone}>
                <span>
                    {fieldName}
                    {isRequire && <CustomRequired>*</CustomRequired>}
                </span>
                <CustomInputWrapper>
                    {isPhone ? (
                        <PhoneInput
                            defaultCountry="pl"
                            onChange={(value) => { if (setValue) setValue('phoneNumber', value, { shouldValidate: true }); }}
                        />
                    ) : isTextarea ? (
                        <textarea {...commonProps} />
                    ) : (
                        <input type={inputType || 'text'} {...commonProps} />
                    )}
                    {isPassword &&
                        <ShowPasswordImage
                            src={showPassPath}
                            alt={'show or hidden password button'}
                            width={24}
                            height={24}
                            onClick={toggleShowPassword}
                            unoptimized={true} />}
                </CustomInputWrapper>
            </CustomInputStyle>
            {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
        </div>
    )
};