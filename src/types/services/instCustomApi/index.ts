import { z } from "zod";

const AuthInstConfigSchema = z.object({
    accessToken: z.string().min(1, 'Access token is required'),
    userId : z.string().min(1, 'User Id is required'),
});
export const PhotoSchema = z.object({
    id: z.string(),
    caption: z.string().optional(),
    media_type: z.string(),
    media_url: z.string(),
    permalink: z.string(),
    username: z.string(),
  });
  
  export type PhotoType = z.infer<typeof PhotoSchema>;
export type AuthInstConfigType = z.infer<typeof AuthInstConfigSchema>;
