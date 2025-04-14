import { CartLink } from '@/components/global/popups/MiniCart/style';
// import BannerCart from '@/components/pages/cart/BannerCart/BannerCart';
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
import { CreateOrderRequestType, WooErrorType } from '@/types/services';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { lineOrderItems } from '@/types/store/reducers/сartSlice';
import { WpUserType } from '@/types/store/rtk-queries/wpApi';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import getCartTotals from '@/utils/cart/getCartTotals';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';
import { addCoupon } from '@/store/slices/cartSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
  const [isCouponsIgnored, setIsCouponsIgnored] = useState(false);
  const { data: userTotal } = useGetUserTotalsQuery(defaultCustomerData?.id);

  const [auth, setAuth] = useState<boolean>(false);
  const [userLoyaltyStatus] = useState<string | undefined>();

  useEffect(() => {
    if (defaultCustomerData) {
      setAuth(true);
      const level = userTotal?.loyalty_status;
      if (level && level !== '') {
        dispatch(addCoupon({ couponCode: level }));
      }
    }
  }, [defaultCustomerData, userTotal]);

  const [createOrder, { data: orderItems, isLoading: isLoadingOrder }] = useCreateOrderMutation();

  const { cartItems, couponCodes, productsData } = useAppSelector(
    state => state.cartSlice,
  );

  const [cachedOrderItems, setCachedOrderItems] = useState(orderItems);

  const { totalCost: cartCost } = getCartTotals(productsData, cartItems);


  useEffect(() => {
    const handleCreateOrder = async () => {
      const coupons = couponCodes.map((code: string) => ({ code }));

      const requestData = {
        line_items: cartItems,
        status: status,
        currency: code,
        ...(!isCouponsIgnored && { coupon_lines: coupons }),
      };

      const { error } = await createOrder(requestData);

      if (error) {
        const wooError = (error as FetchBaseQueryError).data;
        if ((wooError as WooErrorType)?.details?.code === 'woocommerce_rest_invalid_coupon') {
          setIsCouponsIgnored(true);
        }
      }

      setfirstLoad(true);

    };
    handleCreateOrder();
  }, [cartItems, couponCodes, code, userLoyaltyStatus, isCouponsIgnored]);

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
      newQuantity?: number | boolean,
    ) => {
      handleQuantityChange(
        cartItems,
        dispatch,
        product_id,
        action,
        variation_id,
        newQuantity,
      );
    },
    [cartItems, dispatch],
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

  //check cart items and order coincidence

  const [innercartItems, setInnerCartItems] = useState(
    currentOrderItems?.line_items || [],
  );

  const [filteredOutItems, setFilteredOutItems] = useState<lineOrderItems[]>(
    [],
  );

  useEffect(() => {
    if (isLoadingOrder || !currentOrderItems?.line_items) return;

    const filteredItems = currentOrderItems.line_items.filter(lineItem =>
      cartItems.some(
        cartItem =>
          cartItem.product_id === lineItem.product_id &&
          (!cartItem.variation_id ||
            cartItem.variation_id === lineItem.variation_id),
      ),
    );

    const notFilteredItems = currentOrderItems.line_items.filter(
      lineItem =>
        !cartItems.some(
          cartItem =>
            cartItem.product_id === lineItem.product_id &&
            (!cartItem.variation_id ||
              cartItem.variation_id === lineItem.variation_id),
        ),
    );

    setInnerCartItems(filteredItems);
    setFilteredOutItems(notFilteredItems);

  }, [currentOrderItems?.line_items, isLoadingOrder]);

  const handleDeleteItem = (productId: number, variationId: number) => {
    const updatedCartItems = innercartItems.filter(
      item => item.product_id !== productId || item.variation_id !== variationId,
    );
    setInnerCartItems(updatedCartItems);

    handleChangeQuantity(productId, 'value', variationId, 0);
  };

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
      {/*<BannerCart*/}
      {/*  slug="stove"*/}
      {/*  image="bunnerDesktop.png"*/}
      {/*  mobileImage="bunnerMobile.png"*/}
      {/*/>*/}
      <Container>
        <CartPageWrapper>
          <div>
            <CartTable
              symbol={symbol}
              cartItems={cartItems}
              innercartItems={innercartItems}
              isLoadingOrder={isLoadingCart}
              filteredOutItems={filteredOutItems}
              order={currentOrderItems}
              productsSpecs={productsData}
              roundedPrice={roundedPrice}
              hasConflict={hasConflict}
              handleChangeQuantity={handleChangeQuantity}
              firstLoad={firstLoad}
              handleDeleteItem={handleDeleteItem}
            />
            {(innercartItems.length > 0 || filteredOutItems?.length > 0) && (
              <OrderBar
                miniCart={false}
                isLoadingOrder={isLoadingOrder}
                subtotal={cartCost}
                symbol={symbol}
              />
            )}
            {innercartItems.length == 0 && cartItems.length == 0 && (
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
            )}
          </div>

          <CartCouponBlock
            userLoyalityStatus={userLoyaltyStatus}
            auth={auth}
            isCouponsIgnored={isCouponsIgnored}
          />

          {innercartItems.length > 0 && filteredOutItems.length == 0 && (
            <CartSummaryBlock
              auth={auth}
              symbol={symbol}
              order={orderItems}
              cartItems={cartItems}
              isLoading={isLoading}
            />
          )}
        </CartPageWrapper>
      </Container>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
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
      `Bearer ${cookies.authToken}`,
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token')
      throw new Error('Invalid or missing authentication token');

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid)
      throw new Error('Invalid or missing authentication token');

    const resp = await wpRestApi.get(
      'users/me',
      { path: ['users', 'me'] },
      `Bearer ${cookies.authToken}`,
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
      },
    };
  }
};

export default CartPage;
