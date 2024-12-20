import { FC, useState } from 'react';
import { CustomForm, FormWrapperBottom } from '../RegistrationForm/styles';
import {
  LoginFormSchema,
  LoginFormType,
} from '@/types/components/global/forms/LoginForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import { CustomFormInput } from '../CustomFormInput';
import { ActiveText, FormWrapper } from './styles';
import { FlexBox, StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

export const LoginForm: FC = () => {
  const router = useRouter();
  const t = useTranslations('MyAccount');
  const [customError, setCustomError] = useState<string>('');

  /** Form settings */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isLoading },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  /** API
   * Get and validate token
   */
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();

  async function onSubmit(formData: LoginFormType) {
    setCustomError('');

    try {
      /** Fetching auth token */
      const tokenResp = await fetchToken({
        password: formData.password,
        username: formData.email,
      });
      if (!tokenResp.data) throw new Error('Auth token getting failed.');

      /** Validate auth token */
      const isTokenValid = await checkToken({});
      if (!isTokenValid) throw new Error('Auth token validation failed.');
      router.push('/my-account');
    } catch (err) {
      if (err instanceof Error) setCustomError(err.message);
    } finally {
      reset();
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
      <Title as="h3" uppercase>
        {t('log-In')}
      </Title>
      <FormWrapper>
        <CustomFormInput
          fieldName={t('email')}
          name="email"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
        />
        <CustomFormInput
          fieldName={t('password')}
          name="password"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'password'}
        />
      </FormWrapper>
      <FormWrapperBottom>
        <StyledButton
          color={theme.colors.white}
          type="submit"
          disabled={isSubmitting}
        >
          {t('login')}
        </StyledButton>
        <FlexBox justifyContent="space-between">
          <div>Don't have an account?</div>
          <ActiveText href="/my-account/registration">Sign up now!</ActiveText>
        </FlexBox>

        {customError && <CustomError>{customError}</CustomError>}
        {isSubmitSuccessful && !customError && !isLoading && (
          <CustomSuccess>
            Your account has been created successfully!
          </CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
