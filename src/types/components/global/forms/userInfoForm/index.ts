import { z } from 'zod';
import { phoneNumberValidation } from '../common';

export const UserInfoFormSchema = (isShipping: boolean, t: any) => {
  const schema = z.object({
    first_name: z.string().min(3, t('RequiredField')),
    last_name: z.string().min(3, t('RequiredField')),
    email: z.string().email(t('emailValidation')),
    phone: phoneNumberValidation(t),
    country: z.string().min(1, t('RequiredField')),
    city: z.string().min(1, t('RequiredField')),
    address_1: z.string().min(4, t('RequiredField')),
    address_2: z.string().min(1, t('RequiredField')),
    apartmentNumber: z.string().min(1, t('RequiredField')),
    postcode: z.string().min(5, t('RequiredField')),
    first_nameShipping: isShipping
      ? z.string().min(3, t('RequiredField'))
      : z.string().optional(),
    last_nameShipping: isShipping
      ? z.string().min(3, t('RequiredField'))
      : z.string().optional(),
    phoneShipping: isShipping
      ? phoneNumberValidation(t)
      : z.string().optional(),
    address_1Shipping: isShipping
      ? z.string().min(2, t('RequiredField'))
      : z.string().optional(),
    address_2Shipping: isShipping
      ? z.string().min(1, t('RequiredField'))
      : z.string().optional(),
    postcodeShipping: isShipping
      ? z.string().min(5, t('RequiredField'))
      : z.string().optional(),
    cityShipping: isShipping
      ? z.string().min(1, t('RequiredField'))
      : z.string().optional(),
    countryShipping: isShipping
      ? z.string().min(1, t('RequiredField'))
      : z.string().optional(),
    apartmentNumberShipping: isShipping
      ? z.string().min(1, t('RequiredField'))
      : z.string().optional(),
  });

  return schema;
};
