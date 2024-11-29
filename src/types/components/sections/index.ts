import { z } from 'zod';
import { ProductSchema } from '@/types/pages/shop';

const SliderItemSchema = z.object({
  _type: z.literal('_'),
  image_desc: z.string().url(),
  image_mob: z.string().url(),
  text: z.string(),
  url: z.string().url(),
});

export const SliderSectionSchema = z.object({
  _type: z.literal('slider'),
  slider: z.array(SliderItemSchema),
});

export const ProductListSectionSchema = z.object({
  _type: z.literal('product_list'),
  subtitle: z.string(),
  title: z.string(),
  products: z.array(ProductSchema),
});

export const CategoriesSectionSchema = z.object({
  _type: z.literal('categories'),
  subtitle: z.string(),
  title: z.string(),
});

export const InstagramSectionSchema = z.object({
  _type: z.literal('instagram'),
  subtitle: z.string(),
  title: z.string(),
});

export const ReviewsSectionSchema = z.object({
  _type: z.literal('reviews'),
  subtitle: z.string(),
  title: z.string(),
});

export const NewsletterSectionSchema = z.object({
  _type: z.literal('newsletter'),
  newsletter_separator: z.string().optional(),
});

export const AboutPlatinumSectionSchema = z.object({
  _type: z.literal('about_platinum'),
  about_platinum_separator: z.string().optional(),
});

const FeatureItemSchema = z.object({
  _type: z.literal('_'),
  image: z.string(),
  contrast_bg: z.boolean(),
  title: z.string(),
  text: z.string(),
  link_text: z.string(),
  link_url: z.string().url(),
});

export const FeaturesSectionSchema = z.object({
  _type: z.literal('features'),
  subtitle: z.string(),
  title: z.string(),
  items: z.array(FeatureItemSchema),
});

export const BlogSectionSchema = z.object({
  _type: z.literal('blog'),
  subtitle: z.string(),
  title: z.string(),
});

export const LoyaltySectionSchema = z.object({
  _type: z.literal('loyalty'),
  loyalty_separator: z.string().optional(),
});

export const ContactsSectionSchema = z.object({
  _type: z.literal('contacts'),
  contacts_separator: z.string().optional(),
});

export const HeroSectionSchema = z.object({
  _type: z.literal('hero'),
  is_reverse: z.boolean(),
  image: z.string().url(),
  object_fit: z.enum(['cover', 'contain']),
  title: z.string(),
  text: z.string(),
});

const RichTextSectionSchema = z.object({
  _type: z.literal('rich_text'),
  text: z.string(),
});

const ApplicationFormSectionSchema = z.object({
  _type: z.literal('application_form'),
  application_form_separator: z.string().optional(),
});

const InnerSectionSchema = z.object({
  _type: z.literal('inner_section'),
  sections: z.array(
    z.union([RichTextSectionSchema, ApplicationFormSectionSchema])
  ),
});

export const SplitSectionSchema = z.object({
  _type: z.literal('split'),
  split: z.array(InnerSectionSchema),
});

export const SectionsTypeSchema = z.union([
  SliderSectionSchema,
  ProductListSectionSchema,
  CategoriesSectionSchema,
  InstagramSectionSchema,
  ReviewsSectionSchema,
  NewsletterSectionSchema,
  AboutPlatinumSectionSchema,
  FeaturesSectionSchema,
  BlogSectionSchema,
  LoyaltySectionSchema,
  ContactsSectionSchema,
  HeroSectionSchema,
  SplitSectionSchema,
]);

// export type SliderItem = z.infer<typeof SliderItemSchema>;
export type SliderSectionData = z.infer<typeof SliderSectionSchema>;
export type ProductListSectionData = z.infer<typeof ProductListSectionSchema>;
export type CategoriesSectionData = z.infer<typeof CategoriesSectionSchema>;
export type InstagramSectionData = z.infer<typeof InstagramSectionSchema>;
export type ReviewsSectionData = z.infer<typeof ReviewsSectionSchema>;
export type NewsletterSectionData = z.infer<typeof NewsletterSectionSchema>;
export type AboutPlatinumSectionData = z.infer<
  typeof AboutPlatinumSectionSchema
>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;
export type FeaturesSectionData = z.infer<typeof FeaturesSectionSchema>;
export type BlogSectionData = z.infer<typeof BlogSectionSchema>;
export type LoyaltySectionData = z.infer<typeof LoyaltySectionSchema>;
export type ContactsSectionData = z.infer<typeof ContactsSectionSchema>;
export type HeroSectionData = z.infer<typeof HeroSectionSchema>;
//export type RichTextSection = z.infer<typeof RichTextSectionSchema>;
// export type ApplicationFormSection = z.infer<
//   typeof ApplicationFormSectionSchema
// >;
//export type InnerSection = z.infer<typeof InnerSectionSchema>;
export type SplitSectionData = z.infer<typeof SplitSectionSchema>;
export type SectionsType = z.infer<typeof SectionsTypeSchema>;
