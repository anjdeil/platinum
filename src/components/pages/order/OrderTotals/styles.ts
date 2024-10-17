import styled from "@emotion/styled";

export const TotalsTable = styled.div<{ includeBorders?: boolean }>`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Label = styled.div`
    font-size: 16px;
    line-height: 1.5;
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.medium} {
        font-size: 14px;
    }
`;

export const LabelCode = styled.span`
    padding: 0.2em 0.4em;
    display: inline-block;
    margin-top: 0.2em;
    border-radius: 6px;
`;

export const Value = styled.div`
    font-size: 16px;
    line-height: 1.5;
    text-align: right;

    @media ${({ theme }) => theme.media.medium} {
        font-size: 14px;
    }
`;


export const LastRow = styled(Row)`
    margin-top: 8;

    & div:last-of-type {
        font-weight: 500;
        font-size: 24px;
    }
`;