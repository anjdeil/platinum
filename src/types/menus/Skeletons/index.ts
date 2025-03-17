import { z } from 'zod';

export const SkeletonElementPropsSchema = z.object({
  width: z.string(),
  height: z.string(),
  color: z.string().optional(),
  light: z.boolean().optional(),
  dark: z.boolean().optional(),
});

export const SkeletonContainerPropsSchema = z.object({
  direction: z.enum(['row', 'column']).optional(),
  gap: z.string().optional(),
  leftSide: z.boolean().optional(),
});

export const MenuSkeletonPropsSchema = z.object({
  elements: z.number().min(1),
  ...SkeletonElementPropsSchema.shape,
  ...SkeletonContainerPropsSchema.shape,
});

export type SkeletonElementProps = z.infer<typeof SkeletonElementPropsSchema>;
export type SkeletonContainerProps = z.infer<
  typeof SkeletonContainerPropsSchema
>;
export type MenuSkeletonProps = z.infer<typeof MenuSkeletonPropsSchema>;
