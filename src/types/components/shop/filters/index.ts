import { AttributeSchema } from "@/types/services/wpCustomApi/attributes";
import { z } from "zod";

export const FilterPanelPropsSchema = z.object({
    attributes: z.array(AttributeSchema),
    maxPrice: z.number(),
    minPrice: z.number()
})

export const FilterAttributesPropsSchema = z.object({
    attribute: AttributeSchema,
    onParamsChange: z.function().args(z.string(), z.string(), z.boolean()).returns(z.void()),
    currentAttribute: z.string()
})

export type FilterPanelPropsType = z.infer<typeof FilterPanelPropsSchema>;
export type FilterAttributesPropsType = z.infer<typeof FilterAttributesPropsSchema>;