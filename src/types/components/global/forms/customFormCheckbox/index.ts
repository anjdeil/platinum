import { ChangeEventHandler } from 'react';
import { z } from 'zod';

export const CustomFormCheckboxSchema = z.object({
  label: z.string().optional(),
  name: z.string(),
  register: z.any(),
  errors: z.any(),
  validation: z.any().optional(),
  noTop: z.boolean().optional(),
  defaultValue: z.boolean().optional(),
  checked: z.boolean().optional(),
  onChange: z.custom<ChangeEventHandler<HTMLInputElement>>().optional(),
});

export type CustomFormCheckboxType = z.infer<typeof CustomFormCheckboxSchema>;
