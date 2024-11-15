import { FC, useEffect, useState } from "react";
import { CustomError } from "../CustomFormInput/styles";
import { CustomFormCheckboxType } from "@/types/components/global/forms/customFormCheckbox";
import { CustomCheckboxStyled } from "../CustomCheckbox/styles";
import { CustomCheckboxLabel } from "./styles";

export const CustomFormCheckbox: FC<CustomFormCheckboxType> = ({ errors, label, name, register }) =>
{
    const [isError, setError] = useState(false);

    useEffect(() =>
    {
        if (!errors || !name) { setError(false); return; }
        setError(name in errors);
        console.log('formErrors:', errors);

    }, [errors, name]);

    return (
        <div>
            <CustomCheckboxLabel>
                <CustomCheckboxStyled
                    {...register(name)}
                />
                {label}
            </CustomCheckboxLabel>
            {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
        </div>
    )
}