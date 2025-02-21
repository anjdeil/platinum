import { z } from 'zod';
import { passwordSchema, phoneNumberValidation, termsSchema } from '../common';

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
      apartmentNumber: z.string().min(1, t('RequiredField')),
      postcode: z.string().min(4, t('minChar', { count: 4 })),
      password: !isLoggedIn ? passwordSchema(t) : z.string().optional(),
      confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
      terms: termsSchema(t),
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
