import { Container } from "@/styles/components";
import { HeaderContainerProps, HeaderWrapperProps } from "@/types/layouts/Header";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
    padding-block: 16px;
    background: ${({ theme, backgroundColor = theme.background.primaryGradient }) => backgroundColor};

    @media ${({ theme }) => theme.media.large} {
        padding-block: 18.5px;
    }
`;

export const HeaderContainer = styled(Container) <HeaderContainerProps>`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: ${({ gap = '16px' }) => gap};
    align-items: center;
`;

export const HeaderNav = styled.div`
    grid-column: span 6;
`;

export const HeaderContent = styled.div`
    grid-column: 8 / 13;
    display: flex;
    gap: 24px;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderSearch = styled.div`
    max-width: 195px;
`;

export const HeaderIcons = styled.div`
    flex-grow: 1;
    max-width: 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;