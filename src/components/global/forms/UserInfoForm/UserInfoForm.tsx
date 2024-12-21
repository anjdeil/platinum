import { FC, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-international-phone/style.css";
import {
  CustomFormCheckboxStyled,
  InfoCard,
  OptionButton,
  OptionButtonsContainer,
  ProofSelect,
} from "./styles";
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  StyledButton,
} from "@/styles/components";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { UserInfoFormSchema } from "@/types/components/global/forms/userInfoForm";
import { Title } from "@/styles/components";
import { useFetchCustomerQuery, useUpdateCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { CircularProgress } from "@mui/material";
import CustomCountrySelect from "../../selects/CustomCountrySelect/CustomCountrySelect";
import CustomFormSelect from "../../selects/CustomFormSelect/CustomFormSelect";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";
import { CustomFormInput } from "../CustomFormInput";

export const UserInfoForm: FC = () => {
  const tValidation = useTranslations("Validation");
  const tMyAccount = useTranslations("MyAccount");
  const tForms = useTranslations("Forms");

  const [isShipping, setIsShipping] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    data: customer,
    error: customerError,
    isLoading: isCustomerLoading,
  } = useFetchCustomerQuery({ customerId: "14408" });
  const [UpdateCustomerMutation, { error, isLoading }] = useUpdateCustomerMutation();

  const formSchema = useMemo(() => UserInfoFormSchema(isShipping, tValidation), [isShipping]);
  type UserInfoFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<UserInfoFormType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const subscription = watch((values, { type }) => {
      if (type === "change") {
        setHasChanges(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const proofOfPurchaseOptions = [
    { code: "Receipt", name: "Receipt" },
    { code: "VAT Invoice", name: "VAT Invoice" },
    { code: "Bank transfer receipt", name: "Bank transfer receipt" },
  ];
  const countryOptions = [
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italy" },
    { value: "ES", label: "Spain" },
    { value: "GB", label: "United Kingdom" },
    { value: "RU", label: "Russia" },
    { value: "PL", label: "Poland" },
    { value: "NL", label: "Netherlands" },
    { value: "BE", label: "Belgium" },
    { value: "SE", label: "Sweden" },
    { value: "NO", label: "Norway" },
    { value: "AT", label: "Austria" },
    { value: "CH", label: "Switzerland" },
    { value: "DK", label: "Denmark" },
    { value: "FI", label: "Finland" },
    { value: "PT", label: "Portugal" },
    { value: "GR", label: "Greece" },
    { value: "CZ", label: "Czech Republic" },
    { value: "HU", label: "Hungary" },
    { value: "RO", label: "Romania" },
  ];

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer) {
      console.error("Customer data is not available");
      return;
    }

    const updatedData = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.email,
      proofOfPurchase: formData.proofOfPurchase, //in process
      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_1: formData.address_1,
        address_2: formData.address_2,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        address_1: (isShipping && formData.address1Shipping) || formData.address_1,
        address_2: (isShipping && formData.address2Shipping) || formData.address_2,
        city: (isShipping && formData.cityShipping) || formData.city,
        postcode: (isShipping && formData.postCodeShipping) || formData.postcode,
        country: (isShipping && formData.countryShipping) || formData.country,
      },
    };

    try {
      const response = await UpdateCustomerMutation({ id: customer.id, ...updatedData });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const proofOfPurchaseValue = watch("proofOfPurchase");

  const renderFormShippingFields = (prefix: string = "", defaultValues: any = {}) => (
    <>
      <CustomCountrySelect
        name={`${prefix}country`}
        control={control}
        options={countryOptions}
        label={tMyAccount("country")}
        errors={errors}
        defaultValue={
          prefix === "Shipping" ? customer?.shipping?.country : customer?.billing?.country
        }
      />
      {["city", "address_1", "address_2", "apartmentNumber", "postcode"].map((field) => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === "postCode" ? "number" : "text"}
          defaultValue={defaultValues[field] || ""}
          setValue={setValue}
        />
      ))}
    </>
  );
  const renderFormInfoFields = (prefix: string = "", defaultValues: any = {}) => (
    <>
      {["first_name", "last_name", "email", "phone"].map((field) => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === "phone" ? "phone" : "text"}
          defaultValue={field === "phone" ? customer?.billing.phone : defaultValues[field] || ""}
          setValue={setValue}
        />
      ))}
    </>
  );

  useEffect(() => {
    if (customer) {
      setValue("country", customer.billing.country || "");
      setValue("countryShipping", customer.shipping?.country || "");
    }
  }, [customer, setValue]);

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="660px">
      <InfoCard>
        <Title as="h2" fontWeight={600} fontSize="24px" uppercase marginBottom="16px">
          {tForms("UserInfo")}
        </Title>
        {isCustomerLoading && !customer ? (
          <FlexBox justifyContent="center" margin="40px 0">
            <CircularProgress />
          </FlexBox>
        ) : (
          <FormWrapper>
            {renderFormInfoFields("", customer)} {renderFormShippingFields("", customer?.billing)}
          </FormWrapper>
        )}
        <ProofSelect>
          <CustomFormSelect
            label={tValidation("proofOfPurchase")}
            name="proofOfPurchase"
            setValue={setValue}
            register={register}
            errors={errors}
            options={proofOfPurchaseOptions}
            width="100%"
            defaultValue={proofOfPurchaseOptions[0].name || ""}
            borderRadius="8px"
            background={theme.background.formElements}
            padding="12px"
            mobFontSize="14px"
            mobPadding="12px"
            tabletPadding="12px"
            alignItem="flex-start"
            paddingOptions="4px"
          />
        </ProofSelect>
        <OptionButtonsContainer>
          {proofOfPurchaseOptions.slice(0, 2).map((option) => (
            <OptionButton
              key={option.code}
              type="button"
              onClick={() => {
                setValue("proofOfPurchase", option.code);
              }}
              isSelected={option.code === proofOfPurchaseValue}
            >
              {option.name}
            </OptionButton>
          ))}
        </OptionButtonsContainer>
      </InfoCard>
      <InfoCard>
        <Title as="h2" fontWeight={600} fontSize="24px" uppercase marginBottom="16px">
          {tForms("ShippingInfo")}
        </Title>
        <FlexBox alignItems="center" margin="0 0 16px 0">
          <CustomFormCheckboxStyled
            defaultChecked
            type="checkbox"
            onChange={() => setIsShipping((prev) => !prev)}
          />
          {tValidation("theSameAddress")}
        </FlexBox>
        {isShipping && (
          <FormWrapper>{renderFormShippingFields("Shipping", customer?.shipping)}</FormWrapper>
        )}
      </InfoCard>
      <CustomFormInput
        fieldName={tValidation("agreentment")}
        name="terms"
        register={register}
        errors={errors}
        inputTag={"input"}
        inputType={"checkbox"}
        width="100%"
      />
      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting || !hasChanges}>
          {isSubmitting ? tValidation("saving") : tValidation("saveChanges")}
        </StyledButton>
        {error && <div>{isAuthErrorResponseType(error)}</div>}
      </FormWrapperBottom>
    </CustomForm>
  );
};
