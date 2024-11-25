import { FC, useEffect, useMemo, useState } from 'react';
import {
  CustomError,
  CustomInputStyle,
  CustomInputWrapper,
  CustomRequired,
  Input,
  ShowPasswordImage,
} from './styles';
import { CustomFormInputType } from '@/types/components/global/forms/customFormInput';

export const CustomFormInput: FC<CustomFormInputType> = ({
  errors,
  fieldName,
  name,
  isRequire = true,
  inputTag,
  inputType,
  placeholder,
  register,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const passwordImagePath = useMemo(
    () =>
      isPasswordVisible ? '/images/show-pass.svg' : '/images/hidden-pass.svg',
    [isPasswordVisible]
  );

  const [isError, setError] = useState(false);
  useEffect(() => {
    if (!errors || !name) {
      setError(false);
      return;
    }
    setError(name in errors);
  }, [errors, name]);

  return (
    <div>
      <CustomInputStyle as={'label'} isError={isError} isTextArea={false}>
        <span>
          {fieldName}
          {isRequire && <CustomRequired>*</CustomRequired>}
        </span>
        <CustomInputWrapper>
          <Input
            as={inputTag}
            placeholder={placeholder ? placeholder : ''}
            {...register(name)}
            type={isPasswordVisible ? 'text' : inputType}
          />
          {inputType === 'password' && (
            <ShowPasswordImage
              src={passwordImagePath}
              alt={'show or hidden password button'}
              width={24}
              height={24}
              onClick={togglePasswordVisibility}
              unoptimized={true}
            />
          )}
        </CustomInputWrapper>
      </CustomInputStyle>
      {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
    </div>
  );
};
