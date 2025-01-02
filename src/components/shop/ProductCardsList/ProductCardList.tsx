import { ProductCardListProps } from '@/types/components/shop';
import { FC, useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard/ProductCard';
import { ProductCardListSkeleton } from './ProductCardListSkeleton';
import { StyledProductCardList } from './styles';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { useAppSelector } from '@/store';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';

export const ProductCardList: FC<ProductCardListProps> = ({
  isLoading = false,
  isError = false,
  products,
  columns,
  length,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated: isAuthSlice } = useAppSelector(
    state => state.userSlice
  );
  useEffect(() => {
    console.log(isAuthSlice);

    const checkAuth = () => {
      const cookies = document.cookie;

      const authToken = getCookieValue(cookies || '', 'authToken');
      setIsAuthenticated(!!authToken);
    };

    checkAuth();
  }, [isAuthSlice]);

  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
  }

  if (isError) {
    return <p>We cannot get the products</p>;
  }

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
          key={product.id}
          product={product}
          isAuthenticated={isAuthenticated}
          currency={extendedCurrency}
        />
      ))}
    </StyledProductCardList>
  );
};
