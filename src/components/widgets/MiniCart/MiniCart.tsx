import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi'
import { CreateOrderRequestType } from '@/types/services'
import { useAppDispatch, useAppSelector } from '@/store'
import checkCartConflict from '@/utils/cart/checkCartConflict'
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi'
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar'
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems'
import {
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  OnePrice,
  ProducTitle,
  ProductPrice,
  CardContent,
} from '@/components/pages/cart/CartTable/style'
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon'
import CartQuantity from '@/components/pages/cart/CartQuantity/CartQuantity'
import checkProductAvailability from '@/utils/cart/checkProductAvailability'
import { useTranslations } from 'next-intl'
import { PopupOverlay } from '@/components/global/popups/SwiperPopup/styles'
import { CartLink, MiniCartContainer } from './style'
import { FlexBox, StyledButton, Title } from '@/styles/components'
import { Skeleton } from '@mui/material'
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon'
import { OrderBarDesc } from '@/components/pages/cart/OrderBar/style'
import Notification from '@/components/global/Notification/Notification'
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange'
import { roundedPrice } from '@/utils/cart/roundedPrice'
import { MenuSkeleton } from '@/components/menus/MenuSkeleton'
import theme from '@/styles/theme'

interface MiniCartProps {
  onClose: () => void
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { code } = useAppSelector((state) => state.currencySlice)
  const { cartItems, couponCodes } = useAppSelector((state) => state.cartSlice)
  const t = useTranslations('Cart')

  const [symbol, setSymbol] = useState<string>('')
  const [hasConflict, setHasConflict] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Mutations
  const [createOrder, { data: orderItems, isLoading: isLoadingOrder }] =
    useCreateOrderMutation()

  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProducts },
  ] = useGetProductsMinimizedMutation()

  const productsSpecs = useMemo(
    () => productsSpecsData?.data?.items || [],
    [productsSpecsData]
  )

  const subtotal = useMemo(
    () => (orderItems?.line_items ? getSubtotalByLineItems(orderItems.line_items) : 0),
    [orderItems]
  )

  const handleCreateOrder = useCallback(async () => {
    const requestData = {
      line_items: cartItems,
      status: 'on-hold' as CreateOrderRequestType['status'],
      coupon_lines: couponCodes.map((code: string) => ({ code })),
      currency: code,
    }
    await createOrder(requestData)
  }, [cartItems, couponCodes, code, createOrder])

  const handleChangeQuantity = useCallback(
    (
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
      )
    },
    [cartItems, dispatch]
  )

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  // Effects
  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    handleCreateOrder()
  }, [handleCreateOrder])

  useEffect(() => {
    if (orderItems?.currency_symbol) {
      setSymbol(orderItems.currency_symbol)
    }
  }, [orderItems])

  useEffect(() => {
    getProductsMinimized(cartItems)
  }, [getProductsMinimized, cartItems])

  useEffect(() => {
    setHasConflict(checkCartConflict(cartItems, productsSpecs))
  }, [cartItems, productsSpecs])

  return (
    <PopupOverlay onClick={handleClose}>
      <MiniCartContainer isVisible={isVisible}>
        <FlexBox justifyContent="space-between" margin="0 0 10px 0">
          <FlexBox alignItems="center">
            <Title fontSize="1.5em" as="h3">
              {t('cart')}&nbsp;/&nbsp;
            </Title>
            {orderItems ? (
              <Title fontSize="1em" as="h6" lowercase>
                {orderItems.line_items.length} {t('psc')}.
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
        {!(isLoadingOrder || isLoadingProducts) && hasConflict && (
          <Notification type="warning">{t('cartConflict')}</Notification>
        )}
        {!(isLoadingOrder || isLoadingProducts) ? (
          orderItems?.line_items.map((item) => {
            const { resolveCount } = checkProductAvailability(item, productsSpecs)
            return (
              <CartCardWrapper key={item.id} marginBottom="68px" gap="16px">
                <CartImgWrapper maxHeight="140px" maxWidth="140px">
                  <CartItemImg src={item.image?.src} alt={item.name} width="50" />
                </CartImgWrapper>
                <CardContent padding="8px 0" gap="1px">
                  <ProducTitle>
                    <p>{item.name}</p>
                    <TrashIcon
                      padding="0"
                      onClick={() =>
                        handleChangeQuantity(
                          item.product_id,
                          'value',
                          item.variation_id,
                          0
                        )
                      }
                    />
                  </ProducTitle>
                  <FlexBox justifyContent="space-between" margin="0 0 16px 0">
                    <ProductPrice>
                      <p>
                        {roundedPrice(item.price)}&nbsp;{symbol}
                      </p>
                    </ProductPrice>
                    <CartQuantity
                      resolveCount={resolveCount}
                      item={item}
                      handleChangeQuantity={handleChangeQuantity}
                      inputWidth="50px"
                      inputHeight="32px"
                    />
                  </FlexBox>
                  <ProductPrice>
                    <span>{t('summary')}</span>
                    <OnePrice fontSize="1.2em">
                      {roundedPrice(item.price * item.quantity)}&nbsp;{symbol}
                    </OnePrice>
                  </ProductPrice>
                </CardContent>
              </CartCardWrapper>
            )
          })
        ) : (
          <MenuSkeleton
            elements={cartItems.length || 3}
            direction="column"
            width="100%"
            height="150px"
            gap="48px"
            color={theme.background.skeletonSecondary}
          />
        )}
        <OrderBar
          isLoadingOrder={isLoadingOrder}
          cartSum={subtotal}
          symbol={symbol}
          miniCart
        />
        {!isLoadingOrder && !isLoadingProducts && (
          <FlexBox flexDirection="column" gap="8px" margin="20px 0 0 0">
            <StyledButton height="58px" disabled={hasConflict}>
              {t('placeAnOrder')}
            </StyledButton>
            <CartLink href="/cart">
              <StyledButton secondary height="58px">
                {t('goToCart')}
              </StyledButton>
            </CartLink>
          </FlexBox>
        )}
      </MiniCartContainer>
    </PopupOverlay>
  )
}

export default MiniCart
