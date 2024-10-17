import { StyledIconWrapper } from "@/styles/components";
import { AccountLinkBlockProps } from "@/types/pages/account";
import { StyledInfoContainer, StyledInfoWrapper, StyledTitle } from "./styles";

const AccountLinkBlock: React.FC<AccountLinkBlockProps> = ({ icon: Icon, title, href }) =>
{
    return (
        <StyledInfoContainer href={href || '/'}>
            <StyledIconWrapper>
                <Icon />
            </StyledIconWrapper>
            <StyledInfoWrapper>
                <StyledTitle>{title}</StyledTitle>
            </StyledInfoWrapper>
        </StyledInfoContainer>
    )
}

export default AccountLinkBlock;