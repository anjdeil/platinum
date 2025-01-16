import { z } from 'zod';

export const PopupPropsSchema = z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    padding: z.string().optional(),
    scroll: z.number().optional(),
    backgroundColor: z.string().optional(),
    paddingTop: z.string().optional(),
    rowGap: z.string().optional(),
    title: z.union([z.string(), z.any()]).optional(),
    disableOverlay: z.boolean().optional(),
    closeButton: z.boolean().optional(),
});

export const mobilePopupPropsSchema = z.object({
    onClose: z.function().args().returns(z.void()),
    children: z.any(),
    ...PopupPropsSchema.shape,

});

export const mobileCategoriesMenuPropsSchema = z.object({
    disableOverlay: z.boolean().optional(),
    padding: z.string(),
    width: z.string(),
    height: z.string().optional(),
    onClose: z.function().args().returns(z.void()),
    switchCategory: z.function().args(z.string(), z.string().optional()).returns(z.void()),
});

export type PopupContainerProps = z.infer<typeof PopupPropsSchema>;
export type MobilePopupPropsType = z.infer<typeof mobilePopupPropsSchema>;
export type mobileCategoriesMenuProps = z.infer<typeof mobileCategoriesMenuPropsSchema>;