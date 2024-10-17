import { StyledIconWrapper } from "@/styles/components";
import { AccountInfoBlockProps } from "@/types/pages/account";
import { useTheme } from "@emotion/react";
import { StyledInfoContainer, StyledInfoWrapper, StyledTitle, StyledValue } from "./styles";

const AccountInfoBlock: React.FC<AccountInfoBlockProps> = ({ icon: Icon, title, value, background }) =>
{
    const theme = useTheme();
    const backgroundColor = background ? background : (() => {
        switch (value.toUpperCase()) {
            case "SILVER":
                return theme.colors.silver;
            case "GOLD":
                return theme.colors.active;
            case "PLATINUM":
                return theme.colors.platinum;
            default:
                return theme.background.grey;            
        }
    })();

    const textColor = value.toUpperCase() === 'SILVER' ? theme.colors.black : theme.colors.white

    return (
        <StyledInfoContainer background={backgroundColor} color={textColor}>
            <StyledIconWrapper>
                <Icon />
            </StyledIconWrapper>
            <StyledInfoWrapper>
                <StyledTitle color={textColor}>{title}</StyledTitle>
                <StyledValue color={textColor}>{value}</StyledValue>
            </StyledInfoWrapper>
        </StyledInfoContainer>
    )
}

export default AccountInfoBlock;