import { FC, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
import { CustomFormCheckboxStyled } from './styles';
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  InfoCard,
  StyledButton,
} from '@/styles/components';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { UserInfoFormSchema } from '@/types/components/global/forms/userInfoForm';
import { Title } from '@/styles/components';
import { CircularProgress } from '@mui/material';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { useTranslations } from 'next-intl';
import Notification from '../../Notification/Notification';
import { CustomFormInput } from '../CustomFormInput';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { getMetaDataValue } from '@/utils/myAcc/getMetaDataValue';

interface UserInfoFormProps {
  defaultCustomerData: WooCustomerReqType;
}

export const UserInfoForm: FC<UserInfoFormProps> = ({
  defaultCustomerData: customer,
}) => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tForms = useTranslations('Forms');
  const [initialData, setInitialData] = useState<any>(null);
  const [isShipping, setIsShipping] = useState(true);
  const [isDataUnchanged, setIsDataUnchanged] = useState(false);

  const [UpdateCustomerMutation, { error, isSuccess }] =
    useUpdateCustomerInfoMutation();

  const formSchema = useMemo(
    () => UserInfoFormSchema(isShipping, tValidation),
    [isShipping]
  );
  type UserInfoFormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<UserInfoFormType>({
    resolver: zodResolver(formSchema),
  });

  const handleShippingCheckboxChange = () => {
    setIsShipping(prev => !prev);
  };

  const apartmentNumberFromMeta = customer
    ? getMetaDataValue(customer.meta_data || [], 'apartmentNumber')
    : '';

  const shippingApartmentNumberFromMeta = customer
    ? getMetaDataValue(customer.meta_data || [], 'shipping_apartmentNumber')
    : '';

  useEffect(() => {
    if (customer) {
      const isShippingEmpty =
        !customer.shipping?.first_name &&
        !customer.shipping?.last_name &&
        !customer.shipping?.address_1;

      setIsShipping(!isShippingEmpty);

      setInitialData({
        email: customer.email || '',
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        username: customer.email || '',
        billing: {
          first_name: customer.billing?.first_name || '',
          last_name: customer.billing?.last_name || '',
          address_1: customer.billing?.address_1 || '',
          address_2: customer.billing?.address_2 || '',
          city: customer.billing?.city || '',
          postcode: customer.billing?.postcode || '',
          country: customer.billing?.country || '',
          email: customer.email || '',
          phone: customer.billing?.phone || '',
        },
        shipping: isShipping
          ? {
              first_name: customer.shipping?.first_name || '',
              last_name: customer.shipping?.last_name || '',
              phone: customer.shipping?.phone || '',
              address_1: customer.shipping?.address_1 || '',
              address_2: customer.shipping?.address_2 || '',
              city: customer.shipping?.city || '',
              postcode: customer.shipping?.postcode || '',
              country: customer.shipping?.country || '',
            }
          : {
              first_name: '',
              last_name: '',
              phone: '',
              address_1: '',
              address_2: '',
              city: '',
              postcode: '',
              country: '',
            },
        apartmentNumber: apartmentNumberFromMeta,
        apartmentNumberShipping: shippingApartmentNumberFromMeta,
      });
    }
  }, [customer]);

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer) {
      console.error('Customer data is not available');
      return;
    }

    const updatedData = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.email,
      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_1: formData.address_1,
        address_2: formData.address_2,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: isShipping
        ? {
            first_name:
              (isShipping && formData.first_nameShipping) ||
              formData.first_name,
            last_name:
              (isShipping && formData.last_nameShipping) || formData.last_name,
            phone:
              (isShipping && formData.phoneShipping) || formData.phoneShipping,
            address_1:
              (isShipping && formData.address_1Shipping) || formData.address_1,
            address_2:
              (isShipping && formData.address_2Shipping) || formData.address_2,
            city: (isShipping && formData.cityShipping) || formData.city,
            postcode:
              (isShipping && formData.postcodeShipping) || formData.postcode,
            country:
              (isShipping && formData.countryShipping) || formData.country,
          }
        : {
            first_name: '',
            last_name: '',
            phone: '',
            address_1: '',
            address_2: '',
            city: '',
            postcode: '',
            country: '',
          },
      meta_data: [
        {
          key: 'apartmentNumber',
          value: formData.apartmentNumber,
        },
        {
          key: 'shipping_apartmentNumber',
          value: formData.apartmentNumberShipping,
        },
      ],
    };

    // Comparing initialData with updatedData
    const hasFormChanges = Object.keys(updatedData || {}).some(key => {
      const initialValue = initialData?.[key as keyof typeof initialData];
      const updatedValue = updatedData[key as keyof typeof updatedData];

      const normalizeString = (str: string | undefined) => {
        if (str === undefined) {
          return '';
        }
        return str
          .trim()
          .replace(/\u200B/g, '')
          .replace(/\s+/g, ' ');
      };

      if (
        normalizeString(JSON.stringify(initialValue)) !==
        normalizeString(JSON.stringify(updatedValue))
      ) {
        return true;
      }

      return false;
    });

    if (!hasFormChanges) {
      setIsDataUnchanged(true);
      return;
    } else {
      setIsDataUnchanged(false);
    }
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

      {['city', 'address_1', 'address_2', 'apartmentNumber', 'postcode'].map(
        field => (
          <CustomFormInput
            key={field}
            fieldName={tMyAccount(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'postCode' ? 'number' : 'text'}
            defaultValue={
              field === 'apartmentNumber'
                ? prefix === 'Shipping'
                  ? shippingApartmentNumberFromMeta
                  : apartmentNumberFromMeta
                : defaultValues[field] || ''
            }
            setValue={setValue}
          />
        )
      )}
    </>
  );

  const renderFormInfoFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {['first_name', 'last_name', 'email', 'phone'].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          defaultValue={
            field === 'phone'
              ? customer?.billing?.phone
              : defaultValues[field] || ''
          }
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
          {tForms('UserInfo')}
        </Title>
        {!customer ? (
          <FlexBox justifyContent="center" margin="40px 0">
            <CircularProgress />
          </FlexBox>
        ) : (
          <FormWrapper>
            {renderFormInfoFields('', customer)}
            {renderFormShippingFields('', customer?.billing)}
          </FormWrapper>
        )}
      </InfoCard>
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
        <FlexBox alignItems="center" margin="0 0 16px 0">
          <CustomFormCheckboxStyled
            checked={!isShipping}
            type="checkbox"
            onChange={() => handleShippingCheckboxChange()}
          />
          {tValidation('theSameAddress')}
        </FlexBox>
        {customer && isShipping && (
          <FormWrapper>
            {renderFormShippingFields('Shipping', customer?.shipping)}
          </FormWrapper>
        )}
      </InfoCard>
      <FormWrapperBottom>
        {isDataUnchanged && (
          <Notification type="info">{tValidation('noChanges')}</Notification>
        )}
        <StyledButton type="submit" disabled={isSubmitting}>
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
