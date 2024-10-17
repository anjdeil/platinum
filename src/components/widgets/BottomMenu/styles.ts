import { BottomMenuWrapperProps } from "@/types/widgets/BottomMenu";
import styled from "@emotion/styled";

export const BottomMenuWrapper = styled.div<BottomMenuWrapperProps>`
  z-index: 2000;
  height: ${({ height = "60px" }) => height};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-block: ${({ paddingBlock = "18px" }) => paddingBlock};
  padding-bottom: 38px;
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
