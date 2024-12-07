import React, { useEffect, useState } from 'react'
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi'
import { CreateOrderRequestType } from '@/types/services'
import { useAppDispatch, useAppSelector } from '@/store'
import checkCartConflict from '@/utils/cart/checkCartConflict'
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi'
import CartTable from '@/components/pages/cart/CartTable/CartTable'
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar'
import { Container, FlexBox, Title } from '@/styles/components'
import CartCouponBlock from '@/components/pages/cart/CartCouponBlock/CartCouponBlock'

import CartSummaryBlock from '@/components/pages/cart/CartSummaryBlock/CartSummaryBlock'
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress'
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems'
import { Overlay } from '@/components/global/popups/MobilePopup/styles'
import { PopupOverlay } from '@/components/global/popups/SwiperPopup/styles'
import {
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  OnePrice,
  ProducTitle,
  ProductPrice,
} from '@/components/pages/cart/CartTable/style'
import { CardContent } from '@mui/material'
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon'
import CartQuantity from '@/components/pages/cart/CartQuantity/CartQuantity'
import checkProductAvailability from '@/utils/cart/checkProductAvailability'
import { useTranslations } from 'next-intl'
import { useResponsive } from '@/hooks/useResponsive'
import { updateCart } from '@/store/slices/cartSlice'
import { MiniCartContainer, MiniCartHeader } from './style'

interface MiniCartProps {
  onClose: () => void
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const { code } = useAppSelector((state) => state.currencySlice)
  const status: CreateOrderRequestType['status'] = 'on-hold'
  const [symbol, setSymbol] = useState<string>('')

  const t = useTranslations('Cart')
  const dispatch = useAppDispatch()
  const { isMobile } = useResponsive()

  const roundedPrice = (price: number) => Math.round(price * 100) / 100

  // Mutations
  const [
    createOrder,
    { data: orderItems, isLoading: isLoadingOrder, error: errorOrder },
  ] = useCreateOrderMutation()
  const { cartItems, couponCodes } = useAppSelector((state) => state.cartSlice)
  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProductsMin, error: errorProductsMin },
  ] = useGetProductsMinimizedMutation()
  const productsSpecs = productsSpecsData?.data ? productsSpecsData.data.items : []
  const [cartSum, setCartSum] = useState<number>(0)

  // Order creation effect
  useEffect(() => {
    const handleCreateOrder = async () => {
      const requestData = {
        line_items: cartItems,
        status: status,
        coupon_lines: couponCodes.map((code) => ({ code })),
        currency: code,
      }
      await createOrder(requestData)
    }
    handleCreateOrder()
  }, [createOrder, cartItems, couponCodes, code])

  useEffect(() => {
    if (orderItems?.currency_symbol) {
      setSymbol(orderItems.currency_symbol)
    } else {
      setSymbol('')
    }
  }, [orderItems])

  // Fetch product specs
  useEffect(() => {
    getProductsMinimized(cartItems)
  }, [getProductsMinimized, cartItems])

  // Conflict detection
  const [hasConflict, setHasConflict] = useState(false)

  useEffect(() => {
    if (productsSpecs) {
      setHasConflict(checkCartConflict(cartItems, productsSpecs))
    }
  }, [cartItems, productsSpecs])

  const subtotal = orderItems?.line_items
    ? getSubtotalByLineItems(orderItems.line_items)
    : 0

  const subtotalQuantity = orderItems?.line_items
    ? getSubtotalByLineItems(orderItems.line_items)
    : 0

  const handleChangeQuantity = (
    product_id: number,
    action: 'inc' | 'dec' | 'value',
    variation_id?: number,
    newQuantity?: number | boolean
  ) => {
    const updatedItem = cartItems.find(
      (item) =>
        item.product_id === product_id &&
        (!variation_id || item.variation_id === variation_id)
    )

    if (updatedItem) {
      let quantityToUpdate = updatedItem.quantity

      switch (action) {
        case 'inc':
          quantityToUpdate = updatedItem.quantity + 1
          break
        case 'dec':
          quantityToUpdate = updatedItem.quantity - 1
          break
        case 'value':
          if (newQuantity !== undefined && !Number.isNaN(newQuantity)) {
            quantityToUpdate = newQuantity as number
          }
          break
        default:
          return
      }

      if (quantityToUpdate >= 0) {
        dispatch(
          updateCart({
            product_id,
            variation_id,
            quantity: quantityToUpdate,
          })
        )
      }
    }
  }

  return (
    <PopupOverlay>
      <MiniCartContainer>
        <FlexBox justifyContent="space-between">
          <FlexBox>
            <Title as="h3">Корзина /</Title>
            <p> {orderItems && orderItems.line_items.length}</p>
          </FlexBox>
          <CloseIcon onClick={onClose} />
        </FlexBox>
        <div>доставка</div>
        {!(isLoadingOrder || isLoadingProductsMin) &&
          orderItems?.line_items.map((item) => {
            const { resolveCount, isAvailable } = checkProductAvailability(
              item,
              productsSpecs
            )

            return (
              <CartCardWrapper>
                <CartImgWrapper>
                  <CartItemImg src={item.image?.src} alt={item.name} width="50" />
                </CartImgWrapper>
                <CardContent>
                  <ProducTitle>
                    <p>{item.name}</p>
                    <CloseIcon
                      padding="8px"
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
                  <ProductPrice>
                    <p>
                      {roundedPrice(item.price)}&nbsp;{symbol}
                    </p>
                  </ProductPrice>
                  <CartQuantity
                    resolveCount={resolveCount}
                    item={item}
                    handleChangeQuantity={handleChangeQuantity}
                  />
                  <ProductPrice>
                    <span>SUMMARY</span>
                    <OnePrice>
                      {roundedPrice(item.price * item.quantity)}&nbsp;{symbol}
                    </OnePrice>
                  </ProductPrice>
                </CardContent>
              </CartCardWrapper>
            )
          })}
        <OrderBar
          isLoadingOrder={isLoadingOrder}
          cartSum={subtotal}
          symbol={symbol}
        ></OrderBar>
        перейти в корзину оформить заказ
      </MiniCartContainer>
    </PopupOverlay>
  )
}

export default MiniCart
