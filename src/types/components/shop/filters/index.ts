import { AttributeSchema } from "@/types/services/wpCustomApi/attributes";
import { z } from "zod";

export const FilterPanelPropsSchema = z.object({
  attributes: z.array(AttributeSchema),
  minPrice: z.number(),
  maxPrice: z.number(),
});

export const FilterAttributesPropsSchema = z.object({
  attribute: AttributeSchema,
  onParamsChange: z
    .function()
    .args(z.string(), z.string(), z.boolean())
    .returns(z.void()),
  currentAttribute: z.array(z.union([z.string(), z.number()])),
  onReset: z.function().returns(z.void()).optional(),
  onApply: z.function().returns(z.void()).optional(),
});

export type FilterPanelPropsType = z.infer<typeof FilterPanelPropsSchema>;
export type FilterAttributesPropsType = z.infer<
  typeof FilterAttributesPropsSchema
>;