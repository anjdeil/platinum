import React, { FC } from "react";
import {
  CreateOrderRequestType,
  CreateOrderResponseType,
} from "@/types/services";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateCart } from "@/store/slices/cartSlice";
import {
  CardContent,
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  CartTableCell,
  CartTableHead,
  CartTableTable,
  CartTableWrapper,
  DeleteCell,
  OnePrice,
  ProducTitle,
  ProductPrice,
} from "./style";
import DeleteIcon from "@/components/global/icons/DeleteIcon/DeleteIcon";
import { useResponsive } from "@/hooks/useResponsive";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";
import checkProductAvailability from "@/utils/cart/checkProductAvailability";
import CartProductWarning from "../CartProductWarning/CartProductWarning";
import CartQuantity from "../CartQuantity/CartQuantity";
import { MenuSkeleton } from "@/components/menus/MenuSkeleton";
import { CartItem } from "@/types/store/reducers/сartSlice";

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
    console.log("handleChangeQuantity called with:", { product_id, action, variation_id, newQuantity });

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
          } else {
            console.log("Invalid newQuantity:", newQuantity);
          }
          break;
        default:
          return;
      }

      if (quantityToUpdate >= 0) {
        console.log("Dispatching updateCart with:", { product_id, variation_id, quantity: quantityToUpdate });
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
          <CartTableTable>
            <CartTableHead>
              <tr>
                <th></th>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </CartTableHead>
            {!(isLoadingOrder || isLoadingProductsMin) && (
              <tbody>
                {orderItems?.line_items.map((item) => {
                  const { resolveCount } = checkProductAvailability(item, productsSpecs);
                  return (
                    <React.Fragment key={item.id}>
                      <tr>
                        <DeleteCell>
                          <div>
                            <DeleteIcon onClick={() => handleChangeQuantity(item.product_id, "value", item.variation_id, 0)} />
                          </div>
                        </DeleteCell>
                        <td>
                          <CartImgWrapper>
                            <CartItemImg src={item.image.src} alt={item.name} width="50" />
                          </CartImgWrapper>
                        </td>
                        <td>{item.name}</td>
                        <CartTableCell>{roundedPrice(item.price)}&nbsp;{symbol}</CartTableCell>
                        <CartTableCell>
                          <CartQuantity item={item} handleChangeQuantity={handleChangeQuantity} />
                        </CartTableCell>
                        <CartTableCell>{roundedPrice(item.price * item.quantity)}&nbsp;{symbol}</CartTableCell>
                      </tr>
                      {resolveCount !== true && (
                        <td colSpan={6}>
                          <CartProductWarning
                            onUpdate={() => handleChangeQuantity(item.product_id, "value", item.variation_id, resolveCount)

                            }
                            resolveCount={resolveCount}
                          />
                        </td>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            )}
          </CartTableTable>
          {(isLoadingOrder || isLoadingProductsMin) && (
            <MenuSkeleton
              elements={cartItems.length}
              direction="column"
              width="100%"
              height="72px"
              gap="5px"
            />
          )}
        </>
      ) : (
        <>
          {!(isLoadingOrder || isLoadingProductsMin) ? (
            orderItems?.line_items.map((item) => {
              const { resolveCount } = checkProductAvailability(item, productsSpecs);
              return (
                <React.Fragment key={item.id}>
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
                </React.Fragment>
              );
            })
          ) : (
            <MenuSkeleton
              elements={cartItems.length}
              direction="column"
              width="100%"
              height="230px"
              gap="5px"
            />
          )}
        </>
      )}
      {hasConflict && <p>There are conflicts in your cart. Please review your items.</p>}
    </CartTableWrapper>
  );
};

export default CartTable;
