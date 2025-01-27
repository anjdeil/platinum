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
export const ResetPasswordFormSchema = (t: any) => {
  const schema = z.object({
    email: z.string().email(t('emailValidation')),
  });

  return schema;
};
export const NewPasswordFormSchema = (t: any) => {
  const schema = z
    .object({
      email: z.string().email(t('emailValidation')),
      password: passwordSchema(t),
      confirmPassword: z.string(),
      code: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('PasswordsDoNotMatch'),
      path: ['confirmPassword'],
    });
  return schema;
};
