import { CartLink } from '@/components/global/popups/MiniCart/style';
import BannerCart from '@/components/pages/cart/BannerCart/BannerCart';
import CartCouponBlock from '@/components/pages/cart/CartCouponBlock/CartCouponBlock';
import CartSummaryBlock from '@/components/pages/cart/CartSummaryBlock/CartSummaryBlock';
import CartTable from '@/components/pages/cart/CartTable/CartTable';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import wpRestApi from '@/services/wpRestApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { CartPageWrapper } from '@/styles/cart/style';
import { Container, FlexBox, StyledButton } from '@/styles/components';
import { CreateOrderRequestType } from '@/types/services';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { WpUserType } from '@/types/store/rtk-queries/wpApi';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import getTotalByLineItems from '@/utils/cart/getTotalByLineItems';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { getLoyaltyLevel } from '@/utils/getLoyaltyLevel';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { debounce } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface CartPageProps {
  defaultCustomerData: WpUserType | null;
}
const CartPage: React.FC<CartPageProps> = ({ defaultCustomerData }) => {
  const { name: code } = useAppSelector(state => state.currencySlice);
  const status: CreateOrderRequestType['status'] = 'on-hold';
  const [symbol, setSymbol] = useState<string>('');
  const dispatch = useAppDispatch();
  const [firstLoad, setfirstLoad] = useState<boolean>(false);
  const t = useTranslations('Cart');

  const { data: userTotal } = useGetUserTotalsQuery(defaultCustomerData?.id);

  const [auth, setAuth] = useState<boolean>(false);
  const [userLoyalityStatus, setUserLoyalityStatus] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (defaultCustomerData) {
      setAuth(true);
      const { level } = getLoyaltyLevel(Number(userTotal?.total_spent));
      setUserLoyalityStatus(level);
    }
  }, [defaultCustomerData, userTotal]);

  const [createOrder, { data: orderItems, isLoading: isLoadingOrder }] =
    useCreateOrderMutation();

  const { cartItems, couponCodes, productsData } = useAppSelector(
    state => state.cartSlice
  );

  const [cachedOrderItems, setCachedOrderItems] = useState(orderItems);

  const handleCreateOrder = async () => {
    const userCoupons = userLoyalityStatus
      ? [{ code: userLoyalityStatus }]
      : [];

    const additionalCoupons = couponCodes.map((code: string) => ({ code }));
    const combinedCoupons = [...userCoupons, ...additionalCoupons];

    const requestData = {
      line_items: cartItems,
      status: status,
      coupon_lines: combinedCoupons,
      currency: code,
    };
    try {
      await createOrder(requestData);
    } finally {
      setfirstLoad(true);
    }
  };

  useEffect(() => {
    const debouncedCreateOrder = debounce(async () => {
      await handleCreateOrder();
    }, 1200);

    debouncedCreateOrder();
    return () => {
      debouncedCreateOrder.cancel();
    };
  }, [cartItems, couponCodes, code, userLoyalityStatus]);

  useEffect(() => {
    if (orderItems?.currency_symbol) {
      setSymbol(orderItems.currency_symbol);
      setCachedOrderItems(orderItems);
    }
  }, [orderItems]);

  const handleChangeQuantity = useCallback(
    async (
      product_id: number,
      action: 'inc' | 'dec' | 'value',
      variation_id?: number,
      newQuantity?: number | boolean
    ) => {
      handleQuantityChange(
        cartItems,
        dispatch,
        product_id,
        action,
        variation_id,
        newQuantity
      );
    },
    [cartItems, dispatch]
  );

  const subtotal = useMemo(
    () =>
      orderItems?.line_items
        ? getSubtotalByLineItems(orderItems.line_items)
        : 0,
    [orderItems]
  );
  const total = useMemo(
    () =>
      orderItems?.line_items ? getTotalByLineItems(orderItems.line_items) : 0,
    [orderItems]
  );

  // Conflict detection
  const [hasConflict, setHasConflict] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasConflict(checkCartConflict(cartItems, productsData));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [productsData]);

  const currentOrderItems = orderItems ?? cachedOrderItems;

  const isLoading = isLoadingOrder;
  const isLoadingCart = isLoadingOrder;

  //fix  hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <OrderProgress />
      <BannerCart
        slug="stove"
        image="bunnerDesktop.png"
        mobileImage="bunnerMobile.png"
      />
      <Container>
        <CartPageWrapper>
          <div>
            <CartTable
              symbol={symbol}
              cartItems={cartItems}
              order={currentOrderItems}
              isLoadingOrder={isLoadingCart}
              productsSpecs={productsData}
              roundedPrice={roundedPrice}
              hasConflict={hasConflict}
              handleChangeQuantity={handleChangeQuantity}
              firstLoad={firstLoad}
            />
            {cartItems.length > 0 ? (
              <OrderBar
                miniCart={false}
                isLoadingOrder={isLoadingOrder}
                totalDisc={total}
                subtotal={subtotal}
                symbol={symbol}
              />
            ) : (
              <>
                <FlexBox justifyContent="center">
                  <CartLink href="/">
                    <StyledButton
                      height="58px"
                      width="310px"
                      minWidthMobile="100%"
                    >
                      {t('goToShop')}
                    </StyledButton>
                  </CartLink>
                </FlexBox>
              </>
            )}
          </div>
          <CartCouponBlock
            userLoyalityStatus={userLoyalityStatus}
            auth={auth}
            symbol={symbol}
          />
          <CartSummaryBlock
            auth={auth}
            symbol={symbol}
            order={orderItems}
            cartItems={cartItems}
            isLoading={isLoading}
          />
        </CartPageWrapper>
      </Container>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  const { locale } = context;

  try {
    if (!cookies?.authToken) {
      throw new Error('Invalid or missing authentication token');
    }

    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token')
      throw new Error('Invalid or missing authentication token');

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid)
      throw new Error('Invalid or missing authentication token');

    const resp = await wpRestApi.get(
      'users/me',
      undefined,
      `Bearer ${cookies.authToken}`
    );

    if (!resp?.data) {
      throw new Error('Failed to fetch user data');
    }

    return {
      props: {
        defaultCustomerData: resp.data,
        messages: (await import(`../../translations/${locale}.json`)).default,
      },
    };
  } catch (err) {
    console.error('Error validating auth token:', err);

    return {
      props: {
        user: null,
        messages: (await import(`../../translations/${locale}.json`)).default,
      },
    };
  }
};

export default CartPage;
