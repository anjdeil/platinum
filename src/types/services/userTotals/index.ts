import { z } from 'zod';

export const UserTotalsSchema = z.object({
  'total_spent': z.string(),
  'order_count': z.number(),
});

export type UserTotalsType = z.infer<typeof UserTotalsSchema>;
