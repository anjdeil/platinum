import { z } from "zod";
import { MenuSkeletonPropsSchema } from "./wpMenuSkeleton";

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
    className: z.string().optional(),
    topbar: z.boolean().optional(),
});

export const VerticalWpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    height: z.number().optional()
});

export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;