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
    line-height: 32px;
    font-weight: 600;

    @media ${({ theme }) => theme.media.large} {
        padding: 16px;
        font-size: 16px;
        line-height: 24px;
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
        padding-inline: 16px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding-inline: 8px;
        padding-bottom: 8px;
    }
`;