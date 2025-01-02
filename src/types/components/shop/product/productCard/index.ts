import { ProductSchema } from "@/types/pages/shop";
import { z } from "zod";

export const CurrencySchema = z.object({
  name: z.string(),
  code: z.string(),
  rate: z.number().optional(),
});

export const CommonTextPropsSchema = z.object({
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  mobFontSize: z.string().optional(),
  mobLineHeight: z.string().optional(),
  mobFontWeight: z.number().optional(),
});

export const ProductCardPropsTypeShema = z.object({
  product: ProductSchema,
  currency: CurrencySchema,
});

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>;
export type ProductCardPropsType = z.infer<typeof ProductCardPropsTypeShema>;
export type CurrencyType = z.infer<typeof CurrencySchema>;
