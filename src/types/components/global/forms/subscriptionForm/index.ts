import { z } from 'zod';

export const SubscriptionFormSchema = z.object({
  email: z.string().email('Please, type valid email'),
});

export type SubscriptionFormValues = z.infer<typeof SubscriptionFormSchema>;

export const SubscriptionFormPropsSchema = z.object({
  formId: z.string(),
});

export type SubscriptionFormProps = z.infer<typeof SubscriptionFormPropsSchema>;
