import { z } from "zod";
import { JwtTokenResSchema } from "./auth";

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
    data: JwtTokenResSchema
})

export type ParamsType = Record<string, string[] | string | number | undefined>;
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type WpParamsType = z.infer<typeof WpParamsSchema>;
export type JwtTokenResponseType = z.infer<typeof JwtTokenResponseSchema>;