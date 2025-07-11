import { SectionsTypeSchema } from '@/types/components/sections';
import { ProductSchema, ProductsMinimizedSchema } from '@/types/components/shop/product/products';
import { WpMenuResponseSchema } from '@/types/menus/WpMenus';
import { BlogItemSchema, BlogItemUnionSchema } from '@/types/pages/blog';
import { CategorySchema } from '@/types/pages/shop';
import { ProductReviewSchema } from '@/types/pages/shop/reviews';
import { z } from 'zod';
import { AttributeSchema } from './attributes';
import { menuItemsSchema } from './menus';
import { ThemeOptionsItemSchema } from './themeOptions';

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

export const SeoDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).nullable().optional(),
  image_scan_date: z.string().optional(),
  og: z
    .object({
      title: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      image_url: z.string().nullable().optional(),
      image_width: z.number().nullable().optional(),
      image_height: z.number().nullable().optional(),
      video: z.string().nullable().optional(),
      article_section: z.string().nullable().optional(),
      article_tags: z.array(z.string()).nullable().optional(),
    })
    .nullable()
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
  seo_data: SeoDataSchema.nullable().optional(),
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

export const CurrencyItemSchema = z.object({
  code: z.string(),
  position: z.string(),
  rate: z.number(),
});

export const CurrenciesResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(CurrencyItemSchema),
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

export const CustomDataCategorySchema = z.object({
  success: z.boolean(),
  data: CustomDataSchema.extend({
    item: CategorySchema,
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
    statistic: z
      .object({
        posts_count: z.number(),
      })
      .optional(),
    items: z.array(BlogItemSchema),
  }),
});

export const DataPostsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    statistic: z.object({
      posts_count: z.number(),
    }),
    items: z.array(BlogItemSchema),
  }),
});

export const CustomDataPostsUnionSchema = z.object({
  data: z.object({
    items: z.array(BlogItemUnionSchema),
    statistic: z
      .object({
        posts_count: z.number().optional(),
      })
      .optional(),
  }),
});

export const PostsDataSchema = z.object({
  statistic: z
    .object({
      posts_count: z.number(),
    })
    .optional(),
  items: z.array(BlogItemSchema),
});

export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;
export type SeoDataType = z.infer<typeof SeoDataSchema>;
export type PageDataItemType = z.infer<typeof PageDataItemsSchema>;
export type PageDataFullType = z.infer<typeof PageDataFullSchema>;
export type PageDataType = z.infer<typeof PageDataSchema>;
export type CustomDataCategoriesType = z.infer<
  typeof CustomDataCategoriesSchema
>;
export type CustomDataCategoryType = z.infer<typeof CustomDataCategorySchema>;
export type CustomDataProductsType = z.infer<typeof CustomDataProductsSchema>;
export type CustomDataProductType = z.infer<typeof CustomDataProductSchema>;
export type CustomDataProductReviewsType = z.infer<
  typeof CustomDataProductReviewsSchema
>;
export type CustomDataMenuResponseType = z.infer<
  typeof CustomDataMenuResponseSchema
>;
export type CurrenciesResponseType = z.infer<
  typeof CurrenciesResponseSchema
>;
export type CustomDataMenusType = z.infer<typeof CustomDataMenusSchema>;
export type CustomDataThemeOptionsType = z.infer<
  typeof CustomDataThemeOptionsSchema
>;

export type CustomDataProductsMinimizedResponseType = z.infer<
  typeof CustomDataProductsMinimizedResponseSchema
>;

export type CustomDataPostsType = z.infer<typeof CustomDataPostsSchema>;
export type PostsDataType = z.infer<typeof PostsDataSchema>;
export type DataPostsType = z.infer<typeof DataPostsSchema>;
