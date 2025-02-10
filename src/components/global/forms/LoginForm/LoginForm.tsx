import { FC, useState } from 'react';

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
import { CustomFormInput } from '../CustomFormInput';
import { ActiveText, BottomWrapper, LoginFormWrapper } from './styles';
import {
  CustomForm,
  FlexBox,
  FormWrapperBottom,
  StyledButton,
  Title,
} from '@/styles/components';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Notification from '../../Notification/Notification';
import { fetchUser } from '@/utils/auth/authService';
import { useAppDispatch } from '@/store';

interface LoginFormProps {
  border?: boolean;
  redirect?: boolean;
  onClose?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  onClose,
  border,
  redirect = true,
}) => {
  const router = useRouter();
  const t = useTranslations('MyAccount');
  const [customError, setCustomError] = useState<string>('');
  const dispatch = useAppDispatch();
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
      if (redirect) {
        router.push('/my-account');
      }

      if (onClose) {
        fetchUser(dispatch);
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (err) {
      if (err instanceof Error) setCustomError(err.message);
    } finally {
      reset();
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="550px">
      <Title as="h3" uppercase>
        {t('log-In')}
      </Title>
      <LoginFormWrapper>
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
      </LoginFormWrapper>
      <FormWrapperBottom>
        <StyledButton
          color={theme.colors.white}
          type="submit"
          disabled={isSubmitting}
        >
          {t('login')}
        </StyledButton>

        <BottomWrapper>
          <ActiveText href="/my-account/reset-password">
            {t('ForgotYourPassword')}
          </ActiveText>
          <FlexBox gap="5px">
            <div> {t('DontHaveAnAccount')}</div>
            <ActiveText href="/my-account/registration">
              {t('SignUpNow')}
            </ActiveText>
          </FlexBox>
        </BottomWrapper>

        {customError && (
          <Notification marginBottom="0" type="warning">
            {t('ErrorLoggedIn')}
          </Notification>
        )}
        {isSubmitSuccessful && !customError && !isLoading && (
          <Notification type="success">
            {t('SuccessfullyLoggedIn')}
          </Notification>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
