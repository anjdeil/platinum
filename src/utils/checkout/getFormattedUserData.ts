import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';

export interface ReqData {
  same_address: boolean;
  registration: boolean;
  invoice: boolean;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  apartmentNumber?: string;
  city: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
  company?: string;
  nip?: string;
  password?: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_postcode: string;
  shipping_country: string;
  shipping_apartmentNumber?: string;
}

export interface RegistrationType {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  billing: BillingType;
  shipping: ShippingType;
  password: string;
}

export const getFormattedUserData = (billingData: ReqData) => {
  const {
    same_address,
    registration,
    invoice,
    first_name,
    last_name,
    address_1,
    address_2,
    apartmentNumber,
    city,
    postcode,
    country,
    email,
    phone,
    company,
    nip,
    password,
    shipping_address_1,
    shipping_address_2,
    shipping_city,
    shipping_postcode,
    shipping_country,
    shipping_apartmentNumber,
  } = billingData;

  const formattedBillingData: BillingType = {
    first_name,
    last_name,
    address_1: `${address_1} ${address_2}`,
    address_2: apartmentNumber || '',
    city,
    postcode,
    country,
    state: city,
    phone,
  };

  const formattedMetaData: MetaDataType[] = [
    {
      key: 'company',
      value: company || '',
    },
    {
      key: 'nip',
      value: nip || '',
    },
  ];

  const formattedShippingData: ShippingType = {
    first_name: first_name,
    last_name: last_name,
    address_1: `${shipping_address_1} ${shipping_address_2}`,
    address_2: shipping_apartmentNumber || '',
    city: shipping_city,
    postcode: shipping_postcode,
    country: shipping_country,
  };

  let formattedRegistrationData: RegistrationType | null = null;
  if (registration && password) {
    formattedRegistrationData = {
      email,
      first_name,
      last_name,
      role: 'customer',
      password,
      billing: formattedBillingData,
      shipping: formattedShippingData,
    };
  }

  return {
    formattedBillingData,
    formattedShippingData,
    formattedRegistrationData,
    formattedMetaData,
    same_address,
    invoice,
    registration,
  };
};
