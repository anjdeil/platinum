import { OrderSummaryType } from "@/types/pages/account";
import { OrderType } from "@/types/services/wooCustomApi/shop";

export function transformOrders(orders: OrderType[]): OrderSummaryType | []
{
  if (!Array.isArray(orders))
  {
    // throw new Error("orders must be an array");
    return [];
  }

  const orderCount = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);

  return { orderCount, totalAmount };
}
