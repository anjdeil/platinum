import { useForm, useWatch } from 'react-hook-form';
import {
  AnimatedWrapper,
  StyledFomContainer,
  StyledFormWrapper,
  VariationFields,
} from './style';
import { CustomForm, Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { ConfirmationRegCard } from './ConfirmationRegCard';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { FC, useEffect } from 'react';
import CustomTextField from '../CustomTextField/CustomTextField';
import { useGetCustomerData } from '@/hooks/useGetCustomerData';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { AddressType } from '@/types/services/wooCustomApi/customer';

interface BillingFormProps {
  setBillingData: (formData: AddressType) => void;
}

export const NewBillingForm: FC<BillingFormProps> = ({ setBillingData }) => {
  const { customer, isCustomerLoading } = useGetCustomerData();
  const tValidation = useTranslations('Validation');
  const tCheckout = useTranslations('Checkout');
  const tMyAccount = useTranslations('MyAccount');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
    watch,
    trigger,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (customer) {
      setValue('country', customer.billing?.country || '');
      setValue('first_name', customer.billing?.first_name || '');
      setValue('last_name', customer.billing?.last_name || '');
      setValue('email', customer.billing?.email || '');
      setValue('phone', customer.billing?.phone || '');
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

  const password = watch('password');

  const watchedFields = useWatch({ control });

  useEffect(() => {
    if (password) {
      trigger('confirm_password');
    }
  }, [password, trigger]);

  useEffect(() => {
    console.log('1', watchedFields, errors);
    if (isValid) {
      console.log('2', watchedFields);
      setBillingData(watchedFields as AddressType);
    }
  }, [watchedFields, isValid]);

  interface LoginData {
    email: string;
    password: string;
  }

  const login = (data: LoginData): void => {
    event.preventDefault();
    console.log(data);
  };
  // const login = async data => {
  //   let { email, password } = data;
  //   email = email.trim();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (error) {
  //   }
  //   reset();
  // };
  // if (user) {
  //   <Navigate to="/" replace />;
  // }

  const isRegistration = useWatch({
    control,
    name: 'registration',
    defaultValue: false,
  });

  const handlePhoneChange = (value: string) => {
    console.log('Телефон изменился:', value);
  };

  const handlePhoneBlur = (value: string) => {
    console.log('Телефон потерял фокус:', value);
  };

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
            <CustomForm onSubmit={handleSubmit(login)} maxWidth="850px">
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
                <CustomTextField
                  isPhone={true}
                  name="phone"
                  register={register}
                  inputType="text"
                  autocomplete="tel"
                  errors={errors}
                  placeholder={tMyAccount('phone')}
                  validation={getValidationSchema('phone', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.phone || ''}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                />
              </StyledFormWrapper>
              <VariationFields>
                <CustomFormCheckbox
                  name={'invoice'}
                  register={register}
                  errors={errors}
                  label={tCheckout('vatInvoice')}
                />
                {watchedFields.invoice && (
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
              <StyledFormWrapper>
                <CustomCountrySelect
                  name={`country`}
                  control={control}
                  options={countryOptions}
                  label={tMyAccount('country')}
                  errors={errors}
                  defaultValue={customer?.billing?.country || 'PL'}
                  noPaddings={true}
                />
                <CustomTextField
                  name="city"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('city')}
                  validation={getValidationSchema('city', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.city || ''}
                />
                <CustomTextField
                  name="address_1"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('address_1')}
                  validation={getValidationSchema('address_1', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.address_1 || ''}
                />
                <CustomTextField
                  name="address_2"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('address_2')}
                  validation={getValidationSchema('address_2', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.address_2 || ''}
                />
                <CustomTextField
                  name="apartmentNumber"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('apartmentNumber')}
                  validation={getValidationSchema(
                    'apartmentNumber',
                    tValidation
                  )}
                  setValue={setValue}
                  defaultValue={
                    customer?.billing.address_2?.split('/')[1] || ''
                  }
                />
                <CustomTextField
                  name="postcode"
                  register={register}
                  inputType="text"
                  errors={errors}
                  placeholder={tMyAccount('postcode')}
                  validation={getValidationSchema('postcode', tValidation)}
                  setValue={setValue}
                  defaultValue={customer?.billing?.postcode || ''}
                />
              </StyledFormWrapper>
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
                    <CustomFormCheckbox
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
    </>
  );
};
