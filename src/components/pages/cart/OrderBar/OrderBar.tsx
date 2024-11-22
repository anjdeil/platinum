import { FC } from "react";
import { OrderBarContent, OrderBarSum, OrderBarWrapper, OrderBarTitle, OrderBarDesc } from "./style";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";

interface OrderBarProps {
  cartSum: number;
  symbol: string;
  isLoadingOrder: boolean;
}

const OrderBar: FC<OrderBarProps> = ({ cartSum, symbol, isLoadingOrder }) => {
  const t = useTranslations("Cart");
  return (
    <OrderBarWrapper>
      <OrderBarTitle>{t("orderValue")}</OrderBarTitle>
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
        <OrderBarDesc>{t("priceToDelivery", { locale: '26 zl' })}</OrderBarDesc>
      </OrderBarContent>
    </OrderBarWrapper>
  );
};

export default OrderBar;
