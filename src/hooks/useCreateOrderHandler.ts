import { useAppDispatch, useAppSelector } from '@/store';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { addCoupon, clearCoupon } from '@/store/slices/cartSlice';
import { CreateOrderRequestType, WooErrorType } from '@/types/services';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';

export const useCreateOrderHandler = (
    status: CreateOrderRequestType['status'],
    code: string,
    userLoyaltyStatus?: string,
    customerId?: number
) => {
    const { cartItems, couponCode } = useAppSelector(s => s.cartSlice);
    const [createOrder, { data: orderItems, isLoading }] = useCreateOrderMutation();
    const dispatch = useAppDispatch();

    const [couponError, setCouponError] = useState(false);
    const [couponSuccess, setCouponSuccess] = useState(false);

    const handleCreateOrder = async () => {
        const coupons = couponCode ? [{ code: couponCode }] : [];

        const requestData = {
            line_items: cartItems,
            status,
            currency: code,
            coupon_lines: coupons,
            ...(customerId ? { customer_id: customerId } : {}),
        };

        const { error } = await createOrder(requestData);

        if (error) {
            const wooError = (error as FetchBaseQueryError).data as WooErrorType;
            if (
                wooError?.details?.code === 'woocommerce_rest_invalid_coupon' ||
                wooError?.details?.code === 'invalid_coupon_for_sale'
            ) {
                setCouponError(true);
                setCouponSuccess(false);

                if (userLoyaltyStatus) {
                    dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
                } else {
                    dispatch(clearCoupon());
                }
            }
        } else {
            setCouponSuccess(!!couponCode && couponCode !== userLoyaltyStatus);
            setCouponError(false);
        }
    };

    return {
        handleCreateOrder,
        orderItems,
        isLoading,
        couponError,
        setCouponError,
        couponSuccess,
        setCouponSuccess
    };
}
