import {
  useFetchUserUpdateMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';
import { useEffect } from 'react';
import useGetAuthToken from './useGetAuthToken';
import { ProductType } from '@/types/components/shop/product/products';
import { useAppDispatch } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const authToken = useGetAuthToken();
  const [fetchUserData, { data: userData, isFetching: isUserFetching }] =
    useLazyFetchUserDataQuery();
  const [fetchUserUpdate, { isLoading: isUpdatingWishlist }] =
    useFetchUserUpdateMutation();

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleWishlistToggle = (product: ProductType) => {
    if (!authToken) {
      dispatch(popupToggle('login'));
      return;
    }

    const userWishlist = userData?.meta.wishlist || [];
    const index = userWishlist.findIndex(
      (item: WishlistItem) =>
        item.product_id === product.id &&
        (!product.variations.length ||
          item.variation_id === product.variations[0].id)
    );
    let updatedWishlist: WishlistItem[];

    if (index >= 0) {
      updatedWishlist = userWishlist.filter(
        (_: WishlistItem, index2: number) => index2 !== index
      );
    } else {
      updatedWishlist = [
        ...userWishlist,
        {
          product_id: product.id,
          ...(product.variations.length && {
            variation_id: product.variations[0].id,
          }),
        },
      ];
    }

    const userUpdateRequestBody = {
      meta: {
        wishlist: updatedWishlist,
      },
    };

    if (userData?.id) {
      fetchUserUpdate(userUpdateRequestBody);
    }
  };

  const checkDesired = (productId: number) =>
    Boolean(
      wishlist?.find(
        (item: WishlistItem) => item.product_id === productId /* &&
          (!choosenVariation || item.variation_id === choosenVariation.id) */
      )
    );

  return {
    wishlist,
    handleWishlistToggle,
    isFetchingWishlist: isUserFetching,
    isUpdatingWishlist,
    checkDesired,
  };
};
