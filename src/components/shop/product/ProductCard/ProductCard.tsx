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
import ProductBadgeWrapper from '../ProductBadgeWrapper/ProductBadgeWrapper';
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

import { useResponsive } from '@/hooks/useResponsive';
import { useWishlist } from '@/hooks/useWishlist';
import { popupToggle } from '@/store/slices/PopupSlice';
import { getCardProductPrice } from '@/utils/price/getCardProductPrice';
import { Skeleton } from '@mui/material';

const ProductCard: React.FC<ProductCardPropsType> = ({ product, currency }) => {
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

  useEffect(() => {
    const cartMatchIndex = cartItems.findIndex(
      ({ product_id }) => product_id === product.id
    );
    if (cartMatchIndex >= 0) setIsCartMatch(true);
  }, [cartItems]);

  function handleCartButtonClick() {
    if (product?.type === 'variable') {
      router.push(
        `/${router.locale === 'en' ? '' : router.locale}/product/${
          product.slug
        }`
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
        dispatch(popupToggle('mini-cart'));
      }
    } else {
      router.push(`/${router.locale === 'en' ? '' : router.locale}/cart`);
    }
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
              unoptimized={true}
            />
          </Link>
        </ProductImageWrapper>
        <Rating rating={product.average_rating} />
        <TitleWrapper>
          <StyledLink href={`/product/${product.slug}`}>
            {product.name}
          </StyledLink>
          <PriceWrapper>
            {currency.rate ? (
              <>
                {product.type === 'variable' &&
                product.variations.length > 1 ? (
                  finalPrice !== regularPrice ? (
                    <ProductPrice>
                      {t('priceFrom', { price: finalPrice })} {currency.code}
                    </ProductPrice>
                  ) : (
                    <ProductPrice>{`${finalPrice} ${currency.code}`}</ProductPrice>
                  )
                ) : (
                  <>
                    {isSale ? (
                      <>
                        <ProductMaxPrice>{`${regularPrice} ${currency.code}`}</ProductMaxPrice>
                        <ProductPrice>{`${finalPrice} ${currency.code}`}</ProductPrice>
                      </>
                    ) : (
                      <ProductPrice>{`${regularPrice} ${currency.code}`}</ProductPrice>
                    )}
                  </>
                )}
              </>
            ) : (
              <Skeleton width="50px" />
            )}
          </PriceWrapper>
        </TitleWrapper>
        <ProductBadgeWrapper>
          {isSale && <ProductBadge type="sale" />}
          <FavoriteButton
            onClick={() => handleWishlistToggle(product)}
            marginLeft="auto"
            active={checkDesired(product.id)}
            isLoading={isUpdatingWishlist || isFetchingWishlist}
          />
        </ProductBadgeWrapper>
      </ProductWrapper>
      <>
        <AddToBasketButton onClick={handleCartButtonClick}>
          {product?.type !== 'variable'
            ? isCartMatch
              ? t('viewCart')
              : t('addToBasket')
            : t('chooseOptions')}
        </AddToBasketButton>
      </>
    </StyledProductCard>
  );
};

export default ProductCard;
