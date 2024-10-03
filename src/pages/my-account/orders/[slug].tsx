import AccountLayout from "@/components/Account/AccountLayout";
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

    return (
        <AccountLayout title={t('order')}>
            order
        </AccountLayout>
    )
}

export default Order;