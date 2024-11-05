import { z } from "zod";
import { ProductSchema } from "../product/products";
import { CustomDataProductsStatisticSchema } from "@/types/services";
import { CategorySchema } from "../categories/categories";

export const ArchivePropsSchema = z.object({
    products: z.array(ProductSchema),
    pagesCount: z.number(),
    page: z.number(),
    categories: z.array(CategorySchema),
    statistic: CustomDataProductsStatisticSchema,
});

export type ArchivePropsType = z.infer<typeof ArchivePropsSchema>;