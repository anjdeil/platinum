import AccountInfoBlockList from "@/components/Account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLayout from "@/components/Account/AccountLayout";
import AccountLinkBlockList from "@/components/Account/AccountLinkBlockList/AccountLinkBlockList";
import Table from "@/components/Account/Table/Table";
import { transformOrders } from "@/services/transformers/transformOrders";
import { AccountInfoWrapper } from "@/styles/components";
import { OrderType } from "@/types/services/woocommerce/OrderType";
import { accountLinkList, orderList } from "@/utils/consts";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

const redirectToLogin = {
    redirect: {
        destination: '/my-account/login',
        permanent: false,
    }
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie;
    if (!cookies) return redirectToLogin;

    return {
        props: {
            orderList,
        }
    }
}

interface MyAccountPropsType {
    orderList: OrderType[]
}

const MyAccount: FC<MyAccountPropsType> = ({ orderList }) => {
    const t = useTranslations("MyAccount");

    const translatedAccountLinkList = accountLinkList.map(({ title, ...props }) => ({
        title: t(title),
        ...props
    }));

    const { orderCount, totalAmount } = transformOrders(orderList);

    const loyaltyProgram = 'Gold';

    return (
        <AccountLayout title={t("clientPersonalAccount")}>
            <AccountInfoWrapper>
                <AccountInfoBlockList orderCount={orderCount} totalAmount={totalAmount} loyaltyProgram={loyaltyProgram} />
                <AccountLinkBlockList list={translatedAccountLinkList} />
            </AccountInfoWrapper>
            <Table orderList={orderList} title={t("recentOrders")} />
        </AccountLayout>
    );
}

export default MyAccount;