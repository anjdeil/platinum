import { CustomFormCheckboxType } from '@/types/components/global/forms/customFormCheckbox';
import { FC } from 'react';
import { CustomCheckboxLabel } from '../CustomFormCheckbox/styles';
import {
  CustomError,
  StyledCheckbox,
  StyledCheckBoxContainer,
  StyledCheckBoxWrapper,
} from './style';

export const FormCheckboxUnControlled: FC<CustomFormCheckboxType> = ({
  errors,
  label,
  name,
  register,
  validation,
  noTop,
  onChange,
}) => {
  const reg = register(name, validation);

  return (
    <StyledCheckBoxWrapper noTop={noTop || false}>
      <StyledCheckBoxContainer>
        <StyledCheckbox
          {...reg}
          onChange={e => {
            reg.onChange(e);
            if (onChange) onChange(e);
          }}
          error={errors[name]}
          id={name}
        />
        <CustomCheckboxLabel htmlFor={name}>{label}</CustomCheckboxLabel>
      </StyledCheckBoxContainer>
      {errors && name && <CustomError>{errors[name]?.message}</CustomError>}
    </StyledCheckBoxWrapper>
  );
};
