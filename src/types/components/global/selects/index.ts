import { z } from "zod";

export const SelectOptionsPropsSchema = z.object({
    code: z.string(),
    symbol: z.string(),
});

export const CustomSelectStyledPropsSchema = z.object({
    isOpen: z.boolean().optional(),
    width: z.string().optional(),
    borderRadius: z.string().optional(),
    color: z.string().optional(),
    background: z.string().optional(),
    padding: z.string().optional(),
    fontSize: z.string().optional(),
    mobFontSize: z.string().optional(),
    mobPadding: z.string().optional(),
    tabletPadding: z.string().optional(),
    allignItem: z.string().optional(),
    paddingOptions: z.string().optional(),
});


export const CustomSelectPropsSchema = z.object({
    options: z.array(SelectOptionsPropsSchema),
    value: z.string(),
    onChange: z.function().args(z.any()).returns(z.void()),
    ...CustomSelectStyledPropsSchema.shape,
});

export const SortSelectPropsSchema = z.object({
    isOpen: z.boolean().optional(),
});

export const SortSelectStyledPropsSchema = SortSelectPropsSchema.extend({
    width: z.string().optional(),
    maxWidth: z.string().optional(),
    mobFontSize: z.string().optional(),
    fontSize: z.string().optional(),
});

export type CustomSelectStyledProps = z.infer<typeof CustomSelectStyledPropsSchema>;
export type SelectOptionsProps = z.infer<typeof SelectOptionsPropsSchema>;
export type CustomSelectProps = z.infer<typeof CustomSelectPropsSchema>;

export type SortSelectStyledProps = z.infer<typeof SortSelectStyledPropsSchema>;
export type SortSelectProps = z.infer<typeof SortSelectPropsSchema>;
