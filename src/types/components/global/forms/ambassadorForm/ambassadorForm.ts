import { parsePhoneNumber } from 'awesome-phonenumber'
import { z } from 'zod'

const termsSchema = z.boolean().refine((value) => value === true, {
  message: 'You must agree to the terms',
})

const phoneSchema = z.string().refine((value) => parsePhoneNumber(value).valid, {
  message: 'Invalid phone number',
})

export const AmbassadorFormSchema = z.object({
  firstName: z.string().min(2, 'Required field'),
  lastName: z.string().min(2, 'Required field'),
  email: z.string().email('Please, type valid email'),
  phoneNumber: phoneSchema,
  country: z.string().min(1, 'Required field'),
  city: z.string().min(1, 'Required field'),
  about: z.string().min(40, 'Required field'),
  file:
    typeof window !== 'undefined'
      ? z.instanceof(File).optional()
      : z.unknown().optional(),
})

export const AmbassadorFormValidationSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t('email')),
    firstName: z.string().min(2, t('minChar', { count: 2 })),
    lastName: z.string().min(2, t('minChar', { count: 2 })),
    phoneNumber: phoneSchema,
    country: z.string().min(1, t('RequiredField')),
    city: z.string().min(1, t('RequiredField')),
    about: z.string().min(40, t('minChar', { count: 40 })),
    file:
      typeof window !== 'undefined'
        ? z.instanceof(File).optional()
        : z.unknown().optional(),
  })

export type AmbassadorFormType = z.infer<typeof AmbassadorFormSchema>
