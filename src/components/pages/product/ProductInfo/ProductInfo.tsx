import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton';
import DetailsAccordion from '@/components/global/DetailsAccordeon/DetailsAccordion';
import Rating from '@/components/global/Rating/Rating';
import { RichTextSection } from '@/components/sections/RichTextSection';
import ProductBadge from '@/components/shop/product/ProductBadge/ProductBadge';
import ProductBadgeWrapper from '@/components/shop/product/ProductBadgeWrapper/ProductBadgeWrapper';
import { useResponsive } from '@/hooks/useResponsive';
import { useWishlist } from '@/hooks/useWishlist';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
import { popupSet, popupToggle } from '@/store/slices/PopupSlice';
import { setData } from '@/store/slices/ProductSlice';
import { StyledButton, Title } from '@/styles/components';
import { ProductCardPropsType } from '@/types/components/shop';
import {
  ProductType,
  ProductVariation,
} from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/сartSlice';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { decodeHTML } from '@/utils/decodeHTML';
import { getCurrentVariation } from '@/utils/getCurrentVariation';
import { getProductPrice } from '@/utils/price/getProductPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DeliveryTimer from '../DeliveryTimer/DeliveryTimer';
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
  const { isMobile } = useResponsive();
  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(product);

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
    if (product.attributes.length == 0 && product.variations.length != 0)
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

  const { finalPrice, regularPrice, isSale, saleEndDate } = useMemo(() => {
    const priceData =
      product.type === 'simple' ? product.price : currentVariation?.price;
    if (priceData) {
      return getProductPrice(priceData);
    }
    return { finalPrice: 0, regularPrice: 0, isSale: false, saleEndDate: null };
  }, [product, currentVariation]);

  function renderCartButtonInnerText() {
    if (cartMatch) {
      if (cartMatch.quantity === quantity) return t('viewCart');
      return t('updateCart');
    } else {
      return t('addToBasket');
    }
  }

  function handleCartButtonClick() {
    console.log(currentVariation);

    dispatch(
      updateCart({
        product_id: product.id,
        quantity,
        ...(currentVariation && { variation_id: currentVariation.id }),
      })
    );
    if (!isMobile) {
      dispatch(popupToggle('mini-cart'));
    }
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
          {isSale && <ProductBadge type="sale" />}
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
          <ProductPrice
            currency={currency}
            minPrice={finalPrice ? finalPrice * currency.rate : 0}
            maxPrice={regularPrice ? regularPrice * currency.rate : 0}
          />
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
        {isSale && saleEndDate && <ProductPromotion time={saleEndDate} />}
        <DeliveryTimer />
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
          <RichTextSection
            text={decodeHTML(
              currentVariation?.description || product.description
            )}
          />
        </DetailsAccordion>
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductInfo;
