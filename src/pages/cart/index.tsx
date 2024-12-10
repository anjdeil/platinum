import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi'
import { CreateOrderRequestType } from '@/types/services'
import { useAppDispatch, useAppSelector } from '@/store'
import checkCartConflict from '@/utils/cart/checkCartConflict'
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi'
import CartTable from '@/components/pages/cart/CartTable/CartTable'
import OrderBar from '@/components/pages/cart/OrderBar/OrderBar'
import { Container } from '@/styles/components'
import CartCouponBlock from '@/components/pages/cart/CartCouponBlock/CartCouponBlock'
import { CartPageWrapper } from './style'
import CartSummaryBlock from '@/components/pages/cart/CartSummaryBlock/CartSummaryBlock'
import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress'
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems'
import { roundedPrice } from '@/utils/cart/roundedPrice'
import { handleQuantityChange } from '@/utils/cart/handleQuantityChange'

const CartPage: React.FC = () => {
  const { code } = useAppSelector((state) => state.currencySlice)
  const status: CreateOrderRequestType['status'] = 'on-hold'
  const [symbol, setSymbol] = useState<string>('')
  const dispatch = useAppDispatch()
  const [loadingItems, setLoadingItems] = useState<number[]>([])
  const [preLoadingItem, setPreLoadingItem] = useState<number>()

  // Mutations
  const [createOrder, { data: orderItems, isLoading: isLoadingOrder }] =
    useCreateOrderMutation()
  const { cartItems, couponCodes } = useAppSelector((state) => state.cartSlice)
  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProductsMin, error: errorProductsMin },
  ] = useGetProductsMinimizedMutation()

  const handleCreateOrder = async () => {
    const requestData = {
      line_items: cartItems,
      status: 'on-hold' as CreateOrderRequestType['status'],
      coupon_lines: couponCodes.map((code: string) => ({ code })),
      currency: code,
    }
    if (preLoadingItem) {
      setLoadingItems((prev) => [...prev, preLoadingItem])
    }
    try {
      await createOrder(requestData)
    } finally {
      setLoadingItems((prev) => prev.filter((id) => id !== preLoadingItem))
    }
  }

  useEffect(() => {
    const createOrderEffect = async () => {
      await handleCreateOrder()
    }

    createOrderEffect()
  }, [cartItems, couponCodes, code])

  const [cachedOrderItems, setCachedOrderItems] = useState(orderItems)

  useEffect(() => {
    if (cartItems.length > 0) {
      getProductsMinimized(cartItems)
    }
  }, [getProductsMinimized, cartItems.length])

  useEffect(() => {
    if (orderItems?.currency_symbol) {
      setSymbol(orderItems.currency_symbol)
    } else {
      setSymbol('')
    }
  }, [orderItems])

  const handleChangeQuantity = useCallback(
    async (
      product_id: number,
      action: 'inc' | 'dec' | 'value',
      variation_id?: number,
      newQuantity?: number | boolean
    ) => {
      setPreLoadingItem(product_id)
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

  // Conflict detection
  const [hasConflict, setHasConflict] = useState(false)

  const productsSpecs = useMemo(
    () => productsSpecsData?.data?.items || [],
    [productsSpecsData]
  )

  const subtotal = useMemo(
    () => (orderItems?.line_items ? getSubtotalByLineItems(orderItems.line_items) : 0),
    [orderItems]
  )
  useEffect(() => {
    if (orderItems) {
      setCachedOrderItems(orderItems)
    }
  }, [orderItems])
  const currentOrderItems = orderItems ?? cachedOrderItems

  return (
    <Container>
      <OrderProgress />
      <CartPageWrapper>
        <div>
          <CartTable
            symbol={symbol}
            cartItems={cartItems}
            orderItems={currentOrderItems}
            isLoadingOrder={isLoadingOrder}
            isLoadingProductsMin={isLoadingProductsMin}
            productsSpecs={productsSpecs}
            roundedPrice={roundedPrice}
            hasConflict={hasConflict}
            handleChangeQuantity={handleChangeQuantity}
            loadingItems={loadingItems}
          />
          <OrderBar
            miniCart={false}
            isLoadingOrder={isLoadingOrder}
            cartSum={subtotal}
            symbol={symbol}
          />
        </div>
        <CartCouponBlock symbol={symbol} />
        <CartSummaryBlock symbol={symbol} order={orderItems} isLoading={isLoadingOrder} />
      </CartPageWrapper>
    </Container>
  )
}

export default CartPage
