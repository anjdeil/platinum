import { ColumnsPropsSchema } from "@/types/shop/ProductsList";
import { z } from "zod";

const ProductCardListSkeletonPropsSchema = z.object({
    columns: ColumnsPropsSchema.optional(),
});

export type ProductCardListSkeletonProps = z.infer<typeof ProductCardListSkeletonPropsSchema>;