import { ShippingMethodRuleType, ShippingMethodType } from '@/types/services';

export default function getCalculatedMethodCostByWeight(method: ShippingMethodType, weight: number = 0): number | false {
  const shippingMethodRulesJson = method?.settings?.fs_method_rules?.value;
  const shippingMethodRules = shippingMethodRulesJson ? JSON.parse(shippingMethodRulesJson) : method?.settings?.method_rules?.value;

  let costByWeight;

  shippingMethodRules?.forEach(({
                                  conditions: [{ condition_id, min, max }],
                                  cost_per_order,
                                }: ShippingMethodRuleType) => {

    if (condition_id !== 'weight') return;
    const minWeight = Number(min);
    const maxWeight = max ? Number(max) : false;

    if (weight >= minWeight && (maxWeight === false || weight <= maxWeight)) {
      costByWeight = Number(cost_per_order);
    }

  });

  return costByWeight || false;

}