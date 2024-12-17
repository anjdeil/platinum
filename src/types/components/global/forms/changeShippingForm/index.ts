import { z } from 'zod';
import {
  addressValidation,
  nameValidation,
  optionalEmailValidation,
  optionalNumericStringMinLength,
  optionalPhoneNumberValidation,
  postSchemaOptional,
  shortRequiredField,
} from '../common';

export const ChangeShippingFormSchema = z.object({
  name: nameValidation,
  lastName: nameValidation,
  company: nameValidation,
  country: shortRequiredField,
  city: shortRequiredField,
  address1: addressValidation,
  address2: optionalNumericStringMinLength(
    2,
    'Building number must be at least 2 digits long'
  ),
  apartmentNumber: optionalNumericStringMinLength(
    2,
    'Apartment number must be at least 2 digits long'
  ),
  postCode: postSchemaOptional,
});

export type ChangeShippingFormType = z.infer<typeof ChangeShippingFormSchema>;
