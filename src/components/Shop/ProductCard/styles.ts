import { CommonTextProps } from "@/types/layouts/Product";
import styled from "@emotion/styled";

export const ProductTitle = styled.p<CommonTextProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: ${({ lineHeight = '24px' }) => lineHeight};
    font-weight: ${({ mobFontWeight = 400 }) => mobFontWeight};
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '16px' }) => fontSize};
        font-weight: ${({ fontWeight = 500 }) => fontWeight};
    }
`;

export const ProductPrice = styled.p<CommonTextProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: ${({ lineHeight = '22px' }) => lineHeight};
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '16px' }) => fontSize};
        line-height: ${({ lineHeight = '24px' }) => lineHeight};
    }
`;

export const StyledProductCard = styled.div`
    grid-column: span 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;

        @media ${({ theme }) => theme.media.medium} {
            padding: 16px 8px;
            row-gap: 16px;
        }

        @media ${({ theme }) => theme.media.large} {
            padding: 24px;
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
    width: 80px;
    height: 80px;

    @media ${({ theme }) => theme.media.medium} {
        width: 100px;
        height: 100px;
    }

    @media ${({ theme }) => theme.media.large} {
        width: 205px;
        height: 205px;
    }
`