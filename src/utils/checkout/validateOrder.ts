import { OrderType } from '@/types/services';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import validateOrderShippingLines from '@/utils/checkout/validateOrderShippingLines';

export default function validateOrder(order: OrderType) : {
  isValid: boolean,
  messageKeys: string[]
} {
  const result = {
    isValid: true,
    messageKeys: [] as string[]
  };

  /**
   * Validate shipping lines
   */
  const shippingLinesValidationResult = validateOrderShippingLines(order);
  if (!shippingLinesValidationResult.isValid) result.isValid = false;
  result.messageKeys.push(...shippingLinesValidationResult.messageKeys);

  return result;
}