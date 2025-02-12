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
import { useTranslations } from 'next-intl';
import { ConfirmationRegCard } from './ConfirmationRegCard';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { FC, useEffect } from 'react';
import CustomTextField from '../CustomTextField/CustomTextField';
import { useGetCustomerData } from '@/hooks/useGetCustomerData';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { FormCheckbox } from './FormCheckbox';
import {
  getFormattedUserData,
  RegistrationType,
  ReqData,
} from '@/utils/checkout/getFormattedUserData';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';
import { BillingFormSkeleton } from './BillingFormSkeleton';

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
  setRegistrationData: (data: RegistrationType) => void;
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

  const {
    register,
    formState: { errors, isValid },
    setValue,
    control,
    watch,
    trigger,
  } = useForm({
    mode: 'onChange',
  });

  const watchedFields = useWatch({ control });

  const {
    registration: newCustomerRegistration,
    invoice,
    different_address,
    password,
    shipping_country,
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

      if (invoice) {
        setValue('company', billing?.company || '');
      }

      setValue('shipping_first_name', billing.first_name);
      setValue('shipping_last_name', billing.last_name);
      setValue('shipping_country', billing.country);
      setValue('shipping_city', billing.city);
      setValue('shipping_address_1', billing.address_1);
      setValue('shipping_address_2', billing.address_2);
      setValue('shipping_postcode', billing.postcode);
    }
  }, [customer, invoice]);

  useEffect(() => {
    if (!different_address) {
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
    watchedFields.first_name,
    watchedFields.last_name,
    watchedFields.country,
    watchedFields.city,
    watchedFields.address_1,
    watchedFields.address_2,
    watchedFields.postcode,
  ]);

  useEffect(() => {
    if (different_address) {
      setValue('shipping_first_name', '');
      setValue('shipping_last_name', '');
      setValue('shipping_country', 'PL');
      setValue('shipping_city', '');
      setValue('shipping_address_1', '');
      setValue('shipping_address_2', '');
      setValue('shipping_postcode', '');
    }
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
      setRegistrationData(formattedRegistrationData as RegistrationType);
    }
  }, [newCustomerRegistration, isValid]);

  useEffect(() => {
    if (isValid) {
      const { formattedBillingData, formattedShippingData, formattedMetaData } =
        getFormattedUserData(watchedFields as ReqData);
      setFormOrderData({
        billing: formattedBillingData as BillingType,
        shipping: formattedShippingData as ShippingType,
        metaData: formattedMetaData as MetaDataType[],
      });
      setValidationErrors(null);
    }
  }, [isValid]);

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
          placeholder={tMyAccount('city')}
          validation={getValidationSchema('city', tValidation)}
          setValue={setValue}
          defaultValue={customer?.billing?.city || ''}
          autocomplete="address-level2"
        />
      </StyledFormWrapper>
      <CustomTextField
        name={form === 'billing' ? 'address_1' : 'shipping_address_1'}
        register={register}
        inputType="text"
        errors={errors}
        placeholder={`${tMyAccount('address_1')}, ${tMyAccount('address_2')}`}
        validation={getValidationSchema('address_1', tValidation)}
        setValue={setValue}
        defaultValue={customer?.billing?.address_1 || ''}
        autocomplete="address-line1"
      />
      <StyledFormWrapper>
        <CustomTextField
          name={form === 'billing' ? 'address_2' : 'shipping_address_2'}
          register={register}
          inputType="text"
          errors={errors}
          placeholder={tValidation('apartment/office')}
          validation={getValidationSchema('address_2', tValidation)}
          setValue={setValue}
          defaultValue={customer?.billing?.address_2 || ''}
          autocomplete="address-line2"
        />
        <CustomTextField
          name={form === 'billing' ? 'postcode' : 'shipping_postcode'}
          register={register}
          inputType="text"
          errors={errors}
          placeholder={tMyAccount('postcode')}
          validation={getValidationSchema('postcode', tValidation)}
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
                {['first_name', 'last_name', 'email'].map(name => (
                  <CustomTextField
                    key={name}
                    name={name}
                    register={register}
                    inputType="text"
                    errors={errors}
                    placeholder={tMyAccount(name)}
                    validation={getValidationSchema(name, tValidation)}
                    setValue={setValue}
                    defaultValue={
                      customer?.billing?.[
                        name as keyof typeof customer.billing
                      ] || ''
                    }
                    autocomplete={
                      name === 'first_name'
                        ? 'given-name'
                        : name === 'last_name'
                        ? 'family-name'
                        : name
                    }
                  />
                ))}

                <StyledPhoneWrapper>
                  <CustomTextField
                    isPhone={true}
                    name="phone"
                    control={control}
                    register={register}
                    inputType="text"
                    autocomplete="tel"
                    errors={errors}
                    placeholder={tMyAccount('phone')}
                    validation={getValidationSchema('phone', tValidation)}
                    setValue={setValue}
                    defaultValue={customer?.billing?.phone || ''}
                  />
                </StyledPhoneWrapper>
              </StyledFormWrapper>

              <VariationFields>
                <FormCheckbox
                  name={'invoice'}
                  register={register}
                  errors={errors}
                  label={tCheckout('vatInvoice')}
                />
                {invoice && (
                  <StyledFormWrapper>
                    <AnimatedWrapper isVisible={true}>
                      <CustomTextField
                        name="company"
                        register={register}
                        inputType="text"
                        errors={errors}
                        placeholder={tMyAccount('company')}
                        validation={getValidationSchema('company', tValidation)}
                        setValue={setValue}
                        defaultValue={customer?.billing?.company || ''}
                      />
                    </AnimatedWrapper>
                    <AnimatedWrapper isVisible={true}>
                      <CustomTextField
                        name="nip"
                        register={register}
                        inputType="nip"
                        errors={errors}
                        placeholder={tMyAccount('nip')}
                        validation={getValidationSchema('nip', tValidation)}
                        setValue={setValue}
                        defaultValue={''}
                      />
                    </AnimatedWrapper>
                  </StyledFormWrapper>
                )}
              </VariationFields>
              <div>{addressFields('billing')}</div>
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
                          placeholder={tMyAccount('password')}
                          validation={getValidationSchema(
                            'password',
                            tValidation
                          )}
                        />
                      </AnimatedWrapper>
                      <AnimatedWrapper isVisible={newCustomerRegistration}>
                        <CustomTextField
                          name="confirm_password"
                          register={register}
                          inputType="password"
                          autocomplete="off"
                          errors={errors}
                          placeholder={tMyAccount('confirmPassword')}
                          validation={getValidationSchema(
                            'confirm_password',
                            tValidation,
                            watch
                          )}
                        />
                      </AnimatedWrapper>
                    </StyledFormWrapper>
                    <AnimatedWrapper isVisible={newCustomerRegistration}>
                      <StyledSingleCheckBoxWrapper noBottom={true}>
                        <FormCheckbox
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
          <FormCheckbox
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
                  placeholder={tMyAccount('first_name')}
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
                  placeholder={tMyAccount('last_name')}
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
