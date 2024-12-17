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
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import {
  ChangeShippingFormSchema,
  ChangeShippingFormType,
} from '@/types/components/global/forms/changeShippingForm';

interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export const ChangeShippingForm: FC<Props> = ({ defaultCustomerData }) => {
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
  } = useForm<ChangeShippingFormType>({
    resolver: zodResolver(ChangeShippingFormSchema),
    defaultValues: {
      name: customerInfo.shipping?.first_name || '',
      lastName: customerInfo.shipping?.last_name || '',
      company: customerInfo.shipping?.company || '',
      country: customerInfo.shipping?.country || '',
      city: customerInfo.shipping?.city || '',
      address1: customerInfo.shipping?.address_1 || '',
      address2: customerInfo.shipping?.address_2 || '',
      postCode: customerInfo.shipping?.postcode || '',
    },
  });

  async function onSubmit(formData: ChangeShippingFormType) {
    setCustomError('');
    const reqBody = {
      shipping: {
        first_name: formData.name,
        last_name: formData.lastName,
        company: formData.company,
        address_1: formData.address1,
        address_2: formData.address2,
        city: formData.city,
        postcode: formData.postCode,
        country: formData.country,
      },
    };

    try {
      /** Update customer info */
      const resp = await updateCustomerMutation(reqBody);
      if (!resp.data) throw new Error('Invalid customer response.');
      setCustomerInfo(resp.data);
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
          fieldName="Company"
          name="company"
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
            The shipping information has been successfully updated.
          </CustomSuccess>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
