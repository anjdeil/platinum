import styled from '@emotion/styled'

interface GridRowFullProps {
  padding?: string
}

export const MiniCartContainer = styled.div`
  width: 30vw;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 0;
  padding: 36px;
`

export const MiniCartHeader = styled.div`
  display: flex;
`
