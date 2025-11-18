import { useAppDispatch, useAppSelector } from '@/store';
import { useGetQuoteMutation } from '@/store/rtk-queries/wooCustomApi';
import { addCoupon, clearCoupon, setIgnoreCoupon } from '@/store/slices/cartSlice';
import { useState } from 'react';

export const useQuoteHandler = (
    code: string,
    setHasConflict: (flag: boolean) => void,
    userLoyaltyStatus?: string,
    customerId?: number,
) => {
    const { cartItems, couponCode, ignoreCoupon } = useAppSelector(s => s.cartSlice);
    const [getQuote, { data: quoteData, isLoading }] = useGetQuoteMutation();
    const dispatch = useAppDispatch();

    const [couponError, setCouponError] = useState(false);
    const [couponSuccess, setCouponSuccess] = useState(false);

    const handleGetQuote = async () => {
        const coupons = !ignoreCoupon && couponCode
            ? [{ code: couponCode }]
            : [];

        const requestData = {
            line_items: cartItems,
            currency: code,
            coupon_lines: coupons,
            ...(customerId ? { customer_id: customerId } : {}),
        };

        try {
            const response = await getQuote(requestData).unwrap();

            if (response.success) {
                if (coupons.length) {
                    setCouponSuccess(!!couponCode && couponCode !== userLoyaltyStatus);
                    setCouponError(false);
                }
            } else {
                if (response.warnings?.length) {
                    setHasConflict(true);
                } else if (response.errors) {
                    setCouponError(couponCode !== userLoyaltyStatus);
                    setCouponSuccess(false);

                    if (couponCode === userLoyaltyStatus) {
                        dispatch(setIgnoreCoupon(true));
                        return response;
                    } else if (userLoyaltyStatus) {
                        dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
                    } else {
                        dispatch(clearCoupon());
                    }
                }
            }
            return response;
        } catch (error) {
            console.error('Quote error:', error);
            return undefined;
        }
    };

    return {
        handleGetQuote,
        quoteData,
        isLoading,
        couponError,
        setCouponError,
        couponSuccess,
        setCouponSuccess
    };
}
