import { NavLinkPropsSchema, NavListPropsSchema } from "@/types/layouts/Nav";
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
    skeleton: MenuSkeletonPropsSchema.optional(),
    className: z.string().optional(),
    ...NavListPropsSchema.shape,
    ...NavLinkPropsSchema.shape,
});

export const VerticalWpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    height: z.number().optional()
});

export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;