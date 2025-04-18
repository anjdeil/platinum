import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../../CustomFormInput';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
  StyledButton,
  Title,
} from '@/styles/components';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import Notification from '../../../Notification/Notification';
import { NewPasswordFormSchema } from '@/types/components/global/forms/changePassword';
import { useSetPasswordMutation } from '@/store/rtk-queries/passwordResetApi';
import { useAppDispatch } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import { CustomSuccess } from '../../CustomFormInput/styles';
import { getUserFromLocalStorage } from '@/utils/auth/userLocalStorage';

const errorsCode = [
  {
    message:
      'The reset code provided is not valid. You have 2 attempts remaining.',
    errorKey: 'resetCodeAttemptsTwo',
  },
  {
    message:
      'The reset code provided is not valid. You have 1 attempt remaining.',
    errorKey: 'resetCodeAttemptsOne',
  },
  {
    message:
      'You must request a password reset code before you try to set a new password.',
    errorKey: 'passwordResetRequired',
  },
  {
    message:
      'The reset code provided is not valid. You have used the maximum number of attempts allowed. You must request a new code',
    errorKey: 'maxAttemptsExceeded',
  },
  {
    message: 'The reset code provided has expired.',
    errorKey: 'codeProvidedHasExpired',
  },
];
export const NewPasswordForm: FC = () => {
  const [customError, setCustomError] = useState<string>('');
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userEmail = getUserFromLocalStorage()?.email;
  const [emailToShow, setEmailToShow] = useState<string | null>(null);
  const [setPassword, { error: PasswordErr, isLoading, isSuccess }] =
    useSetPasswordMutation();

  useEffect(() => {
    if (userEmail) {
      setEmailToShow(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (PasswordErr) {
      const error = errorsCode.find(
        // @ts-expect-error: PasswordErr.data might not have the expected structure
        err => err.message === PasswordErr.data?.message
      );

      if (error) {
        setCustomError(error.errorKey);
      } else {
        setCustomError('unknow');
      }
    }
  }, [PasswordErr]);

  const formSchema = useMemo(
    () => NewPasswordFormSchema(tValidation),
    [tValidation]
  );
  type NewPasswordFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<NewPasswordFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userEmail || '',
    },
  });

  async function onSubmit(formData: NewPasswordFormType) {
    setCustomError('');

    const reqBody = {
      email: formData.email,
      password: formData.password,
      code: formData.code,
    };

    try {
      const resp = await setPassword(reqBody);

      if (!resp.data) throw new Error('Invalid server response.');

      dispatch(clearUser());
      router.push(`/${router.locale}/my-account/login`);
    } catch (err) {
      reset();
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="600px">
      <Title as="h1" uppercase marginBottom="24px">
        {tMyAccount('setNewPassword')}
      </Title>

      <Notification>
        {emailToShow && tMyAccount('codeSentToEmail', { email: userEmail })}
      </Notification>

      <FormWrapper>
        <CustomFormInput
          fieldName={tMyAccount('email')}
          name="email"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
          defaultValue={userEmail || ''}
          disabled
        />
        <CustomFormInput
          fieldName={tMyAccount('code')}
          name="code"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
          autoComplete={false}
        />
        <CustomFormInput
          fieldName={tMyAccount('newpassword')}
          name="password"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="newpassword"
        />
        <CustomFormInput
          fieldName={tMyAccount('confirmPassword')}
          name="confirmPassword"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="newpassword"
        />
      </FormWrapper>
      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading
            ? tValidation('sending')
            : tValidation('sendButton')}
        </StyledButton>
        {customError && (
          <Notification marginBottom="0" type="warning">
            {customError !== 'unknow'
              ? tMyAccount(customError)
              : tMyAccount('passwordChangeError')}
          </Notification>
        )}
        {isSubmitSuccessful && isSuccess && (
          <CustomSuccess>{tValidation('passwordChanged')}</CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
