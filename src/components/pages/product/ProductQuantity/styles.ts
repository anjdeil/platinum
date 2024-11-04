import styled from "@emotion/styled";

export const QuantityContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    width: min-content;
    flex-grow: 0;    

    @media ${({ theme }) => theme.media.medium} {
        width: 100%;
        padding-inline: 19px; 
    }
`;

export const QuantityButton = styled.button`
    background-color: transparent;
    border: none;
    width: 24px;
    aspect-ratio: 1;
    cursor: pointer;
    justify-content: center;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    &:disabled path {
        fill: ${({ theme }) => theme.colors.grey};
    }

    &:hover {
        scale: 1.2;
    }
`;

export const QuantityInput = styled.input`
    border: ${({ theme }) => `1px solid ${theme.colors.active}`};
    border-radius: 8px;
    padding: 16px;
    width: 104px;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-align: center;

    @media ${({ theme }) => theme.media.medium} {
        width: 100%;     
    }
`;