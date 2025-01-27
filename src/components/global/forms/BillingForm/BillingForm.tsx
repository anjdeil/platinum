import { FC, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import { useRegisterCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import { useRouter } from 'next/router';
import { RegistrationFormSchema } from '@/types/components/global/forms/registrationForm';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  StyledButton,
  Title,
} from '@/styles/components';
import theme from '@/styles/theme';
import { validateWooCustomer } from '@/utils/zodValidators/validateWooCustomer';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import { useTranslations } from 'next-intl';
import { ActiveText } from '../LoginForm/styles';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { BillingFormSchema } from '@/types/components/global/forms/billingForm';
import { ConfirmationRegCard } from './ConfirmationRegCard';

// const PROOF_OPTIONS_KEY = ['vatInvoice', 'receipt'];

export const BillingForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tCheckout = useTranslations('Checkout');
  const router = useRouter();
  const [customError, setCustomError] = useState<string>('');
  // const [isRegister, setIsRegister] = useState<boolean>(false);
  // const [isInvoice, setIsInvoice] = useState<boolean>(false);

  /** Form settings */
  const formSchema = useMemo(() => BillingFormSchema(false, tValidation), []);

  type BillingFormType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
    control,
  } = useForm<BillingFormType>({
    resolver: zodResolver(formSchema),
  });

  /** API
   * Register a new customer
   * Get and validate token
   */
  const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();

  async function onSubmit(formData: BillingFormType) {
    setCustomError('');
    const reqBody = {
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
      router.push('/my-account');
    } catch (err) {
      setCustomError(
        'Oops! Something went wrong with the server. Please try again or contact support.'
      );
    } finally {
      reset();
    }
  }

  const renderFormFields = () => (
    <>
      {['first_name', 'last_name', 'email', 'phone'].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          setValue={setValue}
        />
      ))}
      <CustomFormCheckbox
        name={'invoice'}
        register={register}
        errors={errors}
        label={tMyAccount('agreePersonalData')}
      />
      <CustomCountrySelect
        name={`country`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
      />
      {['city', 'address_1', 'address_2', 'apartmentNumber', 'postcode'].map(
        field => (
          <CustomFormInput
            key={field}
            fieldName={tMyAccount(field)}
            name={`${field}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'postCode' ? 'number' : 'text'}
            setValue={setValue}
          />
        )
      )}
      {/* <CustomCheckboxLabel>
        <CustomCheckboxStyled
          name={proof}
          onClick={prev => setIsRegister(!prev)}
        />
        {label}
      </CustomCheckboxLabel> */}

      {form &&
        ['password', 'confirmPassword'].map(field => (
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
    </>
  );

  return (
    <>
      <ConfirmationRegCard name="registration" setIsRegister={setIsRegister} />
      <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="850px">
        <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
          {tCheckout('billingFormName')}
        </Title>
        <FormWrapper>{renderFormFields()} </FormWrapper>
        {isRegister && (
          <CustomFormCheckbox
            name={'terms'}
            register={register}
            errors={errors}
            label={tMyAccount('agreePersonalData')}
          />
        )}
        <FormWrapperBottom>
          <StyledButton
            color={theme.colors.white}
            type="submit"
            disabled={isSubmitting}
          >
            {tMyAccount('register')}
          </StyledButton>
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
        <FlexBox gap="10px" justifyContent="flex-end" margin="16px 0 0 0">
          <div>{tMyAccount('AlreadyHaveAnAccount')} </div>
          <ActiveText href="/my-account/login">
            {tMyAccount('log-In')}!
          </ActiveText>
        </FlexBox>
      </CustomForm>
    </>
  );
};
