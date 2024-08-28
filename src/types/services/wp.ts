import { z } from "zod";

const authConfigSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const wpParamsSchema = z.object({
    page: z.number().min(1).optional(),
    per_page: z.number().min(1).max(100).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    orderby: z.string().optional(),
    status: z.enum(['publish', 'future', 'draft', 'pending', 'private']).optional(),
    include: z.array(z.number()).optional(),
    slug: z.string().optional()
});

export type authConfigType = z.infer<typeof authConfigSchema>;
export type wpParamsType = z.infer<typeof wpParamsSchema>;