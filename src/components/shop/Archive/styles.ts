import styled from "@emotion/styled";

export const CatalogLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 16px;
`;

export const CatalogFilterBlock = styled.div`
    grid-column: span 3;

    @media ${({ theme }) => theme.media.large} {
        display: none;         
    }
`;

export const CatalogListBlock = styled.div`
    grid-column: span 9;

    @media ${({ theme }) => theme.media.large} {
        grid-column: 1 / -1;
    }
`;


