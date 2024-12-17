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

export const ChangeFormSchema = z.object({
  name: nameValidation,
  lastName: nameValidation,
  email: optionalEmailValidation('Please provide a valid email if entered'),
  phoneNumber: optionalPhoneNumberValidation(
    'Phone number must be numeric and may start with a "+"'
  ),
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

export type ChangeFormType = z.infer<typeof ChangeFormSchema>;
