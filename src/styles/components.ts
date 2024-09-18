import { StyledButtonProps } from '@/types/styles/components';
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

export const StyledButton = styled.button<StyledButtonProps>`
    box-sizing: border-box;
    width: ${({ width = '100%' }) => width};
    height: ${({ height = '48px' }) => height};
    border-radius: 10px;
    color: ${({ theme, color = theme.colors.black }) => color};
    background-color: ${({ backgroundColor = 'transparent' }) => backgroundColor};
    font-size: 14px;
    line-height: 20px;
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
        height: 56px;
        line-height: 24px;
        font-size: 16px;
    }
`;

export const StyledIconButton = styled.button`
    padding: 8px;
    background-color: transparent;
    border: none;
    display: flex;
    cursor: pointer;
`;