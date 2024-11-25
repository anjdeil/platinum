import { Container } from '@/styles/components';
import {
  HeaderContainerProps,
  HeaderWrapperProps,
} from '@/types/components/widgets/header';
import styled from '@emotion/styled';

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  height: 78px;
  display: grid;
  align-items: center;
  background: ${({ theme, backgroundColor = theme.background.primaryGradient }) =>
    backgroundColor};
  position: relative;
  z-index: 101;

  @media ${({ theme }) => theme.media.large} {
    padding-block: 16px;
  }
`;

export const HeaderContainer = styled(Container)<HeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap = '30px' }) => gap};
  align-items: center;
  overflow: visible;
  width: 93%;
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
