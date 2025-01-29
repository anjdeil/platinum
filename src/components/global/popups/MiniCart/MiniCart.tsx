import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import checkCartConflict from '@/utils/cart/checkCartConflict';
import {
  useGetCurrenciesQuery,
  useGetProductsMinimizedMutation,
} from '@/store/rtk-queries/wpCustomApi';
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
import { CircularProgress, Skeleton } from '@mui/material';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
import { OrderBarDesc } from '@/components/pages/cart/OrderBar/style';
import Notification from '@/components/global/Notification/Notification';
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import theme from '@/styles/theme';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  /*  const { code: symbol } = useAppSelector(state => state.currencySlice); */
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const t = useTranslations('Cart');

  const [hasConflict, setHasConflict] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // FETCH

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

  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProducts },
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
      const cartItem =
        product.parent_id === 0
          ? cartItemsMap[product.id]
          : cartItemsMap[product.parent_id] || {};

      const quantity = cartItem ? cartItem.quantity || 0 : 0;
      const price = product.price || 0;
      const totalPrice = price * quantity;

      return {
        ...product,
        quantity,
        ...(cartItem?.variation_id && { variation: cartItem.variation_id }),
        product_id: cartItem?.product_id,
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
                        <CircularProgress size={20} />
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
                      <CircularProgress size={20} />
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
          isLoadingOrder={isLoadingProducts}
          cartSum={
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
