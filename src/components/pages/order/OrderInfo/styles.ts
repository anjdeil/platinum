import styled from "@emotion/styled";

export const OrderTableWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
`;

export const TableHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: ${({ theme }) => theme.background.secondary};
    padding: 12px 16px;
    text-align: center;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 1.33;
    font-weight: 500;

    @media ${({ theme }) => theme.media.large} {
        padding: 16px;
        font-size: 16px;
        line-height: 1.5;
    }
`;

export const TableBody = styled.ul`
    box-sizing: border-box;
    width: 100%;
    padding-block: 24px;
    padding-inline: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid ${({ theme }) => theme.colors.silver};
    border-top: none;
    border-radius: 0 0 10px 10px;

    @media ${({ theme }) => theme.media.large} {
        gap: 8px;
        padding: 16px;
        padding-top: 24px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 8px;
        padding-top: 24px;   
    }
`;