import { string, z } from 'zod';
import { ProductAttributesSchema } from '../products';

export const VariationsButtonPropsSchema = z.object({
    active: z.boolean().optional(),
    color: z.string().optional(),
});

export const ColorVariationsPropsSchema = z.object({
    attr: ProductAttributesSchema,
    currentVariation: z.string().optional(),
    onChange: z.function().args(string(), string()).returns(z.void()),
})

export type VariationsButtonProps = z.infer<typeof VariationsButtonPropsSchema>;
export type ColorVariationsProps = z.infer<typeof ColorVariationsPropsSchema>;