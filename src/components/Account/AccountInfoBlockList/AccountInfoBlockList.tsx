import LoyaltyIcon from "@/components/Common/Icons/LoyaltyIcon/LoyaltyIcon";
import MoneyBagIcon from "@/components/Common/Icons/MoneyBagIcon/MoneyBagIcon";
import OrderIcon from "@/components/Common/Icons/OrderIcon/OrderIcon";
import { useTheme } from "@emotion/react";
import AccountInfoBlock from "../AccountInfoBlock/AccountInfoBlock";
import { StyledListContainer } from "./styles";

const AccountInfoBlockList = () =>
{
    const theme = useTheme();

    return (
        <StyledListContainer>
            <AccountInfoBlock icon={ OrderIcon } title="NUMBER OF ORDERS" value="12"/>
            <AccountInfoBlock icon={ MoneyBagIcon } title="TOTAL ORDER AMOUNT" value="10,000 ZL"/>
            <AccountInfoBlock icon={LoyaltyIcon} title="LOYALTY PROGRAM" value="GOLD" type="Gold" />
        </StyledListContainer>
    )
}

export default AccountInfoBlockList;