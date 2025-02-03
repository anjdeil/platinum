import React, { useEffect, useRef, useState } from 'react';
import { RegisterOptions } from 'react-hook-form';
import {
  ShowPasswordImage,
  StyledError,
  StyledFormControl,
  StyledFormLabel,
  StyledInputStyle,
  StyledPhoneWrapper,
  StyledTextField,
} from './styles';
import { StyledPhoneInput } from '../CustomFormInput/styles';

interface CustomTextFieldProps {
  isPhone?: boolean;
  name: string;
  register: any;
  inputType?: string;
  autocomplete?: string;
  errors: any;
  placeholder: string;
  validation?: RegisterOptions;
  setValue?: any;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  isPhone,
  name,
  register,
  inputType,
  autocomplete,
  errors,
  placeholder,
  validation,
  setValue,
  defaultValue,
  onChange,
  onBlur,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;
      setPasswordVisible(prev => !prev);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }, 0);
    } else {
      setPasswordVisible(prev => !prev);
    }
  };
  const passwordImagePath = isPasswordVisible
    ? '/images/show-pass.svg'
    : '/images/hidden-pass.svg';

  const label = `${placeholder}*`;
  const autoCompleteValue = autocomplete || name;
  const defaultPhoneValue = '+48';

  useEffect(() => {
    if (name === 'phone' && defaultValue === defaultPhoneValue) {
      setValue(name, defaultValue, { shouldValidate: false });
    }
  }, [defaultValue, name, setValue]);

  return (
    <>
      <StyledFormControl fullWidth>
        <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
        {isPhone ? (
          <>
            <StyledInputStyle isError={!!errors[name]}>
              <StyledPhoneWrapper>
                <StyledPhoneInput
                  {...register(name, validation)}
                  defaultCountry="pl"
                  value={defaultValue}
                  error={!!errors[name]}
                  onChange={(value: string) => {
                    setValue(name, value, {
                      shouldValidate: value !== defaultPhoneValue,
                    });
                    onChange?.(value);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    onBlur?.(e.target.value);
                  }}
                />
              </StyledPhoneWrapper>
              {errors[name] && (
                <StyledError>{errors[name].message}</StyledError>
              )}
            </StyledInputStyle>
          </>
        ) : (
          <>
            <StyledTextField
              isError={!!errors[name]}
              fullWidth
              margin="normal"
              id={name}
              {...register(name, validation)}
              type={
                isPasswordVisible && inputType === 'password'
                  ? 'text'
                  : inputType
              }
              placeholder={placeholder}
              autoComplete={autoCompleteValue}
              error={!!errors[name]}
              helperText={
                typeof errors[name]?.message === 'string'
                  ? errors[name].message
                  : null
              }
              inputRef={inputType === 'password' ? inputRef : undefined}
              defaultValue={defaultValue}
            />
            {inputType === 'password' && (
              <ShowPasswordImage
                src={passwordImagePath}
                alt="show or hidden password button"
                width={24}
                height={24}
                onClick={togglePasswordVisibility}
                unoptimized={true}
              />
            )}
          </>
        )}
      </StyledFormControl>
    </>
  );
};

export default CustomTextField;
