import { z } from 'zod';
import { phoneNumberValidation } from '../common';
import { cityRegex, nameRegex } from '@/utils/validation';

export const AmbassadorFormValidationSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t('email')),
    first_name: z
      .string()
      .nonempty(t('RequiredField'))
      .min(2, t('minChar', { count: 2 }))
      .max(50, t('maxChar', { count: 50 }))
      .regex(nameRegex, t('nameRegex')),
    last_name: z
      .string()
      .nonempty(t('RequiredField'))
      .min(2, t('minChar', { count: 2 }))
      .max(50, t('maxChar', { count: 50 }))
      .regex(nameRegex, t('nameRegex')),
    phone: phoneNumberValidation(t),
    country: z.string().min(1, t('RequiredField')),
    city: z
      .string()
      .nonempty('City is required')
      .min(2, t('minChar', { count: 2 }))
      .max(50, t('maxChar', { count: 50 }))
      .regex(cityRegex, t('cityRegex')),
    about: z
      .string()
      .min(3, t('minChar', { count: 3 }))
      .max(500, t('maxChar', { count: 600 })),
    file:
      typeof window !== 'undefined'
        ? z.instanceof(File).optional()
        : z.unknown().optional(),
  });

export type AmbassadorFormType = z.infer<
  ReturnType<typeof AmbassadorFormValidationSchema>
>;
