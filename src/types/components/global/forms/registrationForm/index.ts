import { z } from 'zod';
import {
  passwordSchema,
  phoneNumberValidation,
  postSchema,
  termsSchema,
} from '../common';

export const RegistrationFormSchema = (isLoggedIn: boolean, t: any) => {
  const schema = z.object({
    name: z.string().min(3, t('RequiredField')),
    lastName: z.string().min(3, t('RequiredField')),
    email: z.string().email(t('emailValidation')),
    phoneNumber: phoneNumberValidation(t),
    country: z.string().min(1, t('RequiredField')),
    city: z.string().min(1, t('RequiredField')),
    address_1: z.string().min(4, t('RequiredField')),
    address_2: z.string().min(1, t('RequiredField')),
    apartmentNumber: z.string().min(1, t('RequiredField')),
    postcode: postSchema(t),
    password: !isLoggedIn ? passwordSchema(t) : z.string().optional(),
    confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
    terms: termsSchema(t),
  });

  return schema.refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    }
  );
};
