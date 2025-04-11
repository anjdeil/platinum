import { BillingForm } from '@/components/global/forms/BillingForm/BillingForm';
import CheckIcon from '@/components/global/icons/CheckIcon';
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import OrderSummary from '@/components/pages/cart/OrderSummary/OrderSummary';
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
import { useAppSelector } from '@/store';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import {
  OrderLineMetaDataType,
  ParcelMachineType,
  ShippingLineType,
} from '@/types/pages/checkout';
import { ShippingMethodType } from '@/types/services';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import getCartTotals from '@/utils/cart/getCartTotals';
import getCalculatedMethodCostByWeight from '@/utils/checkout/getCalculatedMethodCostByWeight';
import getShippingMethodFixedCost from '@/utils/checkout/getShippingMethodFixedCost';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import validateOrder from '@/utils/checkout/validateOrder';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';

import Notification from '@/components/global/Notification/Notification';
import BillingWarnings from '@/components/pages/checkout/BillingWarnings';
import { RegistrationError } from '@/components/pages/checkout/RegistrationError/RegistrationError';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { useLazyGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';
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
  const tMyAccount = useTranslations('MyAccount');
  const tCart = useTranslations('Cart');

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

  // Get data from Billing/Shipping forms
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

  const [isRegistration, setIsRegistration] = useState(false);
  const [registrationData, setRegistrationData] =
    useState<RegistrationFormType | null>(null);

  useEffect(() => {
    if (!formOrderData.shipping?.country) return;
    setCurrentCountryCode(formOrderData.shipping.country);
  }, [formOrderData.shipping?.country]);

  const authToken = useGetAuthToken();
  const { name: currencyCode } = useAppSelector(state => state.currencySlice);
  const [createOrder, { data: order, isLoading: isOrderLoading = true }] =
    useCreateOrderMutation();
  const [fetchUserData, { data: userData, isLoading: isUserDataLoading }] =
    useLazyFetchUserDataQuery();

  /**
   * Coupons and loyalty status
   */
  const [coupons, setCoupons] = useState(couponCodes);

  const [fetchUserTotals, { data: userTotal }] = useLazyGetUserTotalsQuery();
  useEffect(() => {
    if (userData?.id) {
      fetchUserTotals(userData?.id);
    }
  }, [userData?.id]);

  useEffect(() => {
    if (userTotal?.total_spent) {
      const level = userTotal?.loyalty_status;
      if (level && !coupons?.includes(level)) {
        setCoupons([...coupons, level]);
      }
    }
  }, [userTotal]);

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

  /**
   * Order validation
   */
  const [registrationErrorWarning, setRegistrationErrorWarning] = useState<
    string | null
  >(null);
  const [isUserAlreadyExist, setIsUserAlreadyExist] = useState<boolean>(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState<
    boolean | null
  >(null);

  const [warnings, setWarnings] = useState<string[]>();
  const [validationErrors, setValidationErrors] = useState<string | null>(null);

  const [isWarningsShown, setIsWarningsShown] = useState(false);
  /**
   * Validate billing data
   */
  const { registerUser } = useRegisterUser();

  const handlePayOrder = async () => {
    if (!order) return;

    setIsWarningsShown(true);

    let isOrderValid = true;

    if (
      !isValidForm ||
      !formOrderData.billing ||
      (isShippingAddressDifferent && !formOrderData.shipping)
    ) {
      setValidationErrors('validationErrorsFields');

      isOrderValid = false;
    }

    const shippingValidationResult = validateOrder(order);
    if (!shippingValidationResult.isValid) {
      setWarnings(shippingValidationResult.messageKeys);

      isOrderValid = false;
    } else {
      setWarnings([]);
    }

    setRegistrationErrorWarning(null);

    if (isRegistration && registrationData && isOrderValid) {
      setIsRegistrationSuccessful(false);

      const registrationError = await registerUser(registrationData);

      if (!registrationError) {
        setIsRegistrationSuccessful(true);
        setRegistrationErrorWarning(null);
        setRegistrationData(null);
      } else {
        isOrderValid = false;
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

    if (isOrderValid) {
      setOrderStatus('pending');
    }
  };

  const isPayButtonDisabled = isOrderLoading || orderStatus === 'pending';

  /* Update an order */
  useEffect(() => {
    if (isUserDataLoading || cartItems.length === 0) return;

    const couponLines = coupons.map(code => ({ code }));

    const filteredMetaData = Array.isArray(formOrderData.metaData)
      ? formOrderData.metaData.filter(meta =>
          isShippingAddressDifferent
            ? true
            : meta.key !== 'shipping_apartmentNumber'
        )
      : [];

    createOrder({
      status: orderStatus,
      line_items: cartItems,
      coupon_lines: couponLines,
      meta_data: [
        {
          key: 'wpml_language',
          value: router.locale || '',
        },
        ...(orderStatus === 'pending' ? filteredMetaData : []),
      ],
      ...(currencyCode && { currency: currencyCode }),
      ...(formOrderData.billing &&
        orderStatus === 'pending' && { billing: formOrderData.billing }),
      ...(formOrderData.shipping &&
        isShippingAddressDifferent &&
        orderStatus === 'pending' && { shipping: formOrderData.shipping }),
      ...(userData?.id && { customer_id: userData.id }),
      ...(shippingLine && { shipping_lines: [shippingLine] }),
    });
  }, [
    cartItems,
    coupons,
    orderStatus,
    currencyCode,
    userData,
    shippingLine,
    router.locale,
  ]);

  useEffect(() => {
    if (order?.status === 'pending' && order.payment_url) {
      const paymentUrlObj = new URL(order.payment_url);

      const langCode =
        router.locale === router.defaultLocale ? '' : router.locale;
      paymentUrlObj.pathname = '/' + langCode + paymentUrlObj.pathname;

      router.push(paymentUrlObj.toString());
      // dispatch(clearCart());
    }
  }, [order]);

  return (
    <>
      <Head>{inPostHead}</Head>
      <OrderProgress />
      <CheckoutContainer>
        <CheckoutFormsWrapper>
          {/* Billing and shipping forms */}
          {validationErrors && <BillingWarnings message={validationErrors} />}

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
              noPaymentMethod
            />
          </CheckoutSummary>
          <CheckoutPayButtonWrapper>
            <CheckoutPayButton
              disabled={isPayButtonDisabled}
              onClick={handlePayOrder}
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
      </CheckoutContainer>

      {isGeowidgetShown && (
        <InPostGeowidget onClose={() => setGeowidgetShown(false)} />
      )}
    </>
  );
}
