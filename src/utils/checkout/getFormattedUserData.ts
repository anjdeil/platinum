import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';

export interface ReqData {
  different_address: boolean;
  registration: boolean;
  invoice: boolean;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
  company?: string;
  nip?: string;
  password?: string;
  confirm_password?: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_postcode: string;
  shipping_country: string;
}

export const getFormattedUserData = (billingData: ReqData, locale?: string) => {
  const {
    different_address,
    registration,
    invoice,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    postcode,
    country,
    email,
    phone,
    company,
    nip,
    password,
    confirm_password,
    shipping_first_name,
    shipping_last_name,
    shipping_address_1,
    shipping_address_2,
    shipping_city,
    shipping_postcode,
    shipping_country,
  } = billingData;

  const formattedBillingData: BillingType = {
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    postcode,
    country,
    email,
    // state: city,
    phone,
    company: company || '',
  };

  const formattedMetaData: MetaDataType[] = [
    {
      key: 'nip',
      value: nip || '',
    },
  ];

  const formattedShippingData: ShippingType = {
    first_name: shipping_first_name,
    last_name: shipping_last_name,
    address_1: shipping_address_1,
    address_2: shipping_address_2,
    city: shipping_city,
    postcode: shipping_postcode,
    country: shipping_country,
  };

  let formattedRegistrationData: RegistrationFormType | null = null;

  if (registration && password && confirm_password) {
    formattedRegistrationData = {
      email,
      first_name,
      last_name,
      role: 'customer',
      username: email,
      billing: {
        first_name,
        last_name,
        company,
        address_1,
        address_2,
        city,
        postcode,
        country,
        email,
        phone,
      },
      shipping: {
        first_name: shipping_first_name ? shipping_first_name : first_name,
        last_name: shipping_last_name ? shipping_last_name : last_name,
        company: company || '',
        address_1: shipping_address_1 ? shipping_address_1 : address_1,
        address_2: shipping_address_2 ? shipping_address_2 : address_2,
        city: shipping_city ? shipping_city : city,
        postcode: shipping_postcode ? shipping_postcode : postcode,
        country: shipping_country ? shipping_country : country,
        phone,
      },
      meta_data: [
        {
          key: 'nip',
          value: nip || '',
        },
        {
          key: 'icl_admin_language',
          value: locale || 'pl',
        },
      ],
      password,
    };
  }

  return {
    formattedBillingData,
    formattedShippingData,
    formattedRegistrationData,
    formattedMetaData,
    different_address,
    invoice,
  };
};
