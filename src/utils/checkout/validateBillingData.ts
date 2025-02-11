import {
  BillingType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';
import { RegistrationType } from './getFormattedUserData';

export default function validateBillingData(
  billingInfo: BillingType,
  shippingInfo: ShippingType,
  registration: RegistrationType
): {
  isValid: boolean;
  messageKeys: string[];
} {
  const result = {
    isValid: true,
    messageKeys: [] as string[],
  };

  const error = [];

  if (!billingInfo || !shippingInfo) {
    result.isValid = false;
    error.push('noBillingInformation');
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

  if (registration) {
    requiredFields.push('password');
  }

  for (const field of requiredFields) {
    if (
      !billingInfo[field as keyof BillingType] ||
      billingInfo[field as keyof BillingType] === '' ||
      !shippingInfo[field as keyof ShippingType] ||
      shippingInfo[field as keyof ShippingType] === ''
    ) {
      result.isValid = false;
      error.push(field);
    }
  }

  if (
    registration &&
    (!registration.password || registration.password === '')
  ) {
    result.isValid = false;
    error.push('password');
  }

  if (error.length > 0) {
    result.messageKeys.push('noBillingInformation');
  }

  return result;
}
