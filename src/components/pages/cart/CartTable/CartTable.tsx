import React, { FC } from "react";
import {
  CreateOrderRequestType,
  CreateOrderResponseType,
} from "@/types/services";
import { useAppDispatch } from "@/store";
import { updateCart } from "@/store/slices/cartSlice";
import {
  CardContent,
  CartCardAllWrapper,
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  CartTableGrid,
  CartTableWrapper,
  DeleteCell,
  GridHeader,
  GridRow,
  OnePrice,
  ProducTitle,
  ProductPrice,
  RowWrapper,
  TextCell,
  TextCellHeader,
  TextNameCell,
} from "./style";
import DeleteIcon from "@/components/global/icons/DeleteIcon/DeleteIcon";
import { useResponsive } from "@/hooks/useResponsive";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";
import checkProductAvailability from "@/utils/cart/checkProductAvailability";
import CartProductWarning from "../CartProductWarning/CartProductWarning";
import CartQuantity from "../CartQuantity/CartQuantity";
import { MenuSkeleton } from "@/components/menus/MenuSkeleton";
import { CartItem } from "@/types/store/reducers/сartSlice";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

interface CartTableProps {
  symbol: string;
  orderItems: CreateOrderResponseType | undefined;
  isLoadingOrder: boolean;
  isLoadingProductsMin: boolean;
  productsSpecs: any[];
  cartItems: CartItem[];
  roundedPrice: (price: number) => number;
  hasConflict: boolean;
}

const CartTable: FC<CartTableProps> = ({
  symbol,
  orderItems,
  isLoadingOrder,
  isLoadingProductsMin,
  productsSpecs,
  roundedPrice,
  hasConflict,
  cartItems
}) => {
  const t = useTranslations("Cart");
  const dispatch = useAppDispatch();
  const { isMobile } = useResponsive();
  const status: CreateOrderRequestType["status"] = "on-hold";
  /*   // test variation product
    dispatch(updateCart({
      product_id: 24133,
      variation_id: 24134,
      quantity: 1
    })) */

  // Quantity
  const handleChangeQuantity = (
    product_id: number,
    action: "inc" | "dec" | "value",
    variation_id?: number,
    newQuantity?: number | boolean
  ) => {
    const updatedItem = cartItems.find(
      (item) =>
        item.product_id === product_id &&
        (!variation_id || item.variation_id === variation_id)
    );

    if (updatedItem) {
      let quantityToUpdate = updatedItem.quantity;

      switch (action) {
        case "inc":
          quantityToUpdate = updatedItem.quantity + 1;
          break;
        case "dec":
          quantityToUpdate = updatedItem.quantity - 1;
          break;
        case "value":
          if (newQuantity !== undefined && !Number.isNaN(newQuantity)) {
            quantityToUpdate = newQuantity as number;
          }
          break;
        default:
          return;
      }

      if (quantityToUpdate >= 0) {
        dispatch(
          updateCart({
            product_id,
            variation_id,
            quantity: quantityToUpdate,
          })
        );
      }
    }
  };

  return (
    <CartTableWrapper>
      {!isMobile ? (
        <>
          <CartTableGrid>
            <GridHeader>
              <GridRow >
                <div />
                <div />
                <TextCellHeader>{t("productName")}</TextCellHeader>
                <TextCellHeader>{t("price")}</TextCellHeader>
                <TextCellHeader>{t("quantity")}</TextCellHeader>
                <TextCellHeader>{t("value")}</TextCellHeader>
              </GridRow>
            </GridHeader>
            {!(isLoadingOrder || isLoadingProductsMin) &&
              orderItems?.line_items.map((item) => {
                const { resolveCount } = checkProductAvailability(item, productsSpecs);
                return (
                  <RowWrapper key={item.id}>
                    <GridRow >
                      <DeleteCell>
                        <div>
                          <DeleteIcon
                            onClick={() =>
                              handleChangeQuantity(
                                item.product_id,
                                "value",
                                item.variation_id,
                                0
                              )
                            }
                          />
                        </div>
                      </DeleteCell>
                      <CartImgWrapper>
                        <CartItemImg src={item.image.src} alt={item.name} width="50" />
                      </CartImgWrapper>
                      <TextNameCell>{item.name}</TextNameCell>
                      <TextCell>{roundedPrice(item.price)}&nbsp;{symbol}</TextCell>
                      <TextCell>
                        <CartQuantity item={item} handleChangeQuantity={handleChangeQuantity} />
                      </TextCell>
                      <TextCell>
                        {roundedPrice(item.price * item.quantity)}&nbsp;{symbol}
                      </TextCell>
                    </GridRow>
                    {resolveCount !== true && (
                      <GridRow padding="5px 16px 16px 16px">
                        <CartProductWarning
                          onUpdate={() =>
                            handleChangeQuantity(
                              item.product_id,
                              "value",
                              item.variation_id,
                              resolveCount
                            )
                          }
                          resolveCount={resolveCount}
                        />
                      </GridRow>
                    )}
                  </RowWrapper >
                );
              })}
          </CartTableGrid>
          {(isLoadingOrder || isLoadingProductsMin) && (
            <MenuSkeleton
              elements={cartItems.length}
              direction="column"
              width="100%"
              height="72px"
              gap="5px"
              color={theme.background.skeletonSecondary}
            />
          )}
        </>
      ) : (
        <>
          {!(isLoadingOrder || isLoadingProductsMin) ? (
            orderItems?.line_items.map((item) => {
              const { resolveCount } = checkProductAvailability(item, productsSpecs);

              return (
                <CartCardAllWrapper key={item.id}>
                  <CartCardWrapper>
                    <CartImgWrapper>
                      <CartItemImg src={item.image.src} alt={item.name} width="50" />
                    </CartImgWrapper>
                    <CardContent>
                      <ProducTitle>
                        <p>{item.name}</p>
                        <CloseIcon padding="8px" onClick={() => handleChangeQuantity(item.product_id, "value", item.variation_id, 0)} />
                      </ProducTitle>
                      <ProductPrice>
                        <p>
                          {roundedPrice(item.price)}&nbsp;{symbol}
                        </p>
                      </ProductPrice>
                      <CartQuantity item={item} handleChangeQuantity={handleChangeQuantity} />
                      <ProductPrice>
                        <span>SUMMARY</span>
                        <OnePrice>{roundedPrice(item.price * item.quantity)}&nbsp;{symbol}</OnePrice>
                      </ProductPrice>
                    </CardContent>
                  </CartCardWrapper>
                  {resolveCount !== true && (
                    <CartProductWarning
                      onUpdate={() => handleChangeQuantity(item.product_id, "value", item.variation_id, resolveCount)}
                      resolveCount={resolveCount}
                    />
                  )}
                </CartCardAllWrapper>
              );
            })
          ) : (
            <MenuSkeleton
              elements={cartItems.length}
              direction="column"
              width="100%"
              height="230px"
              gap="5px"
              color={theme.background.skeletonSecondary}
            />
          )}
        </>
      )}
      {hasConflict && <p>{t("cartConflict")}</p>}
    </CartTableWrapper>
  );
};

export default CartTable;
