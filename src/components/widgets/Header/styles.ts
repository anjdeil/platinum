import { HeaderContainerProps, HeaderWrapperProps } from "@/types/widgets/Header";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
    background: ${({ backgroundColor }) =>
        backgroundColor || 'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)'};
`

export const HeaderContainer = styled.div<HeaderContainerProps>`
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