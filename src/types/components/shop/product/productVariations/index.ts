import { string, z } from 'zod';

export const VariationsButtonPropsSchema = z.object({
    active: z.boolean().optional(),
    color: z.string().optional(),
});

export const ColorVariationsPropsSchema = z.object({
    list: z.array(string()),
    currentVariation: z.string().optional(),
    onChange: z.function().args(string()).returns(z.void()),
})

export const ProductVariationsPropsSchema = z.object({
    title: z.string(),
    ...ColorVariationsPropsSchema.shape,
})

export type VariationsButtonProps = z.infer<typeof VariationsButtonPropsSchema>;
export type ColorVariationsProps = z.infer<typeof ColorVariationsPropsSchema>;
export type ProductVariationsProps = z.infer<typeof ProductVariationsPropsSchema>;