import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton';
import DetailsAccordion from '@/components/global/DetailsAccordeon/DetailsAccordion';
import Rating from '@/components/global/Rating/Rating';
import ProductBadge from '@/components/shop/product/ProductBadge/ProductBadge';
import ProductBadgeWrapper from '@/components/shop/product/ProductBadgeWrapper/ProductBadgeWrapper';
import { useWishlist } from '@/hooks/useWishlist';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
import { popupSet, popupToggle } from '@/store/slices/PopupSlice';
import { setData } from '@/store/slices/ProductSlice';
import { StyledButton, Title } from '@/styles/components';
import { ProductCardPropsType } from '@/types/components/shop';
import { ProductVariation } from '@/types/components/shop/product/products';
import { ProductType } from '@/types/pages/shop';
import { CartItem } from '@/types/store/reducers/сartSlice';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { getCurrentVariation } from '@/utils/getCurrentVariation';
import { Skeleton } from '@mui/material';
import ReactHtmlParser from 'html-react-parser';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PaymentList from '../PaymentList/PaymentList';
import ProductAvailable from '../ProductAvailable/ProductAvailable';
import { ProductOptionsPanel } from '../ProductOptionsPanel';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductPromotion from '../ProductPromotion/ProductPromotion';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import ProductSku from '../ProductSku/ProductSku';
import ProductSwiper from '../ProductSwiper/ProductSwiper';
import ProductViewing from '../ProductViewing/ProductViewing';
import ShippingList from '../ShippingList/ShippingList';
import {
  AddToBasketWrapper,
  ProductFlexWrapper,
  ProductImageWrapper,
  ProductInfoWrapper,
  ProductTitleWrapper,
  ProductWrapper,
} from './styles';

const ProductInfo: React.FC<ProductCardPropsType> = ({ product, currency }) => {
  const { images, thumbnail } = product;
  const t = useTranslations('Product');
  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    handleWishlistToggle,
    isFetchingWishlist,
    isUpdatingWishlist,
    checkDesired,
  } = useWishlist();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie;

      const authToken = getCookieValue(cookies || '', 'authToken');

      setIsAuthenticated(!!authToken);
    };

    checkAuth();
  }, [userSlice]);

  const [quantity, setQuantity] = useState<number>(1);
  const [cartMatch, setCartMatch] = useState<CartItem>();

  /**
   * Choosen variation
   */
  const [currentVariation, setCurrentVariation] = useState<ProductVariation>();

  // Temporary code (whole useEffect) for assigning the current variation
  /* useEffect(() => {
    setCurrentVariation(product?.variations[0]);
    console.log(currentVariation);
    
  }, []); */

  useEffect(() => {
    const cartMatch = cartItems.find(
      ({ product_id, variation_id }) =>
        product_id === product.id &&
        (!variation_id || variation_id === currentVariation?.id)
    );
    setCartMatch(cartMatch);
    if (cartMatch) {
      setQuantity(cartMatch.quantity);
    }
  }, [cartItems, product, currentVariation?.id]);

  function renderCartButtonInnerText() {
    if (cartMatch) {
      if (cartMatch.quantity === quantity) return t('viewCart');
      return t('updateCart');
    } else {
      return t('addToBasket');
    }
  }

  function handleCartButtonClick() {
    dispatch(
      updateCart({
        product_id: product.id,
        quantity,
        ...(currentVariation && { variation_id: currentVariation.id }),
      })
    );
    dispatch(popupToggle('mini-cart'));
  }

  const stockQuantity = useMemo(() => {
    if (!currentVariation?.stock_quantity && !product.stock_quantity) return 0;
    if (currentVariation?.stock_quantity)
      return currentVariation?.stock_quantity;
    if (product?.stock_quantity) return product?.stock_quantity;
    return 0;
  }, [currentVariation, product]);

  const router = useRouter();

  /** Set default attributes */
  useEffect(() => {
    if (product.type === 'variable') {
      const variation = getCurrentVariation(product.variations, router.query);
      if (variation) setCurrentVariation(variation);
    }
  }, [router.query]);

  const updateProductState = useCallback(
    (data: ProductType) => {
      dispatch(setData(data));
    },
    [dispatch]
  );

  const addComment = () => {
    if (isAuthenticated) {
      updateProductState(product);
      dispatch(popupSet('add-comment'));
    } else {
      dispatch(popupToggle('login'));
    }
  };

  const galleryImages =
    thumbnail?.id && thumbnail?.name && thumbnail?.src
      ? [
          { id: thumbnail.id, name: thumbnail.name, src: thumbnail.src },
          ...images,
        ]
      : [...images];

  return (
    <ProductWrapper>
      <ProductImageWrapper>
        <ProductSwiper data={galleryImages} />
        <ProductBadgeWrapper>
          {product.min_price !== product.max_price && (
            <ProductBadge type="sale" />
          )}
          <FavoriteButton
            onClick={() => handleWishlistToggle(product)}
            marginLeft="auto"
            active={checkDesired(product.id)}
            isLoading={isUpdatingWishlist || isFetchingWishlist}
          />
        </ProductBadgeWrapper>
      </ProductImageWrapper>
      <ProductTitleWrapper>
        <Title as="h1" uppercase textalign="left">
          {currentVariation?.name || product.name}
        </Title>
        <ProductFlexWrapper>
          <ProductAvailable count={stockQuantity} />
          <ProductViewing count={stockQuantity} />
        </ProductFlexWrapper>
        <ProductFlexWrapper>
          {currentVariation?.sku ||
            (product.sku && (
              <ProductSku sku={currentVariation?.sku || product.sku} />
            ))}
          <Rating rating={product.average_rating} />
        </ProductFlexWrapper>
        {currency.rate ? (
          currentVariation ? (
            currentVariation.price !== null && (
              <ProductPrice
                currency={currency}
                minPrice={(currentVariation.price ?? 0) * currency.rate}
              />
            )
          ) : (
            product.min_price !== null &&
            product.max_price !== null && (
              <ProductPrice
                currency={currency}
                minPrice={product.min_price * currency.rate}
                maxPrice={product.max_price * currency.rate}
              />
            )
          )
        ) : (
          <Skeleton width="80px" height="40px" />
        )}
      </ProductTitleWrapper>
      <ProductInfoWrapper>
        {/* Options */}
        {product.attributes && (
          <ProductOptionsPanel
            attributes={product.attributes}
            defaultAttributes={product.default_attributes || []}
          />
        )}
        {/* Options END*/}

        <ProductPromotion time={new Date('2025-10-30T00:00:00')} />
        <AddToBasketWrapper>
          <ProductQuantity quantity={quantity} onChange={setQuantity} />

          {stockQuantity !== null && stockQuantity > 0 ? (
            <AddToBasketButton maxWidth="309px" onClick={handleCartButtonClick}>
              {renderCartButtonInnerText()}
            </AddToBasketButton>
          ) : (
            <StyledButton notify={true}>
              {t('notifyWhenAvailable')}
            </StyledButton>
          )}
        </AddToBasketWrapper>
        <PaymentList />
        <ShippingList />
        <StyledButton onClick={addComment}>
          {t('leaveAReviewAboutProduct')}
        </StyledButton>
        <DetailsAccordion summary={t('descriptions')}>
          <div
            dangerouslySetInnerHTML={{
              __html: ReactHtmlParser(
                currentVariation?.description || product.description
              ),
            }}
          ></div>
        </DetailsAccordion>
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductInfo;
