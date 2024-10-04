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
    padding: 12px;
    display: flex;
    text-transform: uppercase;
    align-items: center;

    & tr, 
    & th {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;       
    }

    @media ${({ theme }) => theme.media.large} {
        & tr, 
        & th {
            font-size: 12px;
            line-height: 16px;
            font-weight: 400; 
        }         
    }

    @media ${({ theme }) => theme.media.medium} {
        display: none;
    }
`;

export const StyledTr = styled.tr`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
`;

export const StyledBody = styled.tbody`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0;

    @media ${({ theme }) => theme.media.medium} {
        row-gap: 16px;
    }  
`;

export const StyledBodyTr = styled(StyledTr)`
    padding: 16px;
    border-radius: 0;
    border: ${({ theme }) => `1px solid ${theme.colors.silver}`};
    border-top: none;
    display: flex;

    @media ${({ theme }) => theme.media.large} {
        padding: 8px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 16px;
        flex-direction: column;        
        row-gap: 16px;
        border-radius: 8px;
        border-top: ${({ theme }) => `1px solid ${theme.colors.silver}`};;
    }
`;

export const StyledTh = styled.th`
    width: 100%;
    text-align: center;
`;

export const StyledDetailesTh = styled(StyledTh)`
    width: 200%;
`;

export const StyledTd = styled.td`
    width: 100%;
    text-align: center;

    & a {
        text-decoration: none;
    }
`;

export const StyledActionsTd = styled(StyledTd)`
    display: flex;
    gap: 20px;
    align-items: center;
`;

export const StyledDetailesTd = styled(StyledTd)`
    width: 200%;

    @media ${({ theme }) => theme.media.medium} {
        width: 100%;
    }
`;

export const StyledNoAndDate = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & span:first-of-type {
        margin: auto;
    }

    & span:last-of-type {
        display: none;
    }

    @media ${({ theme }) => theme.media.medium} {
        & span:first-of-type {
            margin: unset;
        }

        & span:last-of-type {
            display: unset;
        }
    }    
`;

export const StyledSpan = styled.span`
    font-size: 16px;
    line-height: 24px;    
    font-weight: 400;

    @media ${({ theme }) => theme.media.large} {
        font-size: 12px;
        line-height: 16px;
    }
`;

export const StyledDateTd = styled(StyledTd)`
    font-size: 16px;
    line-height: 24px;

    @media ${({ theme }) => theme.media.large} {        
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
    }

    @media ${({ theme }) => theme.media.medium} {        
        display: none;
    }
`;

export const StyledTotalSpan = styled.span`
    display: block;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    @media ${({ theme }) => theme.media.large} {        
        font-size: 14px;
        line-height: 22px;        
    }
`;

export const StyledOrderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span:first-of-type {
        display: none;
    }

    & span:last-of-type {
        margin: auto;
    }

    @media ${({ theme }) => theme.media.medium} {
        & span:first-of-type {
            display: unset;
        }

        & span:last-of-type {
            margin: unset;
        }
    }  
`;

export const StyledOrderSpan = styled(StyledSpan)`
    font-size: 16px;
    line-height: 24px;    

    @media ${({ theme }) => theme.media.large} {        
        font-size: 14px;
        line-height: 22px;
    }

    @media ${({ theme }) => theme.media.medium} {
        text-transform: uppercase;
        font-size: 12px;
        line-height: 16px;
    }
`;

export const StyledPdfButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;