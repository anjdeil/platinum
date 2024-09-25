import AccountInfoBlockList from "@/components/Account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLinkBlockList from "@/components/Account/AccountLinkBlockList/AccountLinkBlockList";
import Table from "@/components/Account/Table/Table";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import ChangePasswordIcon from "@/components/Common/Icons/ChangePasswordIcon/ChangePasswordIcon";
import InformationIcon from "@/components/Common/Icons/InformationIcon/InformationIcon";
import LogOutIcon from "@/components/Common/Icons/LogOutIcon/LogOutIcon";
import LoyaltyIcon from "@/components/Common/Icons/LoyaltyIcon/LoyaltyIcon";
import MoneyBagIcon from "@/components/Common/Icons/MoneyBagIcon/MoneyBagIcon";
import OrderHistoryIcon from "@/components/Common/Icons/OrderHistoryIcon/OrderHistoryIcon";
import OrderIcon from "@/components/Common/Icons/OrderIcon/OrderIcon";
import { AccountTitle } from "@/styles/components";
import { useTranslations } from "next-intl";

export default function Account()
{
    const t = useTranslations("MyAccount");
    
    const accountInfoList = [
        {
            icon: OrderIcon,
            title: t("numberOfOrders"),
            value: "12"
        },
        {
            icon: MoneyBagIcon,
            title: t("totalOrderAmount"),
            value: "10,000 ZL"
        },
        {
            icon: LoyaltyIcon,
            title: t("loyaltyProgram"),
            value: "GOLD"
        },
    ]

    const accountLinkList = [
        {
            icon: InformationIcon,
            title: t("myInformation"),
            href: "/information"
        },
        {
            icon: OrderHistoryIcon,
            title: t("orderHistory"),
            href: "/history"
        },
        {
            icon: ChangePasswordIcon,
            title: t("changePassword"),
            href: "/change-password"
        },
        {
            icon: LogOutIcon,
            title: t("logout"),
            href: "/logout"
        },
    ]
    return (
        <>
            <AccountTitle>{t("clientPersonalAccount")}</AccountTitle>
            <AccountInfoBlockList list={accountInfoList} />
            <AccountLinkBlockList list={accountLinkList} />
            <form action="">
                <CustomInput required type="description" name="name" label="Name" placeholder="Example text for textarea"/>
                <CustomInput required name="name" label="Name" placeholder="Example text" errorText="This is a hint text to help user."/>
                <CustomInput type="password" required name="password" label="Password" placeholder="Enter password" />
                <button type="submit">Ok</button>
            </form>
            <Table />                
        </>
    );
};