import { z } from 'zod';

export const formDataSchema = z.object({
  _wpcf7_unit_tag: z.string(),
  'your-name': z.string(),
  'your-email': z.string().email(),
  'your-message': z.string(),
});

export const ContactFormReqSchema = z.object({
  formId: z.number(),
  formData: formDataSchema,
});

export const ContactFormResponseSchema = z.object({
  contact_form_id: z.number(),
  status: z.enum(['mail_sent', 'mail_failed', 'other']),
  message: z.string(),
  posted_data_hash: z.string(),
  into: z.string(),
  invalid_fields: z.array(z.string()),
});

export type formDataType = z.infer<typeof formDataSchema>;
export type ContactFormResponseType = z.infer<typeof ContactFormResponseSchema>;
export type ContactFormReqType = z.infer<typeof ContactFormReqSchema>;
