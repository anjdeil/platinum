import { CustomDataProductsStatisticSchema } from "@/types/services";
import { z } from "zod";
import { ProductSchema } from "../product/products";
import { CategorySchema } from "../categories";

export const ArchivePropsSchema = z.object({
    products: z.array(ProductSchema),
    pagesCount: z.number(),
    page: z.number(),
    categories: z.array(CategorySchema),
    statistic: CustomDataProductsStatisticSchema,
    locale: z.string()
});

export type ArchivePropsType = z.infer<typeof ArchivePropsSchema>;