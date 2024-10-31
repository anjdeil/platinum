import { FC, useCallback } from "react";
import { FilterAttributesWrap, FilterButton } from "./styles";
import { FilterAttributesPropsType } from "@/types/components/shop/filters";

export const FilterAttributes: FC<FilterAttributesPropsType> = ({ attribute, onParamsChange }) =>
{
    return (
        <FilterAttributesWrap >
            {attribute.options.map(option =>
            {
                return (
                    <FilterButton key={option.id}
                        onClick={() => onParamsChange(attribute.slug, option.slug)}>
                        {option.name}
                    </FilterButton>
                )
            })}
        </FilterAttributesWrap >
    )
}