import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  count: z.number(),
  language_code: z.string(),
  menu_order: z.number().optional(),
});

type CategoryType = z.infer<typeof CategorySchema>;

type CategoryChildType = CategoryType & {
    isActive: boolean;
};

export default CategoryType;
export type { CategoryChildType };
