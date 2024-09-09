import { z } from "zod";
import { MenuSkeletonPropsSchema } from "./Skeletons";

const wpNavLinkSchema = z.object({
    title: z.string(),
    url: z.string(),
    isButton: z.boolean(),
    isIcon: z.string(),
    id: z.number(),
});

export const wpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    classItem: z.string().optional(),
    classList: z.string().optional(),
    skeleton: MenuSkeletonPropsSchema.optional()
});

export const VerticalWpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    height: z.number().optional()
});

export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;