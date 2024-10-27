import styled from "@emotion/styled";

export const ProductWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-top: 16px;
`;

export const ProductTitleWrapper = styled.div`
    grid-column: 7 / span 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 24px;

    @media ${({ theme }) => theme.media.large} {
        grid-column: 6 / span 7;
        row-gap: 16px;
    }

    @media ${({ theme }) => theme.media.medium} {
        grid-column: 1 / -1;  
        grid-row: 1 / 2;
    }
`;

export const ProductFlexWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ProductImageWrapper = styled.div`
    grid-column: span 5;
    grid-row: 1 / 3;
    margin-top: 57px;

    @media ${({ theme }) => theme.media.large} {        
        margin-top: 0;
    }

    @media ${({ theme }) => theme.media.medium} {        
        grid-column: 1 / -1;
        grid-row: 2 / 3;
    } 
`;

export const ProductInfoWrapper = styled.div`
    grid-column: 7 / span 6;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    margin-bottom: 80px;

    @media ${({ theme }) => theme.media.large} {        
        grid-column: 6 / span 7;
        row-gap: 24px;
    }

    @media ${({ theme }) => theme.media.medium} {        
        grid-column: 1 / -1;
        margin-bottom: 64px;
    }
`;

export const AddToBasketWrapper = styled(ProductFlexWrapper)`
    column-gap: 24px;

    @media ${({ theme }) => theme.media.medium} {        
        flex-direction: column;
        align-items: center;
        row-gap: 24px;        
    }
`;