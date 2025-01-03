import { z } from "zod";

export const OptionSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  products_count: z.number().optional(),
  color_hex: z.string().optional(),
});

export const AttributeSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  options: z.array(OptionSchema),
});

export type OptionType = z.infer<typeof OptionSchema>;
export type AttributeType = z.infer<typeof AttributeSchema>;