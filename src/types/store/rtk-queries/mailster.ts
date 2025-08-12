import { z } from 'zod';

export const subscriberGetRequestSchema = z.object({
  email: z.string().email(),
});

export const subscriberRequestSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  lang: z.string(),
});

export const subscriberActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  subscriber_id: z.number().optional(),
});

export const subscriberSchema = z.object({
  ID: z.string(),
  hash: z.string(),
  email: z.string().email(),
  wp_id: z.string(),
  status: z.string(),
  added: z.string(),
  updated: z.string(),
  signup: z.string(),
  confirm: z.string(),
  ip_signup: z.string().nullable(),
  ip_confirm: z.string().nullable(),
  rating: z.string(),
  fullname: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  bounce: z.string().nullable(),
  geo: z.string().nullable(),
  coords: z.string().nullable(),
  client: z.string().nullable(),
  clienttype: z.string().nullable(),
  clientversion: z.string().nullable(),
  lang: z.string().nullable(),
  ip: z.string(),
  confirmation: z.string().nullable(),
  error: z.string().nullable(),
  referer: z.string(),
  timeoffset: z.string().nullable(),
  form: z.string().nullable(),
  unsubscribe: z.string().nullable(),
  gdpr: z.string().nullable(),
  tags: z.string().nullable(),
  formkey: z.string().nullable(),
  _remove_meta: z.string().nullable(),
  _remove_actions: z.string().nullable(),
  _old_status: z.string().nullable(),
});

export const subscriberListSchema = z.array(subscriberSchema);

export type SubscriberRequest = z.infer<typeof subscriberRequestSchema>;
export type SubscriberGetRequest = z.infer<typeof subscriberGetRequestSchema>;
export type SubscriberListResponse = z.infer<typeof subscriberListSchema>;
export type SubscriberActionResponse = z.infer<typeof subscriberActionResponseSchema>;
