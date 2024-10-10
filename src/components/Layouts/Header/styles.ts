import { Container } from "@/styles/components";
import theme from "@/styles/theme";
import { HeaderContainerProps, HeaderWrapperProps } from "@/types/layouts/Header";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
    background: ${({ backgroundColor }) =>
        backgroundColor ||  theme.colors.backgroundGradient};
`

export const HeaderContainer = styled(Container)<HeaderContainerProps>`
  height: ${({ height = '72px' }) => height};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ gap = '16px' }) => gap};
  align-items: center;

  @media ${({ theme }) => theme.media.large} {
    height: ${({ desktopHeight = '77px' }) => desktopHeight};
  }
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
    width: 133px;

    @media ${({ theme }) => theme.media.large} {
        width: 195px;
    }
`;

export const HeaderIcons = styled.div`
    width: 124px;

    @media ${({ theme }) => theme.media.large} {
        width: 210px;
    }
`;