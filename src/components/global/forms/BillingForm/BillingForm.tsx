import { useGetCustomerData } from '@/hooks/useGetCustomerData';
import { CustomForm, Title } from '@/styles/components';
import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';
import {
  getFormattedUserData,
  ReqData,
} from '@/utils/checkout/getFormattedUserData';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { getMetaDataValue } from '@/utils/myAcc/getMetaDataValue';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import CustomTextField from '../CustomTextField/CustomTextField';
import { BillingFormSkeleton } from './BillingFormSkeleton';
import { ConfirmationRegCard } from './ConfirmationRegCard';
import { FormCheckboxUnControlled } from './FormCheckboxUnControlled';
import {
  AnimatedWrapper,
  StyledFomContainer,
  StyledFormWrapper,
  StyledNote,
  StyledPhoneWrapper,
  StyledSingleCheckBoxWrapper,
  VariationFields,
} from './style';

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
  phoneTrigger?: boolean;
  setIsInvoice: (value: boolean) => void;
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
  phoneTrigger,
  setIsInvoice,
}) => {
  const { customer, isCustomerLoading } = useGetCustomerData();
  const tValidation = useTranslations('Validation');
  const tCheckout = useTranslations('Checkout');
  const tMyAccount = useTranslations('MyAccount');
  const locale = useLocale();
  const shippingInitialized = useRef(false);

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

  const nipFromMeta = customer
    ? getMetaDataValue(customer.meta_data, 'nip')
    : '';

  useEffect(() => {
    if (customer) {
      const { billing, shipping } = customer;

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

      if (different_address) {
        setValue('shipping_first_name', shipping?.first_name || '');
        setValue('shipping_last_name', shipping?.last_name || '');
        setValue('shipping_country', shipping?.country || 'PL');
        setValue('shipping_city', shipping?.city || '');
        setValue('shipping_address_1', shipping?.address_1 || '');
        setValue('shipping_address_2', shipping?.address_2 || '');
        setValue('shipping_postcode', shipping?.postcode || '');
      } else {
        setValue('shipping_first_name', billing.first_name);
        setValue('shipping_last_name', billing.last_name);
        setValue('shipping_country', billing.country);
        setValue('shipping_city', billing.city);
        setValue('shipping_address_1', billing.address_1);
        setValue('shipping_address_2', billing.address_2);
        setValue('shipping_postcode', billing.postcode);
      }
    }
  }, [customer, different_address]);

  useEffect(() => {
    if (invoice && customer) {
      setValue('company', customer.billing?.company || '');
      setValue('nip', nipFromMeta);
      setIsInvoice(true);
    }

    if (!invoice) {
      setValue('company', '');
      setValue('nip', '');
      setIsInvoice(false);
    }
  }, [invoice, customer]);

  useEffect(() => {
    if (different_address && customer && !shippingInitialized.current) {
      setValue('shipping_first_name', customer.shipping?.first_name || '');
      setValue('shipping_last_name', customer.shipping?.last_name || '');
      setValue('shipping_country', customer.shipping?.country || 'PL');
      setValue('shipping_city', customer.shipping?.city || '');
      setValue('shipping_address_1', customer.shipping?.address_1 || '');
      setValue('shipping_address_2', customer.shipping?.address_2 || '');
      setValue('shipping_postcode', customer.shipping?.postcode || '');
      shippingInitialized.current = true;
    }
    if (!different_address) {
      // Reset shipping fields to billing fields
      shippingInitialized.current = false;
      setValue('shipping_first_name', watchedFields?.first_name);
      setValue('shipping_last_name', watchedFields?.last_name);
      setValue('shipping_country', watchedFields?.country);
      setValue('shipping_city', watchedFields?.city);
      setValue('shipping_address_1', watchedFields?.address_1);
      setValue('shipping_address_2', watchedFields?.address_2);
      setValue('shipping_postcode', watchedFields?.postcode);
    }
  }, [
    different_address,
    customer,
    watchedFields.first_name,
    watchedFields.last_name,
    watchedFields.country,
    watchedFields.city,
    watchedFields.address_1,
    watchedFields.address_2,
    watchedFields.postcode,
  ]);

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
        watchedFields as ReqData,
        locale
      );
      setRegistrationData(formattedRegistrationData as RegistrationFormType);
    }
  }, [
    newCustomerRegistration,
    isValid,
    watchedFields.shipping_first_name,
    watchedFields.shipping_last_name,
    watchedFields.shipping_country,
    watchedFields.shipping_city,
    watchedFields.shipping_address_1,
    watchedFields.shipping_address_2,
    watchedFields.shipping_postcode,
    watchedFields.email,
    watchedFields.phone,
  ]);

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
  }, [isValid, isWarningsShown, locale]);

  const addressFields = (form: string) => (
    <>
      <StyledFormWrapper>
        <CustomCountrySelect
          name={form === 'billing' ? 'country' : 'shipping_country'}
          control={control}
          options={countryOptions}
          label={tMyAccount('country')}
          errors={errors}
          defaultValue={
            form === 'billing'
              ? customer?.billing?.country
              : customer?.shipping?.country || 'PL'
          }
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
          defaultValue={
            form === 'billing'
              ? customer?.billing?.city
              : customer?.shipping?.city || ''
          }
          autocomplete="address-level2"
        />
      </StyledFormWrapper>
      <VariationFields></VariationFields>
      <CustomTextField
        name={form === 'billing' ? 'address_1' : 'shipping_address_1'}
        register={register}
        inputType="text"
        errors={errors}
        label={tMyAccount('address_1')}
        placeholder={tValidation('streetPlaceholder')}
        validation={validationSchema('street_building')}
        setValue={setValue}
        defaultValue={
          form === 'billing'
            ? customer?.billing?.address_1
            : customer?.shipping?.address_1 || ''
        }
        autocomplete="address-line1"
      />
      <StyledFormWrapper>
        <CustomTextField
          name={form === 'billing' ? 'address_2' : 'shipping_address_2'}
          register={register}
          inputType="text"
          errors={errors}
          label={tValidation('apartment/office')}
          placeholder={tValidation('apartmentPlaceholder')}
          validation={validationSchema('apartmentNumber')}
          setValue={setValue}
          defaultValue={
            form === 'billing'
              ? customer?.billing?.address_2
              : customer?.shipping?.address_2 || ''
          }
          autocomplete="address-line2"
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
          defaultValue={
            form === 'billing'
              ? customer?.billing?.postcode
              : customer?.shipping?.postcode || ''
          }
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
              <StyledNote>
                <p>* {tValidation('cardHolderNote')}</p>
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
                </StyledFormWrapper>
              </StyledNote>
              <StyledFormWrapper>
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
                    hasError={phoneTrigger}
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
                        defaultValue={nipFromMeta || ''}
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
