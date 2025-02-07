import { OrderType } from '@/types/services/wooCustomApi/customer';
import validateOrderShippingLines from '@/utils/checkout/validateOrderShippingLines';

export default function validateOrder(order: OrderType): {
  isValid: boolean;
  messageKeys: string[];
} {
  const result = {
    isValid: true,
    messageKeys: [] as string[],
  };

  /**
   * Validate shipping lines
   */
  const shippingLinesValidationResult = validateOrderShippingLines(order);
  if (!shippingLinesValidationResult.isValid) result.isValid = false;
  result.messageKeys.push(...shippingLinesValidationResult.messageKeys);

  /**
   * Validate billing/shipping data
   */

  // const billingValidationResult = validateBillingData(
  //   order.billing,
  //   order.shipping,
  //   registration as RegistrationType
  // );
  // if (!billingValidationResult.isValid) result.isValid = false;
  // result.messageKeys.push(...billingValidationResult.messageKeys);

  return result;
}
