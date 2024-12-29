import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { blink } from '../styles';

interface GridRowFullProps {
  padding?: string;
}

export const CartTableGrid = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
`;
export const GridHeader = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.background.secondary};
`;
export const RowWrapper = styled.div<{ isLoadingItem: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-top: none;
  &:last-of-type {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  ${({ isLoadingItem }) =>
    isLoadingItem &&
    css`
      pointer-events: none;
      animation: ${blink} 1.2s ease-in-out infinite;
    `}
`;
export const GridRow = styled.div<GridRowFullProps>`
  height: 100%;
  display: grid;
  grid-template-columns: 0.3fr 0.6fr 4fr 1fr 2fr 1fr;
  align-items: center;
  padding: ${({ padding = '0' }) => padding};
  & > div {
    padding: 16px;
  }
  @media ${({ theme }) => theme.media.large} {
    grid-template-columns: 0.1fr 0.6fr 3fr 1.5fr 2fr 1.7fr;
  }
`;

export const TextCell = styled.div`
  text-align: center;
`;

export const TextCellHeader = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  text-align: center;
`;
