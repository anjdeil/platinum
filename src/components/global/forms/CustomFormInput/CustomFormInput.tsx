import { FC, useEffect, useMemo, useState } from 'react';
import {
  CustomError,
  CustomInputContainer,
  CustomInputStyle,
  CustomInputWrapper,
  CustomRequired,
  Input,
  LabelWrapper,
  ShowPasswordImage,
  StyledPhoneInput,
} from './styles';
import { CustomFormInputType } from '@/types/components/global/forms/customFormInput';
import 'react-international-phone/style.css';

export const CustomFormInput: FC<CustomFormInputType> = ({
  errors,
  fieldName,
  name,
  isRequire = true,
  inputTag,
  inputType,
  placeholder,
  register,
  value,
  width,
  padding,
  height,
  font,
  background,
  label = true,
  setValue,
  defaultValue,
  list,
  disabled,
  xlarea,
  autoComplete,
}) => {
  const registerProps = register ? { ...register(name) } : {};

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);
  const passwordImagePath = useMemo(
    () =>
      isPasswordVisible ? '/images/show-pass.svg' : '/images/hidden-pass.svg',
    [isPasswordVisible]
  );

  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!errors || !name) {
      console.error("Either 'errors' or 'name' is undefined");
      setError(false);
      return;
    }
    setError(name in errors);
  }, [errors, name]);

  useEffect(() => {
    if (defaultValue && defaultValue !== '' && setValue) {
      setValue(name, defaultValue, { shouldValidate: true });
    }
  }, [defaultValue, setValue, name]);

  const handleChange = (inputValue: any) => {
    if (setValue) {
      setValue(name, inputValue, { shouldValidate: false });
    }
  };

  const handleBlur = (inputValue: any) => {
    if (setValue) {
      setValue(name, inputValue, { shouldValidate: true });
    }
  };

  const getAutoCompleteValue = () => {
    switch (true) {
      case name === 'code':
        return 'one-time-code';
      case inputType === 'newpassword':
        return 'new-password';
      default:
        return undefined;
    }
  };

  return (
    <CustomInputContainer isCheckbox={inputType === 'checkbox'} width={width}>
      <CustomInputStyle
        as={'label'}
        isError={isError}
        isTextArea={false}
        isCheckbox={inputType === 'checkbox'}
        isPhone={inputType === 'phone'}
        padding={padding}
        font={font}
      >
        {label && (
          <LabelWrapper>
            <span>
              {fieldName}
              {isRequire && <CustomRequired>*</CustomRequired>}
            </span>
          </LabelWrapper>
        )}

        <CustomInputWrapper>
          {inputType === 'phone' ? (
            <StyledPhoneInput
              {...registerProps}
              {...register(name)}
              placeholder={placeholder ? placeholder : ''}
              defaultCountry="pl"
              value={value || defaultValue}
              onChange={handleChange}
              onBlur={e => handleBlur(e.target.value)}
            />
          ) : (
            <Input
              as={inputTag}
              placeholder={placeholder ? placeholder : ''}
              {...register(name)}
              type={
                isPasswordVisible
                  ? 'text'
                  : inputType === 'newpassword'
                  ? 'password'
                  : inputType
              }
              {...registerProps}
              height={height}
              background={background}
              isCheckbox={inputType === 'checkbox'}
              autoComplete={getAutoCompleteValue()}
              {...(name === 'country' ? { list: list } : {})}
              disabled={disabled}
              xlarea={xlarea}
            />
          )}
          {(inputType === 'password' || inputType === 'newpassword') && (
            <ShowPasswordImage
              src={passwordImagePath}
              alt="show or hidden password button"
              width={24}
              height={24}
              onClick={togglePasswordVisibility}
              unoptimized={true}
            />
          )}
        </CustomInputWrapper>
      </CustomInputStyle>
      {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
    </CustomInputContainer>
  );
};
