import { z } from 'zod';

export const PopupPropsSchema = z.object({
    width: z.string().optional(),
    scroll: z.number().optional(),
    backgroundColor: z.string().optional(),
    paddingTop: z.string().optional(),
    rowGap: z.string().optional(),
    title: z.union([z.string(), z.any()]).optional(),
});

export const mobilePopupPropsSchema = z.object({
    onClose: z.function().args().returns(z.void()),
    children: z.any(),
    ...PopupPropsSchema.shape,
    closeButton: z.boolean().optional(),
});

export type PopupContainerProps = z.infer<typeof PopupPropsSchema>;
export type MobilePopupPropsType = z.infer<typeof mobilePopupPropsSchema>;