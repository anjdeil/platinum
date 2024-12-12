import styled from '@emotion/styled'

interface OrderBarDescProps {
  textAlign?: 'left' | 'right'
  marginBottom?: string
}

export const OrderBarWrapper = styled.div`
  border-radius: 8px;
  margin-top: 24px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  justify-content: space-between;
`
export const OrderBarTitle = styled.div<{ miniCart: boolean }>`
  display: flex;
  align-items: ${({ miniCart }) => miniCart && 'end'};
  justify-content: end;
  margin-top: 2px;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  flex-grow: ${({ miniCart }) => miniCart && 1};
  text-align: ${({ miniCart }) => miniCart && 'right'};
  margin-right: ${({ miniCart }) => miniCart && '10px'};
  text-transform: ${({ miniCart }) => (miniCart ? 'lowercase' : 'uppercase')};
  font-weight: ${({ miniCart }) => (miniCart ? '500' : '400')};
`

export const OrderBarContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
`
export const OrderBarSum = styled.p`
  text-align: right;
  display: flex;
  justify-content: end;
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  line-height: 24px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`
export const OrderBarDesc = styled.p<OrderBarDescProps>`
  color: ${({ theme }) => theme.colors.active};
  text-align: ${({ textAlign }) => textAlign};
  margin-bottom: ${({ marginBottom = '0' }) => marginBottom};
`
