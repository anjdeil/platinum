import { FC, useState } from 'react';
import { CustomForm, FormWrapperBottom } from '../RegistrationForm/styles';
import {
  LoginFormSchema,
  LoginFormType,
} from '@/types/components/global/forms/loginForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import { CustomFormInput } from '../CustomFormInput';
import { FormWrapper } from './styles';
import { StyledButton } from '@/styles/components';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';

export const LoginForm: FC = () => {
  const router = useRouter();
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
      <FormWrapper>
        <CustomFormInput
          fieldName="Adres e-mail"
          name="email"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
        />
        <CustomFormInput
          fieldName="Hasło"
          name="password"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'password'}
        />
      </FormWrapper>
      <FormWrapperBottom>
        <StyledButton
          backgroundColor={theme.background.hover}
          color={theme.colors.white}
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </StyledButton>
        <StyledButton
          backgroundColor={'transparent'}
          color={theme.colors.black}
          disabled={isSubmitting}
          onSubmit={() => {
            router.push('/my-account');
          }}
        >
          Register
        </StyledButton>
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
