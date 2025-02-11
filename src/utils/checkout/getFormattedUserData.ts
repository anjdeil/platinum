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
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_postcode: string;
  shipping_country: string;
}

export interface RegistrationType {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  terms: boolean;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  apartmentNumber: string;
}

export const getFormattedUserData = (billingData: ReqData) => {
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
    state: city,
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
    first_name: first_name,
    last_name: last_name,
    address_1: shipping_address_1,
    address_2: shipping_address_2,
    city: shipping_city,
    postcode: shipping_postcode,
    country: shipping_country,
  };

  let formattedRegistrationData: RegistrationType | null = null;

  if (registration && password && confirm_password) {
    formattedRegistrationData = {
      phone,
      email,
      first_name,
      last_name,
      address_1: address_1,
      address_2: address_2,
      city: city,
      postcode: postcode,
      country: country,
      terms: registration,
      password: password,
      confirmPassword: confirm_password,
      apartmentNumber: address_2 || '',
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
