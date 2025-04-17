import { FC, useEffect, useState } from 'react';

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
import {
  ActiveText,
  BottomWrapper,
  LoginFormWrapper,
  StyledCheckboxWrapper,
} from './styles';
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
import { CustomFormCheckbox } from '../CustomFormCheckbox';

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
  const tValidation = useTranslations('Validation');
  const [customError, setCustomError] = useState<string>('');
  const [customSuccess, setcustomSuccess] = useState<boolean>(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  /** Form settings */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isLoading },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema(tValidation)),
  });

  /** API
   * Get and validate token
   */
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();

  async function onSubmit(formData: LoginFormType) {
    setCustomError('');

    try {
      const tokenResp = await fetchToken({
        password: formData.password,
        username: formData.email,
        rememberMe: formData.rememberMe,
      });

      if (!tokenResp.data) throw new Error('Auth token getting failed.');

      const isTokenValid = await checkToken(formData.rememberMe);

      if (!isTokenValid) throw new Error('Auth token validation failed.');

      if (redirect) {
        router.push(`/${router.locale}/my-account`);
      }

      setcustomSuccess(true);
      if (onClose) {
        fetchUser(dispatch);
        const id = setTimeout(() => {
          onClose();
        }, 500);
        setTimeoutId(id);
      }
    } catch (err) {
      if (err instanceof Error) setCustomError(err.message);
    } finally {
      reset();
      const id = setTimeout(() => {
        setcustomSuccess(false);
      }, 1000);
      setTimeoutId(id);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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
      <StyledCheckboxWrapper>
        <CustomFormCheckbox
          label={t('rememberMe')}
          name="rememberMe"
          register={register}
          errors={errors}
        />
      </StyledCheckboxWrapper>

      <FormWrapperBottom>
        <StyledButton
          color={theme.colors.white}
          type="submit"
          disabled={isSubmitting}
        >
          {t('loggingIn')}
        </StyledButton>

        <BottomWrapper>
          <ActiveText href={`/${router.locale}/my-account/reset-password`}>
            {t('ForgotYourPassword')}
          </ActiveText>
          <FlexBox gap="10px" flexWrap="wrap">
            <div> {t('DontHaveAnAccount')}</div>
            <ActiveText href={`/${router.locale}/my-account/registration`}>
              {t('SignUpNow')}
            </ActiveText>
          </FlexBox>
        </BottomWrapper>

        {customError && (
          <Notification marginBottom="0" type="warning">
            {t('ErrorLoggedIn')}
          </Notification>
        )}
        {isSubmitSuccessful && !customError && !isLoading && customSuccess && (
          <Notification type="success">
            {t('SuccessfullyLoggedIn')}
          </Notification>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
