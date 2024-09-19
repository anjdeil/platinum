import { z } from "zod";
import { ProductSchema } from "../products";

const StyledProductCardListPropsSchema = z.object({
    column: z.number(),
    gap: z.string().optional(),
    mobGap: z.string().optional(),
});

export const ProductCardAdaptiveColumns = z.object({
    mobile: z.number().optional(),
    tablet: z.number().optional(),
    desktop: z.number().optional(),
})

export const ProductCardListPropsSchema = z.object({
    isLoading: z.boolean().optional(),
    isError: z.boolean().optional(),
    products: z.array(ProductSchema),
    columns: ProductCardAdaptiveColumns.optional(),
});

export type StyledProductCardListProps = z.infer<typeof StyledProductCardListPropsSchema>;
export type ProductCardListProps = z.infer<typeof ProductCardListPropsSchema>;
export type ProductCardAdaptiveColumnsProps = z.infer<typeof ProductCardAdaptiveColumns>;