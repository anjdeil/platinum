import { ProductsMinimizedSchema } from "@/types/components/shop/product/products";
import { WpMenuResponseSchema } from "@/types/menus/WpMenus";
import { ProductReviewSchema } from "@/types/pages/shop/reviews";
import { z } from "zod";
import { CategorySchema, ProductSchema } from "../../pages/shop";
import { AttributeSchema } from "./attributes";
import { menuItemsSchema } from "./menus";
import { ThemeOptionsItemSchema } from "./themeOptions";
import { SectionsTypeSchema } from '@/types/components/sections';
import { BlogItemSchema } from '@/types/pages/blog';
import { Page } from 'react-pdf';

const LangParamSchema = z.enum(['en', 'pl', 'de', 'ru', 'uk']).optional();

const QueryParamsSchema = z
  .object({
    LangParamSchema,
    include: z.array(z.number()).optional(),
    slug: z.string().optional(),
    ids: z.array(z.number()).optional(),
    search: z.string().optional(),
    lang: z.string().optional(),
    page: z.number().min(1).optional(),
    per_page: z.number().min(1).max(100).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    order_by: z.string().optional(),
    status: z
      .enum(['publish', 'future', 'draft', 'pending', 'private'])
      .optional(),
  })
  .partial();

export const CustomDataSchema = z.object({
  statistic: z
    .object({
      products_count: z.number().optional(),
    })
    .optional(),
});

export const PageDataItemsSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  language_code: z.string(),
  created: z.string(),
  modified: z.string(),
  author_id: z.number(),
  menu_order: z.number(),
  sections: z.array(SectionsTypeSchema),
});

export const PageDataFullSchema = z.object({
  success: z.boolean(),
  data: z.object({
    item: PageDataItemsSchema,
  }),
});

export const PageDataSchema = z.object({
  success: z.boolean(),
  data: z.object({
    item: z.array(SectionsTypeSchema),
  }),
});

export const CustomDataMenuResponseSchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    items: z.array(WpMenuResponseSchema),
  }),
});

export const CustomDataProductsStatisticSchema = z.object({
  products_count: z.number(),
  min_price: z.number(),
  max_price: z.number(),
  attributes: z.array(AttributeSchema),
});

export const CustomDataProductsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    statistic: CustomDataProductsStatisticSchema,
    items: z.array(ProductSchema),
  }),
});

export const CustomDataProductSchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    item: ProductSchema,
  }),
});

export const CustomDataProductReviewsSchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    items: z.array(ProductReviewSchema),
  }),
});

export const CustomDataCategoriesSchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    items: z.array(CategorySchema),
  }),
});

export const CustomDataMenusSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      items: z.array(menuItemsSchema),
    })
    .optional(),
});

export const CustomDataThemeOptionsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    item: ThemeOptionsItemSchema,
  }),
});

export const CustomDataProductsMinimizedResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(ProductsMinimizedSchema),
  }),
});

export const CustomDataPostsSchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    items: z.array(BlogItemSchema),
  }),
});

export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;
export type PageDataItemType = z.infer<typeof PageDataItemsSchema>;
export type PageDataFullType = z.infer<typeof PageDataFullSchema>;
export type PageDataType = z.infer<typeof PageDataSchema>;
export type CustomDataCategoriesType = z.infer<
  typeof CustomDataCategoriesSchema
>;
export type CustomDataProductsType = z.infer<typeof CustomDataProductsSchema>;
export type CustomDataProductType = z.infer<typeof CustomDataProductSchema>;
export type CustomDataProductReviewsType = z.infer<
  typeof CustomDataProductReviewsSchema
>;
export type CustomDataMenuResponseType = z.infer<
  typeof CustomDataMenuResponseSchema
>;
export type CustomDataMenusType = z.infer<typeof CustomDataMenusSchema>;
export type CustomDataThemeOptionsType = z.infer<
  typeof CustomDataThemeOptionsSchema
>;

export type CustomDataProductsMinimizedResponseType = z.infer<
  typeof CustomDataProductsMinimizedResponseSchema
>;

export type CustomDataPostsType = z.infer<typeof CustomDataPostsSchema>;