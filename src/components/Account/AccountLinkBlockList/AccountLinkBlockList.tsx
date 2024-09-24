import ChangePasswordIcon from "@/components/Common/Icons/ChangePasswordIcon/ChangePasswordIcon";
import InformationIcon from "@/components/Common/Icons/InformationIcon/InformationIcon";
import LogOutIcon from "@/components/Common/Icons/LogOutIcon/LogOutIcon";
import OrderHistoryIcon from "@/components/Common/Icons/OrderHistoryIcon/OrderHistoryIcon";
import AccountLinkBlock from "../AccountLinkBlock/AccountLinkBlock";
import { StyledListContainer } from "./styles";

const AccountLinkBlockList = () =>
{
    return (
        <StyledListContainer>
            <AccountLinkBlock icon={ InformationIcon } title="MY INFORMATION" href="/information"/>
            <AccountLinkBlock icon={ OrderHistoryIcon } title="ORDER HISTORY" href="/history"/>
            <AccountLinkBlock icon={ ChangePasswordIcon } title="CHANGE PASSWORD" href="/change-password"/>
            <AccountLinkBlock icon={ LogOutIcon } title="LOG OUT" href="/logout"/>
        </StyledListContainer>
    )
}

export default AccountLinkBlockList;