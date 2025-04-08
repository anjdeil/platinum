import { z } from 'zod';

export const SwiperSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  src: z.string().url(),
  type: z.string().optional(),
});

export const SwiperPropsSchema = z.object({
    data: z.array(SwiperSchema),
    handleFavorite: z.function().optional(),

});

export const SwiperPopupPropsSchema = z.object({
  onClose: z.function(),
});

export type SwiperType = z.infer<typeof SwiperSchema>;
export type SwiperProps = z.infer<typeof SwiperPropsSchema>;
export type SwiperPopupProps = z.infer<typeof SwiperPopupPropsSchema>;