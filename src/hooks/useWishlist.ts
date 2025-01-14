import { useFetchUserUpdateMutation, useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const useWishlist = () => {
    const [cookie] = useCookies(['authToken']);
    const router = useRouter();
    const [fetchUserData, { data: userData, isFetching: isUserFetching }] = useLazyFetchUserDataQuery();
    const [fetchUserUpdate, { isLoading: isUpdatingWishlist }] = useFetchUserUpdateMutation();

    const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

    useEffect(() => {
        if (cookie.authToken) {
            fetchUserData();
        }
    }, [cookie.authToken, fetchUserData]);

    const handleWishlistToggle = (productId: number, variationId?: number) => {
        if (!userData?.meta?.wishlist) {
            router.push('/my-account/login');
            return;
        }

        if (!cookie.authToken) {
            return;
        }

        const userWishlist = userData?.meta.wishlist || [];
        const index = userWishlist.findIndex(
            (item: WishlistItem) =>
                item.product_id === productId &&
                (!variationId || item.variation_id === variationId)
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
                    product_id: productId,
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
