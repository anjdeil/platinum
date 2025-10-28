import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

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
export const OrderSummaryLineCoupons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8px;
`;

export const OrderCouponWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 4px;
`;

export const OrderSummaryLineName = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
`;

export const OrderCouponNamesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderCouponName = styled.p`
  text-transform: capitalize;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  color: ${({ theme }) => theme.colors.grey};
`;

export const OrderSummaryTotal = styled(OrderSummaryLine)`
  align-items: center;
`;

export const OrderSummaryTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const OrderSummaryTotalValue = styled.div`
  margin-top: 8px;
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  line-height: 1.333rem;
`;

export const OrderSummaryTotalTax = styled.span`
  margin-top: 8px;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  color: ${({ theme }) => theme.colors.grey};
`;

export const OrderTotalsRowsSkeleton = styled(Skeleton)``;
