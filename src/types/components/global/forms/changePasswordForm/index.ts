import { z } from 'zod';
import { passwordSchema } from '../common';

export const ChangePasswordFormSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
});
