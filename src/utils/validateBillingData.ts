import { AddressType } from '@/types/services/wooCustomApi/customer';

export const validateBillingData = (data: AddressType | undefined): boolean => {
  if (!data) return false;

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
  ];

  let hasNonEmptyField = false;

  for (const field of requiredFields) {
    if (
      data[field as keyof AddressType] !== undefined &&
      data[field as keyof AddressType] !== ''
    ) {
      hasNonEmptyField = true;
    }
  }

  return hasNonEmptyField;
};
