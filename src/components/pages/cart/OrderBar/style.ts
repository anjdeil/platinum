import styled from "@emotion/styled";

export const OrderBarWrapper = styled.div`
  border-radius: 8px;
  margin-top: 24px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  justify-content: space-between;
`;
export const OrderBarTitle = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
`;
export const OrderBarContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
`;
export const OrderBarSum = styled.p`
  text-align: right;
  display: inline-block;
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  line-height: 24px;
  margin-bottom: 8px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
export const OrderBarDesc = styled.p`
  color: ${({ theme }) => theme.colors.active};
  text-align: right;
`;
