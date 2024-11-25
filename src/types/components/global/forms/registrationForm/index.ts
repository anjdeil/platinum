import { z } from 'zod';
import {
  passwordSchema,
  phoneNumberValidation,
  postSchema,
  termsSchema,
} from '../common';

export const RegistrationFormSchema = (isLoggedIn: boolean) => {
  const schema = z.object({
    name: z.string().min(3, 'Required field'),
    lastName: z.string().min(3, 'Required field'),
    email: z.string().email('Please, type valid email'),
    phoneNumber: phoneNumberValidation(
      'Phone number must be numeric and may start with a "+"'
    ),
    country: z.string().min(1, 'Required field'),
    city: z.string().min(1, 'Required field'),
    address1: z.string().min(4, 'Required field'),
    address2: z.string().min(1, 'Required field'),
    apartmentNumber: z.string().min(1, 'Required field'),
    postCode: postSchema,
    password: !isLoggedIn ? passwordSchema : z.string().optional(),
    confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
    terms: termsSchema,
  });

  return schema.refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    }
  );
};
