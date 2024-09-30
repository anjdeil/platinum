import AccountLayout from "@/components/Account/AccountLayout";
import { OrderType } from "@/types/services/woocommerce/OrderType";
import { FC } from "react";

interface OrderPropsType {
    order: OrderType
}

const Order: FC<OrderPropsType> = ({ order }) => {
    return (
        <AccountLayout title="Order">
            <h1>Order</h1>
        </AccountLayout>
    )
}

export default Order;