import { z } from "zod";

export const menuItemSchema = z.object({
    title: z.string(),
    type: z.string(),
    menu_order: z.number(),
    parent_id: z.number(),
    url: z.string(),
    is_button: z.boolean(),
    fa_icon_code: z.string()
});

export const menuItemsSchema = z.object({
    id: z.number(),
    items: z.array(menuItemSchema)
});

export type menuItemsType = z.infer<typeof menuItemsSchema>;