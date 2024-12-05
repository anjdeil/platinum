import { z } from "zod";

const AuthInstConfigSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  userId: z.string().min(1, 'User Id is required'),
});
/* export const PhotoSchema = z.object({
  id: z.string(),
  caption: z.string().optional(),
  media_type: z.string(),
  media_url: z.string(),
  permalink: z.string(),
  username: z.string(),
}); */

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

const MediaInfoResponseSchema = z.object({
  id: z.string(),
  media_type: z.string(),
  media_url: z.string(),
  username:z.string(),
  caption:z.string(),
  permalink: z.string(),

});

export type MediaResponse = z.infer<typeof MediaResponseSchema>;
export type MediaInfoResponse = z.infer<typeof MediaInfoResponseSchema>;
/* export type PhotoType = z.infer<typeof PhotoSchema>; */
export type AuthInstConfigType = z.infer<typeof AuthInstConfigSchema>;
