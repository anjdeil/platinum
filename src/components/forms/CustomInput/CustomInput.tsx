import { CustomInputType } from "@/types/layouts/forms";
import { FC, FormEvent, use, useCallback, useEffect, useMemo, useState } from "react";
import { CustomInputWrapper, CustomRequired, CustomInputStyle, ShowPasswordImage, CustomError } from "./styles";

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
    className,
    isRequire = true,
    isPassword = false,
    isCheckbox = true,
    isNumeric = false,
    isPost = false,
    placeholder,
    onChange,
    value,
    isTextarea = false,
    setValue,
    initialValue,
    checked
}) =>
{
    const [showPassword, setShowPassword] = useState(isPassword);
    const toggleShowPassword = useCallback(() => { setShowPassword((prev) => !prev); }, []);

    let type;

    if (isPassword)
        type = showPassword ? 'text' : 'password';
    else if (isCheckbox)
        type = 'checkbox';

    useEffect(() =>
    {
        if (setValue && name && initialValue !== null && initialValue !== '')
            setValue(name, initialValue, { shouldValidate: true });
    }, [initialValue, name, setValue]);

    const showPassPath = useMemo(() => showPassword ? '/public/images/show-pass.svg' : '/public/images/hide-pass.svg', [showPassword]);
    const registerProps = register ? register(name) : {};
    const isError = errors && name ? name in errors : false;

    const commonProps = {
        placeholder,
        ...registerProps,
        inputMode: isNumeric ? 'numeric' : undefined,
        patter: isNumeric ? '[0-9]*' : undefined,
        oninput: isNumeric ? (e: FormEvent<HTMLInputElement>) => numericValidate(e, isPost) : undefined,
        onChange,
        value,
        checked: isCheckbox ? checked : undefined,
        name
    }

    return (
        <div>
            <CustomInputStyle isError isTextArea isCheckbox>
                <span>
                    {fieldName}
                    {isRequire && <CustomRequired>*</CustomRequired>}
                </span>
                <CustomInputWrapper>
                    {isTextarea ? <textarea {...commonProps} /> : <input type={type || 'text'} {...commonProps} />}
                </CustomInputWrapper>
                {isPassword && <ShowPasswordImage
                    src={showPassPath}
                    alt={'show or hidden password button'}
                    width={24}
                    height={24}
                    onClick={toggleShowPassword}
                    unoptimized={true} />}
            </CustomInputStyle>
            {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
        </div>
    )
};