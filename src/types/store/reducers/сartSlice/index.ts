import { z } from "zod";

export const lineOrderItemsSchema = z.object({
    id: z.number(),
    name: z.string(),
    parent_name: z.string().optional(),
    product_id: z.number(),
    variation_id: z.number(),
    quantity: z.number(),
    tax_class: z.string(),
    subtotal: z.string(),
    subtotal_tax: z.string(),
    total: z.string(),
    total_tax: z.string(),
    taxes: z.array(z.any()),
    meta_data: z.array(z.any()),
    image: z.object({
        id: z.number(),
        src: z.string()
    }).optional(),
    sku: z.string(),
    price: z.number()
});

export type lineOrderItems = z.infer<typeof lineOrderItemsSchema>;
