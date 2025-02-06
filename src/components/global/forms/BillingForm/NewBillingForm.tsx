import { FieldError, useForm, useWatch } from 'react-hook-form';
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

type OrderFormData = {
  billing: BillingType | null;
  shipping: ShippingType | null;
  metaData: MetaDataType[] | null;
  registration: RegistrationType | null;
};

interface BillingFormProps {
  setFormOrderData: (data: OrderFormData) => void;
  setCurrentCountryCode: (code: string) => void;
  setValidationErrors: (errors: string[]) => void;
  isValidation: boolean;
  setIsValidation: (value: boolean) => void;
}

export const NewBillingForm: FC<BillingFormProps> = ({
  setFormOrderData,
  setCurrentCountryCode,
  setValidationErrors,
  isValidation,
  setIsValidation,
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
    mode: 'onBlur',
  });

  const phone = useWatch({
    control,
    name: 'registration',
    defaultValue: false,
  });

  console.log(phone, 'phone');
  const isRegistration = useWatch({
    control,
    name: 'registration',
    defaultValue: false,
  });

  const isInvoice = useWatch({
    control,
    name: 'invoice',
    defaultValue: false,
  });

  const isDifferentAddress = useWatch({
    control,
    name: 'same_address',
    defaultValue: false,
  });

  const password = watch('password');
  const shippingCountry = watch('shipping_country');
  const watchedFields = useWatch({ control });

  useEffect(() => {
    if (customer) {
      const countryCode =
        customer.billing?.country === '' ? 'PL' : customer.billing?.country;
      setValue('first_name', customer.billing?.first_name || '');
      setValue('last_name', customer.billing?.last_name || '');
      setValue('email', customer.billing?.email || '');
      setValue('phone', customer.billing?.phone || '');
      setValue('country', countryCode);
      setValue('city', customer.billing?.city || '');
      setValue('address_1', customer.billing?.address_1 || '');
      setValue('address_2', customer.billing?.address_2?.split('/')[0] || '');
      setValue(
        'apartmentNumber',
        customer.billing?.address_2?.split('/')[1] || ''
      );
      setValue('postcode', customer.billing?.postcode || '');
      setValue('company', customer.billing?.company || '');
    }
  }, [customer, setValue]);

  useEffect(() => {
    if (isDifferentAddress) {
      setValue('shipping_country', 'PL');
      setValue('shipping_city', '');
      setValue('shipping_address_1', '');
      setValue('shipping_address_2', '');
      setValue('shipping_apartmentNumber', '');
      setValue('shipping_postcode', '');
    } else {
      setValue('shipping_country', watch('country'));
      setValue('shipping_city', watch('city'));
      setValue('shipping_address_1', watch('address_1'));
      setValue('shipping_address_2', watch('address_2'));
      setValue('shipping_apartmentNumber', watch('apartmentNumber'));
      setValue('shipping_postcode', watch('postcode'));
    }
  }, [isDifferentAddress, watch, setValue]);

  useEffect(() => {
    if (password) {
      trigger('confirm_password');
    }
  }, [password, trigger]);

  useEffect(() => {
    if (shippingCountry) {
      setCurrentCountryCode(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    console.log('0', isValidation);
    if (isValidation) {
      console.log('1', isValidation);
      trigger().then(isValid => {
        if (isValid) {
          console.log('2', isValidation);
          const {
            formattedBillingData,
            formattedShippingData,
            formattedRegistrationData,
            formattedMetaData,
            registration,
          } = getFormattedUserData(watchedFields as ReqData);

          setFormOrderData({
            billing: formattedBillingData as BillingType,
            shipping: formattedShippingData as ShippingType,
            metaData: formattedMetaData as MetaDataType[],
            registration: registration
              ? (formattedRegistrationData as RegistrationType)
              : null,
          });
          setValidationErrors([]);
          setIsValidation(false);
        } else {
          setIsValidation(false);
          const validationErrors = Object.values(errors)
            .filter((error): error is FieldError => error !== undefined)
            .map(error => error.message as string);
          setValidationErrors(validationErrors);
          console.log('3', isValidation);
        }
      });
    }
  }, [isValidation, isValid]);

  const addressFields = (form: string) => (
    <>
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
      <CustomTextField
        name={form === 'billing' ? 'address_1' : 'shipping_address_1'}
        register={register}
        inputType="text"
        errors={errors}
        placeholder={tMyAccount('address_1')}
        validation={getValidationSchema('address_1', tValidation)}
        setValue={setValue}
        defaultValue={customer?.billing?.address_1 || ''}
        autocomplete="address-line1"
      />
      <CustomTextField
        name={form === 'billing' ? 'address_2' : 'shipping_address_2'}
        register={register}
        inputType="text"
        errors={errors}
        placeholder={tMyAccount('address_2')}
        validation={getValidationSchema('address_2', tValidation)}
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
        placeholder={tValidation('apartment/office')}
        validation={getValidationSchema('apartmentNumber', tValidation)}
        setValue={setValue}
        defaultValue={customer?.billing.address_2?.split('/')[1] || ''}
        notRequired={true}
        autocomplete="address-line3"
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
    </>
  );

  return (
    <>
      {!customer && <ConfirmationRegCard register={register} errors={errors} />}
      <StyledFomContainer>
        <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
          {tCheckout('billingFormName')}
        </Title>
        {isCustomerLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <CustomForm maxWidth="850px">
              <StyledFormWrapper>
                <CustomTextField
                  name="first_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('first_name')}
                  validation={getValidationSchema('first_name', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.first_name || ''}
                />
                <CustomTextField
                  name="last_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('last_name')}
                  validation={getValidationSchema('last_name', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.last_name || ''}
                />
                <CustomTextField
                  name="email"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('email')}
                  validation={getValidationSchema('email', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.email || ''}
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
                {isInvoice && (
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
              <StyledFormWrapper>{addressFields('billing')}</StyledFormWrapper>
              <VariationFields>
                {watchedFields.registration && (
                  <StyledFormWrapper>
                    <AnimatedWrapper isVisible={isRegistration}>
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
                    <AnimatedWrapper isVisible={isRegistration}>
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
                    <FormCheckbox
                      name={'terms'}
                      register={register}
                      errors={errors}
                      label={tMyAccount('agreePersonalData')}
                    />
                  </StyledFormWrapper>
                )}
              </VariationFields>
            </CustomForm>
          </>
        )}
      </StyledFomContainer>
      <StyledFomContainer>
        <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
          {tCheckout('shippingFormName')}
        </Title>
        <StyledSingleCheckBoxWrapper>
          <FormCheckbox
            name={'same_address'}
            register={register}
            errors={errors}
            label={tCheckout('shippingDifferentAddress')}
          />
        </StyledSingleCheckBoxWrapper>
        {isDifferentAddress && (
          <CustomForm maxWidth="850px">
            <StyledFormWrapper>{addressFields('shipping')}</StyledFormWrapper>
          </CustomForm>
        )}
      </StyledFomContainer>
      {/* {registrationError && (
        <CustomError
          dangerouslySetInnerHTML={{
            __html: isAuthErrorResponseType(registrationError),
          }}
        ></CustomError>
      )}
      {isSubmitSuccessful && !registrationError && (
        <CustomSuccess>
          {tMyAccount('Your account has been created successfully!')}
        </CustomSuccess>
      )} */}
    </>
  );
};
