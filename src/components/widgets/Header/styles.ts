import { Container } from "@/styles/components";
import { HeaderContainerProps, HeaderWrapperProps } from "@/types/components/widgets/header";
import { NavLinkProps } from "@/types/menus/nav";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
    height: 78px;
    display: grid;
    align-items: center;
    background: ${({ theme, backgroundColor = theme.background.primaryGradient }) => backgroundColor};
    position: relative;
    z-index: 5;

   
`;
export const HeaderCatalog = styled.div<NavLinkProps>`

    display: inline-block;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg}; 
    font-size: ${({ fontSize }) => fontSize};
    text-decoration: none;
    text-align: ${({ textalign = "center" }) => textalign};
    transition: all 0.2s ease;
    color: ${({ theme, color = theme.colors.white }) => color};
    text-transform: uppercase;
    transition: all 0.2s ease;
    cursor: pointer;

   

    &:hover {
        opacity: 0.7;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '16px' }) => (fontSize)};
    }
    margin-right: 20px;
`;

export const HeaderContainer = styled(Container) <HeaderContainerProps>`
    display: flex;
    justify-content: space-between;
    gap: ${({ gap = '30px' }) => gap};
    align-items: center;
    overflow: visible;
    width: 100%;
`;

export const HeaderNav = styled.div`
display: flex;
align-items: center;
    flex-grow: 1;
`;

export const HeaderContent = styled.div`
    display: flex;
    gap: 50px;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.media.large} {
        gap: 24px;
    }
`;

export const HeaderSearch = styled.div`
    max-width: 195px;

    @media ${({ theme }) => theme.media.large} {
        max-width: 160px;
    }
`;

export const HeaderIcons = styled.div`
    max-width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;

    @media ${({ theme }) => theme.media.large} {
        gap: 24px;
    }
`;