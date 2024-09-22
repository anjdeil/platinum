import { CustomInputType } from "@/types/layouts/forms";
import { FC } from "react";

const CustomInput: FC<CustomInputType> = ({
    fieldName,
    name,
    register,
    errors,
    className,
    isRequire,
    isPassword,
    isCheckbox,
    isNumeric,
    isPost,
    placeholder,
    onChange,
    value,
    isTextarea,
    setValue,
    initialValue,
    checked
}) =>
{
    return (
        <input></input>
    )
};