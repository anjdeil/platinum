import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  CheckoutAgreement, CheckoutAgreementWrapper,
  CheckoutContainer,
  CheckoutFormsWrapper,
  CheckoutPayButton, CheckoutPayButtonWrapper,
  CheckoutSummary,
  CheckoutSummaryWrapper,
} from '@/components/pages/checkout/style';
import ShippingMethodSelector from '@/components/pages/checkout/ShippingMethodSelector/ShippingMethodSelector';
import useShippingMethods from '@/hooks/useShippingMethods';
import { OrderLineMetaDataType, ParcelMachineType, ShippingLineType } from '@/types/pages/checkout';
import useInPostGeowidget from '@/hooks/useInPostGeowidget';
import { ShippingMethodType } from '@/types/services';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import { useAppSelector } from '@/store';
import useGetAuthToken from '@/hooks/useGetAuthToken';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import Link from 'next/link';
import Notification from '@/components/global/Notification/Notification';
import { useTranslations } from 'next-intl';
import OrderSummary from '@/components/pages/cart/OrderSummary/OrderSummary';
import CheckIcon from '@/components/global/icons/CheckIcon';
import router from 'next/router';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import CheckoutWarnings from '@/components/pages/checkout/CheckoutWarnings';
import validateOrder from '@/utils/checkout/validateOrder';
import { BillingForm } from '@/components/global/forms/BillingForm';

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function CheckoutPage() {
  const t = useTranslations('Checkout');

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
   * Shipping
   */
  const [currentCountryCode, setCurrentCountryCode] = useState<string>('PL');
  const { shippingMethods, isLoading } = useShippingMethods(currentCountryCode);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodType>();
  const [parcelMachine, setParcelMachine] = useState<ParcelMachineType>();
  const [shippingLine, setShippingLine] = useState<ShippingLineType>();

  useEffect(() => {
    if (shippingMethod) {
      const { title, method_id, instance_id } = shippingMethod;

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
        value: '1 kg',
      });

      setShippingLine({
        method_id,
        method_title: title,
        instance_id: instance_id.toString(),
        meta_data: meta,
      });
    }
  }, [shippingMethod, parcelMachine]);

  /**
   * Order logic
   */
  const [orderStatus, setOrderStatus] = useState<'on-hold' | 'pending'>(
    'on-hold'
  );

  const authToken = useGetAuthToken();

  const { name: currency, code: currencySymbol } = useAppSelector(
    state => state.currencySlice
  );
  const { cartItems, couponCodes } = useAppSelector(state => state.cartSlice);

  const [createOrder, { data: order, isLoading: isOrderLoading = true }] =
    useCreateOrderMutation();
  const [getProductsMinimized] = useGetProductsMinimizedMutation();
  const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

  /* Check cart conflict */
  useEffect(() => {
    const fetchData = async () => {
      const productsMinimizedData = await getProductsMinimized(cartItems);
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

  /* Update an order */
  useEffect(() => {
    const couponLines = couponCodes.map(code => ({ code }));

    const loyaltyStatus = userData?.meta?.loyalty;
    if (loyaltyStatus) couponLines.push({ code: loyaltyStatus });

    createOrder({
      status: orderStatus,
      currency,
      billing: {
        first_name: 'John',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        email: 'john.doe@example.com',
        phone: '(555) 555-5555',
      },
      line_items: cartItems,
      coupon_lines: couponLines,
      ...(userData?.id && { customer_id: userData.id }),
      ...(shippingLine && { shipping_lines: [shippingLine] }),
    });
  }, [cartItems, couponCodes, orderStatus, currency, userData, shippingLine]);

  useEffect(() => {
    if (order?.status === 'pending' && order.payment_url) {
      router.push(order.payment_url);
    }
  }, [order]);

  /**
   * Order validation
   */
  const [warnings, setWarnings] = useState<string[]>();
  const handlePayOrder = () => {
    if (!order) return;

    const validationResult = validateOrder(order);
    if (validationResult.isValid) {
      setOrderStatus('pending');
    }

    setWarnings(validationResult.messageKeys);
  };

  const isPayButtonDisabled = isOrderLoading || orderStatus === 'pending';

  return (
    <>
      <Head>{inPostHead},</Head>
      <OrderProgress />

      <CheckoutContainer>
        <CheckoutFormsWrapper>
          {!userData && (
            <Notification>
              <p>
                <Link
                  href={`/my-account/login`}
                  onClick={() => {
                    /* Login Popup opening logic */
                  }}
                >
                  {t('login')}
                </Link>
                {t('fieldsWillFilled')}
              </p>
            </Notification>
          )}

          {warnings && (
            <CheckoutWarnings messages={warnings}></CheckoutWarnings>
          )}

          {/* Billing and shipping forms */}
          <BillingForm />

          {/* Delete 3 strings bellow after forms implemented */}
          <button
            style={{
              border: 'none',
              background: 'none',
              margin: '1em',
              textDecoration: 'underline',
            }}
            onClick={() => setCurrentCountryCode('PL')}
          >
            Set &ldquo;PL&ldquo;
          </button>
          <button
            style={{
              border: 'none',
              background: 'none',
              margin: '1em',
              textDecoration: 'underline',
            }}
            onClick={() => setCurrentCountryCode('US')}
          >
            Set &ldquo;US&ldquo;
          </button>
          <button
            style={{
              border: 'none',
              background: 'none',
              margin: '1em',
              textDecoration: 'underline',
            }}
            onClick={() => setCurrentCountryCode('Bla-bla')}
          >
            Set &ldquo;Bla-bla&ldquo;
          </button>

          <ShippingMethodSelector
            methods={shippingMethods}
            isLoading={isLoading}
            onChange={method => setShippingMethod(method)}
            parcelMachinesMethods={parcelMachinesMethods}
            parcelMachine={parcelMachine}
            onParcelMachineChange={handleParcelMachineChange}
          />
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
      </CheckoutContainer>

      {isGeowidgetShown && (
        <InPostGeowidget onClose={() => setGeowidgetShown(false)} />
      )}
    </>
  );
}