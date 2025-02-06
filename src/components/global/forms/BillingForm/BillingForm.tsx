import { FC, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import {
  useFetchCustomerQuery,
  useRegisterCustomerMutation,
} from '@/store/rtk-queries/wooCustomApi';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import {
  CustomForm,
  FlexBox,
  FormWrapperBottom,
  Title,
} from '@/styles/components';
import { validateWooCustomer } from '@/utils/zodValidators/validateWooCustomer';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import { useTranslations } from 'next-intl';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { BillingFormSchema } from '@/types/components/global/forms/billingForm';
import { AnimatedWrapper, StyledFormWrapper, VariationFields } from './style';
import { ConfirmationRegCard } from './ConfirmationRegCard';
import { AddressType } from '@/types/services/wooCustomApi/customer';
import { CircularProgress } from '@mui/material';
import { useAppSelector } from '@/store';

interface BillingFormProps {
  setBillingData: (formData: AddressType) => void;
}

export const BillingForm: FC<BillingFormProps> = ({ setBillingData }) => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tCheckout = useTranslations('Checkout');
  const [customError, setCustomError] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  /** Form settings */
  const formSchema = useMemo(() => BillingFormSchema(false, tValidation), []);

  type BillingFormType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    control,
    resetField,
  } = useForm<BillingFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  /** API
   * Register a new customer
   * Get and validate token
   */
  const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();
  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

  useEffect(() => {
    if (userSlice !== null) {
      fetchUserData();
    }
  }, [userSlice]);

  const fetchCustomerData = () => {
    if (userData?.id) {
      setUserId(userData.id.toString());
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const {
    data: customer,
    isLoading: isCustomerLoading,
    refetch,
  } = useFetchCustomerQuery({ customerId: userId || '' }, { skip: !userId });

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

  const watchedFields = useWatch({ control });

  useEffect(() => {
    setBillingData(watchedFields as AddressType);
  }, [watchedFields]);

  const isInvoice = useWatch({
    control,
    name: 'invoice',
    defaultValue: false,
  });

  const isRegistration = useWatch({
    control,
    name: 'registration',
    defaultValue: false,
  });

  useEffect(() => {
    if (!isInvoice) {
      resetField('company');
      resetField('nip');
    }
  }, [isInvoice]);

  const onSubmit = async (formData: BillingFormType) => {
    setCustomError('');
    if (isRegistration) {
      const reqBody: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        address_1: string;
        address_2: string;
        postcode: string;
        password?: string;
        username: string;
        role: string;
        company?: string;
        nip?: string;
      } = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        address_1: formData.address_1,
        address_2: [formData.address_2, formData.apartmentNumber]
          .filter(Boolean)
          .join('/'),
        postcode: formData.postcode,
        password: formData.password,
        username: formData.email,
        role: 'customer',
      };

      if (isInvoice) {
        reqBody.company = formData.company;
      }

      try {
        /** Register a new customer */
        const resp = await registerCustomerMutation(reqBody);
        if (!resp.data) throw new Error('Invalid customer response.');

        /** Validate type of the response */
        const isResponseValid = await validateWooCustomer(resp.data);
        if (!isResponseValid)
          throw new Error('Customer response data validation failed.');

        /** Fetching auth token */
        const tokenResp = await fetchToken({
          password: formData.password || '',
          username: formData.email,
        });
        if (!tokenResp.data) throw new Error('Auth token getting failed.');

        /** Validate auth token */
        const isTokenValid = await checkToken({});
        if (!isTokenValid) throw new Error('Auth token validation failed.');
      } catch (err) {
        setCustomError(
          'Oops! Something went wrong with the server. Please try again or contact support.'
        );
      } finally {
        reset();
      }
    }
  };

  useEffect(() => {
    if (customer) {
      setValue('country', customer.billing?.country || '');
    }
  }, [customer, setValue]);

  useEffect(() => {
    if (isInvoice) {
      setValue('company', customer?.billing?.company || '');
    }
  }, [isInvoice, customer]);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const personalInfoFields = () => (
    <>
      {(['first_name', 'last_name', 'email', 'phone'] as const).map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={field}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          defaultValue={customer?.billing?.[field] || ''}
          setValue={setValue}
        />
      ))}
    </>
  );

  const invoiceFields = () => (
    <>
      <CustomFormCheckbox
        name={'invoice'}
        register={register}
        errors={errors}
        label={tCheckout('vatInvoice')}
      />
      <AnimatedWrapper isVisible={isInvoice}>
        {isInvoice && (
          <StyledFormWrapper>
            {['company', 'nip'].map(field => (
              <CustomFormInput
                key={field}
                fieldName={tCheckout(field)}
                name={`${field}`}
                register={register}
                errors={errors}
                inputTag="input"
                inputType="text"
                setValue={setValue}
                defaultValue={
                  field === 'company' ? customer?.billing.company || '' : ''
                }
              />
            ))}
          </StyledFormWrapper>
        )}
      </AnimatedWrapper>
    </>
  );

  const addressFields = () => (
    <>
      <CustomCountrySelect
        name={`country`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
        defaultValue={customer?.billing?.country}
      />
      {(
        [
          'city',
          'address_1',
          'address_2',
          'apartmentNumber',
          'postcode',
        ] as const
      ).map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
          setValue={setValue}
          defaultValue={
            field === 'address_2'
              ? customer?.billing.address_2?.split('/')[0] || ''
              : field === 'apartmentNumber'
              ? customer?.billing.address_2?.split('/')[1] || ''
              : customer?.billing?.[field] || ''
          }
        />
      ))}
    </>
  );

  const registrationFields = () => (
    <AnimatedWrapper isVisible={isRegistration}>
      {isRegistration && (
        <>
          <StyledFormWrapper>
            {['password', 'confirmPassword'].map(field => (
              <CustomFormInput
                key={field}
                fieldName={tMyAccount(field)}
                name={field}
                register={register}
                errors={errors}
                inputTag="input"
                inputType={'newpassword'}
                setValue={setValue}
              />
            ))}
          </StyledFormWrapper>
          <CustomFormCheckbox
            name={'terms'}
            register={register}
            errors={errors}
            label={tMyAccount('agreePersonalData')}
          />
        </>
      )}
    </AnimatedWrapper>
  );
  return (
    <>
      <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
        {tCheckout('billingFormName')}
      </Title>
      {isCustomerLoading ? (
        <FlexBox
          justifyContent="center"
          alignItems="center"
          margin="50px 0 0 0 "
        >
          <CircularProgress />
        </FlexBox>
      ) : (
        <>
          {!customer && (
            <ConfirmationRegCard register={register} errors={errors} />
          )}
          <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="850px">
            <StyledFormWrapper>{personalInfoFields()} </StyledFormWrapper>
            <VariationFields>{invoiceFields()} </VariationFields>
            <StyledFormWrapper>{addressFields()} </StyledFormWrapper>
            <VariationFields>{registrationFields()} </VariationFields>
            <FormWrapperBottom>
              {error && customError && (
                <CustomError
                  dangerouslySetInnerHTML={{
                    __html: isAuthErrorResponseType(error || customError),
                  }}
                ></CustomError>
              )}
              {isSubmitSuccessful && !error && customError && (
                <CustomSuccess>
                  {tMyAccount('Your account has been created successfully!')}
                </CustomSuccess>
              )}
            </FormWrapperBottom>
          </CustomForm>
        </>
      )}
    </>
  );
};
