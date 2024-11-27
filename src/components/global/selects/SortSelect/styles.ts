import { SortSelectProps, SortSelectStyledProps } from "@/types/Layouts/SortSelect";
import styled from "@emotion/styled";

export const SortSelectStyled = styled.div<SortSelectStyledProps>`
    box-sizing: border-box;
    width: ${({ width = '100%' }) => width};
    max-width: ${({ maxWidth = '206px' }) => maxWidth};
    height: ${({ height = '40px' }) => height};
    border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0 0' : '8px')};
    position: relative;
    background: ${({ theme }) => theme.background.secondary};
    display: flex; 
    align-items: center;
    padding: 16px 10px;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    cursor: pointer;

    @media ${({ theme }) => theme.media.large} {
        padding: 12px 10px;
    }    

    @media ${({ theme }) => theme.media.medium} {
        padding: 8px 10px;
    }

`;

export const DropdownMenu = styled.div<SortSelectProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
    max-height: 600px;
    overflow-y: auto;
    background: ${({ theme }) => theme.background.secondary};
    border-radius: 0 0 8px 8px;
    z-index: 1000;
    line-height: 24px;
    transition: height 0.3s ease-out, opacity 0.3s ease-out;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

export const MenuItem = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.white};
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 12px 16px;
    }

    @media ${({ theme }) => theme.media.large} {
        padding: 16px 16px;
    } 
`;

export const Arrow = styled.svg<SortSelectProps>`
    margin-left: auto;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;