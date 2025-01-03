import { z } from 'zod';
import { passwordSchema } from '../common';

export const ChangePasswordFormSchema = (t: any) => {
  const schema = z
    .object({
      password: passwordSchema(t),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    });
  return schema;
};
