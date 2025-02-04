import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
import {
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  OnePrice,
  ProducTitle,
  ProductPrice,
  CardContent,
} from '@/components/pages/cart/styles/index';
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import CartQuantity, {
  adaptItemToCartQuantity,
} from '@/components/pages/cart/CartQuantity/CartQuantity';
import { useTranslations } from 'next-intl';
import { PopupOverlay } from '@/components/global/popups/SwiperPopup/styles';
import { CartLink, MiniCartContainer } from './style';
import { FlexBox, LinkWrapper, StyledButton, Title } from '@/styles/components';
import { Skeleton } from '@mui/material';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
import Notification from '@/components/global/Notification/Notification';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import theme from '@/styles/theme';
import { OrderBarDesc } from '@/components/pages/cart/OrderBar/style';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { cartItems, productsData } = useAppSelector(state => state.cartSlice);
  const t = useTranslations('Cart');

  const [hasConflict, setHasConflict] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        const price = product.price || 0;
        const totalPrice = price * quantity;

        return {
          ...product,
          quantity,
          variation: cartItem?.variation_id || 0,
          product_id: cartItem?.product_id || product.id,
          totalPrice,
        };
      })
      .filter((item): item is NonNullable<typeof item> => !!item);
  }, [productsData, cartItems]);

  const totalCartPrice = useMemo(
    () => productsWithCartData.reduce((sum, item) => sum + item.totalPrice, 0),
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
    if (productsData.length > 0 && cartItems.length === productsData.length) {
      setHasConflict(checkCartConflict(cartItems, productsData));
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
        <OrderBarDesc textAlign="left" marginBottom="40px">
          {t('priceToDelivery', { locale: '26 zl' })}
        </OrderBarDesc>
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

            return (
              <CartCardWrapper key={item.id} marginBottom="68px" gap="16px">
                <CartImgWrapper maxHeight="140px" maxWidth="140px">
                  <CartItemImg
                    src={item.image?.src}
                    alt={item.name}
                    width="50"
                  />
                </CartImgWrapper>
                <CardContent padding="8px 0" gap="1px">
                  <ProducTitle>
                    <LinkWrapper
                      href={`/product/${item?.parent_slug || item?.slug}`}
                    >
                      {item.name}
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
                      {extendedCurrency.rate ? (
                        <p>
                          {item.price &&
                            roundedPrice(item.price * extendedCurrency.rate)}
                          &nbsp;
                          {extendedCurrency.code}
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

                    {extendedCurrency.rate ? (
                      <OnePrice fontSize="1.2em">
                        {item.price &&
                          roundedPrice(item.totalPrice * extendedCurrency.rate)}
                        &nbsp;
                        {extendedCurrency.code}
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
            extendedCurrency?.rate !== undefined
              ? totalCartPrice * extendedCurrency.rate
              : undefined
          }
          symbol={extendedCurrency.code}
          miniCart
        />

        <FlexBox flexDirection="column" gap="8px" margin="20px 0 0 0">
          <CartLink href="/cart">
            <StyledButton secondary height="58px">
              {t('goToCart')}
            </StyledButton>
          </CartLink>
          <CartLink href="/checkout">
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
