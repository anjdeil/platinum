import { FC } from 'react';
import { CustomFormCheckboxType } from '@/types/components/global/forms/customFormCheckbox';
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
}) => {
  return (
    <StyledCheckBoxWrapper noTop={noTop || false}>
      <StyledCheckBoxContainer>
        <StyledCheckbox {...register(name, validation)} error={errors[name]} />
        <CustomCheckboxLabel>{label}</CustomCheckboxLabel>
      </StyledCheckBoxContainer>
      {errors && name && <CustomError>{errors[name]?.message}</CustomError>}
    </StyledCheckBoxWrapper>
  );
};
