import { FC, useEffect, useState } from "react";
import { CustomCheckbox } from "../CustomCheckbox";
import { CustomError } from "../CustomFormInput/styles";
import { CustomFormCheckboxType } from "@/types/components/global/forms/customFormCheckbox";

export const CustomFormCheckbox: FC<CustomFormCheckboxType> = ({ errors, label, name, register }) =>
{
    const [isError, setError] = useState(false);

    useEffect(() =>
    {
        if (!errors || !name) { setError(false); return; }
        setError(name in errors);
    }, [errors, name]);

    return (
        <div>
            <label>
                <CustomCheckbox
                    {...register(name)}
                />
                {label}
            </label>
            {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
        </div>
    )
}