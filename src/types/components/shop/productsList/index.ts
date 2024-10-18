import { z } from "zod";
import { ProductSchema } from "../product/products";

export const ColumnsPropsSchema = z.object({
    mobileColumns: z.number().optional(),
    tabletColumns: z.number().optional(),
    desktopColumns: z.number().optional(),
})

const StyledProductCardListPropsSchema = z.object({
    ...ColumnsPropsSchema.shape,
    gap: z.string().optional(),
    mobGap: z.string().optional(),
});

export const ProductCardListPropsSchema = z.object({
    isLoading: z.boolean().optional(),
    isError: z.boolean().optional(),
    products: z.array(ProductSchema),
    columns: ColumnsPropsSchema.optional(),
});

const ProductCardListSkeletonPropsSchema = z.object({
    columns: ColumnsPropsSchema.optional(),
});

export type ProductCardListSkeletonProps = z.infer<typeof ProductCardListSkeletonPropsSchema>;
export type ColumnsProps = z.infer<typeof ColumnsPropsSchema>;
export type StyledProductCardListProps = z.infer<typeof StyledProductCardListPropsSchema>;
export type ProductCardListProps = z.infer<typeof ProductCardListPropsSchema>;