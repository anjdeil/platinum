import { z } from "zod";
import { ProductAttributesSchema } from "../../shop";

export const ProductOptionsPanelSchema = z.object({
    attributes: z.array(ProductAttributesSchema)
});

export type ProductOptionsPanelType = z.infer<typeof ProductOptionsPanelSchema>;