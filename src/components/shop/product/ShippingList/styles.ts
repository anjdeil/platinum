import styled from "@emotion/styled";

export const ShippingListContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 39px 16px;
    background-color: ${({ theme }) => theme.background.secondary};
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media ${({ theme }) => theme.media.large} {
        padding: 16px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 13px 16px;
    }
`;

export const ShippingItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    flex: 1;
    row-gap: 24px;
`;

export const ShippingTitle = styled.span`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;