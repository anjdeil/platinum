import { LogoLinkImageProps, LogoLinkProps, StyledButtonProps, TitleCatalogProps } from '@/types/styles/components';
import styled from "@emotion/styled";
import Image from 'next/image';
import Link from 'next/link';

interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize?: string;
    lineHeight?: string;
    textAlign?: "center" | "left" | "right";
    uppercase?: boolean;
    marginBottom?: number;
    tabletMarginBottom?: number;
    mobMarginBottom?: number;
    mobFontSize?: string;
    mobFontWeight?: number;
}

export const Title = styled.h1<TitleProps>`
    color: black;
    font-size: ${({ fontSize = '24px' }) => fontSize};
    line-height: ${({ lineHeight = '1.5rem' }) => lineHeight}; 
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: ${({ uppercase }) => uppercase ? "uppercase" : 'none'};
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ mobFontSize = '18px' }) => mobFontSize};
        font-weight: ${({ mobFontWeight = 600 }) => mobFontWeight};
    }
`;

export const AccountTitle = styled.h2<TitleProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: 24px;
    line-height: 2rem;
    font-weight: 600;
    text-align: center;
    text-transform: ${({ uppercase }) => uppercase ? "uppercase" : 'none'};
    margin-top: 24px;
    margin-bottom: ${({ marginBottom = 48 }) => marginBottom}px;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 1.5rem;
        margin-bottom: ${({ tabletMarginBottom = 24 }) => tabletMarginBottom}px;
    }

    @media ${({ theme }) => theme.media.medium} {
        margin-bottom: ${({ mobMarginBottom = 24 }) => mobMarginBottom}px;
    }
`;

export const Container = styled.div`
    box-sizing: content-box;
    margin: 0 auto;
    padding: 0 32px;
    max-width: 1280px;

    @media ${({ theme }) => theme.media.medium} {
        padding: 0 20px;
    }
`;

export const StyledButton = styled.button<StyledButtonProps>`
    box-sizing: border-box;
    width: ${({ width = '100%' }) => width};
    min-width: ${({ minWidthDesktop = 'auto' }) => minWidthDesktop};    
    padding-inline: 16px;
    border-radius: 10px;
    color: ${({ theme, color = theme.colors.black }) => color};
    background-color: ${({ backgroundColor = 'transparent' }) => backgroundColor};
    padding-block: 16px;
    line-height: 1.5rem;
    font-size: 16px;
    font-weight: 400;
    text-transform: none;
    border: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
        background-color: ${({ theme, hoverBackgroundColor = theme.background.hover }) => hoverBackgroundColor};
    }

    @media ${({ theme }) => theme.media.large} {
        padding-block: 11px;
        min-width: ${({ minWidthTablet = 'auto' }) => minWidthTablet};
        font-size: 14px;
        line-height: 1.25rem;        
    }
`;

export const LogoLink = styled(Link) <LogoLinkProps>`
    display: flex;
    position: relative;
    width: ${({ desktopwidth = 92 }) => `${desktopwidth}px`};
    height: ${({ desktopheight = 92 }) => `${desktopheight}px`};
    
    @media ${({ theme }) => theme.media.large} {
        width: ${({ width = 44 }) => `${width}px`};
        height: ${({ height = 44 }) => `${height}px`};
    }
`;

export const StyledIconWrapper = styled.div`
    flex-shrink: 0;
    width: 40px;
    aspect-ratio: 1;
    display: flex;

    & svg {
        width: 100%;
        aspect-ratio: 1;
    }

    @media ${({ theme }) => theme.media.large} {
        width: 24px;
    }
    @media ${({ theme }) => theme.media.medium} {
        width: 40px;
    }
`;

export const LogoLinkImage = styled(Image) <LogoLinkImageProps>`
    width: 100%;
    aspect-ratio: 1;
`;

export const AccountInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 80px;
   
    @media ${({ theme }) => theme.media.large} {
        margin-bottom: 24px;
    }

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column-reverse;
        margin-bottom: 64px;
    }
`;

export const TitleCatalog = styled.h2<TitleCatalogProps>`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ fontSize = '24px' }) => fontSize};
    line-height: ${({ lineHeight = '1.3rem' }) => lineHeight};    
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ mobFontSize = '16px' }) => mobFontSize};
        line-height: ${({ mobLineHeight = '1.5rem' }) => mobLineHeight};
    }
`;