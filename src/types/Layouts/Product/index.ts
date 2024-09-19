import { z } from 'zod';

export const CommonTextPropsSchema = z.object({
    fontSize: z.string().optional(),
    lineHeight: z.string().optional(),
    fontWeight: z.number().optional(),
    mobFontSize: z.string().optional(),
    mobFontWeight: z.number().optional(),
});

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>;