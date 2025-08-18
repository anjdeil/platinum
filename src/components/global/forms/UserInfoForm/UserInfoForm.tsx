import { useUpdateCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  InfoCard,
  StyledButton,
  Title,
} from '@/styles/components';
import { UserInfoFormSchema } from '@/types/components/global/forms/userInfoForm';
import {
  BillingType,
  WooCustomerReqType,
} from '@/types/services/wooCustomApi/customer';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { countryOptions } from '@/utils/mockdata/countryOptions';
import { readNip } from '@/utils/readNip';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircularProgress } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-international-phone/style.css';
import { z } from 'zod';
import Notification from '../../Notification/Notification';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { FormCheckbox } from '../BillingForm/FormCheckbox';
import { AnimatedWrapper, VariationFields } from '../BillingForm/style';
import { CustomFormInput } from '../CustomFormInput';

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
  const [isNoCustomerData, setIsNoCustomerData] = useState(false);
  const [showWarningNotification, setShowWarningNotification] = useState(false);
  const [showCustomerErrorNotification, setCustomerErrorNotification] =
    useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [updateCustomer, { error, isSuccess, reset }] =
    useUpdateCustomerMutation();

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
    mode: 'onChange',
  });

  const nipValue = useMemo(() => {
    return (
      customer &&
      readNip(customer.billing as BillingType, customer.meta_data || [])
    );
  }, [customer]);

  const invoiceData = useMemo(() => {
    return customer?.billing?.company || nipValue;
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
    if (customer) {
      const isShippingInfo = customerShippingInfo(customer);

      setIsShipping(isShippingInfo);

      setInitialData({
        address_1: customer.billing?.address_1 || '',
        address_1Shipping: customer.shipping?.address_1 || '',
        address_2: customer.billing?.address_2 || '',
        address_2Shipping: customer.shipping?.address_2 || '',
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
        nip: nipValue,
      });
    }
  }, [customer, locale]);

  const onSubmit = async (formData: UserInfoFormType) => {
    if (!customer || !customer.id) {
      console.log('Customer data is not available');
      setIsNoCustomerData(true);
      return;
    }

    const updatedData = {
      address_1: formData.address_1,
      address_1Shipping: formData.address_1Shipping,
      address_2: formData.address_2,
      address_2Shipping: formData.address_2Shipping,
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
        nip: (isInvoice && formData.nip) || '',
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
      // meta_data: [],
      meta_data: [
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
      const response = await updateCustomer({
        id: customer.id,
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

  useEffect(() => {
    if (isNoCustomerData) {
      setCustomerErrorNotification(true);

      const hideTimer = setTimeout(() => {
        setCustomerErrorNotification(false);
        setIsNoCustomerData(false);
        reset();
      }, 5000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [isNoCustomerData]);

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
        noBottom={true}
      />

      {['city', 'address_1', 'address_2', 'postcode'].map(field => (
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
              : tValidation('postCodePlaceholder')
          }
          defaultValue={defaultValues[field] || ''}
          isRequire={true}
          setValue={setValue}
        />
      ))}
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
          defaultValue={nipValue || ''}
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
            <FormWrapper rowgap="20px">
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
            <FormWrapper rowgap="20px">
              {isInvoice && renderInvoiceFields}
            </FormWrapper>
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
            <FormWrapper rowgap="20px">
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
        {isNoCustomerData && showCustomerErrorNotification && (
          <Notification type="warning" marginBottom="0">
            {tForms('customerError')}
          </Notification>
        )}
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
