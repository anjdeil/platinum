import { CommonTextProps } from "@/types/components/shop";
import styled from "@emotion/styled";

export const ProductPrice = styled.p<CommonTextProps>`
    color: ${({ theme }) => theme.colors.black};
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    font-size: ${({ fontSize }) => fontSize};
    line-height: ${({ lineHeight }) => lineHeight};
    font-weight: ${({ fontWeight }) => fontWeight};    
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        line-height: ${({ mobLineHeight = '1.5em' }) => mobLineHeight};
    }
`;

export const StyledProductCard = styled.div`
    grid-column: span 1;
    padding: 24px;
    display: flex;
    flex-direction: column;    
    align-items: center;
    row-gap: 16px;

    @media ${({ theme }) => theme.media.large} {
        padding: 16px 8px;        
    }

    @media ${({ theme }) => theme.media.medium} {        
        padding: 8px;
        row-gap: 8px;
    }
`

export const TitlePriceWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 8px;
    justify-content: space-between;
    align-items: center;
`

export const ProductWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 16px;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

export const ProductImageWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 205px;
    aspect-ratio: 1;

    @media ${({ theme }) => theme.media.large} {
        max-width: 100px;
    }

    @media ${({ theme }) => theme.media.medium} {
        max-width: 80px;
    }
`