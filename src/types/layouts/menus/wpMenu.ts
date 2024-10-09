import { z } from 'zod';
import { NavLinkPropsSchema, NavListPropsSchema } from '../Nav';

export const SkeletonElementPropsSchema = z.object({
    width: z.string(),
    height: z.string(),
});

export const SkeletonContainerPropsSchema = z.object({
    direction: z.enum(['row', 'column']).optional(),
    gap: z.string().optional(),
});

export const MenuSkeletonPropsSchema = z.object({
    elements: z.number().min(1),
    ...SkeletonElementPropsSchema.shape,
    ...SkeletonContainerPropsSchema.shape,
});

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


export type SkeletonElementProps = z.infer<typeof SkeletonElementPropsSchema>;
export type SkeletonContainerProps = z.infer<typeof SkeletonContainerPropsSchema>;
export type MenuSkeletonProps = z.infer<typeof MenuSkeletonPropsSchema>;
export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;
export type WpMenuResponseType = z.infer<typeof WpMenuResponseSchema>;