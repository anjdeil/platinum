import { ShippingMethodType } from '@/types/services';

export default function getShippingMethodFixedCost(method: ShippingMethodType): number | false {
  const cost = method?.settings?.cost_per_order?.value;

  return cost ? Number(cost) : false;
}