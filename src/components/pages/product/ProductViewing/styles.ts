import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const ProductViewingStyles = styled(Text)`    
    color: ${({ theme }) => theme.colors.best};

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;
