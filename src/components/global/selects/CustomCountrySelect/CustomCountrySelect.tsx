import theme from '@/styles/theme';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  CustomError,
  CustomRequired,
} from '../../forms/CustomFormInput/styles';
import { CustomSelectInput } from './styles';

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  label: string;
  errors: any;
  rules?: any;
  defaultValue?: string;
  noPaddings?: boolean;
  noBottom?: boolean;
  placeholder?: string;
}
const DynamicSelect = dynamic(() => import('react-select'), { ssr: false });

const CustomCountrySelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  errors,
  rules,
  defaultValue,
  noPaddings,
  noBottom,
  placeholder,
}) => {
  const tValidation = useTranslations('Validation');
  const selectRef = useRef<any>(null);
  if (typeof window !== 'undefined') {
  }
  return (
    <CustomSelectInput noPaddings={noPaddings}>
      <label>{label}</label>
      <CustomRequired>*</CustomRequired>

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <DynamicSelect
            {...field}
            inputId={`${name}-input`}
            id={name}
            options={options}
            value={options.find(option => option.value === field.value) || null}
            onChange={(selectedOption: any) => {
              field.onChange(selectedOption?.value);
              const input = document.getElementById(`${name}-input`);
              input?.blur();
              field.onBlur();
            }}
            placeholder={placeholder || ''}
            ref={selectRef}
            styles={{
              control: (base, state) => ({
                ...base,
                marginTop: '6px',
                // marginBottom: noPaddings ? '24px' : '8px',
                marginBottom: noBottom ? '0' : noPaddings ? '24px' : '8px',
                border: 'none',
                height: noPaddings ? '48px' : '50px',
                padding: noPaddings ? '0' : '5px',
                borderRadius: '8px',
                background: theme.background.formElements,
                outline: state.isFocused
                  ? `1px solid ${
                      errors[name] ? theme.colors.error : theme.colors.primary
                    }`
                  : 'none',
                boxShadow: state.isFocused
                  ? theme.customShadows.primaryShadow
                  : 'none',
              }),
              menu: base => ({
                ...base,
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? theme.colors.primary
                  : provided.backgroundColor,
                color: state.isSelected ? theme.colors.white : provided.color,
                padding: '10px',
              }),
            }}
          />
        )}
        {...(errors[name] && (
          <CustomError>{tValidation('RequiredField')}</CustomError>
        ))}
      />
      {/* {errors[name] && (
        <CustomError>{tValidation('RequiredField')}</CustomError>
      )} */}
    </CustomSelectInput>
  );
};

export default CustomCountrySelect;
