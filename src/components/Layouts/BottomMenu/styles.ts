import { BottomMenuWrapperProps } from "@/types/layouts/BottomMenu";
import styled from "@emotion/styled";

export const BottomMenuWrapper = styled.div<BottomMenuWrapperProps>`
  z-index: 2000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-block: ${({ paddingBlock = "10px" }) => paddingBlock};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
`;

export const BottomMenuNav = styled.nav`
  width: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
