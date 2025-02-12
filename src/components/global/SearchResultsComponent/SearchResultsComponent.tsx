import CategoryType from '@/types/components/shop/categories/categories';
import { ProductType } from '@/types/components/shop/product/products';
import FindMiniIcon from '../icons/FindMiniIcon/FindMiniIcon';
import {
  SearchButtonWrapper,
  SearchResults,
  SearchResultsGroup,
  SearchResultsPrice,
  SearchResultsRow,
  SearchResultsRowCaption,
  SearchResultsRowCaptionWrap,
  SearchResultsRowCat,
  SearchResultsRowIcon,
  SearchResultsRowImage,
  SearchResultsRows,
  SearchResultsTitle,
} from './styles';
import { FlexBox, StyledButton } from '@/styles/components';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { useAppSelector } from '@/store';
import { Skeleton } from '@mui/material';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getProductPrice } from '@/utils/price/getProductPrice';

export default function SearchResultsComponent({
  products = [],
  categories = [],
  onCategorySelect,
  onProductSelect,
  searchTerm,
}: {
  products: ProductType[];
  categories: CategoryType[];
  onCategorySelect: (slug: string) => void;
  onProductSelect: (slug: string) => void;
  searchTerm: string;
}) {
  console.log(products);

  const t = useTranslations('Search');
  const tProduct = useTranslations('Product');
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

  const router = useRouter();

  const searchHref = useMemo(() => {
    return `/${
      router.locale === 'en' ? '' : `${router.locale}/`
    }search/${encodeURIComponent(searchTerm)}`;
  }, [router.locale, searchTerm]);

  const handleSearch = () => {
    console.log('Button clicked! Navigating to:', searchHref);

    router.push(searchHref);
  };

  return (
    <SearchResults>
      {categories.length > 0 && (
        <SearchResultsGroup>
          <SearchResultsTitle>Categories</SearchResultsTitle>
          <SearchResultsRows>
            {categories.map(({ id, name, slug }) => (
              <SearchResultsRow
                key={id}
                onMouseDown={() => onCategorySelect(slug)}
              >
                <SearchResultsRowIcon>
                  <FindMiniIcon color="#000" />
                </SearchResultsRowIcon>
                <SearchResultsRowCaption>{name}</SearchResultsRowCaption>
              </SearchResultsRow>
            ))}
          </SearchResultsRows>
        </SearchResultsGroup>
      )}

      {products.length > 0 && (
        <SearchResultsGroup>
          <SearchResultsTitle>Products</SearchResultsTitle>
          <SearchResultsRows>
            {products
              .slice(0, 5)
              .map(({ id, name, thumbnail, slug, categories, price }) => {
                let finalPrice, regularPrice, isSale;

                if (price) {
                  ({ finalPrice, regularPrice, isSale } =
                    getProductPrice(price));
                }

                return (
                  <SearchResultsRow
                    key={id}
                    onMouseDown={() => onProductSelect(slug)}
                  >
                    {thumbnail?.src && (
                      <SearchResultsRowImage
                        src={thumbnail.src}
                        alt={name}
                        width={40}
                        height={40}
                      />
                    )}
                    <FlexBox
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                      gap="10px"
                    >
                      <SearchResultsRowCaptionWrap>
                        <SearchResultsRowCaption>
                          {name}
                        </SearchResultsRowCaption>
                        <SearchResultsRowCat>
                          {categories.map(
                            (cat, i) => (i > 0 ? ' | ' : '') + cat.name
                          )}
                        </SearchResultsRowCat>
                      </SearchResultsRowCaptionWrap>
                      {extendedCurrency.rate ? (
                        <SearchResultsPrice>
                          {regularPrice ? (
                            <>
                              {roundedPrice(
                                regularPrice * extendedCurrency.rate
                              )}
                              {isSale && (
                                <>
                                  {finalPrice &&
                                    roundedPrice(
                                      finalPrice * extendedCurrency.rate
                                    )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {price?.min_price &&
                                tProduct('priceFrom', {
                                  price: roundedPrice(
                                    price.min_price * extendedCurrency.rate
                                  ),
                                })}
                              &nbsp;
                            </>
                          )}
                          &nbsp;
                          {extendedCurrency.code}
                        </SearchResultsPrice>
                      ) : (
                        <Skeleton width="50px" />
                      )}
                    </FlexBox>
                  </SearchResultsRow>
                );
              })}
          </SearchResultsRows>
          {products.length > 5 && (
            <SearchButtonWrapper>
              <StyledButton
                height="40px"
                secondary
                fontSize="0.85rem"
                onMouseDown={handleSearch}
              >
                {t('showAll')}
              </StyledButton>
            </SearchButtonWrapper>
          )}
        </SearchResultsGroup>
      )}
    </SearchResults>
  );
}
