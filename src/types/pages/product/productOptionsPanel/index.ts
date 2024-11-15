import { z } from "zod";
import { ProductAttributesSchema, ProductDefaultAttributesSchema } from "../../shop";

export const ProductOptionsPanelSchema = z.object({
    attributes: z.array(ProductAttributesSchema),
    defaultAttributes: z.array(ProductDefaultAttributesSchema)
});

export type ProductOptionsPanelType = z.infer<typeof ProductOptionsPanelSchema>;