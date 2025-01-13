import { FC, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import { CustomFormCheckboxStyled, InfoCard } from './styles';
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  StyledButton,
} from '@/styles/components';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { UserInfoFormSchema } from '@/types/components/global/forms/userInfoForm';
import { Title } from '@/styles/components';
import {
  useFetchCustomerQuery,
  useUpdateCustomerMutation,
} from '@/store/rtk-queries/wooCustomApi';
import { CircularProgress } from '@mui/material';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { useTranslations } from 'next-intl';
import Notification from '../../Notification/Notification';
import { CustomFormInput } from '../CustomFormInput';

export const UserInfoForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tForms = useTranslations('Forms');

  const [isShipping, setIsShipping] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const { data: customer, isLoading: isCustomerLoading } =
    useFetchCustomerQuery({ customerId: '14408' });

  const [UpdateCustomerMutation, { error, isSuccess }] =
    useUpdateCustomerMutation();

  const formSchema = useMemo(
    () => UserInfoFormSchema(isShipping, tValidation),
    [isShipping]
  );
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
      if (type === 'change') {
        setHasChanges(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (customer) {
      const isShippingEmpty =
        !customer.shipping?.first_name &&
        !customer.shipping?.last_name &&
        !customer.shipping?.address_1;
      setIsShipping(!isShippingEmpty);
      console.log('isShippingEmpty', isShippingEmpty);
      console.log(isShipping);
    }
  }, [customer]);

  /*   const proofOfPurchaseOptions = [
    { code: "Receipt", name: "Receipt" },
    { code: "VAT Invoice", name: "VAT Invoice" },
    { code: "Bank transfer receipt", name: "Bank transfer receipt" },
  ]; */
  const countryOptions = [
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'RU', label: 'Russia' },
    { value: 'PL', label: 'Poland' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'BE', label: 'Belgium' },
    { value: 'SE', label: 'Sweden' },
    { value: 'NO', label: 'Norway' },
    { value: 'AT', label: 'Austria' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'DK', label: 'Denmark' },
    { value: 'FI', label: 'Finland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'GR', label: 'Greece' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'HU', label: 'Hungary' },
    { value: 'RO', label: 'Romania' },
  ];

  const handleShippingCheckboxChange = () => {
    setIsShipping(prev => !prev);
    setHasChanges(true);
  };

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer) {
      console.error('Customer data is not available');
      return;
    }
    console.log(isShipping);

    const updatedData = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.email,
      /* proofOfPurchase: formData.proofOfPurchase, //in process */
      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_1: formData.address_1,
        address_2: [formData.address_2, formData.apartmentNumber]
          .filter(Boolean)
          .join('/'),
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: isShipping
        ? {
            first_name:
              (isShipping && formData.first_nameShipping) ||
              formData.first_name,
            last_name:
              (isShipping && formData.last_nameShipping) || formData.last_name,
            phone:
              (isShipping && formData.phoneShipping) || formData.phoneShipping,
            address_1:
              (isShipping && formData.address_1Shipping) || formData.address_1,
            address_2:
              (isShipping &&
                [formData.address_2Shipping, formData.apartmentNumberShipping]
                  .filter(Boolean)
                  .join('/')) ||
              [formData.address_2, formData.apartmentNumber]
                .filter(Boolean)
                .join('/'),
            city: (isShipping && formData.cityShipping) || formData.city,
            postcode:
              (isShipping && formData.postcodeShipping) || formData.postcode,
            country:
              (isShipping && formData.countryShipping) || formData.country,
          }
        : {
            first_name: '',
            last_name: '',
            phone: '',
            address_1: '',
            address_2: '',
            city: '',
            postcode: '',
            country: '',
          },
    };

    try {
      await UpdateCustomerMutation({
        id: customer.id,
        ...updatedData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* const proofOfPurchaseValue = watch("proofOfPurchase"); */

  const renderFormShippingFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {prefix === 'Shipping' &&
        ['first_name', 'last_name', 'phone'].map(field => (
          <CustomFormInput
            key={field}
            fieldName={tMyAccount(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'phone' ? 'phone' : 'text'}
            defaultValue={defaultValues[field] || ''}
            setValue={setValue}
          />
        ))}
      <CustomCountrySelect
        name={`country${prefix}`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
        defaultValue={
          prefix === 'Shipping'
            ? customer?.shipping?.country
            : customer?.billing?.country
        }
      />

      {['city', 'address_1', 'address_2', 'apartmentNumber', 'postcode'].map(
        field => (
          <CustomFormInput
            key={field}
            fieldName={tMyAccount(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'postCode' ? 'number' : 'text'}
            defaultValue={
              field === 'address_2'
                ? defaultValues.address_2?.split('/')[0] || ''
                : field === 'apartmentNumber'
                ? defaultValues.address_2?.split('/')[1] || ''
                : defaultValues[field] || ''
            }
            setValue={setValue}
          />
        )
      )}
    </>
  );

  const renderFormInfoFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {['first_name', 'last_name', 'email', 'phone'].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          defaultValue={
            field === 'phone'
              ? customer?.billing.phone
              : defaultValues[field] || ''
          }
          setValue={setValue}
        />
      ))}
    </>
  );

  useEffect(() => {
    if (customer) {
      setValue('country', customer.billing.country || '');
      setValue('countryShipping', customer.shipping?.country || '');
    }
  }, [customer, setValue]);

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="760px">
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase
          marginBottom="16px"
        >
          {tForms('UserInfo')}
        </Title>
        {isCustomerLoading && !customer ? (
          <FlexBox justifyContent="center" margin="40px 0">
            <CircularProgress />
          </FlexBox>
        ) : (
          <FormWrapper>
            {renderFormInfoFields('', customer)}{' '}
            {renderFormShippingFields('', customer?.billing)}
          </FormWrapper>
        )}
        {/*   <ProofSelect>
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
        </OptionButtonsContainer> */}
      </InfoCard>
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase
          marginBottom="16px"
        >
          {tForms('ShippingInfo')}
        </Title>
        <FlexBox alignItems="center" margin="0 0 16px 0">
          <CustomFormCheckboxStyled
            checked={!isShipping}
            type="checkbox"
            onChange={() => handleShippingCheckboxChange()}
          />
          {tValidation('theSameAddress')}
        </FlexBox>
        {customer && isShipping && (
          <FormWrapper>
            {renderFormShippingFields('Shipping', customer?.shipping)}
          </FormWrapper>
        )}
      </InfoCard>
      {/*   <CustomFormInput
        fieldName={tValidation('agreentment')}
        name="terms"
        register={register}
        errors={errors}
        inputTag={'input'}
        inputType={'checkbox'}
        width="100%"
      /> */}

      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting || !hasChanges}>
          {isSubmitting ? tValidation('saving') : tValidation('saveChanges')}
        </StyledButton>
        {error && <div>{isAuthErrorResponseType(error)}</div>}
        {isSuccess && (
          <Notification type="success">
            {tMyAccount('successUpdate')}
          </Notification>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
