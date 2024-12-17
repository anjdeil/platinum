import { z } from "zod";

const AuthInstConfigSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  userId: z.string().min(1, 'User Id is required'),
});

const MediaResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
    })
  ),
  paging: z.object({
    cursors: z.object({
      before: z.string(),
      after: z.string(),
    }),
  }),
});

export const MediaInfoResponseSchema = z.object({
  id: z.string(),
  media_type: z.enum(['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']),
  media_url: z.string(),
  username: z.string(),
  caption: z.string(),
  permalink: z.string(),
  thumbnail_url: z.string().optional(),
});

export const InstagramApiResponseSchema = z.array(MediaInfoResponseSchema);

export type MediaResponse = z.infer<typeof MediaResponseSchema>;
export type MediaInfoResponse = z.infer<typeof MediaInfoResponseSchema>;
export type AuthInstConfigType = z.infer<typeof AuthInstConfigSchema>;
