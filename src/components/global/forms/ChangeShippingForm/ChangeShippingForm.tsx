import { FC, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import {
  CustomForm,
  FormWrapper,
  FormWrapperBottom,
  InfoCard,
  StyledButton,
} from '@/styles/components';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { UserInfoFormSchema } from '@/types/components/global/forms/userInfoForm';
import { Title } from '@/styles/components';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { useTranslations } from 'next-intl';
import Notification from '../../Notification/Notification';
import { CustomFormInput } from '../CustomFormInput';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';

interface ChangeShippingFormProps {
  defaultCustomerData: WooCustomerReqType;
}
const isShipping = true;

export const ChangeShippingForm: FC<ChangeShippingFormProps> = ({
  defaultCustomerData: customer,
}) => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tForms = useTranslations('Forms');

  const [hasChanges, setHasChanges] = useState(false);

  const [UpdateCustomerMutation, { error, isSuccess }] =
    useUpdateCustomerInfoMutation();

  const formSchema = useMemo(
    () => UserInfoFormSchema(isShipping, tValidation),
    [isShipping, tValidation]
  );
  type UserInfoFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<UserInfoFormType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const subscription = watch((values, { type }) => {
      if (type === 'change') {
        setHasChanges(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer) {
      console.error('Customer data is not available');
      return;
    }

    const updatedData = {
      shipping: {
        first_name:
          (isShipping && formData.first_nameShipping) || formData.first_name,
        last_name:
          (isShipping && formData.last_nameShipping) || formData.last_name,
        phone: (isShipping && formData.phoneShipping) || formData.phoneShipping,
        address_1:
          (isShipping && formData.address_1Shipping) || formData.address_1,
        address_2:
          (isShipping && formData.address_2Shipping) || formData.address_2,
        city: (isShipping && formData.cityShipping) || formData.city,
        postcode:
          (isShipping && formData.postcodeShipping) || formData.postcode,
        country: (isShipping && formData.countryShipping) || formData.country,
      },
    };

    try {
      await UpdateCustomerMutation({
        ...updatedData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderFormShippingFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {prefix === 'Shipping' &&
        ['first_name', 'last_name', 'phone'].map(field => (
          <CustomFormInput
            key={field}
            fieldName={tMyAccount(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'phone' ? 'phone' : 'text'}
            defaultValue={defaultValues[field] || ''}
            setValue={setValue}
          />
        ))}
      <CustomCountrySelect
        name={`country${prefix}`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
        defaultValue={
          prefix === 'Shipping'
            ? customer?.shipping?.country
            : customer?.billing?.country
        }
      />

      {['city', 'address_1', 'address_2', 'postcode'].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${field}${prefix}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'postCode' ? 'number' : 'text'}
          defaultValue={defaultValues[field] || ''}
          setValue={setValue}
        />
      ))}
    </>
  );

  useEffect(() => {
    if (customer) {
      setValue('country', customer.billing?.country || '');
      setValue('countryShipping', customer.shipping?.country || '');
    }
  }, [customer, setValue]);

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="760px">
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase
          marginBottom="16px"
        >
          {tForms('ShippingInfo')}
        </Title>

        {customer && (
          <FormWrapper>
            {renderFormShippingFields('Shipping', customer?.shipping)}
          </FormWrapper>
        )}
      </InfoCard>
      <FormWrapperBottom>
        <StyledButton type="submit" disabled={isSubmitting || !hasChanges}>
          {isSubmitting ? tValidation('saving') : tValidation('saveChanges')}
        </StyledButton>
        {error && <div>{isAuthErrorResponseType(error)}</div>}
        {isSuccess && (
          <Notification type="success">
            {tMyAccount('successUpdate')}
          </Notification>
        )}
      </FormWrapperBottom>
    </CustomForm>
  );
};
