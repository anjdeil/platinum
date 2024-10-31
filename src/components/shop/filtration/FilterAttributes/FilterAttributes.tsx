import { FC } from "react";
import { FilterButton } from "./styles";
import { FilterAttributesPropsType } from "@/types/components/shop/filters";

export const FilterAttributes: FC<FilterAttributesPropsType> = ({ attribute }) =>
{
    console.log(attribute);
    return (
        <div>
            <FilterButton>
                s
            </FilterButton>
        </div>
    )
}