import { StyledInfoContainerProps, StyledTextPropsProps } from "@/types/layouts/Account";
import styled from "@emotion/styled";

export const StyledInfoContainer = styled.div<StyledInfoContainerProps>`
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    padding: 24px;
    border-radius: 8px;
    background: ${({ theme, background = theme.background.infoGradient }) => background};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;

    @media ${({ theme }) => theme.media.large} {
        padding: 16px;
        gap: 0; 
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 24px;
        gap: 24px;
    }
    
    & path {
        fill: ${({ color }) => color};
    }
`;

export const StyledInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase; 
    
    @media ${({ theme }) => theme.media.large} {
        gap: 8px;
    }

    @media ${({ theme }) => theme.media.medium} {
        gap: 10px;
    }
`;

export const StyledTitle = styled.span<StyledTextPropsProps>`
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    text-align: center;
    hyphens: auto;
    color: ${({ color }) => color};

    @media ${({ theme }) => theme.media.large} {
        font-size: 12px;
        line-height: 1.33;
    }
    @media ${({ theme }) => theme.media.medium} {
        font-size: 14px;
        line-height: 1.7;
    }
`;

export const StyledValue = styled.span<StyledTextPropsProps>`    
    font-size: 24px;
    line-height: 1.33;
    font-weight: 500;
    color: ${({ color }) => color};

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 1.5;
    }
    @media ${({ theme }) => theme.media.medium} {
        font-size: 24px;
        line-height: 1.33;
    }
`;
