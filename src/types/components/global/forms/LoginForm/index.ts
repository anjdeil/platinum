import { z } from 'zod';

export const LoginFormSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t('emailValidation')),
    password: z.string(),
  });

export type LoginFormType = z.infer<ReturnType<typeof LoginFormSchema>>;
