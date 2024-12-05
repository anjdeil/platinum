import { z } from 'zod';

export const LevelSchema = z.enum(['silver', 'gold', 'platinum']);
export type Level = z.infer<typeof LevelSchema>;

export const BenefitsGapPropsSchema = z.object({
  gapMedium: z.string().default('16px').optional(),
  gapSm: z.string().default('8px').optional(),
  gapLg: z.string().default('24px').optional(),
});

export const BenefitsPropsSchema = z.object({
  ...BenefitsGapPropsSchema.shape,
});

export const loyaltyDescriptionSchema = z.object({
  silver: z.string(),
  gold: z.string(),
  platinum: z.string(),
});

export type BenefitsGapProps = z.infer<typeof BenefitsGapPropsSchema>;
export type BenefitsProps = z.infer<typeof BenefitsPropsSchema>;
