import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import { StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import {
  ChangeFormSchema,
  ChangeFormType,
} from '@/types/components/global/forms/changeInfoForm';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError, CustomSuccess } from '../CustomFormInput/styles';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
} from '../RegistrationForm/styles';

interface Props {
  defaultCustomerData: WooCustomerReqType;
  onUserUpdate: (newUserData: WooCustomerReqType) => void;
}

export const ChangeInfoForm: FC<Props> = ({
  defaultCustomerData,
  onUserUpdate,
}) => {
  const [customError, setCustomError] = useState<string>('');
  const [customerInfo, setCustomerInfo] =
    useState<WooCustomerReqType>(defaultCustomerData);

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
  } = useForm<ChangeFormType>({
    resolver: zodResolver(ChangeFormSchema),
    defaultValues: {
      name: customerInfo.first_name || '',
      lastName: customerInfo.last_name || '',
      email: customerInfo.email || '',
      phoneNumber: customerInfo.billing?.phone || '',
      country: customerInfo.billing?.country || '',
      city: customerInfo.billing?.city || '',
      address1: customerInfo.billing?.address_1 || '',
      address2: customerInfo.billing?.address_2 || '',
      postCode: customerInfo.billing?.postcode || '',
    },
  });

  async function onSubmit(formData: ChangeFormType) {
    setCustomError('');
    const reqBody = {
      email: formData.email,
      first_name: formData.name,
      last_name: formData.lastName,
      username: formData.email,
      billing: {
        first_name: formData.name,
        last_name: formData.lastName,
        address_1: formData.address1,
        address_2: formData.address2,
        city: formData.city,
        postcode: formData.postCode,
        country: formData.country,
        email: formData.email,
        phone: formData.phoneNumber,
      },
    };

    try {
      /** Update customer info */
      const resp = await updateCustomerMutation(reqBody);
      if (!resp.data) throw new Error('Invalid customer response.');
      setCustomerInfo(resp.data);
      onUserUpdate(resp.data);
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
          fieldName="Imię"
          name="name"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Nazwisko"
          name="lastName"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Adres e-mail"
          name="email"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="phone number"
          name="phoneNumber"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Kraj / region"
          name="country"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Miasto"
          name="city"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Ulica"
          name="address1"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Building number"
          name="address2"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'number'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="№ apartment/office"
          name="apartmentNumber"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'number'}
          isRequire={false}
        />
        <CustomFormInput
          fieldName="Kod pocztowy"
          name="postCode"
          register={register}
          errors={errors}
          inputTag={'input'}
          inputType={'text'}
          isRequire={false}
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
            The customer's information has been successfully updated.
          </CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
