import React, { FC } from 'react'
import {
  CardContent,
  CartCardAllWrapper,
  CartCardWrapper,
  CartItemImg,
  CartTableWrapper,
  DeleteCell,
  OnePrice,
  ProducTitle,
  ProductPrice,
  TextNameCell,
} from '@/components/pages/cart/styles/index'
import { useResponsive } from '@/hooks/useResponsive'
import { MenuSkeleton } from '@/components/menus/MenuSkeleton'
import { CartItem } from '@/types/store/reducers/сartSlice'
import theme from '@/styles/theme'
import { useTranslations } from 'next-intl'
import { ProductsMinimizedType } from '@/types/components/shop/product/products'
import { roundedPrice } from '@/utils/cart/roundedPrice'
import { Circle, QuantityRow, WishlistCardAllWrapper, WishlistImgWrapper } from './style'
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon'
import { useAppDispatch, useAppSelector } from '@/store'
import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton'
import { useRouter } from 'next/router'
import { updateCart } from '@/store/slices/cartSlice'
import { WishListTableProps } from '@/types/components/pages/myAccount/wishlist'

const WishListTable: FC<WishListTableProps> = ({
  symbol,
  wishlist,
  isLoading,
  onDelete,
}) => {
  const tProduct = useTranslations('Product')
  const tMyAccount = useTranslations('MyAccount')
  const { isMobile, isTablet } = useResponsive()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { cartItems } = useAppSelector((state) => state.cartSlice)

  const checkCartMatch = (cartItems: CartItem[], productId: number) => {
    return cartItems.some(({ product_id }) => product_id === productId)
  }

  function handleCartButtonClick(product: ProductsMinimizedType, isCartMatch: boolean) {
    if (product.parent_id !== 0) {
      router.push(
        `/${router.locale === 'en' ? '' : router.locale}/product/${product.slug}`
      )
    } else {
      if (!isCartMatch) {
        dispatch(
          updateCart({
            product_id: product.id,
            quantity: 1,
          })
        )
      } else {
        router.push(`/${router.locale === 'en' ? '' : router.locale}/cart`)
      }
    }
  }

  return (
    <CartTableWrapper>
      <>
        {!isTablet && !isMobile ? (
          <>
            {!isLoading &&
              wishlist?.map((item) => {
                const isCartMatch = checkCartMatch(cartItems, item.id)

                return (
                  <WishlistCardAllWrapper key={item.id} padding="16px">
                    <DeleteCell>
                      <TrashIcon onClick={() => onDelete({ product_id: item.id })} />
                    </DeleteCell>
                    <WishlistImgWrapper maxHeight="100px" maxWidth="100px">
                      <CartItemImg src={item?.image.src} alt={item.name} width="50" />
                    </WishlistImgWrapper>
                    <CardContent gap="12px">
                      <TextNameCell>{item.name}</TextNameCell>
                      <QuantityRow>
                        <Circle />
                        {tMyAccount('availablePcs', { quantity: item.stock_quantity })}
                      </QuantityRow>
                      <OnePrice fontSize="1.1em">
                        {item.price && roundedPrice(item.price)}&nbsp;{symbol}
                      </OnePrice>
                    </CardContent>
                    <AddToBasketButton
                      active={isCartMatch}
                      onClick={() => handleCartButtonClick(item, isCartMatch)}
                    >
                      {item.parent_id !== 0
                        ? tProduct('chooseOptions')
                        : isCartMatch
                        ? tProduct('viewCart')
                        : tProduct('addToBasket')}
                    </AddToBasketButton>
                  </WishlistCardAllWrapper>
                )
              })}
          </>
        ) : (
          <>
            {!isLoading &&
              wishlist?.map((item) => {
                const isCartMatch = checkCartMatch(cartItems, item.id)
                return (
                  <CartCardAllWrapper key={item.id} padding="16px">
                    <CartCardWrapper>
                      <WishlistImgWrapper>
                        <CartItemImg src={item.image?.src} alt={item.name} width="50" />
                      </WishlistImgWrapper>
                      <CardContent gap="8px" padding="0 0 4px 0">
                        <ProducTitle>
                          <p>{item.name}</p>
                          <TrashIcon
                            padding="0 10px 0 0"
                            onClick={() => onDelete({ product_id: item.id })}
                          />
                        </ProducTitle>
                        <QuantityRow>
                          <Circle />
                          {tMyAccount('availablePcs', { quantity: item.stock_quantity })}
                        </QuantityRow>
                        <ProductPrice>
                          <OnePrice fontSize="1.3em">
                            {item.price && roundedPrice(item.price)}&nbsp;{symbol}
                          </OnePrice>
                        </ProductPrice>
                      </CardContent>
                    </CartCardWrapper>
                    <AddToBasketButton
                      active={isCartMatch}
                      onClick={() => handleCartButtonClick(item, isCartMatch)}
                    >
                      {item.parent_id !== 0
                        ? tProduct('chooseOptions')
                        : isCartMatch
                        ? tProduct('viewCart')
                        : tProduct('addToBasket')}
                    </AddToBasketButton>
                  </CartCardAllWrapper>
                )
              })}
          </>
        )}

        {isLoading && (
          <MenuSkeleton
            elements={1}
            direction="column"
            width="100%"
            height={!isTablet && !isMobile ? '72px' : '223px'}
            gap="5px"
            color={theme.background.skeletonSecondary}
          />
        )}
      </>
    </CartTableWrapper>
  )
}

export default WishListTable
