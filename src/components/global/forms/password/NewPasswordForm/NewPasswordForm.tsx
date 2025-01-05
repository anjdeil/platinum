import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../../CustomFormInput';
import { StyledButton, Title } from '@/styles/components';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
} from '../../RegistrationForm/styles';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import Notification from '../../../Notification/Notification';
import { NewPasswordFormSchema } from '@/types/components/global/forms/changePassword';
import { useSetPasswordMutation } from '@/store/rtk-queries/passwordResetApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import { CustomSuccess } from '../../CustomFormInput/styles';

export const NewPasswordForm: FC = () => {
  const [customError, setCustomError] = useState<string>('');
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector(state => state.userSlice.user?.email);

  const [setPassword, { error, isLoading, isSuccess }] =
    useSetPasswordMutation();

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
      router.push('/my-account/login');
    } catch (err) {
      setCustomError(tMyAccount('passwordChangeError'));
      reset();
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
      <Title as="h1" uppercase marginBottom="24px">
        {tMyAccount('setNewPassword')}
      </Title>
      <Notification>
        {tMyAccount('codeSentToEmail', { email: userEmail })}
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
          <Notification type="warning">{customError}</Notification>
        )}
        {isSubmitSuccessful && isSuccess && (
          <CustomSuccess>{tValidation('passwordChanged')}</CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
