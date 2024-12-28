import { StyledButton } from "@/styles/components";
import { StyledButtonProps } from "@/types/styles/components";
import styled from "@emotion/styled";

interface FilterIconButtonProps extends StyledButtonProps {
    onClick?: () => void;
}

export const StyledFilteredButton = styled(StyledButton)<FilterIconButtonProps>`    

   display: none;
   @media ${({ theme }) => theme.media.middle} {
    display: block;
    }

    margin-right: 8px;
`;
