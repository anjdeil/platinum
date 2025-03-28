import { useForm, useWatch } from 'react-hook-form';
import {
  AnimatedWrapper,
  StyledFomContainer,
  StyledFormWrapper,
  StyledPhoneWrapper,
  StyledSingleCheckBoxWrapper,
  VariationFields,
} from './style';
import { CustomForm, Title } from '@/styles/components';
import { useLocale, useTranslations } from 'next-intl';
import { ConfirmationRegCard } from './ConfirmationRegCard';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { FC, useEffect, useMemo } from 'react';
import CustomTextField from '../CustomTextField/CustomTextField';
import { useGetCustomerData } from '@/hooks/useGetCustomerData';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import {
  getFormattedUserData,
  ReqData,
} from '@/utils/checkout/getFormattedUserData';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';
import { BillingFormSkeleton } from './BillingFormSkeleton';
import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';
import { getMetaDataValue } from '@/utils/myAcc/getMetaDataValue';
import { FormCheckboxUnControlled } from './FormCheckboxUnControlled';

type OrderFormData = {
  billing: BillingType | null;
  shipping: ShippingType | null;
  metaData: MetaDataType[] | null;
};

interface BillingFormProps {
  setFormOrderData: (data: OrderFormData) => void;
  setCurrentCountryCode: (code: string) => void;
  setValidationErrors: (errors: string | null) => void;
  setIsShippingAddressDifferent: (value: boolean) => void;
  isWarningsShown: boolean;
  isUserAlreadyExist: boolean;
  setRegistrationErrorWarning: (value: string | null) => void;
  setIsRegistration: (value: boolean) => void;
  setRegistrationData: (data: RegistrationFormType) => void;
  setIsValidForm: (value: boolean) => void;
}

