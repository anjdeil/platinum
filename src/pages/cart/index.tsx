import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/store/rtk-queries/wooCustomApi";
import { CreateOrderRequestType } from "@/types/services";
import { useAppSelector } from "@/store";
import checkCartConflict from "@/utils/cart/checkCartConflict";
import { useGetProductsMinimizedMutation } from "@/store/rtk-queries/wpCustomApi";
import CartTable from "@/components/pages/cart/CartTable/CartTable";
import OrderBar from "@/components/pages/cart/OrderBar/OrderBar";
import { Container } from "@/styles/components";
import CartCouponBlock from "@/components/pages/cart/CartCouponBlock/CartCouponBlock";
import { CartPageWrapper } from "./style";
import CartSummaryBlock from "@/components/pages/cart/CartSummaryBlock/CartSummaryBlock";
import OrderProgress from "@/components/pages/cart/OrderProgress/OrderProgress";


const CartPage: React.FC = () => {
    const { code } = useAppSelector((state) => state.currencySlice);
    const status: CreateOrderRequestType["status"] = "on-hold";
    const [symbol, setSymbol] = useState<string>('');

    const roundedPrice = (price: number) => Math.round(price * 100) / 100;

    // Mutations
    const [createOrder, { data: orderItems, isLoading: isLoadingOrder, error: errorOrder }] = useCreateOrderMutation();
    const { cartItems, couponCodes } = useAppSelector((state) => state.cartSlice);
    const [getProductsMinimized, { data: productsSpecsData, isLoading: isLoadingProductsMin, error: errorProductsMin }] = useGetProductsMinimizedMutation();
    const productsSpecs = productsSpecsData?.data ? productsSpecsData.data.items : [];
    const [cartSum, setCartSum] = useState<number>(0);

    // Order creation effect
    useEffect(() => {
        const handleCreateOrder = async () => {
            const requestData = {
                line_items: cartItems,
                status: status,
                coupon_lines: couponCodes.map(code => ({ code })),
                currency: code,
            };
            await createOrder(requestData);
        };
        handleCreateOrder();
    }, [createOrder, cartItems, couponCodes, code]);

    useEffect(() => {
        if (orderItems?.currency_symbol) {
            setSymbol(orderItems.currency_symbol);
        } else {
            setSymbol('');
        }
    }, [orderItems]);

    // Fetch product specs
    useEffect(() => {
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
            const cartSum = lineItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setCartSum(roundedPrice(cartSum));
        }
    }, [orderItems]);

    return (
        <Container>
            <OrderProgress />
            <CartPageWrapper>
                <div>
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
                </div>
                <CartCouponBlock symbol={symbol} />
                <CartSummaryBlock symbol={symbol} order={orderItems} isLoading={isLoadingOrder} />
            </CartPageWrapper>
        </Container>
    );
};

export default CartPage;
