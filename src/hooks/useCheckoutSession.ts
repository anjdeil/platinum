import { loyaltyCouponsCodes } from '@/components/pages/cart/CartCouponBlock';
import { useAppDispatch, useAppSelector } from '@/store';
import { useCheckoutConfirmMutation, useCheckoutStep1Mutation, useCheckoutStep2Mutation } from '@/store/rtk-queries/wpApi';
import { addCoupon, clearConflictedItems, clearCoupon, initializeCart } from '@/store/slices/cartSlice';
import { clearCheckoutState, setCheckoutState, setHasStep2Requested } from '@/store/slices/checkoutSlice';
import { UserLoyalityStatusType } from '@/types/store/rtk-queries/wpApi';
import router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

const SHIPPING_METHOD_UNAVAILABLE =
    'Selected shipping method is not available for this address.';

class AbortError extends Error {
    constructor() {
        super('Aborted');
        this.name = 'AbortError';
    }
}

type RecalcResult =
    | { ok: true }
    | { ok: false; fatal: true };

export function useCheckoutSession(
    userLoyaltyStatus?: UserLoyalityStatusType,
    setHasConflict?: (flag: boolean) => void,
) {
    const dispatch = useAppDispatch();

    const { cartItems, couponCode, ignoreCoupon } = useAppSelector(s => s.cartSlice);
    const { name: currency } = useAppSelector(s => s.currencySlice);
    const user = useAppSelector(s => s.userSlice?.user);
    const checkout = useAppSelector(s => s.checkoutSlice);

    const [checkoutStep1, { isLoading }] = useCheckoutStep1Mutation();
    const [checkoutStep2, { isLoading: isStep2Loading }] = useCheckoutStep2Mutation();
    const [checkoutConfirm] = useCheckoutConfirmMutation();

    const [couponError, setCouponError] = useState(false);
    const [couponSuccess, setCouponSuccess] = useState(false);

    const requestIdRef = useRef(0);
    const requestIdStep2Ref = useRef(0);

    // for actual data
    const cartRef = useRef(cartItems);
    const couponRef = useRef(couponCode);
    const currencyRef = useRef(currency);

    useEffect(() => { cartRef.current = cartItems }, [cartItems]);
    useEffect(() => { couponRef.current = couponCode }, [couponCode]);
    useEffect(() => { currencyRef.current = currency }, [currency]);

    const guardedStep1 = useCallback(async (action: () => Promise<any>) => {
        const id = ++requestIdRef.current;

        const resp = await action();

        if (id !== requestIdRef.current) {
            throw new AbortError();
        }

        return resp;
    }, []);

    const buildPayload = useCallback((token?: string) => ({
        token: token ?? checkout.token,
        currency: currencyRef.current,
        line_items: cartRef.current.map(item => ({
            product_id: item.product_id,
            variation_id: item.variation_id ?? 0,
            quantity: item.quantity,
        })),
        coupon_lines: (!ignoreCoupon && couponRef.current ? [{ code: couponRef.current }] : []),
        email: user?.email ?? undefined,
        customer_id: user?.id ? Number(user.id) : undefined
    }), [user, checkout.token, ignoreCoupon]);

    const safeParse = (value: any) => {
        if (typeof value === 'string') {
            try { return JSON.parse(value); } catch { return value; }
        }
        return value;
    };

    const normalizeTotals = (rawTotals: any) => {
        const parsed = safeParse(rawTotals);
        return typeof parsed === 'object' && parsed !== null ? parsed : null;
    };

    const normalizeStep = (rawStep: any): number => {
        if (rawStep === undefined || rawStep === null) return 1;

        const num = Number(rawStep);
        return Number.isFinite(num) && num > 0 ? num : 1;
    };

    const initStep1 = useCallback(() => {
        dispatch(setHasStep2Requested(false));

        dispatch(
            setCheckoutState({
                selectedShippingMethod: null,
                shippingMethods: [],
                billingData: undefined,
            })
        );
    }, [dispatch]);

    const normalizeSession = (rawSession: any) => {
        const parsed = safeParse(rawSession);

        if (!parsed || typeof parsed !== 'object') return null;

        return {
            ...parsed,
            step: parsed.step ? Number(parsed.step) : 1,
            totals: normalizeTotals(parsed.totals),
            cart_items: safeParse(parsed.cart_items) ?? [],
            expires_at: parsed.expires_at ?? null,
        };
    };

    const getUnpurchasableProductIds = (warnings: string[]): number[] => {
        return warnings
            .map(w => {
                // Product ... not purchasable
                let match = w.match(/^Product (\d+) not purchasable$/);
                if (match) return Number(match[1]);

                // Product ... not found
                match = w.match(/^Product (\d+) not found$/);
                if (match) return Number(match[1]);

                // Parent product not found for variation ...
                match = w.match(/^Parent product not found for variation (\d+)$/);
                if (match) return Number(match[1]);

                return null;
            })
            .filter((v): v is number => v !== null);
    };

    const getRemovableUnpurchasableItems = (
        cartItems: typeof cartRef.current,
        warnings: string[]
    ) => {
        const brokenIds = new Set(getUnpurchasableProductIds(warnings));

        return cartItems.filter(item =>
            brokenIds.has(item.product_id)
        );
    };

    const updateStateFromResp = useCallback((resp: any) => {
        if (!resp.session) {
            console.warn('Empty session received', resp);
            return;
        }

        const session = normalizeSession(resp.session) || {};
        const totals = normalizeTotals(resp.totals) ?? session?.totals ?? null;

        const warnings = Array.isArray(resp.warnings) ? resp.warnings : [];
        const couponErrors = Array.isArray(resp.coupon_errors) ? resp.coupon_errors : [];

        // delete "death" products
        if (warnings.length > 0) {
            const removableItems = getRemovableUnpurchasableItems(cartRef.current, warnings);
            if (removableItems.length) {
                dispatch(clearConflictedItems(removableItems));
                console.log('removableItems...', removableItems);
            }
        }

        const hasCouponErrors = couponErrors.length > 0;

        if (hasCouponErrors) {
            setCouponError(couponCode !== userLoyaltyStatus);
            setCouponSuccess(false);

            if (userLoyaltyStatus) {
                dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
            } else {
                dispatch(clearCoupon());
            }
        } else {
            setCouponError(hasCouponErrors);
            setCouponSuccess(!!couponCode && !loyaltyCouponsCodes.includes(couponCode));
        }

        if (setHasConflict && warnings.length > 0) {
            // triger to recalc cartConflict
            dispatch(initializeCart());
            setHasConflict(true);
        }

        dispatch(
            setCheckoutState({
                token: session.session_token ?? resp.session_token,
                totals,
                warnings,
                couponErrors,
                success: resp.success,
                session,
                expiresAt: session.expires_at,
            })
        );
    }, [dispatch, couponCode, userLoyaltyStatus, setHasConflict, checkout.token]);

    const updateStep2StateFromResp = useCallback((resp: any) => {
        const normalizedSession = normalizeSession(resp.session) ?? checkout.session;
        const normalizedStep = normalizeStep(resp.step ?? normalizedSession.step ?? 2);

        const normalizedTotals =
            normalizeTotals(resp.totals) ??
            normalizedSession.totals ??
            checkout.totals;

        const warnings = Array.isArray(resp.warnings) ? resp.warnings : [];
        const errors = Array.isArray(resp.errors) ? resp.errors : [];
        const couponErrors = Array.isArray(resp.coupon_errors) ? resp.coupon_errors : [];

        const shippingMethods = Array.isArray(resp.shipping_methods)
            ? resp.shipping_methods
            : [];

        const selectedShippingMethod =
            resp.selected_shipping_method ??
            null;

        const success = Boolean(resp.success);

        const hasCouponErrorFromErrors =
            !success &&
            errors.some((e: any) =>
                e.toLowerCase().includes('coupon')
            );

        const couponErrorsFromErrors = hasCouponErrorFromErrors
            ? errors.filter((e: any) => e.toLowerCase().includes('coupon'))
            : [];

        const normalizedCouponErrors = [
            ...couponErrors,
            ...couponErrorsFromErrors,
        ];

        const hasShippingMethodError =
            !success &&
            errors.length > 0 &&
            errors.includes(SHIPPING_METHOD_UNAVAILABLE);

        const shippingErrors = hasShippingMethodError
            ? errors.filter((e: any) => e === SHIPPING_METHOD_UNAVAILABLE)
            : [];

        const hasCouponErrors = normalizedCouponErrors.length > 0;

        const nextCheckoutState = {
            token: resp.session_token ?? checkout.token,
            totals: normalizedTotals,
            warnings,
            success,
            session: normalizedSession,
            expiresAt: normalizedSession.expires_at ?? checkout.expiresAt,
            shippingMethods,
            billingData: normalizedSession.billing_data ?? checkout.billingData,
        };

        // ------------------------
        // 1. Update coupon error state
        // ------------------------
        if (hasCouponErrors) {
            setCouponError(couponCode !== userLoyaltyStatus);
            setCouponSuccess(false);

            if (userLoyaltyStatus) {
                dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
            } else {
                dispatch(clearCoupon());
            }
        } else {
            setCouponError(hasCouponErrors);
            setCouponSuccess(!!couponCode && !loyaltyCouponsCodes.includes(couponCode));
        }

        // ------------------------
        // 2. Error shipping method or couponErrors
        // ------------------------
        if (hasShippingMethodError || hasCouponErrors || errors.length > 0) {
            dispatch(
                setCheckoutState({
                    ...checkout,
                    ...nextCheckoutState,
                    step: 2,
                    selectedShippingMethod: hasShippingMethodError
                        ? null
                        : checkout.selectedShippingMethod,
                })
            );

            return {
                success: success,
                shippingError: shippingErrors,
                shippingMethods,
                couponErrors: normalizedCouponErrors,
                warnings,
            };
        }


        // ------------------------
        // 3. Success → ipdate checkout
        // ------------------------
        dispatch(
            setCheckoutState({
                ...checkout,
                ...nextCheckoutState,
                step: normalizedStep,
                selectedShippingMethod,
            })
        );

        dispatch(setHasStep2Requested(true));

        return {
            success: success,
            totals: normalizedTotals,
            selectedShippingMethod,
            shippingMethods,
            warnings,
            couponErrors: normalizedCouponErrors,
            step: normalizedStep,
        };
    }, [dispatch, checkout]);

    const createSession = useCallback(async () => {

        dispatch(setCheckoutState({
            ...checkout,
            shippingMethods: [],
            selectedShippingMethod: null,
        }));

        const payload = {
            ...buildPayload(),
            token: undefined,
        };
        const resp = await guardedStep1(() =>
            checkoutStep1({ payload }).unwrap()
        );

        if (resp?.session_token) {
            updateStateFromResp(resp);
            return resp;
        }
        throw new Error('Failed to create checkout session');
    }, [checkout, buildPayload, guardedStep1, checkoutStep1, updateStateFromResp]);

    const recalcSessionSafe = useCallback(async (): Promise<RecalcResult> => {
        const token: string | null = checkout.token;
        let expiresAt = checkout.expiresAt;

        if (typeof expiresAt === 'string') {
            try { expiresAt = JSON.parse(expiresAt); } catch { }
        }

        const payload = buildPayload(token ?? undefined);

        try {
            if (!token || !expiresAt || new Date(expiresAt) <= new Date()) {
                await createSession();
            } else {
                const resp = await guardedStep1(() => checkoutStep1({ payload }).unwrap());
                updateStateFromResp(resp);
            }

            return { ok: true };
        } catch (e) {
            if (e instanceof AbortError) {
                return { ok: true };
            }

            console.error('Step1 error', e);
            dispatch(clearCheckoutState());
            return { ok: false, fatal: true };
        }
    }, [checkout.token, checkout.expiresAt, checkoutStep1, buildPayload, createSession, updateStateFromResp, dispatch]);

    const recalcStep2 = useCallback(
        async (payload: any) => {
            const requestId = ++requestIdStep2Ref.current;

            try {
                let resp = await checkoutStep2({ payload }).unwrap();

                if (
                    !resp.success &&
                    Array.isArray(resp.errors) &&
                    resp.errors.some(
                        e =>
                            e.includes('Checkout session not found') ||
                            e.includes('Checkout session has expired')
                    )
                ) {
                    try {
                        const step1Resp = await recalcSessionSafe();

                        if (!step1Resp.ok) {
                            clearSession();
                            console.warn('Step1 refresh failed during Step2 recalc');
                            return {
                                success: false,
                                totals: checkout.totals,
                                selectedShippingMethod: null,
                                shippingMethods: [],
                                warnings: [],
                                couponErrors: [],
                                shippingError: [],
                                step: 2,
                            };
                        }

                        const newPayload = { ...payload, token: checkout.token };

                        resp = await checkoutStep2({ payload: newPayload }).unwrap();
                    } catch (e) {
                        clearSession();
                        console.warn('Step2 recalc failed due to Step1 error', e);
                        return {
                            success: false,
                            totals: checkout.totals,
                            selectedShippingMethod: null,
                            shippingMethods: [],
                            warnings: [],
                            couponErrors: [],
                            shippingError: [],
                            step: 2,
                        };
                    }
                }

                if (requestId !== requestIdStep2Ref.current) {
                    return null;
                }

                if (resp?.warnings && resp?.warnings?.length > 0) {
                    router.push('/cart');
                    return {
                        totals: checkout.totals,
                        selectedShippingMethod: null,
                        shippingMethods: [],
                        success: false,
                        warnings: resp.warnings,
                        shippingError: [],
                        couponErrors: [],
                        step: 2,
                    };
                }

                return updateStep2StateFromResp(resp);
            } catch (err) {
                console.warn('Step2 failed', err);
                throw err;
            }
        },
        [checkoutStep2, recalcSessionSafe, updateStep2StateFromResp]
    );

    const clearSession = useCallback(() => {
        dispatch(clearCheckoutState());
        dispatch(setHasStep2Requested(false));
        setCouponError(false);
        setCouponSuccess(false);
    }, [dispatch]);

    const finalizeCheckoutSession = async (
        token: string | null,
        orderId: number
    ) => {
        if (!token) return;

        const attempt = async () => {
            await checkoutConfirm({
                payload: { token, order_id: orderId },
            }).unwrap();
        };

        try {
            await attempt();
        } catch (e: any) {
            const status = e?.status;

            clearSession();

            if (status === 500) {
                try { await attempt(); } catch { }
            }

            console.error('STEP 3 finalize error', status, e);
        }
    };

    return {
        initStep1,
        recalcSessionSafe,
        recalcStep2,
        clearSession,
        couponError,
        setCouponError,
        couponSuccess,
        isLoading,
        isStep2Loading,
        finalizeCheckoutSession,
    };
}
