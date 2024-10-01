import AccountLayout from "@/components/Account/AccountLayout";
import AccountOrderProductList from "@/components/Account/AccountOrderProductList/AccountOrderProductList";
import Notification from "@/components/Layouts/Notification/Notification";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { OrderType } from "@/types/services/woocommerce/OrderType";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slug } = context.query;

    try {
        const orderResponse = await wooCommerceRestApi.get(`orders/${slug}`);

        return {
            props: {
                order: orderResponse.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

interface OrderPropsType {
    order: OrderType
}

const Order: FC<OrderPropsType> = ({ order }) => {
    const t = useTranslations("MyAccount");

    console.log('order...', order);

    const date = new Date(order.date_created);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AccountLayout title={`${t('order')} #${order.id}`}>
            <Notification>
                <span>{`${t("notification", { orderId: order.id, date: formattedDate })} ${t(order.status)}`}</span>
            </Notification>
            <AccountOrderProductList order={order} />
        </AccountLayout>
    )
}

export default Order;