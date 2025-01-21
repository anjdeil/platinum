import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../../CustomFormInput';
import { CustomSuccess } from '../../CustomFormInput/styles';
import { FlexBox, StyledButton, Title } from '@/styles/components';
import { CustomForm, FormWrapperBottom } from '../../RegistrationForm/styles';
import { useTranslations } from 'next-intl';
import { useResetPasswordMutation } from '@/store/rtk-queries/passwordResetApi';
import { useRouter } from 'next/router';
import { ResetPasswordFormSchema } from '@/types/components/global/forms/changePassword';
import Notification from '../../../Notification/Notification';
import { z } from 'zod';
import {
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from '@/utils/auth/userLocalStorage';

const ResetPasswordForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const router = useRouter();

  const [resetPassword, { error, isLoading, isSuccess }] =
    useResetPasswordMutation();

  const formSchema = useMemo(
    () => ResetPasswordFormSchema(tValidation),
    [tValidation]
  );
  type ResetPasswordFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/my-account/new-password');
    }
  }, [isSuccess, router]);

  const onSubmit = async (formData: ResetPasswordFormType) => {
    try {
      const response = await resetPassword({ email: formData.email });
      if (!response) throw new Error('Invalid server response.');
      removeUserFromLocalStorage();
      saveUserToLocalStorage({ email: formData.email });
    } catch (err) {
      console.error(err);

      reset();
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
      <Title as="h1" uppercase marginBottom="24px">
        {tMyAccount('resetPassword')}
      </Title>
      <FlexBox margin="0 0 24px 0">
        <CustomFormInput
          fieldName={tMyAccount('email')}
          name="email"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
        />
      </FlexBox>
      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading
            ? tValidation('sending')
            : tValidation('sendButton')}
        </StyledButton>
        {error && (
          <Notification type="warning">
            {tMyAccount('codeSendError')}
          </Notification>
        )}
        {isSubmitSuccessful && isSuccess && !error && (
          <CustomSuccess>{tMyAccount('codeSent')}</CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};

export default ResetPasswordForm;
