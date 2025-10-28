import { CartLink } from '@/components/global/popups/MiniCart/style';
// import BannerCart from '@/components/pages/cart/BannerCart/BannerCart';
import CartCouponBlock from '@/components/pages/cart/CartCouponBlock/CartCouponBlock';
import CartSummaryBlock from '@/components/pages/cart/CartSummaryBlock/CartSummaryBlock';
import CartTable from '@/components/pages/cart/CartTable/CartTable';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import { PageTitle } from '@/components/pages/pageTitle';
import { useCartData } from '@/hooks/useCartData';
import { useQuoteHandler } from '@/hooks/useQuoteHandler';
import wpRestApi from '@/services/wpRestApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import {
  addCoupon,
  clearConflictedItems,
  clearCoupon,
} from '@/store/slices/cartSlice';
import { CartPageWrapper } from '@/styles/cart/style';
import { Container, FlexBox, StyledButton } from '@/styles/components';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { WpUserType } from '@/types/store/rtk-queries/wpApi';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { LOYALTY_LEVELS } from '@/utils/consts';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

interface CartPageProps {
  defaultCustomerData: WpUserType | null;
}

const CartPage: React.FC<CartPageProps> = ({ defaultCustomerData }) => {
  const { name: code, code: currencySymbol } = useAppSelector(
    state => state.currencySlice
  );
  const dispatch = useAppDispatch();
  const t = useTranslations('Cart');
  const { data: userTotal } = useGetUserTotalsQuery(defaultCustomerData?.id);

  const [auth, setAuth] = useState<boolean>(false);

  const [isDirty, setIsDirty] = useState(false);
  const [isCouponAppliedManually, setIsCouponAppliedManually] = useState(false);

  const userLoyaltyStatus = userTotal?.loyalty_status;

  useEffect(() => {
    if (defaultCustomerData && userLoyaltyStatus) {
      setAuth(true);
      dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
    } else {
      dispatch(clearCoupon());
      setAuth(false);
    }
  }, [defaultCustomerData, userLoyaltyStatus, dispatch]);

  const { cartItems, couponCode } = useAppSelector(state => state.cartSlice);

  const [getProductsMinimized, { isLoading: isLoadingProducts }] =
    useGetProductsMinimizedMutation();

  // Conflict detection
  const [hasConflict, setHasConflict] = useState(false);

  const {
    handleGetQuote,
    quoteData,
    isLoading,
    couponError,
    setCouponError,
    couponSuccess,
    setCouponSuccess,
  } = useQuoteHandler(
    code,
    setHasConflict,
    userLoyaltyStatus,
    defaultCustomerData?.id
  );

  useEffect(() => {
    if (!couponCode) return;

    const isLoyaltyCoupon = LOYALTY_LEVELS.some(
      level => level.name === couponCode
    );

    if (!isLoyaltyCoupon && isCouponAppliedManually) {
      handleGetQuote();
      setIsCouponAppliedManually(false);
    }
  }, [couponCode, isCouponAppliedManually, handleGetQuote]);

  // after change currency
  useEffect(() => {
    if (cartItems.length === 0 || isDirty || !couponCode || !quoteData) return;
    handleGetQuote();
  }, [code]);

  useEffect(() => {
    setCouponError(false);
    setCouponSuccess(false);

    if (quoteData) {
      setIsDirty(true);
    }

    if (userLoyaltyStatus) {
      dispatch(addCoupon({ couponCode: userLoyaltyStatus }));
    } else {
      dispatch(clearCoupon());
    }
  }, [cartItems]);

  useEffect(() => {
    setIsDirty(false);
  }, [quoteData]);

  const { productsWithCartData, totalCartPrice } = useCartData();

  const handleChangeQuantity = useCallback(
    (
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
        productsWithCartData,
        variation_id,
        newQuantity
      );
    },
    [cartItems, dispatch]
  );

  const [productsMinimized, setProductsMinimized] = useState<any[]>([]);

  const fetchMinimizedData = useCallback(async () => {
    const defaultLanguage = router.defaultLocale || 'pl';
    const productsMinimizedData = await getProductsMinimized({
      cartItems,
      lang: router.locale || defaultLanguage,
    });
    const items = productsMinimizedData?.data?.data?.items || [];
    setProductsMinimized(items);
    return items;
  }, [getProductsMinimized, router.locale]);

  useEffect(() => {
    fetchMinimizedData();
  }, [fetchMinimizedData]);

  useEffect(() => {
    const updateOnConflict = async () => {
      if (hasConflict) {
        const updatedItems = await fetchMinimizedData();
        const newConflict = checkCartConflict(cartItems, updatedItems);
        setHasConflict(newConflict);
      }
    };
    updateOnConflict();
  }, [hasConflict, fetchMinimizedData]);

  /* Check cart conflict */
  useEffect(() => {
    const fetchData = async () => {
      // remove simple products with variation_id
      const brokenItems = cartItems.filter(item => {
        const product = productsMinimized.find(p => p.id === item.product_id);
        return (
          product &&
          (product.parent_id === 0 || product.parent_id === null) &&
          item.variation_id
        );
      });

      if (brokenItems.length > 0) {
        dispatch(clearConflictedItems(brokenItems));
        return;
      }

      setHasConflict(checkCartConflict(cartItems, productsMinimized));
    };

    if (cartItems.length && productsMinimized.length) {
      fetchData();
    } else {
      router.push('/cart');
    }
  }, [cartItems, productsMinimized]);

  const allItemAvailable = !productsWithCartData.some(
    item => !item.isAvailable
  );

  const handleDeleteItem = (productId: number, variationId: number) => {
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
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageTitle nameSpace={'Cart'} spaceKey={'Basket'} />
      <OrderProgress />

      <Container>
        <CartPageWrapper>
          <div>
            <CartTable
              productsWithCartData={productsWithCartData}
              loading={isLoadingProducts}
              hasConflict={hasConflict}
              handleChangeQuantity={handleChangeQuantity}
              handleDeleteItem={handleDeleteItem}
            />
            {productsWithCartData.length > 0 && (
              <OrderBar
                miniCart={false}
                isLoadingOrder={isLoadingProducts}
                subtotal={totalCartPrice}
                symbol={currencySymbol}
              />
            )}
            {productsWithCartData.length == 0 && cartItems.length == 0 && (
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
            userLoyaltyStatus={userLoyaltyStatus}
            auth={auth}
            couponError={couponError}
            setCouponError={setCouponError}
            couponSuccess={couponSuccess}
            isLoading={isLoading}
            setIsCouponAppliedManually={setIsCouponAppliedManually}
          />

          {productsWithCartData.length > 0 && allItemAvailable && (
            <CartSummaryBlock
              auth={auth}
              cartItems={productsWithCartData}
              isLoading={isLoading || isLoadingProducts}
              {...(quoteData && !isDirty ? { quote: quoteData } : {})}
              userTotal={userTotal}
              handleGetQuote={handleGetQuote}
              quoteData={quoteData}
            />
          )}
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
      { path: ['users', 'me'] },
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
      },
    };
  }
};

export default CartPage;
