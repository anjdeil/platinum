import { ShippingMethodRuleType, ShippingMethodType } from '@/types/services';

export default function getCalculatedMethodCostByWeight(
  method: ShippingMethodType,
  weight: number = 0,
  cost: number = 0
): number | false {
  const shippingMethodRulesJson = method?.settings?.fs_method_rules?.value;
  const shippingMethodRules = shippingMethodRulesJson
    ? JSON.parse(shippingMethodRulesJson)
    : method?.settings?.method_rules?.value;

  let costByValue: number | undefined;
  let costByWeight: number | undefined;

  shippingMethodRules?.forEach(
    ({
      conditions: [{ condition_id, min, max }],
      cost_per_order,
    }: ShippingMethodRuleType) => {
      const minValue = Number(min);
      const maxValue = max ? Number(max) : false;

      if (condition_id === 'value') {
        if (cost >= minValue && (maxValue === false || cost <= maxValue)) {
          costByValue = Number(cost_per_order);
        }
      } else if (condition_id === 'weight') {
        const minWeight = Number(min);
        const maxWeight = max ? Number(max) : false;

        if (
          weight >= minWeight &&
          (maxWeight === false || weight <= maxWeight)
        ) {
          costByWeight = Number(cost_per_order);
        }
      }
    }
  );

  return costByValue ?? costByWeight ?? false;
}
