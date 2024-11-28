import { ProductSchema } from "@/types/pages/shop";
import { z } from "zod";

export const BannerSlideTypeSchema = z.object({
    product: ProductSchema,
    image: z.string().url(),
    mobileImage: z.string().url(),
});

export const BannerWrapperPropsSchema = z.object({
    proportion: z.number().optional(),
    mobileProportion: z.number().optional(),
});

export const BannerSliderPropsSchema = z.object({
    slides: z.array(BannerSlideTypeSchema),
    proportion: z.number().optional(),
    mobileProportion: z.number().optional(),
});

export type BannerSlideType = z.infer<typeof BannerSlideTypeSchema>;
export type BannerWrapperProps = z.infer<typeof BannerWrapperPropsSchema>;
export type BannerSliderProps = z.infer<typeof BannerSliderPropsSchema>;