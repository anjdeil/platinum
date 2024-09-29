import AccountInfoBlockList from "@/components/Account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLayout from "@/components/Account/AccountLayout";
import AccountLinkBlockList from "@/components/Account/AccountLinkBlockList/AccountLinkBlockList";
import Table from "@/components/Account/Table/Table";
import { transformOrders } from "@/services/transformers/transformOrders";
import { useTranslations } from "next-intl";
import { AccountInfoWrapper } from "./styles";
import { accountLinkList, orderList } from "./testConsts";

export default function MyAccount() {
    const t = useTranslations("MyAccount");

    const translatedAccountLinkList = accountLinkList.map(({ title, ...props }) => ({
        title: t(title),
        ...props
    }));

    const { orderCount, totalAmount } = transformOrders(orderList);

    const loyaltyProgram = null;

    return (
        <AccountLayout title={t("clientPersonalAccount")}>
            <AccountInfoWrapper>
                <AccountInfoBlockList orderCount={orderCount} totalAmount={totalAmount} loyaltyProgram={loyaltyProgram} />
                <AccountLinkBlockList list={translatedAccountLinkList} />  
            </AccountInfoWrapper>    
            <Table orderList={orderList} title="recentOrders"/>   
        </AccountLayout>
    );
}