import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import AccountLayout from '@/components/pages/account/AccountLayout'
import Notification from '@/components/global/Notification/Notification'
import WishListTable from '@/components/pages/account/WishListTable/WishListTable'
import {
  useFetchUserUpdateByIdMutation,
  useLazyFetchUserDataQuery,
} from '@/store/rtk-queries/wpApi'
import { WishlistItem } from '@/types/store/reducers/сartSlice'
import { useAppSelector } from '@/store'
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi'
import { ProductsMinimizedType } from '@/types/components/shop/product/products'
import { useTranslations } from 'next-intl'

/* export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const customer = await checkUserTokenInServerSide('/my-account', context, 'userToken');
    if (!customer || !customer.id) return { redirect: { destination: "/my-account/login", permanent: false, } };

    return {
        props: {}
    }
}
 */
function Wishlist() {
  const [cookie] = useCookies(['userToken'])
  const { symbol } = useAppSelector((state) => state.currencySlice)
  const router = useRouter()

  const tMyAccount = useTranslations('MyAccount')

  // query
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

  const [wishListProducts, setWishListProducts] = useState<ProductsMinimizedType[]>()

  useEffect(() => {
    fetchUserData({ id: '1' })

    /* if ("userToken" in cookie) {
            fetchUserData(cookie.userToken);
        } */
  }, [/* cookie, */ fetchUserData])

  useEffect(() => {
    if (wishlist.length > 0) {
      getProductsMinimized(wishlist)
    }
  }, [userData, getProductsMinimized])

  useEffect(() => {
    if (productsSpecsData?.data.items) {
      setWishListProducts(productsSpecsData?.data.items)
    }
  }, [productsSpecsData])

  function handleDelete({ product_id, variation_id }: WishlistItem) {
    /*  if (!userData?.meta?.wishlist || !cookie?.userToken) {
             router.push('/my-account/login');
             return;
         } */

    const userWishlist: WishlistItem[] = userData.meta.wishlist || []

    const index = userWishlist.findIndex(
      (item: WishlistItem) =>
        item.product_id === product_id &&
        (!variation_id || item.variation_id === variation_id)
    )

    let updatedWishlist = null

    if (index >= 0) {
      updatedWishlist = userWishlist.filter(
        (_: WishlistItem, index2: number) => index2 !== index
      )
    } else {
      updatedWishlist = [
        ...userWishlist,
        {
          product_id: product_id,
          ...(variation_id && { variation_id: variation_id }),
        },
      ]
    }

    const userUpdateRequestBody = {
      meta: {
        wishlist: updatedWishlist,
      },
    }

    if (userData?.id) {
      fetchUserUpdateById({
        id: userData.id,
        body: userUpdateRequestBody,
      })
    }
  }

  let isLoading = isUserDataLoading || isUserUpdating || isUserFetching

  return (
    <AccountLayout title={tMyAccount('wishlist')}>
      <WishListTable
        symbol={symbol}
        wishlist={wishListProducts}
        wishlistMinElements={wishlist}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </AccountLayout>
  )
}

export default Wishlist
/*  useEffect(() => {
    fetchUserUpdateById({
      id: '1',
      body: { meta: { wishlist: [{ product_id: 24707 }, { product_id: 24777 }] } },
    })
  }, []) */
