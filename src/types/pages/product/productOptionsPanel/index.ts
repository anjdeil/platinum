import { ProductAttributesSchema, ProductDefaultAttributesSchema, ProductVariationSchema } from "@/types/components/shop/product/products";
import { z } from "zod";

export const ProductOptionsPanelSchema = z.object({
    attributes: z.array(ProductAttributesSchema),
    defaultAttributes: z.array(ProductDefaultAttributesSchema),
    variations: z.array(ProductVariationSchema)
});

export type ProductOptionsPanelType = z.infer<typeof ProductOptionsPanelSchema>;