import { CommonTextProps } from "@/types/layouts/Product";
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
    flex-direction: column;
    row-gap: 8px;
    justify-content: space-between;
    align-items: center;
`

export const BadgeWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
`

export const ProductWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

export const ProductImageWrapper = styled.div`
    position: relative;
    width: 205px;
    aspect-ratio: 1;

    @media ${({ theme }) => theme.media.large} {
        width: 100px;
    }

    @media ${({ theme }) => theme.media.medium} {
        width: 80px;
    }
`