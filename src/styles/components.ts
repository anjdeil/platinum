import { AccountInfoWrapperProps } from '@/types/pages/account';
import { LogoLinkImageProps, LogoLinkProps, StyledButtonProps } from '@/types/styles/components';
import styled from "@emotion/styled";
import Image from 'next/image';
import Link from 'next/link';

interface TitleProps
{
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize?: string;
    mobFontSize?: string;
    textalign?: "center" | "left" | "right";
    uppercase?: boolean;
    marginBottom?: string;
    tabletMarginBottom?: number;
    mobMarginBottom?: number;
}

export const Title = styled.h1<TitleProps>`
    color: ${({ theme }) => theme.colors.black};
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    text-transform: ${({ uppercase }) => uppercase ? "uppercase" : 'none'};
    margin-bottom: ${({ marginBottom }) => marginBottom };
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
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

//----------------------FORM

interface CustomFormProps
{
    maxWidth?: string;
}

export const CustomForm = styled.form<CustomFormProps>`
    margin: 0 auto;
    max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '1100px'};
`;

export const FormWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
    column-gap: 1%;
    row-gap: 15px;
    padding-bottom: 20px;

    @media ${({ theme }) => theme.media.medium} {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
`;

export const FormWrapperBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
