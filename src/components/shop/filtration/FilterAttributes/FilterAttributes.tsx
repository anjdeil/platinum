import { FC, useEffect } from "react";
import { FilterAttributesWrap, FilterButton } from "./styles";
import { FilterAttributesPropsType } from "@/types/components/shop/filters";

export const FilterAttributes: FC<FilterAttributesPropsType> = ({ attribute, onParamsChange, currentAttribute }) =>
{
    return (
        <FilterAttributesWrap >
            {attribute.options.map((option, i) =>
            {
                return (
                    <FilterButton
                        key={option.id + i}
                        onClick={() => onParamsChange(attribute.slug, option.slug, true)}
                        active={currentAttribute.includes(option.slug)}
                    >
                        {option.name}
                    </FilterButton>
                )
            })}
        </FilterAttributesWrap >
    )
}