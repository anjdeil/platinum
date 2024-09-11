import styled from "styled-components";

interface TitleCatalogProps {
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: number;
}

export const TitleCatalog = styled.h2<TitleCatalogProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ fontSize = 16 }) => fontSize}px;
    line-height: ${({ lineHeight = 24 }) => lineHeight}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = 24 }) => fontSize}px;
        line-height: ${({ lineHeight = 32 }) => lineHeight}px;
    }
`;