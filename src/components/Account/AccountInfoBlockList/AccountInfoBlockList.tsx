import { AccountInfoBlockListProps } from "@/types/layouts/Account";
import { useTheme } from "@emotion/react";
import AccountInfoBlock from "../AccountInfoBlock/AccountInfoBlock";
import { StyledListContainer } from "./styles";

const AccountInfoBlockList: React.FC<AccountInfoBlockListProps> = ({ list }) =>
{
    const theme = useTheme();

    return (
        <StyledListContainer>
            {list.map(item => (
                <AccountInfoBlock key={item.title} icon={item.icon} title={item.title} value={item.value}/>
            ))}
        </StyledListContainer>
    )
}

export default AccountInfoBlockList;