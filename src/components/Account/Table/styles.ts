import styled from "@emotion/styled";

export const StyledTable = styled.table`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 7px 7px 0 0;
    overflow: hidden;
`;

export const StyledHead = styled.thead`
    box-sizing: border-box;
    width: 100%;
    min-height: 56px;
    background-color: ${({ theme }) => theme.colors.silver};
    padding-block: 12px;
    display: none;
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.medium} {
        display: flex;
        align-items: center;

        & tr, 
        & th {
            font-size: 12px;
            line-height: 16px;
            font-weight: 400; 
        }         
    }

    @media ${({ theme }) => theme.media.large} {
        & tr, 
        & th {
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;       
        }
    }
`;

export const StyledTr = styled.tr`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledBodyTr = styled(StyledTr)`
    padding: 16px;
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.silver}`};
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: row;
        gap: 12px;
        border-radius: 0;
        border-top: none;
    }
`;

export const StyledTh = styled.th`
    width: 100%;
    text-align: center;
`;

export const StyledTd = styled.td`
    width: 100%;
    text-align: center;
`;

export const StyledBody = styled.tbody`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        row-gap: 0;
    }  
`;

export const StyledNoAndDate = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        & span:first-of-type {
            margin: auto;
        }

        & span:last-of-type {
            display: none;
        }
    }    
`;

export const StyledSpan = styled.span`
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 24px;
    }
`;

export const StyledDateTd = styled(StyledTd)`
    display: none;

    @media ${({ theme }) => theme.media.medium} {
        display: block;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 24px;
    }
`;

export const StyledTotalSpan = styled.span`
    display: block;
    text-align: left;
`;

export const StyledOrderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        & span:first-of-type {
            display: none;
        }

        & span:last-of-type {
            margin: auto;
        }
    }  
`;

export const StyledOrderSpan = styled(StyledSpan)`
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.medium} {
        text-transform: unset;
        font-size: 14px;
        line-height: 22px;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 24px;
    }
`;