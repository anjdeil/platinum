import { z } from 'zod';

export const DropdownMenuPropsSchema = z.object({
    isOpen: z.boolean().optional(),
});

export const SortSelectStyledPropsSchema = DropdownMenuPropsSchema.extend({
    width: z.string().optional(),
    maxWidth: z.string().optional(),
    mobFontSize: z.string().optional(),
    fontSize: z.string().optional(),
    isOpen: z.boolean().optional(),
});

const SortSelectPropsSchema = z.object({
    list: z.array(z.string()),
});

export type SortSelectStyledProps = z.infer<typeof SortSelectStyledPropsSchema>;
export type SortSelectProps = z.infer<typeof SortSelectPropsSchema>;
export type DropdownMenuProps = z.infer<typeof DropdownMenuPropsSchema>;