export const BillingForm: FC<BillingFormProps> = ({
  setFormOrderData,
  setCurrentCountryCode,
  setValidationErrors,
  setIsShippingAddressDifferent,
  isWarningsShown,
  isUserAlreadyExist,
  setRegistrationErrorWarning,
  setIsRegistration,
  setRegistrationData,
  setIsValidForm,
}) => {
  const { customer, isCustomerLoading } = useGetCustomerData();
  const tValidation = useTranslations('Validation');
  const tCheckout = useTranslations('Checkout');
  const tMyAccount = useTranslations('MyAccount');
  const locale = useLocale();

  const validationSchema = useMemo(() => {
    return (name: string, watch?: any) =>
      getValidationSchema(name, tValidation, watch);
  }, [locale]);

  const {
    register,
    formState: { errors, isValid },
    setValue,
    control,
    watch,
    trigger,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    clearErrors();
  }, [locale]);

  const watchedFields = useWatch({ control });

  const {
    registration: newCustomerRegistration,
    invoice,
    different_address,
    password,
    shipping_country,
    company,
    nip,
  } = watchedFields;

  useEffect(() => {
    setIsValidForm(isValid);
  }, [isValid]);

  useEffect(() => {
    if (customer) {
      setValue('registration', false);
      setRegistrationErrorWarning(null);
    }
  }, [customer]);

  const apartmentNumber = customer
    ? getMetaDataValue(customer.meta_data, 'apartmentNumber')
    : '';

  // TODO - shipping_apartmentNumber from customer.shipping

  // const shipping_apartmentNumber = customer
  //   ? getMetaDataValue(customer.meta_data, 'shipping_apartmentNumber')
  //   : '';

  const nipFromMeta = customer
    ? getMetaDataValue(customer.meta_data, 'nip')
    : '';

  useEffect(() => {
    if (customer) {
      const { billing } = customer;

      const fieldsToFill: (keyof typeof billing)[] = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'country',
        'city',
        'address_1',
        'address_2',
        'postcode',
      ];

      fieldsToFill.forEach(field => {
        setValue(field, billing?.[field] || '');
      });

      setValue('country', billing?.country || 'PL');

      setValue('apartmentNumber', apartmentNumber);

      setValue('shipping_first_name', billing.first_name);
      setValue('shipping_last_name', billing.last_name);
      setValue('shipping_country', billing.country);
      setValue('shipping_city', billing.city);
      setValue('shipping_address_1', billing.address_1);
      setValue('shipping_address_2', billing.address_2);
      setValue('shipping_apartmentNumber', apartmentNumber);
      setValue('shipping_postcode', billing.postcode);
    }
  }, [customer]);

  useEffect(() => {
    if (invoice && customer) {
      setValue('company', customer.billing?.company || '');
      setValue('nip', nipFromMeta);
    }

    if (!invoice) {
      setValue('company', '');
      setValue('nip', '');
    }
  }, [invoice, customer]);

  useEffect(() => {
    if (!different_address) {
      setValue('shipping_first_name', watchedFields?.first_name);
      setValue('shipping_last_name', watchedFields?.last_name);
      setValue('shipping_country', watchedFields?.country);
      setValue('shipping_city', watchedFields?.city);
      setValue('shipping_address_1', watchedFields?.address_1);
      setValue('shipping_address_2', watchedFields?.address_2);
      setValue('shipping_apartmentNumber', watchedFields?.apartmentNumber);
      setValue('shipping_postcode', watchedFields?.postcode);
    }
  }, [
    different_address,
    watchedFields.first_name,
    watchedFields.last_name,
    watchedFields.country,
    watchedFields.city,
    watchedFields.address_1,
    watchedFields.address_2,
    watchedFields.apartmentNumber,
    watchedFields.postcode,
  ]);

  // TODO - shipping info from customer.shipping

  useEffect(() => {
    if (different_address) {
      //if (!customer) {
      setValue('shipping_first_name', '');
      setValue('shipping_last_name', '');
      setValue('shipping_country', 'PL');
      setValue('shipping_city', '');
      setValue('shipping_address_1', '');
      setValue('shipping_address_2', '');
      setValue('shipping_apartmentNumber', '');
      setValue('shipping_postcode', '');
    }
    // } else {
    //   setValue('shipping_first_name', customer?.shipping.first_name || '');
    //   setValue('shipping_last_name', customer?.shipping.last_name || '');
    //   setValue('shipping_country', customer?.shipping.country || 'PL');
    //   setValue('shipping_city', customer?.shipping.city || '');
    //   setValue('shipping_address_1', customer?.shipping.address_1 || '');
    //   setValue('shipping_address_2', customer?.shipping.address_2 || '');
    //   setValue('shipping_apartmentNumber', shipping_apartmentNumber);
    // }
  }, [different_address]);

  useEffect(() => {
    if (password) {
      trigger('confirm_password');
    }
  }, [password, trigger]);

  useEffect(() => {
    if (different_address) {
      setIsShippingAddressDifferent(true);
    } else {
      setIsShippingAddressDifferent(false);
    }
  }, [different_address]);

  useEffect(() => {
    if (shipping_country) {
      setCurrentCountryCode(shipping_country);
    }
  }, [shipping_country]);

  useEffect(() => {
    if (newCustomerRegistration) {
      setIsRegistration(true);
    } else {
      setIsRegistration(false);
    }
  }, [newCustomerRegistration]);

  useEffect(() => {
    if (newCustomerRegistration && isValid) {
      const { formattedRegistrationData } = getFormattedUserData(
        watchedFields as ReqData
      );
      setRegistrationData(formattedRegistrationData as RegistrationFormType);
    }
  }, [newCustomerRegistration, isValid]);

  useEffect(() => {
    if (isValid) {
      const { formattedBillingData, formattedShippingData, formattedMetaData } =
        getFormattedUserData(watchedFields as ReqData);

      setFormOrderData({
        billing: formattedBillingData as BillingType,
        shipping: different_address
          ? (formattedShippingData as ShippingType)
          : (formattedBillingData as ShippingType),
        metaData: formattedMetaData as MetaDataType[],
      });
      setValidationErrors(null);
    } else {
      setFormOrderData({
        billing: null,
        shipping: null,
        metaData: null,
      });
    }
  }, [isValid, different_address, company, nip, watchedFields]);

  useEffect(() => {
    if (!isValid && isWarningsShown) {
      trigger(undefined, { shouldFocus: true }).then(() => {
        setValidationErrors('validationErrorsFields');
        setFormOrderData({
          billing: null,
          shipping: null,
          metaData: null,
        });
      });
    }
  }, [isValid, isWarningsShown]);

  const addressFields = (form: string) => (
    <>
      <StyledFormWrapper>
        <CustomCountrySelect
          name={form === 'billing' ? 'country' : 'shipping_country'}
          control={control}
          options={countryOptions}
          label={tMyAccount('country')}
          errors={errors}
          defaultValue={customer?.billing?.country || 'PL'}
          noPaddings={true}
        />
        <CustomTextField
          name={form === 'billing' ? 'city' : 'shipping_city'}
          register={register}
          inputType="text"
          errors={errors}
          label={tMyAccount('city')}
          placeholder={tValidation('cityPlaceholder')}
          validation={validationSchema('city')}
          setValue={setValue}
          defaultValue={customer?.billing?.city || ''}
          autocomplete="address-level2"
        />
        <CustomTextField
          name={form === 'billing' ? 'address_1' : 'shipping_address_1'}
          register={register}
          inputType="text"
          errors={errors}
          label={tMyAccount('address_1')}
          placeholder={tValidation('streetPlaceholder')}
          validation={validationSchema('address_1')}
          setValue={setValue}
          defaultValue={customer?.billing?.address_1 || ''}
          autocomplete="address-line1"
        />
        <CustomTextField
          name={form === 'billing' ? 'address_2' : 'shipping_address_2'}
          register={register}
          inputType="text"
          errors={errors}
          label={tCheckout('address_2')}
          placeholder={tValidation('buildingPlaceholder')}
          validation={validationSchema('address_2')}
          setValue={setValue}
          defaultValue={customer?.billing?.address_2 || ''}
          autocomplete="address-line2"
        />
        <CustomTextField
          name={
            form === 'billing' ? 'apartmentNumber' : 'shipping_apartmentNumber'
          }
          register={register}
          inputType="text"
          errors={errors}
          label={tValidation('apartment/office')}
          placeholder={tValidation('apartmentPlaceholder')}
          validation={validationSchema('apartmentNumber')}
          setValue={setValue}
          defaultValue={apartmentNumber}
          autocomplete="address-line3"
          notRequired
        />
        <CustomTextField
          name={form === 'billing' ? 'postcode' : 'shipping_postcode'}
          register={register}
          inputType="text"
          errors={errors}
          label={tCheckout('postcode')}
          placeholder={tValidation('postCodePlaceholder')}
          validation={validationSchema('postcode')}
          setValue={setValue}
          defaultValue={customer?.billing?.postcode || ''}
          autocomplete="postal-code"
        />
      </StyledFormWrapper>
    </>
  );

  return (
    <>
      {!customer && !isCustomerLoading && !isUserAlreadyExist && (
        <ConfirmationRegCard register={register} errors={errors} />
      )}
      <StyledFomContainer>
        <Title as={'h2'} uppercase marginBottom="24px">
          {tCheckout('billingFormName')}
        </Title>
        {isCustomerLoading ? (
          <BillingFormSkeleton />
        ) : (
          <>
            <CustomForm maxWidth="850px">
              <StyledFormWrapper>
                <CustomTextField
                  name="first_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  label={tCheckout('first_name')}
                  placeholder={tValidation('firstNamePlaceholder')}
                  validation={validationSchema('first_name')}
                  setValue={setValue}
                  defaultValue={customer?.billing?.first_name || ''}
                  autocomplete="given-name"
                />
                <CustomTextField
                  name="last_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  label={tCheckout('last_name')}
                  placeholder={tValidation('lastNamePlaceholder')}
                  validation={validationSchema('last_name')}
                  setValue={setValue}
                  defaultValue={customer?.billing?.last_name || ''}
                  autocomplete="family-name"
                />
                <CustomTextField
                  name="email"
                  register={register}
                  inputType="email"
                  errors={errors}
                  label={tCheckout('email')}
                  placeholder={tValidation('emailPlaceholder')}
                  validation={validationSchema('email')}
                  setValue={setValue}
                  defaultValue={customer?.billing.email || ''}
                  autocomplete="email"
                />
                <StyledPhoneWrapper>
                  <CustomTextField
                    isPhone={true}
                    name="phone"
                    control={control}
                    register={register}
                    inputType="text"
                    autocomplete="tel"
                    errors={errors}
                    label={tCheckout('phone')}
                    placeholder={tValidation('phonePlaceholder')}
                    validation={validationSchema('phone')}
                    setValue={setValue}
                    defaultValue={customer?.billing?.phone || ''}
                  />
                </StyledPhoneWrapper>
              </StyledFormWrapper>

              <div>{addressFields('billing')}</div>

              <VariationFields>
                <FormCheckboxUnControlled
                  name={'invoice'}
                  register={register}
                  errors={errors}
                  label={tCheckout('vatInvoice')}
                />
                {invoice && (
                  <StyledFormWrapper alignFlexEnd>
                    <AnimatedWrapper isVisible={true}>
                      <CustomTextField
                        name="company"
                        register={register}
                        inputType="text"
                        errors={errors}
                        label={tCheckout('company')}
                        placeholder={tValidation('companyPlaceholder')}
                        validation={validationSchema('company')}
                        setValue={setValue}
                        defaultValue={customer?.billing?.company || ''}
                      />
                    </AnimatedWrapper>
                    <AnimatedWrapper isVisible={true}>
                      <CustomTextField
                        name="nip"
                        register={register}
                        inputType="text"
                        errors={errors}
                        label={tCheckout('nip')}
                        placeholder={tValidation('nipPlaceholder')}
                        validation={validationSchema('nip')}
                        setValue={setValue}
                        defaultValue={''}
                      />
                    </AnimatedWrapper>
                  </StyledFormWrapper>
                )}
              </VariationFields>
              <VariationFields>
                {watchedFields.registration && (
                  <>
                    <StyledFormWrapper>
                      <AnimatedWrapper isVisible={newCustomerRegistration}>
                        <CustomTextField
                          name="password"
                          register={register}
                          inputType="password"
                          autocomplete="new-password"
                          errors={errors}
                          label={tMyAccount('password')}
                          placeholder={tValidation('passwordPlaceholder')}
                          validation={validationSchema('password')}
                        />
                      </AnimatedWrapper>
                      <AnimatedWrapper isVisible={newCustomerRegistration}>
                        <CustomTextField
                          name="confirm_password"
                          register={register}
                          inputType="password"
                          autocomplete="off"
                          errors={errors}
                          label={tMyAccount('confirmPassword')}
                          placeholder={tValidation(
                            'confirmPasswordPlaceholder'
                          )}
                          validation={validationSchema(
                            'confirm_password',
                            watch
                          )}
                        />
                      </AnimatedWrapper>
                    </StyledFormWrapper>
                    <AnimatedWrapper isVisible={newCustomerRegistration}>
                      <StyledSingleCheckBoxWrapper noBottom={true}>
                        <FormCheckboxUnControlled
                          name={'terms'}
                          register={register}
                          errors={errors}
                          label={tMyAccount('agreePersonalData')}
                          validation={getValidationSchema('terms', tValidation)}
                          noTop
                        />
                      </StyledSingleCheckBoxWrapper>
                    </AnimatedWrapper>
                  </>
                )}
              </VariationFields>
            </CustomForm>
          </>
        )}
      </StyledFomContainer>
      <StyledFomContainer>
        <Title as={'h2'} uppercase marginBottom={'24px'}>
          {tCheckout('shippingFormName')}
        </Title>
        <StyledSingleCheckBoxWrapper>
          <FormCheckboxUnControlled
            name={'different_address'}
            register={register}
            errors={errors}
            label={tCheckout('shippingDifferentAddress')}
          />
        </StyledSingleCheckBoxWrapper>
        {different_address && (
          <AnimatedWrapper isVisible={different_address}>
            <CustomForm maxWidth="850px">
              <StyledFormWrapper>
                <CustomTextField
                  name="shipping_first_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  label={tMyAccount('first_name')}
                  placeholder={tValidation('firstNamePlaceholder')}
                  validation={getValidationSchema('first_name', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.shipping.first_name || ''}
                  autocomplete="given-name"
                />
                <CustomTextField
                  name="shipping_last_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  label={tMyAccount('last_name')}
                  placeholder={tValidation('lastNamePlaceholder')}
                  validation={getValidationSchema('last_name', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.shipping.last_name || ''}
                  autocomplete="family-name"
                />
              </StyledFormWrapper>
              <div>{addressFields('shipping')}</div>
            </CustomForm>
          </AnimatedWrapper>
        )}
      </StyledFomContainer>
    </>
  );
};
