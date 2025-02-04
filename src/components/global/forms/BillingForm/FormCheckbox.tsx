import { FC, useEffect, useState } from 'react';
import { CustomError } from '../CustomFormInput/styles';
import { CustomFormCheckboxType } from '@/types/components/global/forms/customFormCheckbox';
import { CustomCheckboxLabel } from '../CustomFormCheckbox/styles';
import { StyledCheckbox, StyledCheckBoxWrapper } from './style';

export const FormCheckbox: FC<CustomFormCheckboxType> = ({
  errors,
  label,
  name,
  register,
}) => {
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!errors || !name) {
      setError(false);
      return;
    }
    setError(name in errors);
  }, [errors, name]);

  return (
    <StyledCheckBoxWrapper>
      <StyledCheckbox {...register(name)} />
      <CustomCheckboxLabel>{label}</CustomCheckboxLabel>
      {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
    </StyledCheckBoxWrapper>
  );
};
