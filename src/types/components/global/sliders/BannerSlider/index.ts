import { ProductSchema } from "@/types/components/shop/product/products";
import { z } from "zod";

export const BannerSlideTypeSchema = z.object({
  product: ProductSchema.optional(),
  image: z.string().url(),
  mobileImage: z.string().url(),
  url: z.string().url().optional(),
});

export const MainPageSlideSchema = z.object({
  image_desc: z.string().url(),
  image_mob: z.string().url(),
  text: z.string(),
  url: z.string().url(),
});

export const BannerWrapperPropsSchema = z.object({
  proportion: z.number().optional(),
  mobileProportion: z.number().optional(),
  isMainPage: z.boolean().optional(),
});

export const BannerSliderPropsSchema = z.object({
  slides: z.array(z.union([BannerSlideTypeSchema, MainPageSlideSchema])),
  proportion: z.number().optional(),
  mobileProportion: z.number().optional(),
  isMainPage: z.boolean().optional(),
});

export type SlideType = MainPageSlideType | BannerSlideType;
export type BannerSlideType = z.infer<typeof BannerSlideTypeSchema>;
export type MainPageSlideType = z.infer<typeof MainPageSlideSchema>;
export type BannerWrapperProps = z.infer<typeof BannerWrapperPropsSchema>;
export type BannerSliderProps = z.infer<typeof BannerSliderPropsSchema>;