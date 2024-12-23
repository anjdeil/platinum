import { ProductCardListProps } from '@/types/components/shop';
import { FC, useEffect } from 'react';
import ProductCard from '../product/ProductCard/ProductCard';
import { ProductCardListSkeleton } from './ProductCardListSkeleton';
import { StyledProductCardList } from './styles';
import {
  useFetchUserUpdateByIdMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';

export const ProductCardList: FC<ProductCardListProps> = ({
  isLoading = false,
  isError = false,
  products,
  columns,
  length,
}) => {
  const [cookie] = useCookies(['userToken']);
  const router = useRouter();

  const [fetchUserData, { data: userData, isFetching: isUserFetching }] =
    useLazyFetchUserDataQuery();
  const [fetchUserUpdateById, { isLoading: userDataUpdateLoading }] =
    useFetchUserUpdateByIdMutation();

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

  useEffect(() => {
    if ('userToken' in cookie) {
      fetchUserData(cookie.userToken);
    }
  }, [cookie, fetchUserData]);

  const handleDisire = (productId: number, variationId?: number) => {
    if (!userData?.meta?.wishlist || !cookie?.userToken) {
      router.push('/my-account/login');
      return;
    }

    const userWishlist = userData?.meta.wishlist || [];

    const index = userWishlist.findIndex(
      (item: WishlistItem) =>
        item.product_id === productId &&
        (!variationId || item.variation_id === variationId)
    );

    let updatedWishlist = null;

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
      fetchUserUpdateById({
        id: userData.id,
        body: userUpdateRequestBody,
      });
    }
  };

  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
  }

  if (isError) {
    return <p>We cannot get the products</p>;
  }

  isLoading = userDataUpdateLoading || isUserFetching;

  return (
    <StyledProductCardList
      mobileColumns={columns?.mobileColumns}
      tabletColumns={columns?.tabletColumns}
      desktopColumns={columns?.desktopColumns}
    >
      {products?.map((product, i) => (
        <ProductCard
          wishlist={wishlist}
          key={product.id}
          product={product}
          handleDisire={handleDisire}
          isLoading={isLoading}
        />
      ))}
    </StyledProductCardList>
  );
};
