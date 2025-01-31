import { ShippingMethodType } from '@/types/services';
import getFreeShippingDifference from '@/utils/checkout/getFreeShippingDifference';

export default function getShippingMethodFixedCost(method: ShippingMethodType, cartTotal: number): number | false {
  const cost = method?.settings?.cost_per_order?.value;

  const freeShippingDifference = getFreeShippingDifference(method, cartTotal);
  if (freeShippingDifference !== false && freeShippingDifference <= 0) {
    return 0;
  }

  return cost ? Number(cost) : false;
}