import AccountInfoBlockList from "@/components/pages/account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLayout from "@/components/pages/account/AccountLayout";
import AccountLinkBlockList from "@/components/pages/account/AccountLinkBlockList/AccountLinkBlockList";
import OrderTable from "@/components/pages/order/OrderTable/OrderTable";
import { transformOrders } from "@/services/transformers/transformOrders";
import { useFetchOrdersQuery } from "@/store/rtk-queries/wooCustomApi";
import { AccountInfoWrapper } from "@/styles/components";
import { accountLinkList, redirectToLogin } from "@/utils/consts";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

// Delete this interface when we have a user type 
interface UserType
{
    id: number;
    loyaltyProgram?: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const cookies = context.req.headers.cookie;
    if (!cookies) return redirectToLogin;

    const user: UserType = {
        id: 1,
        loyaltyProgram: "Gold",
    }

    return {
        props: {
            user,
        }
    }
}

interface MyAccountPropsType
{
    user: UserType,
}

const MyAccount: FC<MyAccountPropsType> = ({ user }) =>
{
    const t = useTranslations("MyAccount");

    const { data: ordersData } = useFetchOrdersQuery({
        customer: user.id,
        per_page: 5
    });

    const translatedAccountLinkList = accountLinkList.map(({ title, ...props }) => ({
        title: t(title),
        ...props
    }));

    const { orderCount, totalAmount } = transformOrders(ordersData || []);

    return (
        <AccountLayout title={t("clientPersonalAccount")}>
            <AccountInfoWrapper>
                <AccountInfoBlockList orderCount={orderCount} totalAmount={totalAmount} loyaltyProgram={user.loyaltyProgram || null} />
                <AccountLinkBlockList list={translatedAccountLinkList} />
            </AccountInfoWrapper>
            {/* <OrderTable orderList={ordersData} title={t("recentOrders")} /> */}
        </AccountLayout>
    );
}

export default MyAccount;