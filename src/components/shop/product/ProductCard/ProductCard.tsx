import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton';
import Rating from '@/components/global/Rating/Rating';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
import { ProductCardPropsType } from '@/types/components/shop';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductBadge from '../ProductBadge/ProductBadge';
import {
  PriceWrapper,
  ProductImageWrapper,
  ProductMaxPrice,
  ProductPrice,
  ProductWrapper,
  StyledLink,
  StyledProductCard,
  TitleWrapper,
} from './styles';

import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useResponsive } from '@/hooks/useResponsive';
import { useWishlist } from '@/hooks/useWishlist';
import { popupToggle } from '@/store/slices/PopupSlice';
import { getCardProductPrice } from '@/utils/price/getCardProductPrice';
import { Skeleton } from '@mui/material';
import ProductCardBadgeWrapper from '../ProductCardBadgeWrapper/ProductCardBadgeWrapper';
import { ProductBadgeBox } from '../ProductBadgeWrapper/styles';
import NotifyBasketButton from '@/components/global/buttons/NotifyBasketButton/NotifyBasketButton';

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) => {
  const t = useTranslations('Product');
  const { isMobile } = useResponsive();
  const router = useRouter();

  const {
    handleWishlistToggle,
    isFetchingWishlist,
    isUpdatingWishlist,
    checkDesired,
  } = useWishlist();

  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);

  const [isCartMatch, setIsCartMatch] = useState(false);

  const { finalPrice, regularPrice, isSale } = getCardProductPrice(product);

  const { isLoading, convertCurrency, formatPrice } = useCurrencyConverter();

  const convertedFinalPrice = convertCurrency(finalPrice || 0);
  const convertedRegularPrice = convertCurrency(regularPrice);

  useEffect(() => {
    const cartMatchIndex = cartItems.findIndex(
      ({ product_id }) => product_id === product.id
    );
    if (cartMatchIndex >= 0) setIsCartMatch(true);
  }, [cartItems]);

  function handleCartButtonClick() {
    if (product?.type === 'variable') {
      router.push(
        `/${
          router.locale === router.defaultLocale ? '' : router.locale
        }/product/${product.slug}`
      );
      return;
    }

    if (!isCartMatch) {
      dispatch(
        updateCart({
          product_id: product.id,
          quantity: 1,
        })
      );
      if (!isMobile) {
        dispatch(popupToggle({ popupType: 'mini-cart' }));
      }
    } else {
      router.push(
        `/${router.locale === router.defaultLocale ? '' : router.locale}/cart`
      );
    }
  }

  function handleNotifyButtonClick(productId: number) {
    console.log('Notify');
    dispatch(
      popupToggle({
        popupType: 'notify',
        data: {
          productId,
        },
      })
    );
  }

  return (
    <StyledProductCard>
      <ProductWrapper isFavorite={checkDesired(product.id)}>
        <ProductImageWrapper>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.thumbnail?.src || '/assets/images/not-found.webp'}
              fill
              style={{ objectFit: 'contain' }}
              alt="image"
            />
          </Link>
        </ProductImageWrapper>
        <Rating rating={product.average_rating} />
        <TitleWrapper>
          <StyledLink href={`/product/${product.slug}`}>
            {product.name}
          </StyledLink>
          <PriceWrapper>
            {!isLoading ? (
              <>
                {product.type === 'variable' &&
                product.variations.length > 1 ? (
                  convertedFinalPrice !== convertedRegularPrice ? (
                    <ProductPrice>
                      {t('priceFrom', {
                        price: formatPrice(convertedFinalPrice),
                      })}
                    </ProductPrice>
                  ) : (
                    <ProductPrice>{`${formatPrice(
                      convertedFinalPrice
                    )}`}</ProductPrice>
                  )
                ) : (
                  <>
                    {isSale ? (
                      <>
                        <ProductMaxPrice>{`${formatPrice(
                          convertedRegularPrice
                        )}`}</ProductMaxPrice>
                        <ProductPrice>{`${formatPrice(
                          convertedFinalPrice
                        )}`}</ProductPrice>
                      </>
                    ) : (
                      <ProductPrice>{`${formatPrice(
                        convertedRegularPrice
                      )}`}</ProductPrice>
                    )}
                  </>
                )}
              </>
            ) : (
              <Skeleton width="50px" />
            )}
          </PriceWrapper>
        </TitleWrapper>
        <ProductCardBadgeWrapper>
          <ProductBadgeBox>
            {isSale && <ProductBadge type="sale" />}
            {Boolean(product.tags.length) &&
              product.tags.map(tag => (
                <ProductBadge key={tag.id} type={tag.slug} name={tag.name} />
              ))}
          </ProductBadgeBox>
          {product?.type !== 'variable' && (
            <FavoriteButton
              onClick={() => handleWishlistToggle(product)}
              marginLeft="auto"
              active={checkDesired(product.id)}
              isLoading={isUpdatingWishlist || isFetchingWishlist}
            />
          )}
        </ProductCardBadgeWrapper>
      </ProductWrapper>
      <>
        {!product.stock_quantity && product?.type !== 'variable' ? (
          <NotifyBasketButton
            onClick={() => handleNotifyButtonClick(product.id)}
          >
            {t('notifyWhenAvailable')}
          </NotifyBasketButton>
        ) : (
          <AddToBasketButton
            onClick={handleCartButtonClick}
            // disabled={product.stock_quantity === 0}
          >
            {product?.type !== 'variable'
              ? isCartMatch
                ? t('viewCart')
                : t('addToBasket')
              : t('chooseOptions')}
          </AddToBasketButton>
        )}
      </>
    </StyledProductCard>
  );
};

export default ProductCard;
