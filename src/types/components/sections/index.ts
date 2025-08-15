import { z } from 'zod';

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
  sort_type: z.string().optional(),
});

export const CategoriesBarSchema = z.object({
  _type: z.literal('_'),
  image: z.string().url(),
  title: z.string(),
  slug: z.string(),
});

export const CategoriesSectionSchema = z.object({
  _type: z.literal('categories'),
  subtitle: z.string(),
  title: z.string(),
  categories_bars: z.array(CategoriesBarSchema),
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
});

export const AboutPLangSchema = z.object({
  subtitle: z.string(),
  title: z.string(),
  text: z.string(),
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
  subtitle: z.string().optional(),
  title: z.string().optional(),
});

export const LoyaltySectionSchema = z.object({
  _type: z.literal('loyalty'),
  loyalty_separator: z.string().optional(),
});

export const ContactsSectionSchema = z.object({
  _type: z.literal('contacts'),
  contacts_separator: z.string().optional(),
});

export const AmbassadorHeroSectionSchema = z.object({
  _type: z.literal('ambassador_hero'),
  image: z.string().url(),
  title: z.string(),
  text: z.string(),
  years: z.string(),
  sub_text: z.string(),
});

export const AmbassadorProvideSectionSchema = z.object({
  _type: z.literal('ambassador_provide'),
  title: z.string(),
  items: z.array(
    z.object({
      item_text: z.string(),
    })
  ),
});

export const AmbassadorBenefitsSectionSchema = z.object({
  _type: z.literal('ambassador_benefits'),
  title: z.string(),
  items: z.array(
    z.object({
      item_image: z.string().url(),
      item_text: z.string(),
    })
  ),
});

export const AmbassadorAboutSectionSchema = z.object({
  _type: z.literal('ambassador_about'),
  title: z.string(),
  items: z.array(
    z.object({
      icons: z.array(
        z.object({
          icon_image: z.string().url(),
        })
      ),
      item_text: z.string(),
      item_link: z.string().url().optional(),
    })
  ),
  text: z.string(),
  button_text: z.string(),
  button_link: z.string().url().optional(),
});

export const AmbassadorImageSectionSchema = z.object({
  _type: z.literal('ambassador_image'),
  image: z.string().url(),
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

const RichTextSectionPropsSchema = z.object({
  title: z.string().optional(),
  is_reverse: z.boolean().optional(),
  text: z.string().optional(),
  fullSize: z.boolean().optional(),
});

const ApplicationFormSectionSchema = z.object({
  _type: z.literal("application_form"),
  application_form_separator: z.string().optional(),
});

const InnerSectionSchema = z.object({
  _type: z.literal("inner_section"),
  sections: z.array(
    z.union([RichTextSectionSchema, ApplicationFormSectionSchema])
  ),
});

export const SplitSectionSchema = z.object({
  _type: z.literal("split"),
  split: z.array(InnerSectionSchema),
});

export const QuestionFormSectionSchema = z.object({
  _type: z.literal('question_form'),
  question_form_separator: z.string().optional(),
});

export const NetworksSectionSchema = z.object({
  _type: z.literal('networks'),
  subtitle: z.string().optional(),
  title: z.string().optional(),
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
  AmbassadorProvideSectionSchema,
  AmbassadorHeroSectionSchema,
  AmbassadorBenefitsSectionSchema,
  AmbassadorAboutSectionSchema,
  AmbassadorImageSectionSchema,
  HeroSectionSchema,
  SplitSectionSchema,
  RichTextSectionSchema,
  QuestionFormSectionSchema,
  NetworksSectionSchema,
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
export type AmbassadorHeroSectionData = z.infer<typeof AmbassadorHeroSectionSchema>;
export type AmbassadorProvideSectionData = z.infer<typeof AmbassadorProvideSectionSchema>;
export type AmbassadorBenefitsSectionData = z.infer<typeof AmbassadorBenefitsSectionSchema>;
export type AmbassadorAboutSectionData = z.infer<typeof AmbassadorAboutSectionSchema>;
export type AmbassadorImageSectionData = z.infer<typeof AmbassadorImageSectionSchema>;
export type HeroSectionData = z.infer<typeof HeroSectionSchema>;
export type RichTextSectionData = z.infer<typeof RichTextSectionSchema>;
export type RichTextSectionProps = z.infer<typeof RichTextSectionPropsSchema>;
export type ApplicationFormSection = z.infer<
  typeof ApplicationFormSectionSchema
>;
export type InnerSectionData = z.infer<typeof InnerSectionSchema>;
export type SplitSectionData = z.infer<typeof SplitSectionSchema>;
export type QuestionFormSectionData = z.infer<typeof QuestionFormSectionSchema>;
export type NetworksSectionData = z.infer<typeof NetworksSectionSchema>;
export type SectionsType = z.infer<typeof SectionsTypeSchema>;
