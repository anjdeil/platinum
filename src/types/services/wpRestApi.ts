import { z } from "zod";

const AuthConfigSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const WpParamsSchema = z.object({
    page: z.number().min(1).optional(),
    per_page: z.number().min(1).max(100).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    orderby: z.string().optional(),
    status: z.enum(['publish', 'future', 'draft', 'pending', 'private']).optional(),
    include: z.array(z.number()).optional(),
    slug: z.string().optional()
});

export const JwtTokenResponseSchema = z.object({
    data: z.object({
        token: z.string(),
        user_email: z.string(),
        user_nicename: z.string(),
        user_display_name: z.string(),
    })
})

export type ParamsType = Record<string, string[] | string | number | undefined>;
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type AuthConfigType = z.infer<typeof AuthConfigSchema>;
export type WpParamsType = z.infer<typeof WpParamsSchema>;
export type JwtTokenResponseType = z.infer<typeof JwtTokenResponseSchema>;