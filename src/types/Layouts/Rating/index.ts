import { z } from 'zod';


export const RatingPropsSchema = z.object({
    rating: z.number().min(0).max(5),
});

export const StarPropsSchema = z.object({
    filled: z.boolean().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
});

export const StarsWrapperPropsSchema = z.object({
    gap: z.string().optional(),
});

export type RatingProps = z.infer<typeof RatingPropsSchema>;
export type StarProps = z.infer<typeof StarPropsSchema>;
export type StarsWrapperProps = z.infer<typeof StarsWrapperPropsSchema>;