import { z } from "zod";

export const ProductReviewSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    status: z.string(),
    review: z.string(),
    reviewer: z.string().optional(),
    reviewer_email: z.string().optional(),
    rating: z.number()
});

export type ProductReviewType = z.infer<typeof ProductReviewSchema>;
