import {
  useFetchUserUpdateMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';
import { useEffect, useState } from 'react';
import { ProductType } from '@/types/components/shop/product/products';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { getUserFromLocalStorage } from '@/utils/auth/userLocalStorage';
export const useWishlist = () => {
  const dispatch = useAppDispatch();

  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const [user] = useState(() => getUserFromLocalStorage());

  const [fetchUserData, { data: userData, isFetching: isUserFetching }] =
    useLazyFetchUserDataQuery();
  const [fetchUserUpdate, { isLoading: isUpdatingWishlist }] =
    useFetchUserUpdateMutation();

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

  useEffect(() => {
    if (user !== null) {
      fetchUserData();
    }
  }, [userSlice]);

  const handleWishlistToggle = (product: ProductType) => {
    const user = getUserFromLocalStorage();

    if (!user) {
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
  const checkDesired = (productId: number) => {
    const user = getUserFromLocalStorage();
    if (user) {
      return Boolean(
        wishlist?.find((item: WishlistItem) => item.product_id === productId)
      );
    } else {
      return false;
    }
  };

  return {
    wishlist,
    handleWishlistToggle,
    isFetchingWishlist: isUserFetching,
    isUpdatingWishlist,
    checkDesired,
  };
};
