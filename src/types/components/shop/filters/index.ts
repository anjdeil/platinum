import { AttributeSchema } from "@/types/services/wpCustomApi/attributes";
import { z } from "zod";

export const FilterPanelPropsSchema = z.object({
    attributes: z.array(AttributeSchema),
    maxPrice: z.number(),
    minPrice: z.number()
})

export const FilterAttributesPropsSchema = z.object({
    attributes: z.array(AttributeSchema)
})

export type FilterPanelPropsType = z.infer<typeof FilterPanelPropsSchema>;
export type FilterAttributesPropsType = z.infer<typeof FilterAttributesPropsSchema>;