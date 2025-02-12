import { ProductAttributesSchema, ProductDefaultAttributesSchema } from "@/types/components/shop/product/products";
import { z } from "zod";

export const ProductOptionsPanelSchema = z.object({
    attributes: z.array(ProductAttributesSchema),
    defaultAttributes: z.array(ProductDefaultAttributesSchema)
});

export type ProductOptionsPanelType = z.infer<typeof ProductOptionsPanelSchema>;