import { StyledIconWrapper } from "@/styles/components";
import { AccountInfoBlockProps } from "@/types/layouts/Account";
import { useTheme } from "@emotion/react";
import { StyledInfoContainer, StyledInfoWrapper, StyledTitle, StyledValue } from "./styles";

const AccountInfoBlock: React.FC<AccountInfoBlockProps> = ({ icon: Icon, title, value }) =>
{
    const theme = useTheme();
    const background = (() => {
        switch (value.toUpperCase()) {
            case "SILVER":
                return theme.colors.silver;
            case "GOLD":
                return theme.colors.active;
            case "PLATINUM":
                return theme.colors.platinum;
            default:
                return theme.background.infoGradient;
        }
    })();

    return (
        <StyledInfoContainer background={background}>
            <StyledIconWrapper>
                <Icon />
            </StyledIconWrapper>
            <StyledInfoWrapper>
                <StyledTitle>{title}</StyledTitle>
                <StyledValue>{value}</StyledValue>
            </StyledInfoWrapper>
        </StyledInfoContainer>
    )
}

export default AccountInfoBlock;