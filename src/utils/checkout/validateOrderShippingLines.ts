import { OrderType } from '@/types/services';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';

export default function validateOrderShippingLines(order: OrderType) : {
  isValid: boolean,
  messageKeys: string[]
} {
  const result = {
    isValid: true,
    messageKeys: [] as string[]
  };

  if (!order.shipping_lines.length) {
    result.isValid = false;
    result.messageKeys.push('shippingMethod');
  }

  if (parcelMachinesMethods.includes(order.shipping_lines[0]?.method_id)) {
    const isParcelLockerSelected = Boolean(order.shipping_lines[0].meta_data?.find(({key}) => key === "Selected parcel locker"));
    if (!isParcelLockerSelected) {
      result.isValid = false;
      result.messageKeys.push('parcelLocker');
    }
  }

  return result;
}