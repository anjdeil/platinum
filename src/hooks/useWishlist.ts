import {
  useFetchUserUpdateMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';
import { useEffect } from 'react';
import { ProductType } from '@/types/components/shop/product/products';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
export const useWishlist = () => {
  const dispatch = useAppDispatch();

  const { user: userSlice } = useAppSelector(state => state.userSlice);

  const [fetchUserData, { data: userData, isFetching: isUserFetching }] =
    useLazyFetchUserDataQuery();

  const [fetchUserUpdate, { isLoading: isUpdatingWishlist }] =
    useFetchUserUpdateMutation();

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

  useEffect(() => {
    if (userSlice !== null) {
      fetchUserData();
    }
  }, [userSlice]);

  const handleWishlistToggle = (product: ProductType, variationId?: number) => {
    if (!userSlice) {
      dispatch(popupToggle({ popupType: 'login' }));
      return;
    }

    const userWishlist = userData?.meta?.wishlist || [];

    const index = userWishlist.findIndex(
      (item: WishlistItem) =>
        item.product_id === product.id &&
        (!product.variations.length ||
          // item.variation_id === product.variations[0].id)
          item.variation_id === variationId)
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
          ...(variationId && { variation_id: variationId }),
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

  const checkDesired = (productId: number, variationId?: number) => {
    if (userSlice) {
      if (variationId) {
        return Boolean(
          wishlist?.find(
            (item: WishlistItem) =>
              item.product_id === productId && item.variation_id === variationId
          )
        );
      }

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
