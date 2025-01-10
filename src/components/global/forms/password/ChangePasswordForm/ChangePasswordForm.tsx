import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../../CustomFormInput';
import { CustomSuccess } from '../../CustomFormInput/styles';
import { StyledButton, Title } from '@/styles/components';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
} from '../../RegistrationForm/styles';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import { z } from 'zod';

import { useTranslations } from 'next-intl';
import Notification from '../../../Notification/Notification';
import { ChangePasswordFormSchema } from '@/types/components/global/forms/changePassword';

//
//changing the password for an authorized user (!!on pause, the desired endpoint is missing!!)
//

export const ChangePasswordForm: FC = () => {
  const [customError, setCustomError] = useState<string>('');
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');

  const [updateCustomerMutation, { error }] = useUpdateCustomerInfoMutation();

  const formSchema = useMemo(() => ChangePasswordFormSchema(tValidation), []);

  type ChangePasswordFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(formData: ChangePasswordFormType) {
    setCustomError('');
    const reqBody = {
      password: 'new_password',
    };

    try {
      const resp = await updateCustomerMutation(reqBody);
      if (!resp.data) throw new Error('Invalid customer response.');
    } catch (err) {
      setCustomError(
        'Oops! Something went wrong with the server. Please try again or contact support.'
      );
      reset();
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
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
          <Notification type="warning">
            {tMyAccount('passwordChangeError')}
          </Notification>
        )}
        {isSubmitSuccessful && !error && !customError && (
          <CustomSuccess>{tMyAccount('passwordChanged')}</CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
