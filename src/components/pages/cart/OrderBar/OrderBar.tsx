import { FC } from "react";
import { OrderBarContent, OrderBarSum, OrderBarWrapper, OrderBarTitle, OrderBarDesc } from "./style";
import { Skeleton } from "@mui/material";

interface OrderBarProps {
  cartSum: number;
  symbol: string;
  isLoadingOrder: boolean;
}

const OrderBar: FC<OrderBarProps> = ({ cartSum, symbol, isLoadingOrder }) => {
  return (
    <OrderBarWrapper>
      <OrderBarTitle>Order value</OrderBarTitle>
      <OrderBarContent>
        <OrderBarSum>
          {isLoadingOrder ?
            <>
              <Skeleton />
            </>
            :
            <>
              {cartSum}&nbsp;{symbol}
            </>
          }

        </OrderBarSum>
        <OrderBarDesc>You only need 26.01 zł to get free delivery</OrderBarDesc>
      </OrderBarContent>
    </OrderBarWrapper>
  );
};

export default OrderBar;
