import { FC, useMemo, useState } from 'react';
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
import { ChangePasswordFormSchema } from '@/types/components/global/forms/changePassword';
import { useChangePasswordMutation } from '@/store/rtk-queries/passwordResetApi';
import useGetAuthToken from '@/hooks/useGetAuthToken';
// import {
//   removeUserFromLocalStorage,
//   saveUserToLocalStorage,
// } from '@/utils/auth/userLocalStorage';

type ChangePasswordFormProps = {
  userId?: number;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ userId }) => {
  const [customError, setCustomError] = useState<string>('');
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');

  const [changePassword, { isSuccess, error }] = useChangePasswordMutation();
  const token = useGetAuthToken();

  const formSchema = useMemo(() => ChangePasswordFormSchema(tValidation), []);

  type ChangePasswordFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(formData: ChangePasswordFormType) {
    if (!userId || !token) {
      setCustomError(tMyAccount('noUserData'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setCustomError(tValidation('passwordsNotMatch'));
      return;
    }

    setCustomError('');

    const reqBody = {
      userId: userId.toString(),
      password: formData.password,
      token: token,
    };

    try {
      await changePassword(reqBody).unwrap();
      // removeUserFromLocalStorage();
      // saveUserToLocalStorage({ email: userEmail });
    } catch (err) {
      setCustomError(tMyAccount('registrationError'));
      reset();
    }
  }

  const showErrorMessage = (error: any) => {
    console.log('Error:', error.status, error.data);

    if (
      error.status === 429 &&
      error.data.message ===
        'You can only change your password once per 5 minutes.'
    ) {
      return tMyAccount('passwordChangeLimit');
    }

    if (
      error.status === 403 &&
      error.data.message === 'You are not allowed to change this password.'
    ) {
      return tMyAccount('passwordChangeForbidden');
    }

    if (
      error.status === 400 &&
      error.data.message === 'Password must be at least 8 characters long.'
    ) {
      return tMyAccount('passwordChangeTooShort');
    }

    return tMyAccount('passwordChangeError');
  };

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="500px">
      <Title as={'h1'} uppercase={true} marginBottom={'24px'}>
        {tMyAccount('changePassword')}
      </Title>
      <FormWrapper>
        <CustomFormInput
          width="100%"
          fieldName={tMyAccount('newpassword')}
          name="password"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'newpassword'}
        />
        <CustomFormInput
          fieldName={tMyAccount('confirmPassword')}
          name="confirmPassword"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'newpassword'}
        />
      </FormWrapper>
      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? tValidation('saving') : tValidation('saveChanges')}
        </StyledButton>
        {error && customError && (
          <Notification type="warning">{showErrorMessage(error)}</Notification>
        )}
        {isSuccess && !error && !customError && (
          <Notification type="success">
            {tMyAccount('passwordChanged')}
          </Notification>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
