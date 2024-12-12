import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'

interface CartImgWrapperProps {
  maxWidth?: string
  maxHeight?: string
}
interface CartContentProps {
  gap?: string
  padding?: string
}
interface OnePriceProps {
  fontSize?: string
}
interface CartCardAllWrapperProps {
  padding?: string
}
interface CartCardWrapperProps {
  padding?: string
  marginBottom?: string
  gap?: string
  isLoadingItem?: boolean
}

export const CartTableWrapper = styled.div`
  width: 100%;
`

export const CartImgWrapper = styled.div<CartImgWrapperProps>`
  display: inline-block;
  max-width: ${({ maxWidth = '60px' }) => maxWidth};
  max-height: ${({ maxHeight = '60px' }) => maxHeight};
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  @media ${({ theme }) => theme.media.medium} {
    max-width: 140px;
    max-height: 140px;
    margin-right: 16px;
  }
  padding: 0 !important;
`
export const CartItemImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(0.94);
  @media ${({ theme }) => theme.media.medium} {
    border-radius: 8px;
  }
`

export const CardContent = styled.div<CartContentProps>`
  display: flex;
  flex-grow: 1;
  gap: ${({ gap = '0' }) => gap};
  flex-direction: column;
  padding: ${({ padding = '0' }) => padding};
`

export const OnePrice = styled.span<OnePriceProps>`
  font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ fontSize = '1em' }) => fontSize};
`

export const CartCardAllWrapper = styled.div<CartCardAllWrapperProps>`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  padding: ${({ padding = '16px 16px 0 16px' }) => padding};
  margin-bottom: 16px;
  border-radius: 8px;
`

export const blink = keyframes`
  0%, 100% {
    opacity: 1;
   
  }
  50% {
    opacity: 0.4;
    
  }
`

export const CartCardWrapper = styled.div<CartCardWrapperProps>`
  display: flex;
  align-items: top;
  gap: ${({ gap = '0' }) => gap};
  margin-bottom: ${({ marginBottom = '18px' }) => marginBottom};
  padding: ${({ padding = '0' }) => padding};
  ${({ isLoadingItem }) =>
    isLoadingItem &&
    css`
      animation: ${blink} 1.2s ease-in-out infinite;
    `}
`

export const TextNameCell = styled.div`
  text-align: left;
`
export const DeleteCell = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ProductPrice = styled.div`
  align-items: top;
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  & p {
    display: flex;
    align-items: center;
  }
  & span {
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
`

export const ProducTitle = styled.div`
  flex-grow: 1;
  align-items: top;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  & p {
    margin-bottom: 10px;
    line-height: 22px;
  }
`
