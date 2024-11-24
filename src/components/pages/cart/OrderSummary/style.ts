import { StyledButton, Title } from "@/styles/components";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";

interface CouponTextProps {
  uppercase?: boolean;
  marginBottom?: string;
}

export const OrderSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const OrderSummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const OrderSummaryLineName = styled.p`
  text-transform: uppercase;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
`;

export const OrderSummaryTotal = styled(OrderSummaryLine)`
  margin-top: 8px;
`;
export const OrderSummaryTotalValue = styled.div`
  margin-top: 8px;
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  line-height: 1.333rem;
`;
export const OrderTotalsRowsSkeleton = styled(Skeleton)``;
