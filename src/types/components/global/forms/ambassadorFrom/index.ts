import { z } from 'zod';
import { phoneNumberValidation } from '../common';

export const AmbassadorFormValidationSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t('email')),
    firstName: z.string().min(2, t('minChar', { count: 2 })),
    lastName: z.string().min(2, t('minChar', { count: 2 })),
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
