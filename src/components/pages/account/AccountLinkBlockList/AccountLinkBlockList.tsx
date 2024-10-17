import { AccountInfoBlockLinkProps } from "@/types/layouts/Account";
import React from "react";
import AccountLinkBlock from "../AccountLinkBlock/AccountLinkBlock";
import { StyledListContainer } from "./styles";

const AccountLinkBlockList: React.FC<AccountInfoBlockLinkProps> = ({list}) =>
{
    return (
        <StyledListContainer>
            {list.map(item => (
                <AccountLinkBlock key={item.title} icon={item.icon} title={item.title} href={item.href}/>
            ))}
        </StyledListContainer>
    )
}

export default AccountLinkBlockList;