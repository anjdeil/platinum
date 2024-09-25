import { z } from 'zod';

export const SortSelectPropsSchema = z.object({
    isOpen: z.boolean().optional(),
});

export const SortSelectStyledPropsSchema = SortSelectPropsSchema.extend({
    width: z.string().optional(),
    maxWidth: z.string().optional(),
    height: z.string().optional(),
    mobFontSize: z.string().optional(),
    fontSize: z.string().optional(),
});

export type SortSelectStyledProps = z.infer<typeof SortSelectStyledPropsSchema>;
export type SortSelectProps = z.infer<typeof SortSelectPropsSchema>;