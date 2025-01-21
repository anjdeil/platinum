import AccountLayout from '@/components/pages/account/AccountLayout';
import WishListTable from '@/components/pages/account/WishListTable/WishListTable';
import { useAppSelector } from '@/store';
import {
  useFetchUserUpdateMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import Notification from '@/components/global/Notification/Notification';
import { CartLink } from '@/components/global/popups/MiniCart/style';
import {
  SkeletonItem,
  SkeletonWrapper,
  StyledButton,
} from '@/styles/components';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';

function Wishlist() {
  const { code: symbol } = useAppSelector(state => state.currencySlice);
  const router = useRouter();
  const tMyAccount = useTranslations('MyAccount');
  const tCart = useTranslations('Cart');
  const [cookie] = useCookies(['authToken']);

  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);

  const [
    fetchUserData,
    {
      data: userData,
      isLoading: isUserDataLoading,
      isFetching: isUserFetching,
    },
  ] = useLazyFetchUserDataQuery();

  const [fetchUserUpdate, { isLoading: isUserUpdateLoading }] =
    useFetchUserUpdateMutation();
  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isProductsLoading },
  ] = useGetProductsMinimizedMutation();

  const wishlist: WishlistItem[] = useMemo(
    () => userData?.meta?.wishlist || [],
    [userData]
  );

  const [wishListProducts, setWishListProducts] = useState<
    ProductsMinimizedType[]
  >([]);

  useEffect(() => {
    const authToken =
      cookie.authToken ||
      document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

    if (authToken) {
      fetchUserData().then(() => setIsLoadingWishlist(false));
    } else {
      router.push('/my-account/login');
    }
  }, [cookie.authToken, fetchUserData]);

  useEffect(() => {
    if (wishlist.length > 0) {
      getProductsMinimized(wishlist);
      setIsLoadingWishlist(true);
    } else {
      setWishListProducts([]);
      setIsLoadingWishlist(false);
    }
  }, [wishlist, getProductsMinimized]);

  useEffect(() => {
    if (productsSpecsData?.data.items) {
      setWishListProducts(productsSpecsData.data.items);
      setIsLoadingWishlist(false);
    }
  }, [productsSpecsData]);

  const handleDelete = useCallback(
    ({ product_id, variation_id }: WishlistItem) => {
      const updatedWishlist = wishlist.filter(
        item =>
          !(
            item.product_id === product_id &&
            (!variation_id || item.variation_id === variation_id)
          )
      );

      const userUpdateRequestBody = { meta: { wishlist: updatedWishlist } };

      if (userData?.id) {
        fetchUserUpdate(userUpdateRequestBody).then(() => {
          fetchUserData();
          setIsLoadingWishlist(true);
        });
      }
    },
    [wishlist, fetchUserUpdate, fetchUserData, userData?.id]
  );

  const isLoading =
    !userData ||
    isProductsLoading ||
    isUserDataLoading ||
    isUserUpdateLoading ||
    isUserFetching ||
    isLoadingWishlist;

  return (
    <AccountLayout title={tMyAccount('wishlist')}>
      {!!(!isLoading && wishListProducts && wishListProducts.length === 0) && (
        <>
          <Notification type="info">
            {tMyAccount('nothingInTheWishlist')}
          </Notification>
          <CartLink href="/">
            <StyledButton height="58px" width="310px" minWidthMobile="100%">
              {tCart('goToShop')}
            </StyledButton>
          </CartLink>
        </>
      )}
      {!isLoading && (
        <WishListTable
          symbol={symbol}
          wishlist={wishListProducts}
          wishlistMinElements={wishlist}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      )}
      {isLoading && (
        <SkeletonWrapper>
          {wishListProducts.map((_, index) => (
            <SkeletonItem key={index} variant="rounded" />
          ))}
        </SkeletonWrapper>
      )}
    </AccountLayout>
  );
}

export default Wishlist;
