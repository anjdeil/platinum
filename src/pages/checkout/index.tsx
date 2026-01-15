import { BillingForm } from '@/components/global/forms/BillingForm/BillingForm';
import CheckIcon from '@/components/global/icons/CheckIcon';
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import CheckoutWarnings from '@/components/pages/checkout/CheckoutWarnings';
import FreeShippingNotifications from '@/components/pages/checkout/FreeShippingNotifications/FreeShippingNotifications';
import ShippingMethodSelector from '@/components/pages/checkout/ShippingMethodSelector/ShippingMethodSelector';
import {
  CheckoutAgreement,
  CheckoutAgreementWrapper,
  CheckoutContainer,
  CheckoutFormSection,
  CheckoutFormSectionTitle,
  CheckoutFormsWrapper,
  CheckoutPayButton,
  CheckoutPayButtonWrapper,
  CheckoutSummary,
  CheckoutSummaryWrapper,
} from '@/components/pages/checkout/style';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import useGetAuthToken from '@/hooks/useGetAuthToken';
import useInPostGeowidget from '@/hooks/useInPostGeowidget';
import useShippingMethods from '@/hooks/useShippingMethods';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useCreateOrderMutation,
  useUpdateCustomerMutation,
} from '@/store/rtk-queries/wooCustomApi';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import {
  OrderLineMetaDataType,
  ParcelMachineType,
  ShippingLineType,
} from '@/types/pages/checkout';
import { ShippingMethodType, WooErrorType } from '@/types/services';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import getCalculatedMethodCostByWeight from '@/utils/checkout/getCalculatedMethodCostByWeight';
import getShippingMethodFixedCost from '@/utils/checkout/getShippingMethodFixedCost';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import Notification from '@/components/global/Notification/Notification';
import PreOrderSummary from '@/components/pages/cart/PreOrderSummary/PreOrderSummary';
import BillingWarnings from '@/components/pages/checkout/BillingWarnings';
import { RegistrationError } from '@/components/pages/checkout/RegistrationError/RegistrationError';
import { PageTitle } from '@/components/pages/pageTitle';
import { Step2Result, useCheckoutSession } from '@/hooks/useCheckoutSession';
import { useGetCustomerData } from '@/hooks/useGetCustomerData';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { useGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import {
  addCoupon,
  clearCoupon,
  setIgnoreCoupon,
} from '@/store/slices/cartSlice';
import { StyledButton } from '@/styles/components';
import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';
import {
  BillingType,
  MetaDataType,
  ShippingType,
  Step2RequestType,
} from '@/types/services/wooCustomApi/customer';
import getCartCheckoutTotals from '@/utils/cart/getCartCheckoutTotals';
import checkCustomerDataChanges from '@/utils/checkCustomerDataChanges';
import { readNip } from '@/utils/readNip';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function CheckoutPage() {
  const t = useTranslations('Checkout');
  const tCart = useTranslations('Cart');
  const tMyAccount = useTranslations('MyAccount');
  const dispatch = useAppDispatch();

  const { customer, refetch } = useGetCustomerData();
  const { cartItems, couponCode, ignoreCoupon, commentToOrder } =
    useAppSelector(state => state.cartSlice);
  const {
    currentCurrency: currency,
    isLoading: isCurrencyLoading,
    convertCurrency,
  } = useCurrencyConverter();

  const { data: userTotal } = useGetUserTotalsQuery(customer?.id, {
    skip: !customer?.id,
  });

  const userLoyaltyStatus = userTotal?.loyalty_status;
  const checkout = useAppSelector(s => s.checkoutSlice);
  const {
    recalcSessionSafe,
    recalcStep2Safe,
    isLoading: isStep1Loading,
    isStep2Loading,
    finalizeCheckoutSession,
  } = useCheckoutSession(userLoyaltyStatus);

  const authToken = useGetAuthToken();

  const step1DebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const step2DebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isStep2Pending, setIsStep2Pending] = useState(false);

  const [checkoutFatalError, setCheckoutFatalError] = useState(false);

  const handleCheckoutResult = (result: { ok: boolean; fatal?: boolean }) => {
    if (!result.ok && result.fatal) {
      setCheckoutFatalError(true);
      if (step1DebounceRef.current) clearTimeout(step1DebounceRef.current);
      return false;
    }
    return true;
  };

  const debouncedTriggerStep1 = useCallback(() => {
    if (step1DebounceRef.current) {
      clearTimeout(step1DebounceRef.current);
    }

    step1DebounceRef.current = setTimeout(async () => {
      if (checkoutFatalError) return;
      const result = await recalcSessionSafe();

      if (!handleCheckoutResult(result)) return;
    }, 300);
  }, [recalcSessionSafe]);

  const debouncedTriggerStep2 = useCallback(
    (payload: Step2RequestType) => {
      if (step2DebounceRef.current) {
        clearTimeout(step2DebounceRef.current);
      }

      step2DebounceRef.current = setTimeout(async () => {
        try {
          const result = await recalcStep2Safe(payload);
          if (!handleStep2Result(result)) return;

          if (result.ok && result.data?.shippingError) {
            setWarnings(['shippingMethodUnavailable', 'shippingMethod']);
            setIsWarningsShown(true);
            setShippingMethod(undefined);
          }
        } catch (err) {
          console.error('Step2 error (debounced)', err);
        }
      }, 300);
    },
    [recalcStep2Safe]
  );

  const handleStep2Result = (result: Step2Result) => {
    if (!result.ok && result.fatal) {
      setCheckoutFatalError(true);
      if (step2DebounceRef.current) clearTimeout(step2DebounceRef.current);
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      if (step1DebounceRef.current) {
        clearTimeout(step1DebounceRef.current);
      }
      if (step2DebounceRef.current) {
        clearTimeout(step2DebounceRef.current);
      }
    };
  }, []);

  const [allowedShippingMethods, setAllowedShippingMethods] = useState<
    string[]
  >([]);
  const { name: currencyCode } = useAppSelector(state => state.currencySlice);

  const prevCurrencyRef = useRef(currencyCode);

  const [currentCountryCode, setCurrentCountryCode] = useState<string>();
  const { shippingMethods, isLoading } = useShippingMethods(
    currentCountryCode,
    allowedShippingMethods
  );

  const [shippingMethod, setShippingMethod] = useState<ShippingMethodType>();
  const [parcelMachine, setParcelMachine] = useState<ParcelMachineType>();
  const [shippingLine, setShippingLine] = useState<ShippingLineType>();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isShippingAddressDifferent, setIsShippingAddressDifferent] =
    useState<boolean>(false);
  const [formOrderData, setFormOrderData] = useState<{
    billing: BillingType | null;
    shipping: ShippingType | null;
    metaData: MetaDataType[] | null;
  }>({
    billing: null,
    shipping: null,
    metaData: null,
  });

  const [isInvoice, setIsInvoice] = useState<boolean>(false);

  const [isRegistration, setIsRegistration] = useState(false);
  const [registrationData, setRegistrationData] =
    useState<RegistrationFormType | null>(null);

  const [{ totalCost, totalWeight }, setCartTotals] = useState({
    totalCost: 0,
    totalWeight: 0,
  });

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [registrationErrorWarning, setRegistrationErrorWarning] = useState<
    string | null
  >(null);
  const [isUserAlreadyExist, setIsUserAlreadyExist] = useState<boolean>(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState<
    boolean | null
  >(null);

  const [warnings, setWarnings] = useState<string[]>();
  const [couponError, setCouponError] = useState<boolean>(false);
  const [phoneWarnings, setPhoneWarnings] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string | null>(null);
  const [phoneTrigger, setPhoneTrigger] = useState(false);

  const [isWarningsShown, setIsWarningsShown] = useState(false);

  const { inPostHead, InPostGeowidget, pointDetail } = useInPostGeowidget();
  const [isGeowidgetShown, setGeowidgetShown] = useState(false);

  const [
    createOrder,
    {
      data: order,
      isLoading: isOrderLoading = true,
      error: orderCreationError,
    },
  ] = useCreateOrderMutation();
  const [fetchUserData, { data: userData, isLoading: isUserDataLoading }] =
    useLazyFetchUserDataQuery();

  /* Check cart conflict */
  useEffect(() => {
    const fetchData = async () => {
      const defaultLanguage = router.defaultLocale || 'pl';
      const productsMinimizedData = await getProductsMinimized({
        cartItems,
        lang: router.locale || defaultLanguage,
      });
      const productsMinimized = productsMinimizedData?.data?.data?.items || [];

      if (checkCartConflict(cartItems, productsMinimized)) {
        router.push('/cart');
      }
    };

    if (cartItems.length) {
      fetchData();
    } else {
      router.push('/cart');
    }
  }, [cartItems]);

  /* Fetch user */
  useEffect(() => {
    if (authToken) fetchUserData(authToken);
  }, [authToken]);

  const handleParcelMachineChange = (methodId: string) => {
    switch (methodId) {
      case 'easypack_parcel_machines':
        setGeowidgetShown(true);
        break;
    }
  };

  useEffect(() => {
    if (pointDetail) {
      setParcelMachine({
        methodId: 'easypack_parcel_machines',
        choosenParcelMachine: {
          name: pointDetail.name,
          address: Object.values(pointDetail.address).join(', '),
          description: pointDetail.location_description,
        },
      });

      setWarnings([]);
      setGeowidgetShown(false);
    }
  }, [pointDetail]);

  /**
   * Shipping
   */
  useEffect(() => {
    setShippingMethod(undefined);
  }, [shippingMethods]);

  useEffect(() => {
    if (shippingMethod) {
      setWarnings([]);
      setValidationErrors(null);
    }

    if (!phoneTrigger) return;

    if (
      !shippingMethod ||
      !shippingMethod.method_title.includes('InPost Locker 24/7')
    ) {
      setPhoneTrigger(false);
      setPhoneWarnings(null);
    }
  }, [shippingMethod]);

  useEffect(() => {
    if (!formOrderData.shipping?.country) return;
    setCurrentCountryCode(formOrderData.shipping.country);
  }, [formOrderData.shipping?.country]);

  /**
   * Shipping costs logic
   */
  const getCalculatedShippingMethodCost = (method: ShippingMethodType) => {
    const costByValueOrWeight = getCalculatedMethodCostByWeight(
      method,
      totalWeight,
      totalCost
    );
    if (costByValueOrWeight !== false) return costByValueOrWeight;

    const costFixed = getShippingMethodFixedCost(method, totalCost);
    if (costFixed !== false) return costFixed;

    return 0;
  };

  useEffect(() => {
    if (!isCurrencyLoading) {
      if (shippingMethod) {
        const { title, method_id, instance_id } = shippingMethod;

        const shippingMethodCost = convertCurrency(
          getCalculatedShippingMethodCost(shippingMethod)
        );

        const meta: OrderLineMetaDataType[] = [];

        if (
          parcelMachinesMethods.includes(method_id) &&
          parcelMachine &&
          parcelMachine.methodId === method_id
        ) {
          meta.push(
            {
              key: 'Selected parcel locker',
              value: parcelMachine.choosenParcelMachine.name,
            },
            {
              key: 'Address',
              value: parcelMachine.choosenParcelMachine.address,
            },
            {
              key: 'Description',
              value: parcelMachine.choosenParcelMachine.description,
            }
          );
        }

        meta.push({
          key: 'Weight',
          value: `${totalWeight} kg`,
        });

        setShippingLine({
          method_id,
          method_title: title,
          instance_id: instance_id.toString(),
          meta_data: meta,
          total: String(shippingMethodCost),
        });
      } else {
        setShippingLine(undefined);
      }
    }
  }, [
    shippingMethod,
    parcelMachine,
    currency,
    isCurrencyLoading,
    totalWeight,
    totalCost,
  ]);

  useEffect(() => {
    const shouldInitStep1 =
      !checkout.token ||
      !checkout.totals ||
      checkout.session?.coupon_code !== couponCode;

    if (!shouldInitStep1) return;

    if (checkoutFatalError) return;

    debouncedTriggerStep1();
  }, [couponCode]);

  useEffect(() => {
    const step2NotDone = !checkout.hasStep2Requested;
    const currencyActuallyChanged =
      prevCurrencyRef.current !== undefined &&
      prevCurrencyRef.current !== currencyCode;

    if (!step2NotDone) return;

    if (!currencyActuallyChanged) return;

    if (checkoutFatalError) return;

    debouncedTriggerStep1();

    prevCurrencyRef.current = currencyCode;
  }, [currencyCode]);

  useEffect(() => {
    if (!cartItems.length) return;
    if (checkoutFatalError) return;

    debouncedTriggerStep1();
  }, [cartItems]);

  // -----------------------------
  // Step 2: trigger on shipping/coupon change/currency
  // -----------------------------
  useEffect(() => {
    if (cartItems.length === 0) return;

    if (shippingMethod && formOrderData.billing) {
      setIsStep2Pending(true);

      const shippingData: ShippingType = {
        first_name:
          formOrderData.shipping?.first_name ||
          formOrderData.billing.first_name,
        last_name:
          formOrderData.shipping?.last_name || formOrderData.billing.last_name,
        address_1:
          formOrderData.shipping?.address_1 || formOrderData.billing.address_1,
        address_2:
          formOrderData.shipping?.address_2 || formOrderData.billing.address_2,
        city: formOrderData.shipping?.city || formOrderData.billing.city,
        postcode:
          formOrderData.shipping?.postcode || formOrderData.billing.postcode,
        country:
          formOrderData.shipping?.country || formOrderData.billing.country,
        state: formOrderData.shipping?.state || formOrderData.billing.state,
        email: formOrderData.shipping?.email || formOrderData.billing.email,
        phone: formOrderData.shipping?.phone || formOrderData.billing.phone,
      };

      const payload: Step2RequestType = {
        token: checkout.token!,
        currency: currencyCode,
        use_billing_for_shipping: !isShippingAddressDifferent,
        billing_data: formOrderData.billing,
        ...(isShippingAddressDifferent && { shipping_data: shippingData }),
        shipping_method_id: `${shippingMethod.method_id}:${shippingMethod.id}`,
      };

      debouncedTriggerStep2(payload);
    } else if (checkout.hasStep2Requested && !shippingMethod) {
      let billingDataObj;

      try {
        billingDataObj = JSON.parse(checkout.billingData!);
      } catch {
        console.warn('Invalid billing data JSON', checkout.billingData);
        return;
      }

      const payload: Step2RequestType = {
        token: checkout.token!,
        currency: currencyCode,
        billing_data: billingDataObj,
        use_billing_for_shipping: true,
      };

      debouncedTriggerStep2(payload);
    }
  }, [shippingMethod, currencyCode]);

  useEffect(() => {
    if (!isStep2Loading) {
      setIsStep2Pending(false);
    }
  }, [isStep2Loading]);

  useEffect(() => {
    if (!phoneTrigger) return;

    setPhoneTrigger(false);
    setPhoneWarnings(null);
  }, [formOrderData.billing?.phone]);

  const updateCustomerDataIfNeeded = async () => {
    if (customer && customer?.billing && formOrderData?.billing) {
      const { isNipChanged, hasChanges } = checkCustomerDataChanges(
        formOrderData.billing,
        formOrderData.shipping ?? {
          first_name: '',
          last_name: '',
          address_1: '',
          address_2: '',
          city: '',
          postcode: '',
          country: '',
        },
        formOrderData.metaData ?? [],
        customer,
        isInvoice,
        isShippingAddressDifferent
      );

      if (hasChanges) {
        const nipValue = readNip(
          formOrderData?.billing,
          formOrderData?.metaData
        );

        const preparedData = {
          email: formOrderData.billing?.email || '',
          first_name: formOrderData.billing?.first_name || '',
          last_name: formOrderData.billing?.last_name || '',
          username: formOrderData.billing?.email || '',
          use_billing_for_shipping: !isShippingAddressDifferent,
          billing: {
            first_name: formOrderData.billing?.first_name || '',
            last_name: formOrderData.billing?.last_name || '',
            email: formOrderData.billing?.email || '',
            phone: formOrderData.billing?.phone || '',
            country: formOrderData.billing?.country || '',
            city: formOrderData.billing?.city || '',
            address_1: formOrderData.billing?.address_1 || '',
            address_2: formOrderData.billing?.address_2 || '',
            postcode: formOrderData.billing?.postcode || '',
            company: isInvoice
              ? formOrderData.billing?.company || ''
              : customer.billing.company || '',
            nip: isInvoice ? nipValue || '' : '',
          },
          shipping: {
            first_name: isShippingAddressDifferent
              ? formOrderData.shipping?.first_name
              : customer.shipping?.first_name || '',
            last_name: isShippingAddressDifferent
              ? formOrderData.shipping?.last_name
              : customer.shipping?.last_name || '',
            phone: isShippingAddressDifferent
              ? formOrderData.billing?.phone
              : customer.billing?.phone || '',
            country: isShippingAddressDifferent
              ? formOrderData.shipping?.country
              : customer.shipping?.country || '',
            city: isShippingAddressDifferent
              ? formOrderData.shipping?.city
              : customer.shipping?.city || '',
            address_1: isShippingAddressDifferent
              ? formOrderData.shipping?.address_1
              : customer.shipping?.address_1 || '',
            address_2: isShippingAddressDifferent
              ? formOrderData.shipping?.address_2
              : customer.shipping?.address_2 || '',
            postcode: isShippingAddressDifferent
              ? formOrderData.shipping?.postcode
              : customer.shipping?.postcode || '',
          },
          // meta_data: [],
          meta_data:
            isInvoice && isNipChanged && nipValue
              ? [
                  {
                    key: '_billing_vat_number',
                    value: nipValue,
                  },
                ]
              : [],
        };

        try {
          await updateCustomer({
            id: customer.id,
            ...preparedData,
          });

          await refetch();
        } catch (error) {
          console.error('Update customer failed', error);
        }
      }
    }
  };

  const validateCheckoutBeforeOrder = () => {
    // 1. shipping method
    if (!shippingMethod) {
      setValidationErrors('validationErrorsFields');
      setIsWarningsShown(true);
      return false;
    }

    // 2. parcel machine
    if (
      parcelMachinesMethods.includes(shippingMethod.method_id) &&
      !parcelMachine
    ) {
      setWarnings(['parcelLocker']);
      setIsWarningsShown(true);
      return false;
    }

    // 3. form validity
    if (!isValidForm) {
      setValidationErrors('validationErrorsFields');
      setIsWarningsShown(true);
      return false;
    }

    // 4. phone (InPost)
    if (
      shippingMethod.method_title.includes('InPost Locker 24/7') &&
      !formOrderData.billing?.phone?.startsWith('+48')
    ) {
      setPhoneTrigger(true);
      setPhoneWarnings('inpostPhoneRequired');
      setIsWarningsShown(true);
      return false;
    }

    setWarnings([]);
    setValidationErrors(null);

    return true;
  };

  const [getProductsMinimized, { data: productsMinimizedData }] =
    useGetProductsMinimizedMutation();

  const createOrderHandler = async () => {
    if (isCreatingOrder) return;

    if (!validateCheckoutBeforeOrder()) return;

    setIsCreatingOrder(true);

    // Step2 final check before order creation
    if (shippingMethod && formOrderData.billing) {
      const shippingData: ShippingType = {
        first_name:
          formOrderData.shipping?.first_name ||
          formOrderData.billing.first_name,
        last_name:
          formOrderData.shipping?.last_name || formOrderData.billing.last_name,
        address_1:
          formOrderData.shipping?.address_1 || formOrderData.billing.address_1,
        address_2:
          formOrderData.shipping?.address_2 || formOrderData.billing.address_2,
        city: formOrderData.shipping?.city || formOrderData.billing.city,
        postcode:
          formOrderData.shipping?.postcode || formOrderData.billing.postcode,
        country:
          formOrderData.shipping?.country || formOrderData.billing.country,
        state: formOrderData.shipping?.state || formOrderData.billing.state,
        email: formOrderData.shipping?.email || formOrderData.billing.email,
        phone: formOrderData.shipping?.phone || formOrderData.billing.phone,
      };

      const step2Payload: Step2RequestType = {
        token: checkout.token!,
        currency: currencyCode,
        use_billing_for_shipping: !isShippingAddressDifferent,
        billing_data: formOrderData.billing,
        ...(isShippingAddressDifferent && { shipping_data: shippingData }),
        shipping_method_id: `${shippingMethod.method_id}:${shippingMethod.id}`,
        final_check: true,
      };

      try {
        const step2Result = await recalcStep2Safe(step2Payload);

        if (!handleStep2Result(step2Result)) {
          setIsCreatingOrder(false);
          return;
        }

        if (!step2Result.ok) {
          setIsCreatingOrder(false);
          return;
        }

        if (!step2Result?.data.success) {
          if (
            step2Result?.data.shippingError &&
            step2Result?.data.shippingError.length > 0
          ) {
            setWarnings(['shippingMethodUnavailable', 'shippingMethod']);
            setIsWarningsShown(true);
            setShippingMethod(undefined);
          }

          if (
            step2Result?.data.couponErrors &&
            step2Result.data.couponErrors.length > 0
          ) {
            setShippingMethod(undefined);
            setCouponError(true);
            setIsWarningsShown(true);
          }

          setIsCreatingOrder(false);
          return;
        }
      } catch (err) {
        console.error('Step2 final check failed', err);
        setIsCreatingOrder(false);
        return;
      }
    }

    let canProceed = true;

    if (isRegistration && registrationData) {
      setIsRegistrationSuccessful(false);

      const registrationError = await registerUser(registrationData);

      if (!registrationError) {
        setIsRegistrationSuccessful(true);
        setRegistrationErrorWarning(null);
        setRegistrationData(null);
      } else {
        canProceed = false;
        setRegistrationErrorWarning(registrationError);

        if (
          registrationError.includes(
            'An account is already registered with your email address.'
          )
        ) {
          setRegistrationData(null);
        }
      }
    }

    if (!canProceed) {
      setIsCreatingOrder(false);
      return;
    }

    try {
      await updateCustomerDataIfNeeded();
    } catch (error) {
      console.warn('Update customer failed, but continuing order', error);
    }

    const couponLines =
      !ignoreCoupon && couponCode ? [{ code: couponCode }] : [];

    const filteredMetaData = Array.isArray(formOrderData.metaData)
      ? formOrderData.metaData
      : [];

    const productsMap = new Map(
      productsMinimizedData?.data.items.map(item => [item.id, item.name])
    );

    const enrichedCartItems = cartItems.map(item => {
      const name = productsMap.get(item.variation_id || item.product_id);
      return {
        ...item,
        ...(name ? { name } : {}),
      };
    });

    const orderPayload = {
      status: 'pending' as const,
      line_items: enrichedCartItems,
      meta_data: [
        {
          key: 'wpml_language',
          value: router.locale || '',
        },
        ...(filteredMetaData || []),
      ],
      coupon_lines: couponLines,
      ...(currencyCode && { currency: currencyCode }),
      ...(formOrderData.billing && { billing: formOrderData.billing }),
      ...(formOrderData.shipping &&
        isShippingAddressDifferent && { shipping: formOrderData.shipping }),
      ...(userData?.id && { customer_id: userData.id }),
      ...(shippingLine && { shipping_lines: [shippingLine] }),
      ...(commentToOrder && { customer_note: commentToOrder }),
    };

    try {
      const createdOrder = await createOrder(orderPayload).unwrap();

      // step3
      await finalizeCheckoutSession(checkout.token, createdOrder.id);

      if (createdOrder.payment_url) {
        const paymentUrlObj = new URL(createdOrder.payment_url);
        const langCode = router.locale === 'en' ? '' : router.locale;
        paymentUrlObj.pathname = '/' + langCode + paymentUrlObj.pathname;
        router.push(paymentUrlObj.toString());

        return;
      }
      setIsCreatingOrder(false);
    } catch (error) {
      console.error('Order creation failed', error);
      setIsCreatingOrder(false);
    }
  };

  const isPayButtonDisabled =
    isCreatingOrder ||
    isOrderLoading ||
    isLoading ||
    !shippingLine ||
    !shippingMethod ||
    !shippingMethods.some(m => m.method_id === shippingMethod?.method_id) ||
    isStep2Loading ||
    isStep2Pending ||
    checkoutFatalError;

  const [updateCustomer, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateCustomerMutation();

  useEffect(() => {
    const productsMinimized = productsMinimizedData?.data?.items;
    if (productsMinimized) {
      setCartTotals(getCartCheckoutTotals(productsMinimized, cartItems));

      const allowedMethodsLists = productsMinimized.map(
        item => item.shipping_methods_allowed || []
      );

      const intersect = allowedMethodsLists.length
        ? allowedMethodsLists.reduce((acc, curr) =>
            acc.filter(methodId => curr.includes(methodId))
          )
        : [];

      setAllowedShippingMethods(intersect);
    }
  }, [cartItems, productsMinimizedData]);

  //Facebook Pixel: InitiateCheckout
  useEffect(() => {
    const cartKey = `fb-initiate-checkout-${btoa(JSON.stringify(cartItems))}`;
    const alreadyTracked = sessionStorage.getItem(cartKey);

    if (
      typeof window !== 'undefined' &&
      typeof window.fbq === 'function' &&
      totalCost > 0 &&
      !isCurrencyLoading &&
      !alreadyTracked
    ) {
      window.fbq('track', 'InitiateCheckout', {
        value: parseFloat(totalCost.toFixed(2)),
        currency: currency || 'PLN',
      });

      sessionStorage.setItem(cartKey, 'true');
    }
  }, [totalCost, currency, isCurrencyLoading]);

  useEffect(() => {
    if (customer && ignoreCoupon) {
      dispatch(setIgnoreCoupon(false));
    }
  }, [customer]);

  useEffect(() => {
    if (ignoreCoupon) return;

    if (userLoyaltyStatus && !couponCode && authToken && cartItems.length > 0) {
      dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
    }
  }, [userLoyaltyStatus, couponCode, authToken]);

  //GTM
  useEffect(() => {
    if (
      order &&
      order.line_items?.length > 0 &&
      typeof window !== 'undefined'
    ) {
      const gtmKey = `gtm-begin-checkout-${order.id}`;
      const alreadyTracked = sessionStorage.getItem(gtmKey);

      if (!alreadyTracked) {
        // GTM: begin_checkout

        const gtmPayload = {
          event: 'begin_checkout',
          currency: currencyCode || 'PLN',
          value: order.total,
          items: order.line_items.map(item => ({
            item_id: item.variation_id || item.product_id,
            item_name: item.name,
            price: Number(item.price.toFixed(2)),
            quantity: item.quantity,
          })),
        };

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(gtmPayload);

        sessionStorage.setItem(gtmKey, 'true');
      }
    }
  }, [order, currencyCode]);

  const { registerUser } = useRegisterUser();

  /**
   * Handle order creation error
   */
  useEffect(() => {
    if (orderCreationError) {
      const wooError = (orderCreationError as FetchBaseQueryError).data;
      const errorCode = (wooError as WooErrorType)?.details?.code;
      setShippingMethod(undefined);

      if (
        errorCode === 'woocommerce_rest_invalid_coupon' ||
        errorCode === 'invalid_coupon_for_sale'
      ) {
        dispatch(clearCoupon());
        dispatch(setIgnoreCoupon(true));
        setCouponError(true);
        setIsWarningsShown(true);
      }
    }
  }, [orderCreationError]);

  useEffect(() => {
    if (!isValidForm && shippingMethod) {
      setShippingMethod(undefined);
    }
  }, [isValidForm]);

  return (
    <>
      <PageTitle nameSpace={'Cart'} spaceKey={'PersonalInformation'} />
      <Head>
        {inPostHead}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <OrderProgress />
      <CheckoutContainer>
        <CheckoutFormsWrapper>
          {/* Error */}
          {checkoutFatalError && (
            <Notification type="warning">
              <p>{tCart('cartFatal')}</p>
              <StyledButton onClick={() => router.reload()} width="fit-content">
                {tCart('reloadPage')}
              </StyledButton>
            </Notification>
          )}

          {/* Billing and shipping forms */}
          {validationErrors && <BillingWarnings message={validationErrors} />}

          {phoneWarnings && isWarningsShown && (
            <BillingWarnings message={phoneWarnings} />
          )}

          {couponError && isWarningsShown && (
            <Notification type="warning">
              {tCart('couponIsNotApplied')}
            </Notification>
          )}

          {registrationErrorWarning && (
            <RegistrationError
              message={registrationErrorWarning}
              setIsUserAlreadyExist={setIsUserAlreadyExist}
            />
          )}

          <BillingForm
            setFormOrderData={setFormOrderData}
            setCurrentCountryCode={setCurrentCountryCode}
            setValidationErrors={setValidationErrors}
            isWarningsShown={isWarningsShown}
            setIsShippingAddressDifferent={setIsShippingAddressDifferent}
            isUserAlreadyExist={isUserAlreadyExist}
            setRegistrationErrorWarning={setRegistrationErrorWarning}
            setIsRegistration={setIsRegistration}
            setRegistrationData={setRegistrationData}
            setIsValidForm={setIsValidForm}
            phoneTrigger={phoneTrigger}
            setIsInvoice={setIsInvoice}
          />

          <CheckoutFormSection>
            <CheckoutFormSectionTitle as={'h2'}>
              {t('delivery')}
            </CheckoutFormSectionTitle>

            {warnings && isWarningsShown && (
              <CheckoutWarnings messages={warnings}></CheckoutWarnings>
            )}

            {phoneWarnings && isWarningsShown && (
              <BillingWarnings message={phoneWarnings} />
            )}

            <FreeShippingNotifications
              methods={shippingMethods}
              totalCost={totalCost}
            />

            <ShippingMethodSelector
              methods={shippingMethods}
              isLoading={isLoading || isCreatingOrder}
              currentMethodId={shippingMethod?.method_id}
              onChange={method => {
                setShippingMethod(method);
                setCouponError(false);
              }}
              parcelMachinesMethods={parcelMachinesMethods}
              parcelMachine={parcelMachine}
              onParcelMachineChange={handleParcelMachineChange}
              getCalculatedMethodCost={getCalculatedShippingMethodCost}
              disabled={!isValidForm}
            />
          </CheckoutFormSection>
        </CheckoutFormsWrapper>
        <CheckoutSummaryWrapper>
          <CheckoutSummary>
            <PreOrderSummary
              isLoading={isStep1Loading || isStep2Loading || isUserDataLoading}
              summary={checkout.totals}
              selectedShippingMethod={
                checkout.selectedShippingMethod ?? undefined
              }
              session={checkout.session}
            />
          </CheckoutSummary>
          <CheckoutPayButtonWrapper>
            <CheckoutPayButton
              disabled={isPayButtonDisabled}
              onClick={createOrderHandler}
            >
              {tCart('Continue')}
            </CheckoutPayButton>
            <CheckoutAgreementWrapper>
              <CheckIcon />
              <CheckoutAgreement>
                {t('agreement')}{' '}
                <Link href="/privacy-policy">{t('privacyPolicy')}</Link>.
              </CheckoutAgreement>
            </CheckoutAgreementWrapper>
          </CheckoutPayButtonWrapper>
        </CheckoutSummaryWrapper>
        {!registrationErrorWarning && isRegistrationSuccessful && (
          <Notification type={'success'}>
            {tMyAccount('YourAccountHasBeenCreated')}
          </Notification>
        )}

        {updateError && (
          <Notification type="warning">
            {tMyAccount('updateError')}
          </Notification>
        )}

        {isUpdateSuccess && (
          <Notification type="success">
            {tMyAccount('successUpdate')}
          </Notification>
        )}
      </CheckoutContainer>

      {isGeowidgetShown && (
        <InPostGeowidget onClose={() => setGeowidgetShown(false)} />
      )}
    </>
  );
}
