import useGetAuthToken from '@/hooks/useGetAuthToken';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { ProductCardListProps } from '@/types/components/shop';
import { FC, useEffect } from 'react';
import ProductCard from '../product/ProductCard/ProductCard';
import { ProductCardListSkeleton } from './ProductCardListSkeleton';
import { StyledProductCardList } from './styles';

export const ProductCardList: FC<ProductCardListProps> = ({
  isLoading = false,
  isError = false,
  products,
  columns,
  length,
}) => {
  const authToken = useGetAuthToken();

  const [fetchUserData] = useLazyFetchUserDataQuery();

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  // const handleDisire = (productId: number, variationId?: number) => {
  //   if (!userData?.meta?.wishlist.length) {
  //     dispatch(popupToggle('login'));

  //     return;
  //   }

  //   if (!authToken) {
  //     return;
  //   }

  //   const userWishlist = userData?.meta.wishlist || [];

  //   const index = userWishlist.findIndex(
  //     (item: WishlistItem) =>
  //       item.product_id === productId &&
  //       (!variationId || item.variation_id === variationId)
  //   );

  //   let updatedWishlist: WishlistItem[];

  //   if (index >= 0) {
  //     updatedWishlist = userWishlist.filter(
  //       (_: WishlistItem, index2: number) => index2 !== index
  //     );
  //   } else {
  //     updatedWishlist = [
  //       ...userWishlist,
  //       {
  //         product_id: productId,
  //         ...(variationId && { variation_id: variationId }),
  //       },
  //     ];
  //   }

  //   const userUpdateRequestBody = {
  //     meta: {
  //       wishlist: updatedWishlist,
  //     },
  //   };

  //   if (userData?.id) {
  //     fetchUserUpdate(userUpdateRequestBody);
  //   }
  // };

  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
  }

  if (isError) {
    return <p>We cannot get the products</p>;
  }

  return (
    <StyledProductCardList
      mobileColumns={columns?.mobileColumns}
      mintabletColumns={columns?.mintabletColumns}
      tabletColumns={columns?.tabletColumns}
      desktopColumns={columns?.desktopColumns}
    >
      {products?.map((product, i) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductCardList>
  );
};
