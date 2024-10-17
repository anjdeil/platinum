import { OrderSummaryType } from "@/types/layouts/Account";
import { OrderType } from "@/types/services";

export function transformOrders(orders: OrderType[]): OrderSummaryType | []
{
  if (!Array.isArray(orders))
  {
    console.log(orders);
    // throw new Error("orders must be an array");
    return [];
  }

  const orderCount = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);

  return { orderCount, totalAmount };
}