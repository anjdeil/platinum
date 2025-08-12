import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
import Notification from '@/components/global/Notification/Notification';
import { PopupOverlay } from '@/components/global/popups/SwiperPopup/styles';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import CartQuantity, {
  adaptItemToCartQuantity,
} from '@/components/pages/cart/CartQuantity/CartQuantity';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
// import { OrderBarDesc } from '@/components/pages/cart/OrderBar/style';
import {
  CardContent,
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  OnePrice,
  ProducTitle,
  ProductPrice,
} from '@/components/pages/cart/styles/index';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearConflictedItems } from '@/store/slices/cartSlice';
import { FlexBox, LinkWrapper, StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import getProductSlug from '@/utils/cart/getProductSlug';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { getProductPrice } from '@/utils/price/getProductPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CartLink, MiniCartContainer } from './style';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { cartItems, productsData } = useAppSelector(state => state.cartSlice);
  const t = useTranslations('Cart');
  const router = useRouter();

  const [hasConflict, setHasConflict] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { currentCurrency, currencyCode, convertCurrency, formatPrice } =
    useCurrencyConverter();

  const productsWithCartData = useMemo(() => {
    if (!productsData || !cartItems) {
      return [];
    }

    const cartItemsMap = new Map<string, (typeof cartItems)[0]>();

    cartItems.forEach(cartItem => {
      const key = cartItem.variation_id
        ? `v-${cartItem.product_id}-${cartItem.variation_id}`
        : `p-${cartItem.product_id}`;
      cartItemsMap.set(key, cartItem);
    });

    return productsData
      .map(product => {
        const isVariation = product.parent_id !== 0;
        const key = isVariation
          ? `v-${product.parent_id}-${product.id}`
          : `p-${product.id}`;

        const cartItem = cartItemsMap.get(key) || undefined;

        if (!cartItem) return undefined;

        const quantity = cartItem ? cartItem.quantity || 0 : 0;
        const { finalPrice } = getProductPrice(product.price);

        const convertedFinalPrice = convertCurrency(finalPrice || 0);
        const convertedTotalPrice = convertedFinalPrice * quantity;

        const totalPrice = finalPrice ? finalPrice * quantity : 0;

        return {
          ...product,
          finalPrice,
          convertedFinalPrice,
          quantity,
          variation: cartItem?.variation_id || 0,
          product_id: cartItem?.product_id || product.id,
          totalPrice,
          convertedTotalPrice,
        };
      })
      .filter((item): item is NonNullable<typeof item> => !!item);
  }, [productsData, cartItems, convertCurrency]);

  const totalCartPrice = useMemo(
    () =>
      productsWithCartData.reduce(
        (sum, item) => sum + item.convertedTotalPrice,
        0
      ),
    [productsWithCartData]
  );

  const handleChangeQuantity = useCallback(
    async (
      product_id: number,
      action: 'inc' | 'dec' | 'value',
      variation_id?: number,
      newQuantity?: number | boolean
    ) => {
      handleQuantityChange(
        cartItems,
        dispatch,
        product_id,
        action,
        variation_id,
        newQuantity
      );
    },
    [cartItems, dispatch]
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (productsData.length > 0 && cartItems.length > 0) {
      // remove simple products with variation_id
      const conflictedSimpleItemsToClear = cartItems.filter(item => {
        const product = productsData.find(p => p.id === item.product_id);
        return (
          product &&
          (product.parent_id === 0 || product.parent_id === null) &&
          item.variation_id
        );
      });

      if (conflictedSimpleItemsToClear.length > 0) {
        dispatch(clearConflictedItems(conflictedSimpleItemsToClear));
        return;
      }

      if (cartItems.length === productsData.length) {
        const conflicts = checkCartConflict(cartItems, productsData);
        setHasConflict(conflicts);
      }
    }
  }, [cartItems, productsData]);

  return (
    <PopupOverlay
      onClick={e => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <MiniCartContainer isVisible={isVisible}>
        <FlexBox justifyContent="space-between" margin="0 0 10px 0">
          <FlexBox alignItems="center">
            <Title fontSize="1.5em" as="h3">
              {t('cart')}&nbsp;/&nbsp;
            </Title>
            {cartItems ? (
              <Title fontSize="1em" as="h6" lowercase>
                {cartItems.length} {t('psc')}.
              </Title>
            ) : (
              <Skeleton width="30px" height="20px" />
            )}
          </FlexBox>
          <CloseIcon onClick={handleClose} />
        </FlexBox>
        {/* <OrderBarDesc textAlign="left" marginBottom="40px">
          {t('priceToDelivery', { locale: '26 zl' })}
        </OrderBarDesc> */}
        {hasConflict && productsWithCartData && productsData && (
          <Notification type="warning">{t('cartConflict')}</Notification>
        )}
        {productsWithCartData && cartItems.length == 0 && (
          <FlexBox flexDirection="column" margin="0 0 46px 0">
            <Title
              fontSize="1.5em"
              as="h3"
              marginTop="46px"
              marginBottom="16px"
            >
              {t('nothingInTheCart')}
            </Title>
            <p>{t('nothingInTheCartText')}</p>
          </FlexBox>
        )}
        {productsWithCartData || cartItems.length !== 0 ? (
          productsWithCartData?.map(item => {
            const resolveCount = item.stock_quantity;

            const slug = getProductSlug(item);

            return (
              <CartCardWrapper key={item.id} marginBottom="68px" gap="16px">
                <CartImgWrapper maxHeight="140px" maxWidth="140px">
                  <CartItemImg
                    src={item.image?.src}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                </CartImgWrapper>
                <CardContent padding="8px 0" gap="1px">
                  <ProducTitle>
                    <LinkWrapper href={`/product/${slug}`}>
                      {item?.parent_name
                        ? `${item.parent_name}${
                            item.attributes?.length
                              ? ' - ' +
                                item.attributes
                                  .map(attr => attr.option_name)
                                  .join(', ')
                              : ''
                          }`
                        : item.name}
                    </LinkWrapper>
                    <TrashIcon
                      padding="0"
                      onClick={() =>
                        handleChangeQuantity(
                          item.product_id,
                          'value',
                          item.variation,
                          0
                        )
                      }
                    />
                  </ProducTitle>
                  <FlexBox justifyContent="space-between" margin="0 0 16px 0">
                    <ProductPrice>
                      {currentCurrency ? (
                        <p>
                          {item.convertedFinalPrice &&
                            formatPrice(item.convertedFinalPrice)}
                        </p>
                      ) : (
                        <Skeleton width="50px" />
                      )}
                    </ProductPrice>
                    <CartQuantity
                      resolveCount={resolveCount}
                      item={adaptItemToCartQuantity(item)}
                      handleChangeQuantity={handleChangeQuantity}
                      inputWidth="50px"
                      inputHeight="32px"
                    />
                  </FlexBox>
                  <ProductPrice>
                    <span>{t('summary')}</span>

                    {currentCurrency ? (
                      <OnePrice fontSize="1.2em">
                        {item.convertedTotalPrice &&
                          formatPrice(item.convertedTotalPrice)}
                      </OnePrice>
                    ) : (
                      <Skeleton width="50px" />
                    )}
                  </ProductPrice>
                </CardContent>
              </CartCardWrapper>
            );
          })
        ) : (
          <MenuSkeleton
            elements={cartItems.length || 1}
            direction="column"
            width="100%"
            height="150px"
            gap="48px"
            color={theme.background.skeletonSecondary}
          />
        )}

        <OrderBar
          productsData={productsData}
          subtotal={
            currentCurrency?.rate !== undefined ? totalCartPrice : undefined
          }
          symbol={currencyCode}
          miniCart
        />

        <FlexBox flexDirection="column" gap="8px" margin="20px 0 0 0">
          <CartLink href={`/${router.locale}/cart`}>
            <StyledButton secondary height="58px">
              {t('goToCart')}
            </StyledButton>
          </CartLink>
          <CartLink href={`/${router.locale}/checkout`}>
            <StyledButton
              height="58px"
              disabled={hasConflict || productsWithCartData.length < 1}
            >
              {t('placeAnOrder')}
            </StyledButton>
          </CartLink>
        </FlexBox>
      </MiniCartContainer>
    </PopupOverlay>
  );
};

export default MiniCart;
