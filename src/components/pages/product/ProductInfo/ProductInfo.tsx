import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import DetailsAccordion from '@/components/global/DetailsAccordeon/DetailsAccordion';
import Rating from '@/components/global/Rating/Rating';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
import { popupSet } from '@/store/slices/PopupSlice';
import { setData } from '@/store/slices/ProductSlice';
import { StyledButton, Title } from '@/styles/components';
import { CurrencyType } from '@/types/components/shop';
import { ProductVariation } from '@/types/components/shop/product/products';
import { ProductType } from '@/types/pages/shop';
import { CartItem } from '@/types/store/reducers/сartSlice';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { getCurrentVariation } from '@/utils/getCurrentVariation';
import { CircularProgress } from '@mui/material';
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

//TODO ProductCardPropsType
// product: ProductSchema,
//   handleDisire: z
//     .function()
//     .args(z.number(), z.number().optional())
//     .returns(z.void()),
//   wishlist: z.array(WishlistItemSchema),
//   isLoading: z.boolean(),
//   currency: CurrencySchema,

type ProductCardPropsType = {
  product: ProductType;
  currency: CurrencyType;
};

const ProductInfo: React.FC<ProductCardPropsType> = ({ product, currency }) => {
  const { images, thumbnail } = product;
  const t = useTranslations('Product');

  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie;

      const authToken = getCookieValue(cookies || '', 'authToken');

      setIsAuthenticated(!!authToken);
    };

    checkAuth();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);
  const [cartMatch, setCartMatch] = useState<CartItem>();

  useEffect(() => {
    const cartMatch = cartItems.find(
      ({ product_id }) => product_id === product.id
    );
    if (cartMatch) {
      setCartMatch(cartMatch);
      setQuantity(cartMatch.quantity);
    }
  }, [cartItems]);

  /**
   * Choosen variation
   */
  const [currentVariation, setCurrentVariation] = useState<ProductVariation>();

  // Temporary code (whole useEffect) for assigning the current variation
  useEffect(() => {
    setCurrentVariation(product?.variations[0]);
  }, []);

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
  }

  const stockQuantity = useMemo(() => {
    if (!currentVariation?.stock_quantity && !product.stock_quantity) return 0;
    if (currentVariation?.stock_quantity)
      return currentVariation?.stock_quantity;
    if (product?.stock_quantity) return product?.stock_quantity;
    return 0;
  }, [currentVariation, product]);

  const router = useRouter();

  useEffect(() => {
    if (product) {
      console.log('product:', product);
    }
  }, [product]);

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
          <CircularProgress size={20} />
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

        <ProductPromotion time={new Date('2024-10-30T00:00:00')} />
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
        <StyledButton
          onClick={addComment}
          secondary={isAuthenticated}
          isDisabled={!isAuthenticated}
        >
          Leave a review about product
        </StyledButton>
        <DetailsAccordion summary="Descriptions">
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
