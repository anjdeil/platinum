import React, { useEffect, useRef, useState } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
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
import { useTranslations } from 'next-intl';

interface CustomTextFieldProps {
  isPhone?: boolean;
  isReg?: boolean;
  name: string;
  register: any;
  control?: any;
  inputType?: string;
  autocomplete?: string;
  errors: any;
  label: string;
  placeholder?: string;
  validation?: RegisterOptions;
  setValue?: any;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  notRequired?: boolean;
  minHeight?: string;
  hasError?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  isPhone,
  isReg,
  name,
  register,
  control,
  inputType,
  autocomplete,
  errors,
  label,
  placeholder,
  validation,
  setValue,
  defaultValue,
  notRequired,
  minHeight,
  hasError,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Validation');

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

  const labelValue = notRequired ? label : `${label} *`;
  const autocompleteName =
    name === 'password'
      ? 'new-password'
      : name === 'company'
      ? 'organization'
      : name;
  const autoCompleteValue = autocomplete || autocompleteName;
  const defaultPhoneValue = '+48';

  useEffect(() => {
    if (name === 'phone' && defaultValue === defaultPhoneValue) {
      setValue(name, defaultValue, { shouldValidate: false });
    }
  }, [defaultValue, name, setValue]);

  return (
    <>
      <StyledFormControl fullWidth>
        <StyledFormLabel htmlFor={name}>{labelValue}</StyledFormLabel>

        {isPhone ? (
          <>
            <StyledInputStyle
              isError={!!errors[name] || hasError}
              isPhone={isPhone}
            >
              <StyledPhoneWrapper>
                <Controller
                  name={name}
                  control={control}
                  rules={validation}
                  render={({ field }) => (
                    <StyledPhoneInput
                      {...field}
                      placeholder={placeholder}
                      defaultCountry="pl"
                      onChange={value => {
                        if (value !== defaultPhoneValue) {
                          setValue(name, value, { shouldValidate: true });
                        } else {
                          setValue(name, value, { shouldValidate: false });
                        }
                      }}
                      value={field.value || ''}
                      onBlur={() => field.onBlur()}
                      isReg={isReg}
                    />
                  )}
                />
              </StyledPhoneWrapper>
              {/* {errors[name] && (
                <StyledError>{errors[name].message}</StyledError>
              )} */}

              {(hasError || errors[name]) && (
                <StyledError>
                  {hasError ? t('usePolishNumberError') : errors[name]?.message}
                </StyledError>
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
              {...register(name, {
                ...validation,
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                  const trimmed = e.target.value.trim();
                  if (typeof setValue === 'function') {
                    setValue(name, trimmed, { shouldValidate: true });
                  }
                },
              })}
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
              isPassword={inputType === 'password'}
              minHeight={minHeight}
            />
            {inputType === 'password' && (
              <ShowPasswordImage
                src={passwordImagePath}
                alt="show or hidden password button"
                width={24}
                height={24}
                onClick={togglePasswordVisibility}
              />
            )}
          </>
        )}
      </StyledFormControl>
    </>
  );
};

export default CustomTextField;
