import { ProductCardAdaptiveColumns } from "@/types/shop/ProductsList";
import { z } from "zod";

const SkeletonWrapperPropsSchema = z.object({
    column: z.number(),
});

const ProductCardListSkeletonPropsSchema = z.object({
    columns: ProductCardAdaptiveColumns.optional(),
});

export type ProductCardListSkeletonProps = z.infer<typeof ProductCardListSkeletonPropsSchema>;
export type SkeletonWrapperProps = z.infer<typeof SkeletonWrapperPropsSchema>;