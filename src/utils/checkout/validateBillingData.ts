import { AddressType } from '@/types/services/wooCustomApi/customer';

export default function validateBillingData(billingInfo: AddressType): {
  isValid: boolean;
  messageKeys: string[];
} {
  const result = {
    isValid: true,
    messageKeys: [] as string[],
  };
  console.log(billingInfo, 'validation');

  if (!billingInfo) {
    result.isValid = false;
    result.messageKeys.push('noBillingInformation');
  }

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

  for (const field of requiredFields) {
    if (
      !billingInfo[field as keyof AddressType] ||
      billingInfo[field as keyof AddressType] === ''
    ) {
      result.isValid = false;
      result.messageKeys.push(field);
    }
  }

  return result;
}
