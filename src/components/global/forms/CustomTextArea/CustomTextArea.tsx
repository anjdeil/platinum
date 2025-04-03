import React, { useRef } from 'react';
import { RegisterOptions } from 'react-hook-form';
import {
  StyledError,
  StyledFormControl,
  StyledFormLabel,
  StyledTextareaField,
} from './styles';

interface CustomTextAreaProps {
  name: string;
  register: any;
  inputType?: string;
  errors: any;
  label: string;
  placeholder?: string;
  validation?: RegisterOptions;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  notRequired?: boolean;
  minHeight?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name,
  register,
  inputType,
  errors,
  label,
  placeholder,
  validation,
  notRequired,
  minHeight,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const labelValue = notRequired ? label : `${label} *`;

  return (
    <>
      <StyledFormControl fullWidth>
        <StyledFormLabel htmlFor={name}>{labelValue}</StyledFormLabel>
        <StyledTextareaField
          isError={!!errors[name]}
          fullWidth
          margin="normal"
          id={name}
          {...register(name, validation)}
          type={inputType ? 'textarea' : inputType}
          placeholder={placeholder}
          error={!!errors[name]}
          helperText={
            typeof errors[name]?.message === 'string'
              ? errors[name].message
              : null
          }
          inputRef={inputType === 'password' ? inputRef : undefined}
          minHeight={minHeight}
        />
        {errors[name]?.message && (
          <StyledError>{errors[name].message}</StyledError>
        )}
      </StyledFormControl>
    </>
  );
};

export default CustomTextArea;
