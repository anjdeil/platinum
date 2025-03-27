import { z } from 'zod';
import { passwordSchema, termsSchema } from '../common';

export const minLengthValidation = (t: any, minLength: number) =>
  z.string().min(minLength, t('minChar', { count: minLength }));

export const requiredFieldValidation = (t: any) =>
  z.string().min(1, t('RequiredField'));

export const emailValidation = (t: any) =>
  z.string().email(t('emailValidation'));

export const BillingFormSchema = (isLoggedIn: boolean, t: any) => {
  const schema = z
    .object({
      first_name: minLengthValidation(t, 3),
      last_name: minLengthValidation(t, 3),
      email: emailValidation(t),
      phone: minLengthValidation(t, 7),
      country: requiredFieldValidation(t),
      state: requiredFieldValidation(t).optional(),
      city: requiredFieldValidation(t),
      address_1: minLengthValidation(t, 3),
      address_2: requiredFieldValidation(t),
      apartmentNumber: requiredFieldValidation(t),
      postcode: minLengthValidation(t, 3),
      password: !isLoggedIn ? passwordSchema(t) : z.string().min(0),
      confirmPassword: !isLoggedIn ? passwordSchema(t) : z.string().min(0),
      terms: termsSchema(t),
      invoice: z.boolean().optional(),
      registration: z.boolean().optional(),
      company: z.string().optional(),
      nip: z.string().optional(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  return schema;
};

export type BillingFormType = z.infer<ReturnType<typeof BillingFormSchema>>;