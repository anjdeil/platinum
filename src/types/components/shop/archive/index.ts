import { CategorySchema } from "@/types/pages/shop";
import { CustomDataProductsStatisticSchema } from "@/types/services";
import { z } from "zod";
import { ProductSchema } from "../product/products";

export const ArchivePropsSchema = z.object({
  products: z.array(ProductSchema),
  pagesCount: z.number(),
  page: z.number(),
  categories: z.array(CategorySchema).optional(),
  categorySeoData: z.any().optional(),
  searchTerm: z.string().optional(),
  statistic: CustomDataProductsStatisticSchema,
  locale: z.string(),
  defaultLocale: z.string().optional(),
});

export type ArchivePropsType = z.infer<typeof ArchivePropsSchema>;
