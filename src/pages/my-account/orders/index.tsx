import AccountLayout from "@/components/Account/AccountLayout";
import { useTranslations } from "next-intl";
import Table from "@/components/Account/Table/Table";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { OrderType } from "@/types/services/woocommerce/OrderType";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const userOrdersResponse = await wooCommerceRestApi.get('orders', {
            customer: 1
        });

        return {
            props: {
                orders: userOrdersResponse.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}


export default function Orders({ orders }: { orders: OrderType[] }) {

    const t = useTranslations("MyAccount");

    return (
        <AccountLayout title={t("orderHistory")}>
            <Table orderList={orders} />
        </AccountLayout>
    )
}