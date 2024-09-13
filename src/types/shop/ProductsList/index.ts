import { z } from "zod";
import { ProductSchema } from "../products";

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

export type ProductCardListProps = z.infer<typeof ProductCardListPropsSchema>;
export type ProductCardAdaptiveColumnsProps = z.infer<typeof ProductCardAdaptiveColumns>;