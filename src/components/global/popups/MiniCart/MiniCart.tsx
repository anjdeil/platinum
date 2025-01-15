import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
import Notification from '@/components/global/Notification/Notification';
import { PopupOverlay } from '@/components/global/popups/SwiperPopup/styles';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import CartQuantity, {
  adaptItemToCartQuantity,
} from '@/components/pages/cart/CartQuantity/CartQuantity';
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar';
import { OrderBarDesc } from '@/components/pages/cart/OrderBar/style';
import {
  CardContent,
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  OnePrice,
  ProducTitle,
  ProductPrice,
} from '@/components/pages/cart/styles/index';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetCurrenciesQuery,
  useGetProductsMinimizedMutation,
} from '@/store/rtk-queries/wpCustomApi';
import { FlexBox, StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CartLink, MiniCartContainer } from './style';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const t = useTranslations('Cart');

  const [hasConflict, setHasConflict] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Currency
  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const currentCurrency =
    currencies && !isCurrenciesLoading
      ? currencies?.data?.items.find(
          currency => currency.code === selectedCurrency.name
        )
      : undefined;

  // FETCH
  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProducts, isSuccess },
  ] = useGetProductsMinimizedMutation();

  const productsWithCartData = useMemo(() => {
    if (!productsSpecsData?.data?.items || !cartItems) {
      return [];
    }
    const cartItemsMap = cartItems.reduce((acc, cartItem) => {
      acc[cartItem.product_id] = cartItem;
      return acc;
    }, {} as Record<number, (typeof cartItems)[0]>);

    return productsSpecsData.data.items.map(product => {
      const cartItem = cartItemsMap[product.id] || {};
      const quantity = cartItem.quantity || 0;
      const price = product.price || 0;
      const totalPrice = price * (currentCurrency?.rate || 1) * quantity;

      return {
        ...product,
        quantity,
        variation: cartItem.variation_id || undefined,
        totalPrice,
      };
    });
  }, [productsSpecsData, cartItems]);

  const productsSpecs = useMemo(
    () => productsSpecsData?.data?.items || [],
    [productsSpecsData]
  );
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
    getProductsMinimized(cartItems);
  }, [getProductsMinimized, cartItems.length]);

  useEffect(() => {
    if (productsSpecs.length > 0) {
      setHasConflict(checkCartConflict(cartItems, productsSpecs));
    }
  }, [cartItems, productsSpecs]);

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
        {!isLoadingProducts && hasConflict && productsWithCartData && (
          <Notification type="warning">{t('cartConflict')}</Notification>
        )}
        {productsWithCartData &&
          !isLoadingProducts &&
          cartItems.length == 0 && (
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
        {productsWithCartData && !isLoadingProducts ? (
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
                    <p>{item.name}</p>
                    <TrashIcon
                      padding="0"
                      onClick={() =>
                        handleChangeQuantity(
                          item.id,
                          'value',
                          item.variation,
                          0
                        )
                      }
                    />
                  </ProducTitle>
                  <FlexBox justifyContent="space-between" margin="0 0 16px 0">
                    <ProductPrice>
                      <p>
                        {item.price && roundedPrice(item.price)}&nbsp;
                        {selectedCurrency.code}
                      </p>
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
                    <OnePrice fontSize="1.2em">
                      {roundedPrice(item.totalPrice)}&nbsp;
                      {selectedCurrency.code}
                    </OnePrice>
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
          isLoadingOrder={isLoadingProducts}
          cartSum={totalCartPrice}
          symbol={selectedCurrency.code}
          miniCart
        />

        <FlexBox flexDirection="column" gap="8px" margin="20px 0 0 0">
          <CartLink href="/cart">
            <StyledButton secondary height="58px">
              {t('goToCart')}
            </StyledButton>
          </CartLink>
          <StyledButton
            height="58px"
            disabled={
              hasConflict ||
              isLoadingProducts ||
              productsWithCartData.length < 1
            }
          >
            {t('placeAnOrder')}
          </StyledButton>
        </FlexBox>
      </MiniCartContainer>
    </PopupOverlay>
  );
};

export default MiniCart;
