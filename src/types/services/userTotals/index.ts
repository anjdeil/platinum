import { z } from 'zod';

export const UserTotalsSchema = z.object({
  'loyalty_status': z.string(),
  'total_spent': z.string(),
  'remaining_amount': z.number(),
  'order_count': z.number(),
});

export type UserTotalsType = z.infer<typeof UserTotalsSchema>;
