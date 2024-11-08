import { string, z } from "zod";
import { ProductSchema } from "../product/products";
import { CustomDataProductsStatisticSchema } from "@/types/services";
import { CategorySchema } from "../categories/categories";

export const ArchivePropsSchema = z.object({
    products: z.array(ProductSchema),
    pagesCount: z.number(),
    page: z.number(),
    categoriesSlugs: z.array(string()),
    statistic: CustomDataProductsStatisticSchema,
});

export type ArchivePropsType = z.infer<typeof ArchivePropsSchema>;