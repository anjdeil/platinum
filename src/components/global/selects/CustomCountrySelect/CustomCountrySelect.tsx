// CustomSelect.tsx
import React from "react";
import { Controller, Control } from "react-hook-form";
import Select from "react-select";

import theme from "@/styles/theme";
import { useTranslations } from "next-intl";
import { CustomSelectInput } from "./styles";
import { CustomError, CustomRequired } from "../../forms/CustomFormInput/styles";

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  label: string;
  errors: any;
  rules?: any;
  defaultValue?: string;
}

const CustomCountrySelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  errors,
  rules,
  defaultValue,
}) => {
  const tValidation = useTranslations("Validation");

  return (
    <CustomSelectInput>
      <label htmlFor={name}>{label}</label>
      <CustomRequired>*</CustomRequired>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            id={name}
            options={options}
            value={options.find((option) => option.value === field.value) || null}
            onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
            placeholder=""
            styles={{
              control: (base, state) => ({
                ...base,
                marginTop: "8px",
                marginBottom: "8px",
                border: "none",
                height: "50px",
                padding: "5px",
                borderRadius: "10px",
                background: theme.background.formElements,
                outline: state.isFocused
                  ? `1px solid ${errors[name] ? theme.colors.error : theme.colors.primary}`
                  : "none",
                boxShadow: state.isFocused ? theme.customShadows.primaryShadow : "none",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? theme.colors.primary : provided.backgroundColor,
                color: state.isSelected ? theme.colors.white : provided.color,
                padding: "10px",
              }),
            }}
          />
        )}
      />
      {errors[name] && <CustomError>{errors[name]?.message}</CustomError>}
    </CustomSelectInput>
  );
};

export default CustomCountrySelect;
