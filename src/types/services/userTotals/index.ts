import { userLoyalityStatusSchema } from '@/types/store/rtk-queries/wpApi';
import { z } from 'zod';

export const UserTotalsSchema = z.object({
  'loyalty_status': userLoyalityStatusSchema,
  'total_spent': z.string(),
  'remaining_amount': z.number(),
  'order_count': z.number(),
});

export type UserTotalsType = z.infer<typeof UserTotalsSchema>;
