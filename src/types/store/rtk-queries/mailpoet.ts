import { z } from 'zod';

export const subscriberRequestSchema = z.object({
  email: z.string().email(),
});

export const subscriberResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  message: z.string().optional(),
  status: z.enum([
    'unconfirmed',
    'subscribed',
    'unsubscribed',
    'bounced',
    'inactive',
  ]),
  subscriptions: z.array(
    z.object({
      id: z.string(),
      subscriber_id: z.string(),
      segment_id: z.string(),
      status: z.enum(['subscribed', 'unsubscribed']),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.string(),
      subscriber_id: z.string(),
      tag_id: z.string(),
      name: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
});

export const unsubscribeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type SubscriberRequest = z.infer<typeof subscriberRequestSchema>;
export type SubscriberResponse = z.infer<typeof subscriberResponseSchema>;
export type UnsubscribeResponse = z.infer<typeof unsubscribeResponseSchema>;
