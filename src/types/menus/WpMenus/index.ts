import { z } from "zod";
import { NavLinkPropsSchema, NavListPropsSchema } from "../Nav";
import { MenuSkeletonPropsSchema } from "../Skeletons";

const wpNavLinkSchema = z.object({
    title: z.string(),
    url: z.string(),
    isButton: z.boolean(),
    isIcon: z.string(),
    id: z.number(),
});

export const wpMenuPropsSchema = z.object({
    menuId: z.number(),
    skeleton: MenuSkeletonPropsSchema.optional(),
    ...NavListPropsSchema.shape,
    ...NavLinkPropsSchema.shape,
});

export const VerticalWpMenuPropsSchema = z.object({
    menuId: z.number(),
    height: z.number().optional()
});

export const WpMenuResponseSchema = z.object({
    id: z.number(),
    items: z.array(z.object({
        title: z.string(),
        type: z.string(),
        menu_order: z.number(),
        parent_id: z.number(),
        url: z.string(),
        is_button: z.boolean(),
        fa_icon_code: z.string()
    })),
    language_code: z.string(),
})

export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;
export type WpMenuResponseType = z.infer<typeof WpMenuResponseSchema>;
