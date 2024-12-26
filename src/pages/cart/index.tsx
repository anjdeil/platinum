import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { CreateOrderRequestType } from '@/types/services';
import { useAppDispatch, useAppSelector } from '@/store';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import CartTable from '@/components/pages/cart/CartTable/CartTable';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
import { Container, FlexBox, StyledButton } from '@/styles/components';
import CartCouponBlock from '@/components/pages/cart/CartCouponBlock/CartCouponBlock';
import { CartPageWrapper } from './style';
import CartSummaryBlock from '@/components/pages/cart/CartSummaryBlock/CartSummaryBlock';
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import BannerCart from '@/components/pages/cart/BannerCart/BannerCart';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { CartLink } from '@/components/global/popups/MiniCart/style';
import { useTranslations } from 'next-intl';
import { useCookies } from 'react-cookie';

const CartPage: React.FC = () => {
  const { name: code } = useAppSelector((state) => state.currencySlice);
  const status: CreateOrderRequestType['status'] = 'on-hold';
  const [symbol, setSymbol] = useState<string>('');
  const dispatch = useAppDispatch();
  const [loadingItems, setLoadingItems] = useState<number[]>([]);
  const [preLoadingItem, setPreLoadingItem] = useState<number>();
  const t = useTranslations('Cart');

  //USER
  const [auth, setAuth] = useState<boolean>(false);
  const [userLoyalityStatus, setUserLoyalityStatus] = useState<
    string | undefined
  >('');

  const [cookie] = useCookies(['authToken']);

  const [fetchUserData, { data: userData, isLoading: isLoadingUser }] =
    useLazyFetchUserDataQuery();

  useEffect(() => {
    const authToken =
      cookie.authToken ||
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('authToken='))
        ?.split('=')[1];

    const fetchData = async () => {
      if (authToken) {
        try {
          const result = await fetchUserData(authToken).unwrap();
          setAuth(true);
          if (result && result.meta && result.meta.loyalty) {
            setUserLoyalityStatus(result.meta.loyalty);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuth(false);
        }
      } else if (authToken === undefined) {
        setAuth(false);
      }
    };

    fetchData();
  }, [cookie.authToken, fetchUserData]);

  // FETCH
  const [createOrder, { data: orderItems, isLoading: isLoadingOrder }] =
    useCreateOrderMutation();
  const { cartItems, couponCodes } = useAppSelector((state) => state.cartSlice);
  const [
    getProductsMinimized,
    {
      data: productsSpecsData,
      isLoading: isLoadingProductsMin,
      error: errorProductsMin,
    },
  ] = useGetProductsMinimizedMutation();

  const [cachedOrderItems, setCachedOrderItems] = useState(orderItems);

  const handleCreateOrder = async () => {
    const userCoupons = userData?.meta?.loyalty
      ? [{ code: userData.meta.loyalty }]
      : [];
    const additionalCoupons = couponCodes.map((code: string) => ({ code }));
    const combinedCoupons =
      auth && userData
        ? [...userCoupons, ...additionalCoupons]
        : additionalCoupons;
    setUserLoyalityStatus(userData?.meta?.loyalty);

    const requestData = {
      line_items: cartItems,
      status: status,
      coupon_lines: combinedCoupons,
      currency: code,
    };
    if (preLoadingItem) {
      setLoadingItems((prev) => [...prev, preLoadingItem]);
    }
    try {
      await createOrder(requestData);
    } finally {
      setLoadingItems((prev) => prev.filter((id) => id !== preLoadingItem));
    }
  };

  useEffect(() => {
    const createOrderEffect = async () => {
      await handleCreateOrder();
    };

    createOrderEffect();
  }, [cartItems, couponCodes, code, userData]);

  useEffect(() => {
    if (cartItems.length > 0) {
      getProductsMinimized(cartItems);
    }
  }, [getProductsMinimized, cartItems.length]);

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
      setPreLoadingItem(product_id);
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

  const productsSpecs = useMemo(
    () => productsSpecsData?.data?.items || [],
    [productsSpecsData]
  );

  const subtotal = useMemo(
    () =>
      orderItems?.line_items
        ? getSubtotalByLineItems(orderItems.line_items)
        : 0,
    [orderItems]
  );

  // Conflict detection
  const [hasConflict, setHasConflict] = useState(false);

  useEffect(() => {
    setHasConflict(checkCartConflict(cartItems, productsSpecs));
  }, [cartItems, productsSpecs]);

  const currentOrderItems = orderItems ?? cachedOrderItems;

  const isLoading = isLoadingOrder || isLoadingUser;
  const isLoadingCart = isLoadingOrder || isLoadingProductsMin;

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
              productsSpecs={productsSpecs}
              roundedPrice={roundedPrice}
              hasConflict={hasConflict}
              handleChangeQuantity={handleChangeQuantity}
              loadingItems={loadingItems}
            />
            {cartItems.length > 0 ? (
              <OrderBar
                miniCart={false}
                isLoadingOrder={isLoadingOrder}
                cartSum={subtotal}
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

export default CartPage;
