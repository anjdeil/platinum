import { BottomMenuWrapperProps } from '@/types/components/widgets/bottomMenu';
import styled from '@emotion/styled';

export const BottomMenuWrapper = styled.div<BottomMenuWrapperProps>`
  z-index: 1000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-block: ${({ paddingBlock = '18px' }) => paddingBlock};
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
`;

export const BottomMenuNav = styled.nav`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
