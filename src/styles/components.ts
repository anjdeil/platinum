import { LogoLinkImageProps, LogoLinkProps, StyledButtonProps } from '@/types/styles/components';
import styled from "@emotion/styled";
import Image from 'next/image';
import Link from 'next/link';

interface TitleProps
{
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize?: number;
    textAlign?: "center" | "left" | "right";
    uppercase?: boolean;
}

export const Title = styled.h1<TitleProps>`
    color: black;
    font-size: ${({ fontSize = 24 }) => fontSize}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: ${({ uppercase }) => uppercase ? "uppercase" : "none"};
    text-align: ${({ textAlign = "left" }) => textAlign};
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
    line-height: 24px;
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
        line-height: 20px;        
    }
`;

export const StyledIconButton = styled.button`
  /* padding: 8px; */
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  position: relative;
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

export const LogoLinkImage = styled(Image) <LogoLinkImageProps>`
    width: 100%;
    height: 100%;
`;