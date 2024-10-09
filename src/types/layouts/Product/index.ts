import { ProductSchema } from '@/types/shop';
import { z } from 'zod';
import { ColumnsPropsSchema } from "@/types/shop/ProductsList";

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

const ProductCardListSkeletonPropsSchema = z.object({
    columns: ColumnsPropsSchema.optional(),
});

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>;
export type ProductCardPropsType = z.infer<typeof ProductCardPropsTypeShema>;
export type ProductCardListSkeletonProps = z.infer<typeof ProductCardListSkeletonPropsSchema>;