import { z } from 'zod';
import { ProductSchema } from '../products';

export const CommonTextPropsSchema = z.object({
    fontSize: z.string().optional(),
    lineHeight: z.string().optional(),
    fontWeight: z.number().optional(),
    mobFontSize: z.string().optional(),
    mobLineHeight: z.string().optional(),
    mobFontWeight: z.number().optional(),
});

export const ProductCardPropsTypeShema = z.object({
    product: ProductSchema,
});

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>;
export type ProductCardPropsType = z.infer<typeof ProductCardPropsTypeShema>;