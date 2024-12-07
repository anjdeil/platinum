import styled from '@emotion/styled'
import {
  CartCardAllWrapper,
  CartImgWrapper,
  TextNameCell,
} from '../../cart/CartTable/style'

export const WishlistCardAllWrapper = styled(CartCardAllWrapper)`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  display: grid;
  gap: 16px;
  grid-template-columns: 0.3fr 0.8fr 3fr 2fr;
  align-items: center;
`
export const WishlistImgWrapper = styled(CartImgWrapper)`
  @media ${({ theme }) => theme.media.large} {
    max-width: 140px;
    max-height: 140px;
    margin-right: 16px;
  }
`
export const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${({ theme }) => theme.background.success};
`
export const QuantityRow = styled(TextNameCell)`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  gap: 8px;
  word-break: break-all;
`
