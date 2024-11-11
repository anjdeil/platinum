import { z } from "zod";

export const AuthConfigSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const JwtTokenResSchema = z.object({
    token: z.string(),
    user_email: z.string(),
    user_nicename: z.string(),
    user_display_name: z.string()
})

export type AuthConfigType = z.infer<typeof AuthConfigSchema>;
export type JwtTokenResType = z.infer<typeof JwtTokenResSchema>;