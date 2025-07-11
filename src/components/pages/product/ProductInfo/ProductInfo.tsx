import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton';
import DetailsAccordion from '@/components/global/DetailsAccordeon/DetailsAccordion';
import Rating from '@/components/global/Rating/Rating';
import { RichTextSection } from '@/components/sections/RichTextSection';
import ProductBadge from '@/components/shop/product/ProductBadge/ProductBadge';
import ProductBadgeWrapper from '@/components/shop/product/ProductBadgeWrapper/ProductBadgeWrapper';
import { ProductBadgeBox } from '@/components/shop/product/ProductBadgeWrapper/styles';
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
import { getCurrentVariation } from '@/utils/getCurrentVariation';
import { getProductPrice } from '@/utils/price/getProductPrice';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DeliveryTimer from '../DeliveryTimer/DeliveryTimer';
import PaymentList from '../PaymentList/PaymentList';
import ProductAvailable from '../ProductAvailable/ProductAvailable';
import ProductCharacteristics from '../ProductCharacteristics/ProductCharacteristics';
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

const ProductInfo: React.FC<ProductCardPropsType> = ({ product }) => {
  const { images, thumbnail, videos } = product;
  const t = useTranslations('Product');
  const { isMobile } = useResponsive();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);

  const {
    handleWishlistToggle,
    isFetchingWishlist,
    isUpdatingWishlist,
    checkDesired,
  } = useWishlist();

  const [quantity, setQuantity] = useState<number>(1);
  const [cartMatch, setCartMatch] = useState<CartItem>();
  const [viewing, setViewing] = useState<number>(0);

  /**
   * Choosen variation
   */
  const [currentVariation, setCurrentVariation] = useState<ProductVariation>();

  const router = useRouter();

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
    dispatch(
      updateCart({
        product_id: product.id,
        quantity,
        ...(currentVariation && { variation_id: currentVariation.id }),
      })
    );

    //Analytics
    const addToCartPayload = {
      value: finalPrice ? finalPrice * quantity : 0,
      items: [
        {
          item_id: currentVariation?.sku || product.sku || product.id,
          item_name: product.name,
          item_category: product.categories.map(c => c.name).join('/'),
          price: String(finalPrice),
          quantity,
          ...(currentVariation && {
            item_variant: currentVariation.attributes
              ?.map(attr => attr.option)
              .join(', '),
          }),
        },
      ],
    };

    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'add_to_cart', addToCartPayload);
      }

      // Facebook Pixel
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'AddToCart', {
          content_ids: [currentVariation?.sku || product.sku || product.id],
          content_type: 'product',
          value: finalPrice ? finalPrice * quantity : 0,
          currency: 'PLN',
        });
      }
    }

    if (!isMobile) {
      dispatch(popupToggle({ popupType: 'mini-cart' }));
    } else {
      if (cartMatch && cartMatch.quantity === quantity) {
        router.push(`/${router.locale}/cart`);
      }
    }
  }

  function handleNotifyButtonClick() {
    dispatch(
      popupToggle({
        popupType: 'notify',
        data: { productId: product.id, variationId: currentVariation?.id || 0 },
      })
    );
  }

  const stockQuantity = useMemo(() => {
    if (product?.type === 'variable') {
      return currentVariation?.stock_quantity ?? 0;
    }

    return product?.stock_quantity ?? 0;
  }, [currentVariation, product]);

  // const stockQuantity = useMemo(() => {
  //   if (!currentVariation?.stock_quantity && !product.stock_quantity) {
  //     return 0;
  //   }
  //   if (currentVariation?.stock_quantity) {
  //     return currentVariation?.stock_quantity;
  //   }
  //   if (product?.stock_quantity) {
  //     return product?.stock_quantity;
  //   }

  //   return 0;
  // }, [currentVariation, product]);

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
    updateProductState(product);
    dispatch(popupSet({ popupType: 'add-comment' }));
  };

  const galleryImages = (() => {
    const variationImage = currentVariation?.image;
    const hasValidVariationImage =
      variationImage?.id && variationImage?.name && variationImage?.src;

    const baseImage = hasValidVariationImage
      ? {
          id: variationImage.id,
          name: variationImage.name,
          src: variationImage.src,
        }
      : thumbnail?.id && thumbnail?.name && thumbnail?.src
      ? { id: thumbnail.id, name: thumbnail.name, src: thumbnail.src }
      : null;

    const imageItems = baseImage ? [baseImage, ...images] : [...images];

    const videoItems =
      videos?.map(video => ({
        id: video.youtube_url || video.video_url,
        name: video.type,
        src: video.youtube_url || video.video_url,
        type: 'video',
      })) || [];

    return [...imageItems, ...videoItems];
  })();

  useEffect(() => {
    if (stockQuantity === 0) {
      setViewing(1);
    } else if (stockQuantity < 10) {
      const maxReduction = stockQuantity * 0.2;
      const randomReduction = Math.ceil(Math.random() * maxReduction);
      const finalValue = Math.max(1, stockQuantity - randomReduction);
      setViewing(finalValue);
    } else {
      const randomValue = Math.random();
      const adjustedValue = Math.pow(randomValue, 0.5);
      const finalValue = Math.max(1, Math.floor(adjustedValue * 10));
      setViewing(finalValue);
    }
  }, [stockQuantity]);

  const showAttributes = product.attributes.filter(attr =>
    product.variations.some(v => v.attributes.some(va => va.id === attr.id))
  );

  return (
    <ProductWrapper>
      <ProductImageWrapper>
        <ProductSwiper data={galleryImages} />
        <ProductBadgeWrapper>
          <ProductBadgeBox>
            {isSale && <ProductBadge type="sale" />}
            {Boolean(product.tags.length) &&
              product.tags.map(tag => (
                <ProductBadge key={tag.id} type={tag.slug} name={tag.name} />
              ))}
          </ProductBadgeBox>
          <FavoriteButton
            onClick={() => handleWishlistToggle(product, currentVariation?.id)}
            marginLeft="auto"
            active={checkDesired(product.id, currentVariation?.id)}
            isLoading={isUpdatingWishlist || isFetchingWishlist}
          />
        </ProductBadgeWrapper>
      </ProductImageWrapper>
      <ProductTitleWrapper>
        <Title as="h1" uppercase textalign="left">
          {`${product.name}${
            currentVariation
              ? ` - ${currentVariation.attributes
                  .map(attr => {
                    const productAttribute = product.attributes.find(
                      attribute => attribute.slug === attr.slug
                    );
                    const option = productAttribute?.options.find(
                      option => option.slug === attr.option
                    );
                    return option ? option.name : attr.option;
                  })
                  .join(', ')}`
              : ''
          }`}
        </Title>
        <ProductFlexWrapper>
          <ProductAvailable count={stockQuantity} />
          <ProductViewing count={viewing} />
        </ProductFlexWrapper>
        <ProductFlexWrapper>
          {currentVariation?.sku ||
            (product.sku && (
              <ProductSku sku={currentVariation?.sku || product.sku} />
            ))}
          <Rating rating={product.average_rating} />
        </ProductFlexWrapper>
        <ProductPrice
          minPrice={finalPrice ? finalPrice : 0}
          maxPrice={regularPrice ? regularPrice : 0}
        />
      </ProductTitleWrapper>
      <ProductInfoWrapper>
        {/* Options */}
        {showAttributes && (
          <ProductOptionsPanel
            attributes={showAttributes}
            defaultAttributes={product.default_attributes || []}
            variations={product.variations}
          />
        )}
        {/* Options END*/}
        {isSale && saleEndDate && <ProductPromotion time={saleEndDate} />}
        <DeliveryTimer />
        <AddToBasketWrapper>
          <ProductQuantity quantity={quantity} onChange={setQuantity} />

          {stockQuantity !== null && stockQuantity > 0 ? (
            <AddToBasketButton
              maxWidth="309px"
              height="56px"
              onClick={handleCartButtonClick}
            >
              {renderCartButtonInnerText()}
            </AddToBasketButton>
          ) : (
            <StyledButton
              notify={true}
              height="56px"
              onClick={handleNotifyButtonClick}
            >
              {t('notifyWhenAvailable')}
            </StyledButton>
          )}
        </AddToBasketWrapper>
        <PaymentList />
        <ShippingList />
        <StyledButton secondary={true} onClick={addComment}>
          {t('leaveAReviewAboutProduct')}
        </StyledButton>
        {Boolean(product.attributes.length) && (
          <DetailsAccordion summary={t('characteristics')}>
            <ProductCharacteristics attributes={product.attributes} />
          </DetailsAccordion>
        )}
        <DetailsAccordion summary={t('descriptions')}>
          <RichTextSection
            // text={decodeHTML(
            //   currentVariation?.description || product.description
            // )}
            text={currentVariation?.description || product.description}
          />
        </DetailsAccordion>
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductInfo;
