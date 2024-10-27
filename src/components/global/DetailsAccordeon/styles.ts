import styled from "@emotion/styled";

export const DetailsWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};

    & .MuiCollapse-wrapper {
        padding-top: 24px;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;

export const SummaryStyled = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: inherit;
    background-color: ${({ theme }) => theme.background.secondary};
    cursor: pointer;    
`;