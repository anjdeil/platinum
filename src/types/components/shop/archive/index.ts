import { CustomDataProductsStatisticSchema } from "@/types/services";
import { z } from "zod";
import { ProductSchema } from "../product/products";

export const ArchivePropsSchema = z.object({
    products: z.array(ProductSchema),
    pagesCount: z.number(),
    page: z.number(),
    statistic: CustomDataProductsStatisticSchema,
});

export type ArchivePropsType = z.infer<typeof ArchivePropsSchema>;