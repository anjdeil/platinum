import { z } from 'zod';

export const CustomFormInputSchema = z.object({
  fieldName: z.string().optional(),
  inputTag: z.union([z.literal('input'), z.literal('textarea')]),
  inputType: z.union([
    z.literal('text'),
    z.literal('password'),
    z.literal('number'),
    z.literal('phone'),
  ]),
  name: z.string().optional(),
  register: z.any().optional(),
  errors: z.any().optional(),
  isRequire: z.boolean().optional(),
  placeholder: z.string().optional(),
  initialValue: z.string().nullable().optional(),
});

export type CustomFormInputType = z.infer<typeof CustomFormInputSchema>;
