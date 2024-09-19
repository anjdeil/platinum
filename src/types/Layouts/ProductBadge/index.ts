import { z } from 'zod';

export const ProductBadgePropsSchema = z.object({
    type: z.enum(['new', 'best', 'hot']),
});

export const BadgeStyledPropsSchema = ProductBadgePropsSchema.extend({
    minWidth: z.string().optional(),
    borderRadius: z.string().optional(),
});

export type ProductBadgeProps = z.infer<typeof ProductBadgePropsSchema>;
export type BadgeStyledProps = z.infer<typeof BadgeStyledPropsSchema>;