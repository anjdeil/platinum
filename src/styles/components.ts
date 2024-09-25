import { TitleCatalogProps } from '@/types/styles/components';
import styled from 'styled-components';

interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize: number;
}

export const Title = styled.h1.attrs<TitleProps>(({ as = "h2" }) => ({ as })) <TitleProps>`
    color: black;
    font-size: ${({ fontSize = 24 }) => fontSize}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;

const Container = styled.div`
    margin: 0 auto;
`;


export const TitleCatalog = styled.h2<TitleCatalogProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ mobFontSize = '16px' }) => mobFontSize};
    line-height: ${({ mobLineHeight = '24px' }) => mobLineHeight};
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '24px' }) => fontSize};
        line-height: ${({ lineHeight = '32px' }) => lineHeight};
    }
`;