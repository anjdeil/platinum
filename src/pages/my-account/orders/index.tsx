import AccountLayout from "@/components/pages/account/AccountLayout";
import OrderTable from "@/components/pages/order/OrderTable/OrderTable";
import { useFetchOrdersQuery } from "@/store/rtk-queries/wooCustomApi";
import { redirectToLogin } from "@/utils/consts";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

// Delete this interface when we have a user type 
interface UserType
{
    id: number;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const cookies = context.req.headers.cookie;
    if (!cookies) return redirectToLogin;

    const user: UserType = {
        id: 1,
    }

    return {
        props: {
            user,
        }
    }
}

interface OrdersPropsType
{
    user: UserType,
}

const Orders: FC<OrdersPropsType> = ({ user }) =>
{

    const t = useTranslations("MyAccount");

    const { data: ordersData } = useFetchOrdersQuery({
        customer: user.id,
    });

    return (
        <AccountLayout title={t("orderHistory")}>
            <OrderTable orderList={ordersData} />
        </AccountLayout>
    )
}

export default Orders;