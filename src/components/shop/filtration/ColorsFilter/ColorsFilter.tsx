import React, { FC } from 'react';
import { StyledButtonGroup, StyledButton } from './styles';
import { FilterAttributesPropsType } from '@/types/components/shop/filters';

const ColorsFilter: FC<FilterAttributesPropsType> = ({
  attribute,
  onParamsChange,
  currentAttribute,
}) => {
  const handleChange = (slug: string) => {
    onParamsChange(attribute.slug, slug, true);
  };

  return (
    <div>
      <StyledButtonGroup>
        {attribute.options?.length &&
          attribute.options.map(option => (
            <StyledButton
              key={option.slug}
              onClick={() => handleChange(option.slug)}
              aria-label={option.name}
              value={option.slug}
              color={option.color_hex || '#fff'}
              selected={currentAttribute.includes(option.slug)}
              isMulticolor={option.slug === 'multicolor'}
            />
          ))}
      </StyledButtonGroup>
    </div>
  );
};

export default ColorsFilter;
