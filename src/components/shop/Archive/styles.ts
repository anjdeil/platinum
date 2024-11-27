import { Container } from "@/styles/components";
import styled from "@emotion/styled";

export const CatalogContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;

export const CatalogTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 24px;
`;

export const CatalogTopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
`;

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

export const CatalogRightWrapper = styled.div`
    grid-column: span 9;

    @media ${({ theme }) => theme.media.large} {
        grid-column: 1 / -1;
    }
`;

export const CatalogListBlock = styled.div`
    grid-column: span 9;

    @media ${({ theme }) => theme.media.large} {
        grid-column: 1 / -1;
    }
`;


