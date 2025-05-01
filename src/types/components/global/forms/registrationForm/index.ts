import { z } from 'zod';
import { passwordSchema, phoneNumberValidation, termsSchema } from '../common';
import {
  apartmentRegex,
  cityRegex,
  emailRegex,
  nameRegex,
  phoneRegex,
  postcodeRegex,
  streetRegex,
} from '@/utils/validation';

export const RegistrationFormSchema = (isLoggedIn: boolean, t: any) => {
  const schema = z
    .object({
      first_name: z.string().min(3, t('minChar', { count: 3 })),
      last_name: z.string().min(3, t('minChar', { count: 3 })),
      email: z.string().email(t('emailValidation')),
      phone: phoneNumberValidation(t),
      country: z.string().min(1, t('RequiredField')),
      city: z.string().min(1, t('RequiredField')),
      address_1: z.string().min(3, t('RequiredField')),
      address_2: z.string().min(1, t('RequiredField')),
      postcode: z.string().min(3, t('minChar', { count: 3 })),
      password: !isLoggedIn ? passwordSchema(t) : z.string().optional(),
      confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
      terms: termsSchema(t),
      subscription: z.boolean().optional(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  return schema;
};

export const RegistrationFormSchema2 = (isLoggedIn: boolean, t: any) => {
  const schema = z
    .object({
      first_name: z
        .string()
        .nonempty(t('pleaseFillInTheFirstName'))
        .min(2, t('yourFirstNameIsTooShort'))
        .max(50, t('yourFirstNameIsTooLong'))
        .regex(nameRegex, t('invalidCharacters')),
      last_name: z
        .string()
        .nonempty(t('pleaseFillInTheLastName'))
        .min(2, t('yourLastNameIsTooShort'))
        .max(50, t('yourLastNameIsTooLong'))
        .regex(nameRegex, t('invalidCharacters')),
      email: z
        .string()
        .nonempty(t('pleaseFillInTheEmail'))
        .email(t('wrongEmailFormat'))
        .max(254, t('cannotExceed254Characters'))
        .regex(emailRegex, t('wrongEmailFormat')),
      phone: z
        .string()
        .nonempty(t('pleaseFillInThePhoneNumber'))
        .min(12, t('yourPhoneNumberIsTooShort'))
        .regex(phoneRegex, t('invalidPhoneNumber')),
      country: z.string().nonempty(t('pleaseSelectACountry')),
      city: z
        .string()
        .nonempty(t('pleaseFillInTheCity'))
        .min(3, t('yourCityNameIsTooShort'))
        .max(100, t('yourCityNameIsTooLong'))
        .regex(cityRegex, t('invalidCharacters')),
      address_1: z
        .string()
        .nonempty(t('pleaseFillInTheStreetBuildingAddress'))
        .min(3, t('yourStreetAddressIsTooShort'))
        .max(150, t('yourStreetAddressIsTooLong'))
        .regex(streetRegex, t('invalidCharacters')),
      address_2: z
        .string()
        .nonempty(t('pleaseFillInTheApartmentNumber'))
        .max(10, t('yourApartmentNumberIsTooLong'))
        .regex(apartmentRegex, t('invalidCharacters')),
      postcode: z
        .string()
        .nonempty(t('pleaseFillInThePostcode'))
        .regex(postcodeRegex, t('invalidPostcodeFormat')),
      password: !isLoggedIn
        ? z
            .string()
            .nonempty(t('pleaseFillInThePassword'))
            .min(8, t('minChar', { count: 8 }))
            .max(25, t('yourPasswordIsTooLong'))
            .refine(value => /[A-Z]/.test(value), t('PasswordCapitalLetter'))
            .refine(value => /[a-z]/.test(value), t('PasswordLowercaseLetter'))
            .refine(value => /[0-9]/.test(value), t('PasswordDigit'))
            .refine(
              value => /[^A-Za-z0-9]/.test(value),
              t('PasswordSpecialChar')
            )
        : z.string().optional(),
      confirmPassword: !isLoggedIn
        ? z.string().nonempty(t('pleaseConfirmYourPassword'))
        : z.string().optional(),
      terms: z.boolean().refine(val => val === true, t('agreentmentTerms')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  return schema;
};

export const CheckoutRegistrationFormSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
  username: z.string().optional(),
  billing: z
    .object({
      first_name: z.string(),
      last_name: z.string(),
      company: z.string().optional(),
      address_1: z.string().optional(),
      address_2: z.string().optional(),
      city: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      email: z.string(),
      phone: z.string(),
    })
    .optional(),
  shipping: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      company: z.string().optional(),
      address_1: z.string().optional(),
      address_2: z.string().optional(),
      city: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  meta_data: z
    .array(
      z.object({
        id: z.number().optional(),
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  terms: z.boolean().optional(),
});

export type RegistrationFormType = z.infer<
  typeof CheckoutRegistrationFormSchema
>;
