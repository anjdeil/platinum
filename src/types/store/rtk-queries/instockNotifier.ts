import { z } from 'zod';

export const ProductNotifierReqDataSchema = z.object({
  subscriber_name: z.string(),
  email: z.string(),
  product_id: z.number(),
  variation_id: z.number().optional(),
  status: z.string(),
  subscriber_phone: z.string(),
  custom_quantity: z.string(),
  wpml_language: z.string().optional(),
});

export const ProductNotifierRespDataSchema = z.object({
  id: z.number(),
  subscribed_date: z.string(),
  status: z.string(),
  meta_data: z.object({
    cwginstock_product_id: z.array(z.string()),
    cwginstock_variation_id: z.array(z.string()),
    cwginstock_subscriber_email: z.array(z.string()),
    cwginstock_user_id: z.array(z.string()),
    cwginstock_language: z.array(z.string()),
    cwginstock_pid: z.array(z.string()),
    cwginstock_subscriber_name: z.array(z.string()),
    cwginstock_subscriber_phone: z.array(z.string()),
    cwginstock_custom_quantity: z.array(z.string()),
    cwginstock_created_via: z.array(z.string()),
  }),
});

export type ProductNotifierReqDataType = z.infer<
  typeof ProductNotifierReqDataSchema
>;

export type ProductNotifierRespDataType = z.infer<
  typeof ProductNotifierRespDataSchema
>;
