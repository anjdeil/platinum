import AccountInfoBlockList from "@/components/Account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLayout from "@/components/Account/AccountLayout";
import AccountLinkBlockList from "@/components/Account/AccountLinkBlockList/AccountLinkBlockList";
import Table from "@/components/Account/Table/Table";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { AccountTitle } from "@/styles/components";
import { useTranslations } from "next-intl";
import { accountInfoList, accountLinkList, orderList } from "../my-account/testConsts";

export default function Account()
{
    const t = useTranslations("MyAccount");

    const translatedAccountInfoList = accountInfoList.map(({ title, ...props }) => ({
        title: t(title),
        ...props
    }));

    const translatedAccountLinkList = accountLinkList.map(({ title, ...props }) => ({
        title: t(title),
        ...props
    }))

    return (
        <AccountLayout title="">
            <AccountTitle as={"h1"}>{t("clientPersonalAccount")}</AccountTitle>
            <AccountInfoBlockList list={translatedAccountInfoList} />
            <AccountLinkBlockList list={translatedAccountLinkList} />
            <form action="">
                <CustomInput required type="description" name="name" label="Name" placeholder="Example text for textarea"/>
                <CustomInput required name="name" label="Name" placeholder="Example text" errorText="This is a hint text to help user."/>
                <CustomInput type="password" required name="password" label="Password" placeholder="Enter password" />
                <button type="submit">Ok</button>
            </form>
            <Table orderList={orderList} />                
        </AccountLayout>
    );
};