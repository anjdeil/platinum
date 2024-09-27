import { z } from 'zod';

export const InputPropsSchema = z.object({
    name: z.string(),
    type: z.enum(["text", "phone", "password", "description", "search"]).optional(),
    label: z.string().optional(),
    errorText: z.string().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional(),
});

export type InputProps = z.infer<typeof InputPropsSchema>;