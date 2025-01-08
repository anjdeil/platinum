import { useAppSelector } from '@/store';
import {
  useFetchUserUpdateMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { ProductCardListProps } from '@/types/components/shop';
import { WishlistItem } from '@/types/store/rtk-queries/wpApi';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
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
  const [cookie] = useCookies(['authToken']);

  const router = useRouter();

  const [
    fetchUserData,
    {
      data: userData,
      isLoading: isUserDataLoading,
      isFetching: isUserFetching,
    },
  ] = useLazyFetchUserDataQuery();
  const [fetchUserUpdate, { isLoading: userDataUpdateLoading }] =
    useFetchUserUpdateMutation();

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || [];

  useEffect(() => {
    if (cookie.authToken) {
      fetchUserData();
    }
  }, [cookie, fetchUserData]);

  const handleDisire = (productId: number, variationId?: number) => {
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

  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
  }

  if (isError) {
    return <p>We cannot get the products</p>;
  }

  isLoading = userDataUpdateLoading || isUserFetching;
  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const currentCurrency =
    currencies && !isCurrenciesLoading
      ? currencies?.data?.items.find(
          currency => currency.code === selectedCurrency.name
        )
      : undefined;

  const extendedCurrency = {
    ...selectedCurrency,
    rate: currentCurrency ? currentCurrency.rate || 1 : undefined,
  };

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
          currency={extendedCurrency}
        />
      ))}
    </StyledProductCardList>
  );
};
