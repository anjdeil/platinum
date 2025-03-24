import { FC, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-international-phone/style.css';
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
import { useLocale, useTranslations } from 'next-intl';
import Notification from '../../Notification/Notification';
import { CustomFormInput } from '../CustomFormInput';
import { useUpdateCustomerInfoMutation } from '@/store/rtk-queries/wooCustomAuthApi';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { getMetaDataValue } from '@/utils/myAcc/getMetaDataValue';
import { FormCheckbox } from '../BillingForm/FormCheckbox';
import { AnimatedWrapper, VariationFields } from '../BillingForm/style';

const customerShippingInfo = (customer: WooCustomerReqType) => {
  if (!customer) {
    return false;
  }
  const isShippingEmpty =
    !customer.shipping?.first_name &&
    !customer.shipping?.last_name &&
    !customer.shipping?.city &&
    !customer.shipping?.address_1;

  return !isShippingEmpty;
};

interface UserInfoFormProps {
  defaultCustomerData: WooCustomerReqType;
}

export const UserInfoForm: FC<UserInfoFormProps> = ({
  defaultCustomerData: initialCustomer,
}) => {
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');
  const tForms = useTranslations('Forms');
  const locale = useLocale();

  const [customer, setCustomer] = useState<WooCustomerReqType>(initialCustomer);
  const [initialData, setInitialData] = useState<any>(null);
  const [isShipping, setIsShipping] = useState<boolean>(false);
  const [isInvoice, setIsInvoice] = useState<boolean>(false);
  const [isDataUnchanged, setIsDataUnchanged] = useState(false);
  const [showWarningNotification, setShowWarningNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [UpdateCustomerMutation, { error, isSuccess, reset }] =
    useUpdateCustomerInfoMutation();

  const formSchema = useMemo(
    () => UserInfoFormSchema(isShipping, tValidation, isInvoice),
    [isShipping, isInvoice, locale]
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

  const apartmentNumberFromMeta = useMemo(() => {
    return customer
      ? getMetaDataValue(customer.meta_data || [], 'apartmentNumber')
      : '';
  }, [customer]);

  const shippingApartmentNumberFromMeta = useMemo(() => {
    return customer
      ? getMetaDataValue(customer.meta_data || [], 'shipping_apartmentNumber')
      : '';
  }, [customer]);

  const nipFromMeta = useMemo(() => {
    return customer ? getMetaDataValue(customer.meta_data || [], 'nip') : '';
  }, [customer]);

  const invoiceData = useMemo(() => {
    return customer?.billing?.company || nipFromMeta;
  }, [customer]);

  useEffect(() => {
    setIsInvoice(!!invoiceData);
  }, [invoiceData]);

  useEffect(() => {
    if (!isInvoice) {
      setValue('company', '');
      setValue('nip', '');
    }
  }, [isInvoice]);

  useEffect(() => {
    if (!isShipping) {
      setValue('first_nameShipping', '');
      setValue('last_nameShipping', '');
      setValue('phoneShipping', '');
      setValue('countryShipping', '');
      setValue('cityShipping', '');
      setValue('address_1Shipping', '');
      setValue('address_2Shipping', '');
      setValue('postcodeShipping', '');
      setValue('apartmentNumberShipping', '');
    }
  }, [isShipping]);

  const isShippingInfo = customerShippingInfo(customer);

  useEffect(() => {
    setIsShipping(isShippingInfo);
  }, [isShippingInfo]);

  useEffect(() => {
    if (customer) {
      setValue('country', customer.billing?.country || '');
      setValue('countryShipping', customer.shipping?.country || '');
    }
  }, [customer]);

  useEffect(() => {
    setValue('apartmentNumberShipping', shippingApartmentNumberFromMeta);
  }, [shippingApartmentNumberFromMeta]);

  useEffect(() => {
    if (customer) {
      const isShippingInfo = customerShippingInfo(customer);

      setIsShipping(isShippingInfo);

      setInitialData({
        address_1: customer.billing?.address_1 || '',
        address_1Shipping: customer.shipping?.address_1 || '',
        address_2: customer.billing?.address_2 || '',
        address_2Shipping: customer.shipping?.address_2 || '',
        apartmentNumber: apartmentNumberFromMeta || '',
        apartmentNumberShipping: shippingApartmentNumberFromMeta,
        city: customer.billing?.city || '',
        cityShipping: customer.shipping?.city || '',
        country: customer.billing?.country || '',
        countryShipping: customer.shipping?.country || '',
        email: customer.email || '',
        first_name: customer.first_name || '',
        first_nameShipping: customer.shipping?.first_name || '',
        invoice: isInvoice,
        last_name: customer.last_name || '',
        last_nameShipping: customer.shipping?.last_name || '',
        // newsletter: false,
        phone: customer.billing?.phone || '',
        phoneShipping: customer.shipping?.phone || '',
        postcode: customer.billing?.postcode || '',
        postcodeShipping: customer.shipping?.postcode || '',
        shippingAddress: isShippingInfo,
        company: customer.billing?.company || '',
        nip: nipFromMeta,
      });
    }
  }, [customer, locale]);

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer) {
      console.error('Customer data is not available');
      return;
    }

    const updatedData = {
      address_1: formData.address_1,
      address_1Shipping: formData.address_1Shipping,
      address_2: formData.address_2,
      address_2Shipping: formData.address_2Shipping,
      apartmentNumber: formData.apartmentNumber,
      apartmentNumberShipping: formData.apartmentNumberShipping,
      city: formData.city,
      cityShipping: formData.cityShipping,
      country: formData.country,
      countryShipping: formData.countryShipping,
      email: formData.email,
      first_name: formData.first_name,
      first_nameShipping: formData.first_nameShipping,
      invoice: formData.invoice,
      last_name: formData.last_name,
      last_nameShipping: formData.last_nameShipping,
      // newsletter: formData.newsletter,
      phone: formData.phone,
      phoneShipping: formData.phoneShipping,
      postcode: formData.postcode,
      postcodeShipping: formData.postcodeShipping,
      shippingAddress: formData.shippingAddress,
      company: formData.company,
      nip: formData.nip,
    };

    const preparedData = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.email,
      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        address_1: formData.address_1,
        address_2: formData.address_2,
        postcode: formData.postcode,
        company: (isInvoice && formData.company) || '',
      },
      shipping: {
        first_name: (isShipping && formData.first_nameShipping) || '',
        last_name: (isShipping && formData.last_nameShipping) || '',
        phone: (isShipping && formData.phoneShipping) || '',
        country: (isShipping && formData.countryShipping) || '',
        city: (isShipping && formData.cityShipping) || '',
        address_1: (isShipping && formData.address_1Shipping) || '',
        address_2: (isShipping && formData.address_2Shipping) || '',
        postcode: (isShipping && formData.postcodeShipping) || '',
      },
      meta_data: [
        {
          key: 'apartmentNumber',
          value: formData.apartmentNumber,
        },
        {
          key: 'shipping_apartmentNumber',
          value: (isShipping && formData.apartmentNumberShipping) || '',
        },
        {
          key: 'nip',
          value: (isInvoice && formData.nip) || '',
        },
      ],
    };

    // Comparing initialData with updatedData
    const hasFormChanges = Object.keys(updatedData || {}).some(key => {
      const initialValue = initialData?.[key as keyof typeof initialData];
      const updatedValue = updatedData[key as keyof typeof updatedData];

      const normalizeValue = (value: any) => {
        if (value === undefined) return '';
        if (typeof value === 'string') {
          return value
            .trim()
            .replace(/\u200B/g, '')
            .replace(/\s+/g, ' ')
            .replace(/^\+48$/, '');
        }
        return value;
      };

      return normalizeValue(initialValue) !== normalizeValue(updatedValue);
    });

    if (!hasFormChanges) {
      setIsDataUnchanged(true);
      return;
    } else {
      setIsDataUnchanged(false);
    }

    try {
      const response = await UpdateCustomerMutation({
        ...preparedData,
      });

      if (response.data) {
        setCustomer(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessNotification(true);

      const hideTimer = setTimeout(() => {
        reset();
        setShowSuccessNotification(false);
        reset();
      }, 5000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isDataUnchanged) {
      setShowWarningNotification(true);

      const hideTimer = setTimeout(() => {
        setShowWarningNotification(false);
        setIsDataUnchanged(false);
        reset();
      }, 5000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [isDataUnchanged]);

  const renderFormShippingFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {prefix === 'Shipping' &&
        ['first_name', 'last_name', 'phone'].map(field => (
          <CustomFormInput
            key={field}
            fieldName={tForms(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'phone' ? 'phone' : 'text'}
            placeholder={
              field === 'first_name'
                ? tValidation('firstNamePlaceholder')
                : field === 'last_name'
                ? tValidation('lastNamePlaceholder')
                : tValidation('phonePlaceholder')
            }
            defaultValue={defaultValues[field] || ''}
            setValue={setValue}
          />
        ))}
      <CustomCountrySelect
        name={`country${prefix}`}
        control={control}
        options={countryOptions}
        label={tForms('country')}
        errors={errors}
        defaultValue={
          prefix === 'Shipping'
            ? customer?.shipping?.country
            : customer?.billing?.country
        }
        placeholder={tValidation('countryPlaceholder')}
      />

      {['city', 'address_1', 'address_2', 'apartmentNumber', 'postcode'].map(
        field => (
          <CustomFormInput
            key={field}
            fieldName={tForms(field)}
            name={`${field}${prefix}`}
            register={register}
            errors={errors}
            inputTag="input"
            inputType={field === 'postCode' ? 'number' : 'text'}
            placeholder={
              field === 'city'
                ? tValidation('cityPlaceholder')
                : field === 'address_1'
                ? tValidation('streetPlaceholder')
                : field === 'address_2'
                ? tValidation('buildingPlaceholder')
                : field === 'apartmentNumber'
                ? tValidation('apartmentPlaceholder')
                : tValidation('postCodePlaceholder')
            }
            defaultValue={
              field === 'apartmentNumber'
                ? prefix === 'Shipping'
                  ? shippingApartmentNumberFromMeta
                  : apartmentNumberFromMeta
                : defaultValues[field] || ''
            }
            isRequire={field === 'apartmentNumber' ? false : true}
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
          fieldName={tForms(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          placeholder={
            field === 'first_name'
              ? tValidation('firstNamePlaceholder')
              : field === 'last_name'
              ? tValidation('lastNamePlaceholder')
              : field === 'email'
              ? tValidation('emailPlaceholder')
              : tValidation('phonePlaceholder')
          }
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

  const renderInvoiceFields = (
    <>
      <AnimatedWrapper isVisible={true}>
        <CustomFormInput
          fieldName={tForms('company')}
          name="company"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
          placeholder={tValidation('companyPlaceholder')}
          defaultValue={customer?.billing?.company || ''}
          setValue={setValue}
        />
      </AnimatedWrapper>
      <AnimatedWrapper isVisible={true}>
        <CustomFormInput
          fieldName={tForms('nip')}
          name="nip"
          register={register}
          errors={errors}
          inputTag="input"
          inputType="text"
          placeholder={tValidation('nipPlaceholder')}
          defaultValue={nipFromMeta || ''}
          setValue={setValue}
        />
      </AnimatedWrapper>
    </>
  );

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="760px" key={locale}>
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          mobFontSize="16px"
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
          <>
            <FormWrapper>
              {renderFormInfoFields('', customer)}
              {renderFormShippingFields('', customer?.billing)}
            </FormWrapper>
            <VariationFields>
              <FormCheckbox
                name={'invoice'}
                register={register}
                errors={errors}
                label={tForms('vatInvoice')}
                checked={isInvoice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsInvoice(e.target.checked)
                }
                noTop
              />
            </VariationFields>
            <FormWrapper>{isInvoice && renderInvoiceFields}</FormWrapper>
          </>
        )}
      </InfoCard>
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          mobFontSize="16px"
          uppercase
          marginBottom="16px"
        >
          {tForms('ShippingInfo')}
        </Title>
        <VariationFields>
          <FormCheckbox
            name={'shippingAddress'}
            register={register}
            errors={errors}
            label={tForms('shippingDifferentAddress')}
            checked={isShipping}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsShipping(e.target.checked)
            }
            noTop
          />
        </VariationFields>
        {customer && isShipping && (
          <AnimatedWrapper isVisible={true}>
            <FormWrapper>
              {renderFormShippingFields('Shipping', customer?.shipping)}
            </FormWrapper>
            {/* <VariationFields>
              <FormCheckbox
                name={'newsletter'}
                register={register}
                errors={errors}
                label={tForms('agreement')}
                noTop
              />
            </VariationFields> */}
          </AnimatedWrapper>
        )}
      </InfoCard>
      <FormWrapperBottom>
        {isDataUnchanged && showWarningNotification && (
          <Notification type="warning" marginBottom="0">
            {tValidation('noChanges')}
          </Notification>
        )}
        <StyledButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? tValidation('saving') : tValidation('saveChanges')}
        </StyledButton>
        {isSuccess && showSuccessNotification && (
          <Notification type="success" marginBottom="0">
            {tMyAccount('successUpdate')}
          </Notification>
        )}
        {error && <div>{isAuthErrorResponseType(error)}</div>}
      </FormWrapperBottom>
    </CustomForm>
  );
};
