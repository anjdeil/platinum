import useGetAuthToken from '@/hooks/useGetAuthToken';
import { useAppSelector } from '@/store';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
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

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
  }

  if (isError) {
    return <p>We cannot get the products</p>;
  }

  return (
    <StyledProductCardList
      mobileColumns={columns?.mobileColumns}
      tabletColumns={columns?.tabletColumns}
      desktopColumns={columns?.desktopColumns}
    >
      {products?.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          currency={extendedCurrency}
        />
      ))}
    </StyledProductCardList>
  );
};
