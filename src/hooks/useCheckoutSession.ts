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

type RecalcResult =
    | { ok: true; data?: any }
    | { ok: false; fatal: boolean };

export type Step2Result =
    | { ok: true; data: any }
    | { ok: false; fatal: boolean };

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

    const logCheckout = async (
        payload: {
            event: string;
            step: 1 | 2;
            correlationId: string;
            data?: Record<string, any>;
            important?: boolean;
        }
    ) => {
        try {
            const doLog = payload.important || Math.random() < 0.3;
            if (!doLog) return;

            await fetch('/api/checkout-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch {
        }
    };

    const guardedStep1 = useCallback(async (action: () => Promise<any>) => {
        const id = ++requestIdRef.current;

        const resp = await action();

        if (id !== requestIdRef.current) {
            return null;
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
        if (!resp || !resp.session) {
            console.warn('Empty session received', resp);
            return;
        }

        if (resp?.warnings?.length || resp?.coupon_errors?.length) {
            void logCheckout({
                event: 'step1-warnings-or-coupons',
                step: 1,
                correlationId: resp.session_token ?? checkout.token ?? 'no-token',
                data: {
                    warnings: resp.warnings,
                    couponErrors: resp.coupon_errors,
                },
                important: true,
            });
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
        if (!resp) {
            console.warn('Step2 received null response');
            return null;
        }

        if (resp?.warnings?.length || resp?.coupon_errors?.length) {
            void logCheckout({
                event: 'step2-warnings-or-coupons',
                step: 2,
                correlationId: checkout.token || 'no-token',
                data: {
                    warnings: resp.warnings,
                    couponErrors: resp.coupon_errors,
                },
                important: true,
            });
        }

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

        void logCheckout({
            event: 'step1-create-start',
            step: 1,
            correlationId: checkout.token ?? 'no-token',
            data: {
                currency: currencyRef.current,
                cart: cartRef.current.map(i => ({
                    product_id: i.product_id,
                    qty: i.quantity,
                })),
                hasCoupon: Boolean(couponRef.current),
            },
        });

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
            void logCheckout({
                event: 'step1-create-success',
                step: 1,
                correlationId: resp.session_token,
                data: {
                    warningsCount: resp.warnings?.length ?? 0,
                },
                important: true,
            });

            updateStateFromResp(resp);
            return resp;
        }
        void logCheckout({
            event: 'step1-create-failed',
            step: 1,
            correlationId: checkout.token ?? 'no-token',
            data: {
                reason: 'no-session-token',
            },
            important: true,
        });

        throw new Error('Failed to create checkout session');
    }, [checkout, buildPayload, guardedStep1, checkoutStep1, updateStateFromResp]);

    const recalcSessionSafe = useCallback(async (create: boolean = false): Promise<RecalcResult> => {
        const token: string | null = checkout.token;
        let expiresAt = checkout.expiresAt;

        if (typeof expiresAt === 'string') {
            try { expiresAt = JSON.parse(expiresAt); } catch { }
        }

        const payload = buildPayload(token ?? undefined);

        void logCheckout({
            event: 'step1-recalc-start',
            step: 1,
            correlationId: token ?? 'no-token',
            data: {
                expired: !expiresAt || new Date(expiresAt) <= new Date(),
                forceCreate: create,
            },
        });

        try {
            let respData;

            if (!token || !expiresAt || new Date(expiresAt) <= new Date() || create) {
                const resp = await createSession();
                respData = resp;
            } else {
                const resp = await guardedStep1(() => checkoutStep1({ payload }).unwrap());
                updateStateFromResp(resp);
                respData = resp;
            }

            return { ok: true, data: respData };
        } catch (error: any) {

            const status = error?.status;
            const code = error?.data?.details?.code;

            const sessionErrors = [
                'checkout_session_expired',
                'checkout_session_not_found',
            ];

            if (status === 410 || (code && sessionErrors.includes(code))) {
                console.warn('Session expired or invalid, creating new session...', error);

                void logCheckout({
                    event: 'step1-session-expired',
                    step: 1,
                    correlationId: 'no-token',
                    data: {
                        status,
                        code,
                    },
                    important: true,
                });

                try {
                    const newResp = await createSession();
                    return { ok: true, data: newResp };
                } catch (createErr) {
                    console.error('Failed to create new session after expiration', createErr);
                    dispatch(clearCheckoutState());
                    return { ok: false, fatal: true };
                }
            }

            console.error('Step1 error', error);
            dispatch(clearCheckoutState());
            return { ok: false, fatal: true };
        }
    }, [checkout.token, checkout.expiresAt, checkoutStep1, buildPayload, createSession, updateStateFromResp, dispatch]);

    const recalcStep2 = useCallback(

        async (payload: any) => {
            const requestId = ++requestIdStep2Ref.current;

            void logCheckout({
                event: 'step2-start',
                step: 2,
                correlationId: payload.token,
                data: {
                    selectedShippingMethod: payload.shipping_method_id,
                },
            });

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
                    void logCheckout({
                        event: 'step2-refresh-step1',
                        step: 2,
                        correlationId: payload.token,
                        important: true,
                    });

                    try {
                        const step1Resp = await recalcSessionSafe(true);

                        if (!step1Resp.ok) {
                            console.warn('Step2 failed due to Step1 refresh');
                            return null;
                        }

                        const newToken = step1Resp.data?.session_token ?? checkout.token;
                        const newPayload = { ...payload, token: newToken };

                        resp = await checkoutStep2({ payload: newPayload }).unwrap();
                    } catch (e) {
                        console.warn('Step2 failed due to Step1 refresh');
                        return null;
                    }
                }

                if (requestId !== requestIdStep2Ref.current) return null;

                if (resp?.warnings && resp?.warnings?.length > 0) {
                    void logCheckout({
                        event: 'step2-error',
                        step: 2,
                        correlationId: payload.token,
                        data: {
                            errors: resp.errors,
                            warnings: resp.warnings,
                        },
                        important: true,
                    });

                    router.push('/cart');
                    return null;
                }

                return updateStep2StateFromResp(resp);
            } catch (err) {
                console.warn('Step2 failed', err);
                return null;
            }
        },
        [checkoutStep2, recalcSessionSafe, updateStep2StateFromResp]
    );

    const recalcStep2Safe = useCallback(
        async (payload: any): Promise<Step2Result> => {
            try {
                const resp = await recalcStep2(payload);

                if (!resp) {
                    return { ok: false, fatal: false };
                }

                return { ok: true, data: resp };
            } catch (e) {
                console.error('Step2 fatal error', e);
                dispatch(clearCheckoutState());
                return { ok: false, fatal: true };
            }
        },
        [recalcStep2, dispatch]
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

            void logCheckout({
                event: 'step3-finalize-success',
                step: 2,
                correlationId: token,
                data: { orderId },
            });

        } catch (e: any) {
            const status = e?.status;

            clearSession();

            if (status === 500) {
                try { await attempt(); } catch { }
            }

            console.error('STEP 3 finalize error', status, e);

            void logCheckout({
                event: 'step3-finalize-error',
                step: 2,
                correlationId: token,
                data: {
                    status,
                },
                important: true,
            });
        }
    };

    return {
        initStep1,
        recalcSessionSafe,
        recalcStep2Safe,
        clearSession,
        couponError,
        setCouponError,
        couponSuccess,
        isLoading,
        isStep2Loading,
        finalizeCheckoutSession,
    };
}
