import { useSubscribeMutation } from '@/store/rtk-queries/mailsterApi';
import { useRegisterCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import {
  FlexBox,
  FormWrapperBottom,
  StyledButton,
  Title,
} from '@/styles/components';
import theme from '@/styles/theme';
import { RegistrationFormSchema } from '@/types/components/global/forms/registrationForm';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { validateWooCustomer } from '@/utils/zodValidators/validateWooCustomer';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-international-phone/style.css';
import { z } from 'zod';
import Notification from '../../Notification/Notification';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { FormCheckbox } from '../BillingForm/FormCheckbox';
import { FormCheckboxUnControlled } from '../BillingForm/FormCheckboxUnControlled';
import { VariationFields } from '../BillingForm/style';
import { CustomError } from '../CustomFormInput/styles';
import CustomTextField from '../CustomTextField/CustomTextField';
import { ActiveText } from '../LoginForm/styles';
import { CustomForm, StyledFieldsWrapper } from './styles';

export const RegistrationForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tCheckout = useTranslations('Checkout');
  const router = useRouter();
  const locale = useLocale();

  const [customError, setCustomError] = useState<string>('');

  const validationSchema = useMemo(() => {
    return (name: string, watch?: any) =>
      getValidationSchema(name, tValidation, watch);
  }, [locale]);

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
    setValue,
    control,
    watch,
    clearErrors,
  } = useForm<RegistrationFormType>({
    mode: 'onChange',
  });

  useEffect(() => {
    clearErrors();
  }, [locale]);

  /** API
   * Register a new customer
   * Get and validate token
   */
  const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();
  const [subscribe, { isSuccess: isSubscribed, error: subscribeError }] =
    useSubscribeMutation();

  async function onSubmit(formData: RegistrationFormType) {
    setCustomError('');
    const reqBody = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      role: 'customer',
      username: formData.email,
      password: formData.password,

      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_1: formData.address_1,
        address_2: formData.address_2,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      meta_data: [
        {
          key: 'icl_admin_language',
          value: locale,
        },
      ],
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
        rememberMe: true,
      });
      if (!tokenResp.data) throw new Error('Auth token getting failed.');

      /** Validate auth token */
      const isTokenValid = await checkToken(true);
      if (!isTokenValid) throw new Error('Auth token validation failed.');

      // Subscribe to the newsletter
      const { subscription, email } = formData;

      if (isTokenValid && subscription) {
        try {
          await subscribe({ email, lang: locale });
        } catch (error) {
          console.error('Error subscribing:', error);
        }
      }

      router.push(`/${router.locale}/my-account`);
    } catch (err) {
      setCustomError(
        'Oops! Something went wrong with the server. Please try again or contact support.'
      );
    }
  }

  const renderFormFields = () => (
    <>
      <CustomTextField
        name="first_name"
        register={register}
        inputType="text"
        errors={errors}
        label={tCheckout('first_name')}
        placeholder={tValidation('firstNamePlaceholder')}
        validation={validationSchema('first_name')}
        setValue={setValue}
        defaultValue={''}
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
        defaultValue={''}
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
        defaultValue={''}
        autocomplete="email"
      />
      <CustomTextField
        isPhone={true}
        isReg={true}
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
        defaultValue={''}
      />
      <CustomCountrySelect
        name="country"
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
        defaultValue={'PL'}
        noPaddings={true}
      />
      <CustomTextField
        name="city"
        register={register}
        inputType="text"
        errors={errors}
        label={tMyAccount('city')}
        placeholder={tValidation('cityPlaceholder')}
        validation={validationSchema('city')}
        setValue={setValue}
        defaultValue={''}
        autocomplete="address-level2"
      />
      <CustomTextField
        name="address_1"
        register={register}
        inputType="text"
        errors={errors}
        label={tMyAccount('address_1')}
        placeholder={tValidation('streetPlaceholder')}
        validation={validationSchema('street_building')}
        setValue={setValue}
        defaultValue={''}
        autocomplete="address-line1"
      />
      <CustomTextField
        name="address_2"
        register={register}
        inputType="text"
        errors={errors}
        label={tCheckout('address_2')}
        placeholder={tValidation('buildingPlaceholder')}
        validation={validationSchema('apartmentNumberRequired')}
        setValue={setValue}
        defaultValue={''}
        autocomplete="address-line2"
      />
      <CustomTextField
        name="postcode"
        register={register}
        inputType="text"
        errors={errors}
        label={tCheckout('postcode')}
        placeholder={tValidation('postCodePlaceholder')}
        validation={validationSchema('postcode')}
        setValue={setValue}
        defaultValue={''}
        autocomplete="postal-code"
      />
    </>
  );

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="850px">
      <Title as={'h2'} uppercase={true} marginBottom={'24px'}>
        {tMyAccount('registration')}
      </Title>
      <StyledFieldsWrapper>{renderFormFields()} </StyledFieldsWrapper>
      <StyledFieldsWrapper>
        <CustomTextField
          name="password"
          register={register}
          inputType="password"
          autocomplete="new-password"
          errors={errors}
          label={tMyAccount('password')}
          placeholder={tValidation('passwordPlaceholder')}
          validation={validationSchema('password')}
          setValue={setValue}
        />
        <CustomTextField
          name="confirm_password"
          register={register}
          inputType="password"
          autocomplete="off"
          errors={errors}
          label={tMyAccount('confirmPassword')}
          placeholder={tValidation('confirmPasswordPlaceholder')}
          validation={validationSchema('confirm_password', watch)}
          setValue={setValue}
        />
      </StyledFieldsWrapper>
      <FormCheckboxUnControlled
        name={'terms'}
        register={register}
        errors={errors}
        label={tMyAccount('agreePersonalData')}
        validation={validationSchema('terms')}
      />
      <VariationFields>
        <FormCheckbox
          name={'subscription'}
          register={register}
          errors={errors}
          label={tValidation('agreentment')}
        />
      </VariationFields>
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
        {isSubmitSuccessful && !error && !customError && (
          <Notification type="success">
            {tMyAccount('YourAccountHasBeenCreated')}
          </Notification>
        )}
        {isSubscribed && (
          <Notification type="success">
            {tMyAccount('subscriptionSuccess')}
          </Notification>
        )}
        {subscribeError && (
          <Notification type="info">
            {tMyAccount('subscriptionError')}
          </Notification>
        )}
      </FormWrapperBottom>
      <FlexBox gap="10px" justifyContent="flex-end" margin="16px 0 0 0">
        <div>{tMyAccount('AlreadyHaveAnAccount')} </div>
        <ActiveText href={`/${locale}/my-account/login`}>
          {tMyAccount('log-In')}!
        </ActiveText>
      </FlexBox>
    </CustomForm>
  );
};
