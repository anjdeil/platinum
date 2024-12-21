import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import { StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
} from '../RegistrationForm/styles';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import {
  ChangeShippingFormSchema,
  ChangeShippingFormType,
} from '@/types/components/global/forms/changeShippingForm';

export const ChangePasswordForm: FC = () => {
  const [customError, setCustomError] = useState<string>('');

  /** API
   * Update customer info
   */
  const [updateCustomerMutation, { error }] = useUpdateCustomerInfoMutation();

  /**
   * Form settings
   * Add default values
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ChangeShippingFormType>({
    resolver: zodResolver(ChangeShippingFormSchema),
  });

  async function onSubmit(formData: ChangeShippingFormType) {
    setCustomError('');
    const reqBody = {};

    try {
      /** Update customer info */
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
        User information
      </Title>
      <FormWrapper>
        <CustomFormInput
          fieldName="Hasło"
          name="password"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'password'}
        />
        <CustomFormInput
          fieldName="Powtórz hasło"
          name="confirmPassword"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'password'}
        />
      </FormWrapper>
      <FormWrapperBottom>
        <StyledButton
          backgroundColor={theme.background.main}
          hoverBackgroundColor={theme.background.hover}
          color={theme.colors.white}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wait...' : ' Save changes'}
        </StyledButton>
        {error && customError && (
          <CustomError
            dangerouslySetInnerHTML={{
              __html: error,
            }}
          ></CustomError>
        )}
        {isSubmitSuccessful && !error && !customError && (
          <CustomSuccess>
            The shipping information has been successfully updated.
          </CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
