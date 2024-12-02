import { AccountInfoWrapperProps } from '@/types/pages/account';
import { LogoLinkImageProps, LogoLinkProps, StyledButtonProps, TextProps } from '@/types/styles/components';
import styled from "@emotion/styled";
import { Pagination } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize?: string;
    mobFontSize?: string;
    textalign?: "center" | "left" | "right";
    uppercase?: boolean;
    marginTop?: number;
    marginBottom?: number;
    tabletMarginBottom?: number;
    mobMarginBottom?: number;
}

/** Titles components */
export const Title = styled.h1<TitleProps>`
    color: ${({ theme }) => theme.colors.black};
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    text-transform: ${({ uppercase }) => uppercase ? "uppercase" : 'none'};
    text-align: ${({ textalign = 'center' }) => textalign};
    margin-top: ${({ marginTop = '0' }) => marginTop};
    margin-bottom: ${({ marginBottom = '0' }) => marginBottom};

    @media ${({ theme }) => theme.media.large} {
        font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
        font-weight: ${({ fontWeight }) => fontWeight};
        font-size: ${({ fontSize }) => fontSize};
    }

    @media ${({ theme }) => theme.media.small} {
        font-size: ${({ mobFontSize }) => mobFontSize};
    }
`;

export const AccountTitle = styled(Title) <TitleProps>`
    margin-top: 24px;
    margin-bottom: ${({ marginBottom = 48 }) => marginBottom}px;

    @media ${({ theme }) => theme.media.large} {
        margin-bottom: ${({ tabletMarginBottom = 24 }) => tabletMarginBottom}px;
    }

    @media ${({ theme }) => theme.media.medium} {
        margin-bottom: ${({ mobMarginBottom = 24 }) => mobMarginBottom}px;
    }
`;

/** Containers */
export const Container = styled.div`
    box-sizing: content-box;
    margin: 0 auto;
    padding: 0 32px;
    max-width: 1280px;
    overflow: hidden;

    @media ${({ theme }) => theme.media.medium} {
        padding: 0 20px;
    }
`;

export const AccountInfoWrapper = styled.div<AccountInfoWrapperProps>`
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
        flex-direction: ${({ mobileReverse = false }) => mobileReverse ? 'column-reverse' : 'column'};
        margin-bottom: 64px;
    }
`;

/** 
 * Buttons
 * Links
 */
export const StyledButton = styled.button<StyledButtonProps>`
    box-sizing: border-box;
    width: ${({ width = '100%' }) => width};
    min-width: ${({ minWidthDesktop = 'auto' }) => minWidthDesktop};    
    padding-inline: 16px;
    border-radius: 10px;
    color: ${({ theme, secondary = false }) => secondary ? theme.colors.black : theme.colors.white};
    background-color: ${({ notify = false, secondary = false, theme }) => notify ? theme.colors.secondary : secondary ? 'transparent' : theme.colors.primary};
    padding-block: 16px;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
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
    }

    @media ${({ theme }) => theme.media.medium} {
        min-width: ${({ minWidthMobile = 'auto' }) => minWidthMobile};
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

export const PagesNavigation = styled(Pagination)(({ theme }) => ({
    ".MuiPaginationItem-root": {
        borderRadius: '10px',
        padding: '6px 10px',
        minWidth: 'fit-content',
        height: 'fit-content',
        font: theme.fonts.bodyMiddleReg,
        fontWeight: 500,
        lineHeight: '1em',

        "&.Mui-selected": {
            backgroundColor: theme.background.secondary,
        }
    }
}));

/** 
 * icons
 * Images
 **/
export const StyledIconWrapper = styled.div`
    flex-shrink: 0;
    width: 40px;
    aspect-ratio: 1;
    display: flex;

    & svg {
        width: 100%;
        object-fit: cover;
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
    height: 100%;
`;

export const Text = styled.span<TextProps>`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-align: ${({ textalign = 'left' }) => textalign};
`;

export const VariationTitle = styled(Text)`
    text-transform: uppercase;
    
    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }
`;

export const TinyText = styled.p`
    font: ${({ theme }) => theme.fonts.bodysmallReg};
`;