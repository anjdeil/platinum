import { FC } from "react";
import { CustomCheckboxStyled } from "./styles";

import { z } from "zod";

const CustomCheckboxSchema = z.object({
    checked: z.boolean(),
})

type CustomCheckboxType = z.infer<typeof CustomCheckboxSchema>;

export const CustomCheckbox: FC<CustomCheckboxType> = ({ checked }) =>
{
    return (
        <CustomCheckboxStyled
            onChange={(e) => console.log(e.target.checked)}
            checked={checked}
        />
    )
} 