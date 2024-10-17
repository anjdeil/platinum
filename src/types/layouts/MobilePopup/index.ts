import { z } from 'zod';

export const PopupPropsSchema = z.object({
    width: z.string().optional(),
    scroll: z.number().optional(),
});

export const mobilePopupPropsSchema = z.object({
    onClose: z.function().returns(z.void()),
    title: z.union([z.string(), z.any()]).optional(),
    scroll: z.number().optional(),
    children: z.any()
});

export type PopupContainerProps = z.infer<typeof PopupPropsSchema>;
export type MobilePopupPropsType = z.infer<typeof mobilePopupPropsSchema>;