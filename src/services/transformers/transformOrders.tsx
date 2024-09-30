import { OrderSummaryType } from "@/types/layouts/Account";
import { OrderType } from "@/types/services/woocommerce/OrderType";

export function transformOrders(orders: OrderType[]): OrderSummaryType {
  const orderCount = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  
  return { orderCount, totalAmount };
}