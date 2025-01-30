import { useEffect, useState } from 'react';
import { AddressType } from '@/types/services/wooCustomApi/customer';

const requiredFields = [
  'first_name',
  'last_name',
  'address_1',
  'address_2',
  'city',
  'postcode',
  'country',
  'email',
  'phone',
  'apartmentNumber',
];

const isBillingDataReady = (billingData: AddressType | undefined): boolean => {
  if (!billingData) return false;

  for (const field of requiredFields) {
    if (
      !billingData[field as keyof AddressType] ||
      billingData[field as keyof AddressType] === ''
    ) {
      return false;
    }
  }
  return true;
};

const useBillingDataReady = (billingData: AddressType | undefined) => {
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    setIsDataReady(isBillingDataReady(billingData));
  }, [billingData]);

  return isDataReady;
};

export default useBillingDataReady;
