import styled from '@emotion/styled'
import Link from 'next/link'

interface MiniCartContainerProps {
  isVisible?: boolean
}

export const MiniCartContainer = styled.div<MiniCartContainerProps>`
  width: 620px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 0;
  padding: 48px;
  overflow-y: auto;
  transform: ${({ isVisible }) => (isVisible ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  /*   &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & {
    scrollbar-width: none;
    -ms-overflow-style: none;
  } */
  @media ${({ theme }) => theme.media.large} {
    width: 500px;
  }
`

export const CartLink = styled(Link)`
  text-decoration: none;
`
