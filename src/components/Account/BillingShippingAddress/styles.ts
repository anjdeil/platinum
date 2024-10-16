import { InfoLineProps } from "@/types/layouts/Account";
import styled from "@emotion/styled";

export const InfoLine = styled.li<InfoLineProps>`
    display: flex;
    justify-content: space-between;
    text-align: left;
    font-size: 16px;
    line-height: 1.5;

    & span:first-of-type {
        text-transform: uppercase;
    }

    & span:last-of-type {
        min-width: 240px;
        text-align: ${({ textAllign }) => textAllign ? textAllign : ''};
        font-size: ${({ fontSize = "16px" }) => fontSize};
        line-height: ${({ lineHeight = "1.5" }) => lineHeight};
        font-weight: ${({ fontWeight = 400 }) => fontWeight};
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;

        & span:last-of-type {
            min-width: 180px;
            font-size: ${({ tabletFontSize = "14px" }) => tabletFontSize};
            line-height: ${({ tabletLineHeight = "1.5" }) => tabletLineHeight};
        }
    }

    @media ${({ theme }) => theme.media.medium} {
        line-height: 1.375;

        & span:first-of-type {
            font-size: 12px;
        }

        & span:last-of-type {
            text-align: right;   
            min-width: unset;         
        }
    }
`;