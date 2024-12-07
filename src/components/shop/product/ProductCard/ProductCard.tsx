import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton'
import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton'
import Rating from '@/components/global/Rating/Rating'
import { useAppDispatch, useAppSelector } from '@/store'
import { updateCart } from '@/store/slices/cartSlice'
import { ProductCardPropsType } from '@/types/components/shop'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProductBadge from '../ProductBadge/ProductBadge'
import ProductBadgeWrapper from '../ProductBadgeWrapper/ProductBadgeWrapper'
import {
  PriceWrapper,
  ProductImageWrapper,
  ProductMaxPrice,
  ProductPrice,
  ProductWrapper,
  StyledLink,
  StyledProductCard,
  TitleWrapper,
} from './styles'
import { WishlistItem } from '@/types/store/reducers/сartSlice'

const ProductCard: React.FC<ProductCardPropsType> = ({
  product,
  handleDisire,
  wishlist,
  isLoading,
}) => {
  const t = useTranslations('Product')

  const router = useRouter()

  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector((state) => state.cartSlice)

  const [isCartMatch, setIsCartMatch] = useState(false)

  useEffect(() => {
    const cartMatchIndex = cartItems.findIndex(
      ({ product_id }) => product_id === product.id
    )
    if (cartMatchIndex >= 0) setIsCartMatch(true)
  }, [cartItems])

  function handleCartButtonClick() {
    if (product?.type === 'variable') {
      router.push(
        `/${router.locale === 'en' ? '' : router.locale}/product/${product.slug}`
      )
    }

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

  const checkDesired = () =>
    Boolean(
      wishlist?.find(
        (item: WishlistItem) => item.product_id === product.id /* &&
          (!choosenVariation || item.variation_id === choosenVariation.id) */
      )
    )

  return (
    <StyledProductCard>
      <ProductWrapper>
        <ProductImageWrapper>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.thumbnail?.src || '/assets/images/not-found.webp'}
              fill
              style={{ objectFit: 'contain' }}
              alt="image"
              unoptimized={true}
            />
          </Link>
        </ProductImageWrapper>
        <Rating rating={product.average_rating} />
        <TitleWrapper>
          <StyledLink href={`/product/${product.slug}`}>{product.name}</StyledLink>
          <PriceWrapper>
            {product.min_price !== product.max_price && (
              <ProductMaxPrice>{product.max_price} zl</ProductMaxPrice>
            )}
            <ProductPrice>{product.min_price} zl</ProductPrice>
          </PriceWrapper>
        </TitleWrapper>
        <ProductBadgeWrapper>
          {product.min_price !== product.max_price && <ProductBadge type="sale" />}
          <FavoriteButton
            onClick={() => handleDisire(product.id, undefined)}
            marginLeft="auto"
            active={checkDesired()}
            isLoading={isLoading}
          />
        </ProductBadgeWrapper>
      </ProductWrapper>
      <>
        <AddToBasketButton onClick={handleCartButtonClick}>
          {product?.type !== 'variable'
            ? isCartMatch
              ? t('viewCart')
              : t('addToBasket')
            : t('chooseOptions')}
        </AddToBasketButton>
      </>
    </StyledProductCard>
  )
}

export default ProductCard
