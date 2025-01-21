import { z } from 'zod';
import { phoneNumberValidation } from '../common';

export const AmbassadorFormValidationSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t('email')),
    first_name: z.string().min(3, t('RequiredField')),
    last_name: z.string().min(3, t('RequiredField')),
    phone: phoneNumberValidation(t),
    country: z.string().min(1, t('RequiredField')),
    city: z.string().min(1, t('RequiredField')),
    about: z.string().min(40, t('minChar', { count: 40 })),
    file:
      typeof window !== 'undefined'
        ? z.instanceof(File).optional()
        : z.unknown().optional(),
  });

export type AmbassadorFormType = z.infer<
  ReturnType<typeof AmbassadorFormValidationSchema>
>;
