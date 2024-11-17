import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/store/rtk-queries/wooCustomApi";
import { CreateOrderRequestType } from "@/types/services";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateCart } from "@/store/slices/cartSlice";
import { useResponsive } from "@/hooks/useResponsive";
import checkCartConflict from "@/utils/cart/checkCartConflict";
import { useGetProductsMinimizedMutation } from "@/store/rtk-queries/wpCustomApi";
import checkProductAvailability from "@/utils/cart/checkProductAvailability";
import CartTable from "@/components/pages/cart/CartTable/CartTable";
import OrderBar from "@/components/pages/cart/OrderBar/OrderBar";
import { Container } from "@/styles/components";
import { ItemBlock } from "@/components/pages/product/ProductPromotion/styles";

const CartPage: React.FC = () => {

    const { symbol } = useAppSelector((state) => state.currencySlice);
    const status: CreateOrderRequestType["status"] = "on-hold";

    const roundedPrice = (price: number) => Math.round(price * 100) / 100;

    // Mutations
    const [createOrder, { data: orderItems, isLoading: isLoadingOrder, error: errorOrder }] = useCreateOrderMutation();
    const { cartItems } = useAppSelector((state) => state.cartSlice);
    const [getProductsMinimized, { data: productsSpecsData, isLoading: isLoadingProductsMin, error: errorProductsMin }] = useGetProductsMinimizedMutation();
    const productsSpecs = productsSpecsData?.data ? productsSpecsData.data.items : [];
    const [cartSum, setCartSum] = useState<number>(0)
    // Order creation effect
    useEffect(() => {
        const handleCreateOrder = async () => {
            const requestData = {
                line_items: cartItems,
                status: status,
            };
            createOrder(requestData);
        };
        handleCreateOrder();
    }, [createOrder, cartItems]);

    // Fetch product specs
    useEffect(() => {
        console.log(JSON.stringify(cartItems, null, 2));
        getProductsMinimized(cartItems);
    }, [getProductsMinimized, cartItems]);

    // Conflict detection
    const [hasConflict, setHasConflict] = useState(false);

    useEffect(() => {
        if (productsSpecs) {
            setHasConflict(checkCartConflict(cartItems, productsSpecs));
        }

    }, [cartItems, productsSpecs]);

    useEffect(() => {
        if (orderItems && orderItems.line_items) {
            const lineItems = orderItems.line_items;
            let cartSum = lineItems.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
            setCartSum(roundedPrice(cartSum));
        } else {
            console.log("Cart sum error.");
        }
    }, [orderItems]);




    return (
        <Container>
            <CartTable
                symbol={symbol}
                cartItems={cartItems}
                orderItems={orderItems}
                isLoadingOrder={isLoadingOrder}
                isLoadingProductsMin={isLoadingProductsMin}
                productsSpecs={productsSpecs}
                roundedPrice={roundedPrice}
                hasConflict={hasConflict}
            />
            <OrderBar isLoadingOrder={isLoadingOrder} cartSum={cartSum} symbol={symbol} />
        </Container>
    );
};

export default CartPage;
