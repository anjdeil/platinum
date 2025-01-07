import React, { FC } from 'react';
import { StyledButtonGroup, StyledButton } from './styles';
import { FilterAttributesPropsType } from '@/types/components/shop/filters';
import { FilterActionButtons } from '../filterActionButtons';

const ColorsFilter: FC<FilterAttributesPropsType> = ({
  attribute,
  onParamsChange,
  currentAttribute,
  onReset,
  onApply,
}) => {
  return (
    <div>
      <StyledButtonGroup>
        {attribute.options?.length &&
          attribute.options.map(option => (
            <StyledButton
              key={option.slug}
              onClick={() => onParamsChange(attribute.slug, option.slug, true)}
              aria-label={option.name}
              value={option.slug}
              color={option.color_hex || '#fff'}
              selected={currentAttribute.includes(option.slug)}
            />
          ))}
      </StyledButtonGroup>
      <FilterActionButtons onReset={onReset} onApply={onApply} isApply={true} />
    </div>
  );
};

export default ColorsFilter;
