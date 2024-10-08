import { Container } from "@/styles/components";
import { HeaderContainerProps, HeaderWrapperProps } from "@/types/layouts/Header";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
    padding-block: 18.5px;    
    background: ${({ theme, backgroundColor = theme.background.primaryGradient }) => backgroundColor};

    @media ${({ theme }) => theme.media.large} {
        padding-block: 16px;
    }
`;

export const HeaderContainer = styled(Container) <HeaderContainerProps>`
    display: flex;
    justify-content: space-between;
    gap: ${({ gap = '16px' }) => gap};
    align-items: center;
`;

export const HeaderNav = styled.div`
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