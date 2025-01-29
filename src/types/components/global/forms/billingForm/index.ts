import { z } from 'zod';
import { passwordSchema, phoneNumberValidation, termsSchema } from '../common';

export const BillingFormSchema = (isLoggedIn: boolean, t: any) => {
  const schema = z
    .object({
      first_name: z.string().min(3, t('minChar', { count: 3 })),
      last_name: z.string().min(3, t('minChar', { count: 3 })),
      email: z.string().email(t('emailValidation')),
      phone: phoneNumberValidation(t),
      country: z.string().min(1, t('RequiredField')),
      state: z.string().min(1, t('RequiredField')).optional(),
      city: z.string().min(1, t('RequiredField')),
      address_1: z.string().min(3, t('RequiredField')),
      address_2: z.string().min(1, t('RequiredField')),
      apartmentNumber: z.string().min(1, t('RequiredField')),
      postcode: z.string().min(4, t('minChar', { count: 4 })),
      password: !isLoggedIn ? passwordSchema(t) : z.string().optional(),
      confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
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