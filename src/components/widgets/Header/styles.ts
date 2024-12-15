import { Container } from '@/styles/components'
import {
  HeaderContainerProps,
  HeaderWrapperProps,
} from '@/types/components/widgets/header'
import styled from '@emotion/styled'

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  z-index: 10;
  height: 78px;
  display: grid;
  align-items: center;
  background: ${({ theme, backgroundColor = theme.background.primaryGradient }) =>
    backgroundColor};
  position: relative;

  @media ${({ theme }) => theme.media.large} {
    padding-block: 16px;
  }
`

export const MenuWrapper = styled.div`
  display: flex;
  gap: 75px;

  @media ${({ theme }) => theme.media.large} {
    gap: 48px;
  }
`

export const CategoriesButton = styled.button`
  display: inline-block;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  transition: all 0.2s ease;
  color: ${({ theme, color = theme.colors.white }) => color};
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &.active {
    font-weight: 600;
  }

  &:hover {
    opacity: 0.7;
  }

  @media ${({ theme }) => theme.media.large} {
    font-size: 16px;
  }
`

export const HeaderContainer = styled(Container)<HeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap = '30px' }) => gap};
  align-items: center;
  overflow: visible;
  width: 93%;
`

export const HeaderContent = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.media.large} {
    gap: 24px;
  }
`

export const HeaderSearch = styled.div`
  max-width: 195px;

  @media ${({ theme }) => theme.media.large} {
    max-width: 160px;
  }
`

export const HeaderIcons = styled.div`
  max-width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  @media ${({ theme }) => theme.media.large} {
    gap: 24px;
  }
`
