import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const ProductPriceWrapper = styled.div`    
    display: flex;
    flex-direction: column;
`;

export const ProductPriceOldStyled = styled(Text)`    
    color: ${({ theme }) => theme.colors.grey};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-decoration: line-through;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px; 
    }
`;

export const ProductPriceStyled = styled.span`
    font: ${({ theme }) => theme.fonts.titleH2Medium};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.large} {
        font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
    }
`;