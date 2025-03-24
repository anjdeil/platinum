import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { FlexBox, StyledButton } from '@/styles/components';
import CategoryType from '@/types/components/shop/categories/categories';
import { ProductType } from '@/types/components/shop/product/products';
import { getCardProductPrice } from '@/utils/price/getCardProductPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
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

  const { isLoading, convertCurrency, formatPrice } = useCurrencyConverter();

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
            {products.map(product => {
              const { id, name, thumbnail, slug, categories, price } = product;
              let finalPrice, regularPrice, isSale;

              if (price) {
                ({ finalPrice, regularPrice, isSale } =
                  getCardProductPrice(product));
              }

              const convertedFinalPrice = convertCurrency(finalPrice || 0);
              const convertedRegularPrice = convertCurrency(regularPrice || 0);

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
                      <SearchResultsRowCaption>{name}</SearchResultsRowCaption>
                      <SearchResultsRowCat>
                        {categories.map(
                          (cat, i) => (i > 0 ? ' | ' : '') + cat.name,
                        )}
                      </SearchResultsRowCat>
                    </SearchResultsRowCaptionWrap>
                    {!isLoading ? (
                      <SearchResultsPrice>
                        {regularPrice ? (
                          <>
                            {formatPrice(convertedRegularPrice)}
                            {isSale && (
                              <>
                                {finalPrice && formatPrice(convertedFinalPrice)}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {price?.min_price &&
                              tProduct('priceFrom', {
                                price: formatPrice(convertedFinalPrice),
                              })}
                          </>
                        )}
                      </SearchResultsPrice>
                    ) : (
                      <Skeleton width="50px" />
                    )}
                  </FlexBox>
                </SearchResultsRow>
              );
            })}
          </SearchResultsRows>
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
        </SearchResultsGroup>
      )}
    </SearchResults>
  );
}
