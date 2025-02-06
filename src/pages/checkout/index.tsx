import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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
import ShippingMethodSelector from '@/components/pages/checkout/ShippingMethodSelector/ShippingMethodSelector';
import useShippingMethods from '@/hooks/useShippingMethods';
import {
  OrderLineMetaDataType,
  ParcelMachineType,
  ShippingLineType,
} from '@/types/pages/checkout';
import useInPostGeowidget from '@/hooks/useInPostGeowidget';
import { ShippingMethodType } from '@/types/services';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import { useAppSelector } from '@/store';
import useGetAuthToken from '@/hooks/useGetAuthToken';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import OrderSummary from '@/components/pages/cart/OrderSummary/OrderSummary';
import CheckIcon from '@/components/global/icons/CheckIcon';
import router from 'next/router';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import CheckoutWarnings from '@/components/pages/checkout/CheckoutWarnings';
import validateOrder from '@/utils/checkout/validateOrder';
import getCalculatedMethodCostByWeight from '@/utils/checkout/getCalculatedMethodCostByWeight';
import getShippingMethodFixedCost from '@/utils/checkout/getShippingMethodFixedCost';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import getCartTotals from '@/utils/cart/getCartTotals';
import FreeShippingNotifications from '@/components/pages/checkout/FreeShippingNotifications/FreeShippingNotifications';
import { NewBillingForm } from '@/components/global/forms/BillingForm/NewBillingForm';
import Notification from '@/components/global/Notification/Notification';
import {
  RegistrationType,
} from '@/utils/checkout/getFormattedUserData';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function CheckoutPage() {
  const t = useTranslations('Checkout');

  const {
    currentCurrency: currency,
    isLoading: isCurrencyLoading,
    convertCurrency,
    currencyCode: currencySymbol,
  } = useCurrencyConverter();

  /**
   * Calculate totals
   */
  const { cartItems, couponCodes } = useAppSelector(state => state.cartSlice);
  const [getProductsMinimized, { data: productsMinimizedData }] =
    useGetProductsMinimizedMutation();
  const [{ totalCost, totalWeight }, setCartTotals] = useState({
    totalCost: 0,
    totalWeight: 0,
  });

  useEffect(() => {
    const productsMinimized = productsMinimizedData?.data?.items;
    if (productsMinimized)
      setCartTotals(getCartTotals(productsMinimized, cartItems));
  }, [cartItems, productsMinimizedData]);

  /**
   * InPost
   */
  const { inPostHead, InPostGeowidget, pointDetail } = useInPostGeowidget();
  const [isGeowidgetShown, setGeowidgetShown] = useState(false);

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

      setGeowidgetShown(false);
    }
  }, [pointDetail]);

  /**
   * Shipping costs logic
   */
  const getCalculatedShippingMethodCost = (method: ShippingMethodType) => {
    // console.log(totalWeight);
    const costByWeight = getCalculatedMethodCostByWeight(method, totalWeight);
    if (costByWeight !== false) return costByWeight;

    const costFixed = getShippingMethodFixedCost(method, totalCost);
    if (costFixed !== false) return costFixed;

    return 0;
  };

  /**
   * Shipping
   */
  const [currentCountryCode, setCurrentCountryCode] = useState<string>();
  const { shippingMethods, isLoading } = useShippingMethods(currentCountryCode);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodType>();
  const [parcelMachine, setParcelMachine] = useState<ParcelMachineType>();
  const [shippingLine, setShippingLine] = useState<ShippingLineType>();

  useEffect(() => {
    setShippingMethod(undefined);
  }, [shippingMethods]);

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

  /**
   * Order logic
   */
  const [orderStatus, setOrderStatus] = useState<'on-hold' | 'pending'>(
    'on-hold'
  );

  // // Get data from BillingForm
  // const [billingData, setBillingData] = useState<BillingType | null>(null);
  // const [shippingData, setShippingData] = useState<ShippingType | null>(null);
  // const [metaData, setMetaData] = useState<MetaDataType[] | null>(null);
  // const [registrationData, setRegistrationData] =
  //   useState<RegistrationType | null>(null);

  const [isValidation, setIsValidation] = useState(false);
  const [formOrderData, setFormOrderData] = useState<{
    billing: BillingType | null;
    shipping: ShippingType | null;
    metaData: MetaDataType[] | null;
    registration: RegistrationType | null;
  }>({
    billing: null,
    shipping: null,
    metaData: null,
    registration: null,
  });

  useEffect(() => {
    if (!formOrderData.shipping?.country) return;
    setCurrentCountryCode(formOrderData.shipping.country);
  }, [formOrderData.shipping?.country]);

  const authToken = useGetAuthToken();
  const { name: currencyCode } = useAppSelector(state => state.currencySlice);
  const [createOrder, { data: order, isLoading: isOrderLoading = true }] =
    useCreateOrderMutation();
  const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

  /* Check cart conflict */
  useEffect(() => {
    const fetchData = async () => {
      const productsMinimizedData = await getProductsMinimized({
        cartItems,
        lang: router.locale || 'en',
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

  /**
   * Order validation
   */
  // const [billingWarning, setBillingWarning] = useState<string | null>(null);
  // const [registrationError, setRegistrationError] = useState<string | null>(
  //   null
  // );

  const [warnings, setWarnings] = useState<string[]>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [isWarningsShown, setIsWarningsShown] = useState(false);

  /**
   * Validate billing data
   */
  // const { registerUser, error } = useRegisterUser();

  console.log('formOrderData', formOrderData);
  console.log('validationErrors', validationErrors);

  const handlePayOrder = () => {
    setIsValidation(true);
    //triger form fields if !billingData
    // if (!billingData) {
    //   setBillingWarning('inValidForm');

    //   return;
    // } else {
    //   setBillingData(billingData);
    //   setBillingWarning(null);
    // }

    // if (!shippingData) {
    //   setBillingWarning('inValidForm');
    //   return;
    // } else {
    //   setBillingWarning(null);
    // }

    // if (registrationData) {
    //   registerUser(registrationData);
    //   if (ok) {
    //     setRegistrationError(null);
    //   } else {
    //     setRegistrationError(error);
    //     return;
    //   }
    // }

    if (!order) return;
    const validationResult = validateOrder(order);
    if (validationResult.isValid) {
      setOrderStatus('pending');
    } else {
      setIsWarningsShown(true);
    }

    setWarnings(validationResult.messageKeys);
  };

  const isPayButtonDisabled = isOrderLoading || orderStatus === 'pending';

  /* Update an order */
  useEffect(() => {
    const couponLines = couponCodes.map(code => ({ code }));

    const loyaltyStatus = userData?.meta?.loyalty;
    if (loyaltyStatus) couponLines.push({ code: loyaltyStatus });

    createOrder({
      status: orderStatus,
      line_items: cartItems,
      coupon_lines: couponLines,
      ...(currencyCode && { currency: currencyCode }),
      // ...(billingData && orderStatus === 'pending' && { billing: billingData }),
      //...(shippingData && orderStatus === 'pending' && { shipping: shippingData }),
      //...(metaData && orderStatus === 'pending' && { meta_data: metaData }),
      ...(userData?.id && { customer_id: userData.id }),
      ...(shippingLine && { shipping_lines: [shippingLine] }),
    });
  }, [
    cartItems,
    couponCodes,
    orderStatus,
    currencyCode,
    userData,
    shippingLine,
  ]);

  useEffect(() => {
    if (order?.status === 'pending' && order.payment_url) {
      router.push(order.payment_url);
    }
  }, [order]);

  return (
    <>
      <Head>{inPostHead},</Head>
      <OrderProgress />

      <CheckoutContainer>
        <CheckoutFormsWrapper>
          {/* Billing and shipping forms */}
          {validationErrors.length > 0 && (
            <Notification type={'warning'}>{validationErrors}</Notification>
          )}
          {/* <BillingForm setBillingData={setBillingData} /> */}
          <NewBillingForm
            setFormOrderData={setFormOrderData}
            setCurrentCountryCode={setCurrentCountryCode}
            setValidationErrors={setValidationErrors}
            isValidation={isValidation}
            setIsValidation={setIsValidation}
          />

          <CheckoutFormSection>
            <CheckoutFormSectionTitle as={'h2'}>
              {t('delivery')}
            </CheckoutFormSectionTitle>

            {warnings && isWarningsShown && (
              <CheckoutWarnings messages={warnings}></CheckoutWarnings>
            )}

            <FreeShippingNotifications
              methods={shippingMethods}
              totalCost={totalCost}
            />

            <ShippingMethodSelector
              methods={shippingMethods}
              isLoading={isLoading}
              currentMethodId={shippingMethod?.method_id}
              onChange={method => setShippingMethod(method)}
              parcelMachinesMethods={parcelMachinesMethods}
              parcelMachine={parcelMachine}
              onParcelMachineChange={handleParcelMachineChange}
              getCalculatedMethodCost={getCalculatedShippingMethodCost}
            />
          </CheckoutFormSection>
        </CheckoutFormsWrapper>
        <CheckoutSummaryWrapper>
          <CheckoutSummary>
            <OrderSummary
              symbol={currencySymbol}
              order={order}
              isLoading={isOrderLoading}
            />
          </CheckoutSummary>
          <CheckoutPayButtonWrapper>
            <CheckoutPayButton
              disabled={isPayButtonDisabled}
              onClick={handlePayOrder}
            >
              {t('pay')}
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
        {/* {registrationError && (
          <Notification type={'warning'}>{registrationError}</Notification>
        )} */}
      </CheckoutContainer>

      {isGeowidgetShown && (
        <InPostGeowidget onClose={() => setGeowidgetShown(false)} />
      )}
    </>
  );
}
