import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import AccountLayout from '@/components/pages/account/AccountLayout'
import WishListTable from '@/components/pages/account/WishListTable/WishListTable'
import {
  useFetchUserUpdateByIdMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi'
import { useAppSelector } from '@/store'
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi'
import { ProductsMinimizedType } from '@/types/components/shop/product/products'
import { useTranslations } from 'next-intl'
import { WishlistItem } from '@/types/store/rtk-queries/wpApi'
import { StyledButton, Title } from '@/styles/components'
import { CartLink } from '@/components/global/popups/MiniCart/style'
import Notification from '@/components/global/Notification/Notification'

function Wishlist() {
  const [cookie] = useCookies(['userToken'])
  const { code: symbol } = useAppSelector((state) => state.currencySlice)
  const router = useRouter()

  const tMyAccount = useTranslations('MyAccount')
  const tCart = useTranslations('Cart')

  const [
    fetchUserData,
    { data: userData, isLoading: isUserDataLoading, isFetching: isUserFetching },
  ] = useLazyFetchUserDataQuery()
  const [fetchUserUpdateById, { isLoading: isUserUpdating }] =
    useFetchUserUpdateByIdMutation()
  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isLoadingProductsMin, error: errorProductsMin },
  ] = useGetProductsMinimizedMutation()

  const wishlist: WishlistItem[] = userData?.meta?.wishlist || []

  const [wishListProducts, setWishListProducts] = useState<ProductsMinimizedType[]>([])
  const [isWishlistUpdated, setIsWishlistUpdated] = useState(false)
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true)
  useEffect(() => {
    fetchUserData({ id: 1 })
  }, [fetchUserData])

  useEffect(() => {
    if (wishlist.length > 0) {
      setIsLoadingWishlist(true)
      getProductsMinimized(wishlist)
    } else {
      setWishListProducts([])
      setIsLoadingWishlist(false)
    }
  }, [wishlist, getProductsMinimized])

  useEffect(() => {
    if (productsSpecsData?.data.items) {
      setWishListProducts(productsSpecsData?.data.items)
      setIsLoadingWishlist(false)
    }
  }, [productsSpecsData])

  function handleDelete({ product_id, variation_id }: WishlistItem) {
    const userWishlist: WishlistItem[] = userData?.meta?.wishlist || []

    const index = userWishlist.findIndex(
      (item: WishlistItem) =>
        item.product_id === product_id &&
        (!variation_id || item.variation_id === variation_id)
    )

    const updatedWishlist =
      index >= 0
        ? userWishlist.filter((_, index2: number) => index2 !== index)
        : userWishlist

    const userUpdateRequestBody = {
      meta: {
        wishlist: updatedWishlist,
      },
    }

    if (userData?.id) {
      fetchUserUpdateById({
        id: userData.id,
        body: userUpdateRequestBody,
      }).then(() => {
        fetchUserData({ id: userData.id })
        setIsWishlistUpdated(true)
        setIsLoadingWishlist(true)
      })
    }
  }

  let isLoading =
    isUserDataLoading ||
    isUserUpdating ||
    isUserFetching ||
    isLoadingProductsMin ||
    isLoadingWishlist

  return (
    <AccountLayout title={tMyAccount('wishlist')}>
      {!!(!isLoading && wishListProducts && wishListProducts.length === 0) && (
        <>
          <Notification type="info">{tMyAccount('nothingInTheWishlist')}</Notification>
          <CartLink href="/">
            <StyledButton height="58px" width="310px" minWidthMobile="100%">
              {tCart('goToShop')}
            </StyledButton>
          </CartLink>
        </>
      )}
      {!isLoadingWishlist && (
        <WishListTable
          symbol={symbol}
          wishlist={wishListProducts}
          wishlistMinElements={wishlist}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      )}
    </AccountLayout>
  )
}

export default Wishlist
