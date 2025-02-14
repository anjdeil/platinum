import { FC } from 'react';
import { FilterAttributesWrap, FilterButton } from './styles';
import { FilterAttributesPropsType } from '@/types/components/shop/filters';

export const FilterAttributes: FC<FilterAttributesPropsType> = ({
  attribute,
  onParamsChange,
  currentAttribute,
}) => {
  const { options } = attribute;

  const handleChange = (slug: string) => {
    onParamsChange(attribute.slug, slug, true);
  };

  return (
    <>
      <FilterAttributesWrap>
        {options.map((option, i) => {
          return (
            <FilterButton
              key={option.id + i}
              onClick={() => handleChange(option.slug)}
              active={currentAttribute.includes(option.slug)}
            >
              {option.name}
            </FilterButton>
          );
        })}
      </FilterAttributesWrap>
    </>
  );
};
