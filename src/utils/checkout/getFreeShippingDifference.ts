import { ShippingMethodType } from '@/types/services';

export default function getFreeShippingDifference(method: ShippingMethodType, cartTotal: number) : number | false {
  const freeShippingCostValue = method?.settings?.free_shipping_cost?.value;
  if (!freeShippingCostValue) return false;

  const freeShippingCost = Number(freeShippingCostValue);
  return freeShippingCost - cartTotal;
}