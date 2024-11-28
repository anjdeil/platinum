import styled from "@emotion/styled";
import Link from "next/link";

interface OrderStepNumProps {
  active: boolean;
}

export const OrderProgressContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrderProgressWrapper = styled.div`
  display: grid;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin: 24px 0;
  max-width: 733px;
  width: 100%;
  grid-template-columns: 1fr auto 1fr auto 1fr;

  & svg {
    width: 7.2px;
    height: 13px;
  }

  & p {
    text-align: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    text-transform: uppercase;
  }
`;

export const OrderStepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  height: 100%;
  padding: 5px;
`;

export const OrderStepWrapperLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  height: 100%;
  padding: 5px;

  border-radius: 8px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const OrderStepNum = styled.div<OrderStepNumProps>`
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.black};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  background: ${({ theme, active }) =>
    active ? theme.background.primaryGradient : "transparent"};

  @media ${({ theme }) => theme.media.medium} {
    width: 40px;
    height: 40px;
    font: ${({ theme }) => theme.fonts.titleH2Medium};
  }
`;
