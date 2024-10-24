import styled from "@emotion/styled";

export const PromotionContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column;
    }
`;

export const PromotionTitle = styled.span`
    font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
    text-align: left;
    text-transform: uppercase;
`;

export const TimerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 32px;
    align-items: center;
`;

export const ItemBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    justify-content: space-between;
    align-items: center;
`;

export const ItemCount = styled.p`
    font: ${({ theme }) => theme.fonts.titleH2Medium}; 
    color: ${({ theme }) => theme.colors.active}; 
`;

export const ItemText = styled.p`
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    color: ${({ theme }) => theme.colors.grey};
    text-transform: uppercase;
`;
