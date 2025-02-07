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
import { BillingFormSkeleton } from './BillingFormSkeleton';

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

export const BillingForm: FC<BillingFormProps> = ({
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

  const watchedFields = useWatch({ control });

  const {
    registration: newCustomerRegistration,
    invoice,
    different_address,
    password,
    shipping_country,
  } = watchedFields;

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

      setValue('apartmentNumber', billing?.address_2?.split('/')[1] || '');

      if (invoice) {
        console.log('company', billing?.company);
        setValue('company', billing?.company || '');
      }
    }
  }, [customer, invoice]);
  useEffect(() => {
    if (different_address) {
      setValue('shipping_country', 'PL');
      setValue('shipping_city', '');
      setValue('shipping_address_1', '');
      setValue('shipping_address_2', '');
      setValue('shipping_apartmentNumber', '');
      setValue('shipping_postcode', '');
    }
  }, [different_address]);

  useEffect(() => {
    if (!different_address) {
      setValue('shipping_country', watchedFields?.country || 'PL');
      setValue('shipping_city', watchedFields?.city || '');
      setValue('shipping_address_1', watchedFields?.address_1 || '');
      setValue('shipping_address_2', watchedFields?.address_2 || '');
      setValue(
        'shipping_apartmentNumber',
        watchedFields?.apartmentNumber || ''
      );
      setValue('shipping_postcode', watchedFields?.postcode || '');
    }
  }, [
    different_address,
    watchedFields.country,
    watchedFields.city,
    watchedFields.address_1,
    watchedFields.address_2,
    watchedFields.apartmentNumber,
    watchedFields.postcode,
  ]);

  useEffect(() => {
    if (password) {
      trigger('confirm_password');
    }
  }, [password, trigger]);

  useEffect(() => {
    if (shipping_country) {
      setCurrentCountryCode(shipping_country);
    }
  }, [shipping_country]);

  useEffect(() => {
    if (isValidation) {
      trigger().then(isValid => {
        if (isValid) {
          const {
            formattedBillingData,
            formattedShippingData,
            formattedRegistrationData,
            formattedMetaData,
          } = getFormattedUserData(watchedFields as ReqData);
          setFormOrderData({
            billing: formattedBillingData as BillingType,
            shipping: formattedShippingData as ShippingType,
            metaData: formattedMetaData as MetaDataType[],
            registration: newCustomerRegistration
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
          setFormOrderData({
            billing: null,
            shipping: null,
            metaData: null,
            registration: null,
          });
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
      {!customer && !isCustomerLoading && (
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
              <StyledFormWrapper>{addressFields('billing')}</StyledFormWrapper>
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
                      <StyledSingleCheckBoxWrapper>
                        <FormCheckbox
                          name={'terms'}
                          register={register}
                          errors={errors}
                          label={tMyAccount('agreePersonalData')}
                          validation={getValidationSchema('terms', tValidation)}
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
              <StyledFormWrapper>{addressFields('shipping')}</StyledFormWrapper>
            </CustomForm>
          </AnimatedWrapper>
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
