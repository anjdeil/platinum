import { FC, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import { useRegisterCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import { useRouter } from 'next/router';
import { RegistrationFormSchema } from '@/types/components/global/forms/registrationForm';
import { CustomForm, FormWrapper, FormWrapperBottom } from './styles';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import { FlexBox, StyledButton, Title } from '@/styles/components';
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

export const RegistrationForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tForms = useTranslations('Forms');
  const router = useRouter();
  const [customError, setCustomError] = useState<string>('');

  /** Form settings */
  const formSchema = useMemo(
    () => RegistrationFormSchema(false, tValidation),
    []
  );
  type RegistrationFormType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
    control,
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(formSchema),
  });

  /** API
   * Register a new customer
   * Get and validate token
   */
  const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();

  async function onSubmit(formData: RegistrationFormType) {
    setCustomError('');
    const reqBody = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      role: 'customer',

      username: formData.email,
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
      <CustomCountrySelect
        name={`country`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
      />
      {[
        'city',
        'address_1',
        'address_2',
        'apartmentNumber',
        'postcode',
        'password',
        'confirmPassword',
      ].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={
            field === 'postCode'
              ? 'number'
              : field == 'password' || field == 'confirmPassword'
                ? 'newpassword'
                : 'text'
          }
          setValue={setValue}
        />
      ))}
    </>
  );

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
      <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
        {tMyAccount('registration')}
      </Title>
      <FormWrapper>{renderFormFields()} </FormWrapper>
      <CustomFormCheckbox
        name={'terms'}
        register={register}
        errors={errors}
        label={tMyAccount('agreePersonalData')}
      />
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
  );
};
