import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../../CustomFormInput';
import { CustomError, CustomSuccess } from '../../CustomFormInput/styles';
import { FlexBox, StyledButton, Title } from '@/styles/components';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
} from '../../RegistrationForm/styles';

import { useTranslations } from 'next-intl';
import { useResetPasswordMutation } from '@/store/rtk-queries/passwordResetApi';
import { useRouter } from 'next/router';

import { ResetPasswordFormSchema } from '@/types/components/global/forms/changePassword';
import Notification from '../../../Notification/Notification';
import { z } from 'zod';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/userSlice';

const ResetPasswordForm: FC = () => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [customError, setCustomError] = useState<string | null>(null);
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
    setCustomError(null);
    try {
      const response = await resetPassword({ email: formData.email });
      if (!response) throw new Error('Invalid server response.');
      dispatch(setUser({ email: formData.email }));
    } catch (err) {
      console.error(err);
      setCustomError(tMyAccount('codeSendError'));
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
        {customError && (
          <Notification type="warning">{customError}</Notification>
        )}
        {isSubmitSuccessful && isSuccess && !error && !customError && (
          <CustomSuccess>{tMyAccount('codeSent')}</CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};

export default ResetPasswordForm;
