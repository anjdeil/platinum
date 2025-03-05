import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
/* import { MenuSkeleton } from '@/components/menus/MenuSkeleton'; */
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
} from '@/components/pages/cart/styles/index';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
/* import theme from '@/styles/theme'; */
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { LinkWrapper } from '@/styles/components';
import { WishListTableProps } from '@/types/components/pages/myAccount/wishlist';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/сartSlice';
import { getProductPrice } from '@/utils/price/getProductPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC } from 'react';
import {
  Circle,
  QuantityRow,
  WishlistCardAllWrapper,
  WishlistImgWrapper,
} from './style';

const WishListTable: FC<WishListTableProps> = ({
  wishlist,
  isLoading,
  onDelete,
}) => {
  const tProduct = useTranslations('Product');
  const tMyAccount = useTranslations('MyAccount');
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector(state => state.cartSlice);

  const {
    isLoading: currencyLoading,
    convertCurrency,
    formatPrice,
  } = useCurrencyConverter();

  const checkCartMatch = (cartItems: CartItem[], productId: number) => {
    return cartItems.some(({ product_id }) => product_id === productId);
  };

  function handleCartButtonClick(
    product: ProductsMinimizedType,
    isCartMatch: boolean
  ) {
    if (product.parent_id !== 0) {
      router.push(
        `/${router.locale === 'en' ? '' : router.locale}/product/${
          product.parent_slug
        }`
      );
    } else {
      if (!isCartMatch) {
        dispatch(
          updateCart({
            product_id: product.id,
            quantity: 1,
          })
        );
      } else {
        router.push(`/${router.locale === 'en' ? '' : router.locale}/cart`);
      }
    }
  }

  const handleDelete = (item: ProductsMinimizedType) => {
    const { id, parent_id } = item;

    if (parent_id === 0) {
      onDelete({ product_id: id });
    } else {
      onDelete({ product_id: parent_id, variation_id: id });
    }
  };

  return (
    <CartTableWrapper>
      <>
        {!isTablet && !isMobile ? (
          <>
            {!isLoading &&
              wishlist
                ?.filter(item => item.stock_quantity !== null)
                .map(item => {
                  const isCartMatch = checkCartMatch(cartItems, item.id);
                  const { finalPrice } = getProductPrice(item.price);

                  const convertedFinalPrice = convertCurrency(finalPrice || 0);

                  const notAvaible = finalPrice === null;
                  return (
                    <WishlistCardAllWrapper key={item.id} padding="16px">
                      <DeleteCell>
                        <TrashIcon onClick={() => handleDelete(item)} />
                      </DeleteCell>
                      <WishlistImgWrapper maxHeight="100px" maxWidth="100px">
                        <CartItemImg
                          src={
                            item?.image?.src || '/assets/images/not-found.webp'
                          }
                          alt={item.name}
                          width="50"
                        />
                      </WishlistImgWrapper>
                      <CardContent gap="12px">
                        <TextNameCell>
                          <LinkWrapper
                            href={`/product/${item?.parent_slug || item?.slug}`}
                          >
                            {item.name}
                          </LinkWrapper>
                        </TextNameCell>
                        <QuantityRow>
                          <Circle />
                          {item.stock_quantity}
                        </QuantityRow>
                        <OnePrice fontSize="1.1em">
                          {!currencyLoading ? (
                            <p>
                              {finalPrice && formatPrice(convertedFinalPrice)}
                            </p>
                          ) : (
                            <Skeleton width="50px" />
                          )}
                        </OnePrice>
                      </CardContent>
                      <AddToBasketButton
                        active={isCartMatch}
                        onClick={() => handleCartButtonClick(item, isCartMatch)}
                        disabled={notAvaible || item.stock_quantity === 0}
                      >
                        {item.stock_quantity === 0
                          ? tProduct('outOfStock')
                          : item.parent_id !== 0
                          ? tProduct('chooseOptions')
                          : isCartMatch
                          ? tProduct('viewCart')
                          : notAvaible
                          ? tProduct('notAvailable')
                          : tProduct('addToBasket')}
                      </AddToBasketButton>
                    </WishlistCardAllWrapper>
                  );
                })}
          </>
        ) : (
          <>
            {!isLoading &&
              wishlist
                ?.filter(item => item.stock_quantity !== null)
                .map(item => {
                  const isCartMatch = checkCartMatch(cartItems, item.id);

                  const { finalPrice } = getProductPrice(item.price);

                  const convertedFinalPrice = convertCurrency(finalPrice || 0);

                  const notAvaible = finalPrice === null;
                  return (
                    <CartCardAllWrapper key={item.id} padding="16px">
                      <CartCardWrapper>
                        <WishlistImgWrapper>
                          <CartItemImg
                            src={item.image?.src}
                            alt={item.name}
                            width="50"
                          />
                        </WishlistImgWrapper>
                        <CardContent gap="8px" padding="0 0 4px 0">
                          <ProducTitle>
                            <LinkWrapper
                              href={`/product/${
                                item?.parent_slug || item?.slug
                              }`}
                            >
                              {item.name}
                            </LinkWrapper>
                            <TrashIcon
                              padding="0 10px 0 0"
                              onClick={() => handleDelete(item)}
                            />
                          </ProducTitle>
                          <QuantityRow>
                            <Circle />
                            {tMyAccount('availablePcs', {
                              quantity: item.stock_quantity,
                            })}
                          </QuantityRow>
                          <ProductPrice>
                            <OnePrice fontSize="1.3em">
                              {!currencyLoading ? (
                                <p>
                                  {finalPrice &&
                                    formatPrice(convertedFinalPrice)}
                                </p>
                              ) : (
                                <Skeleton width="50px" />
                              )}
                            </OnePrice>
                          </ProductPrice>
                        </CardContent>
                      </CartCardWrapper>
                      <AddToBasketButton
                        active={isCartMatch}
                        onClick={() => handleCartButtonClick(item, isCartMatch)}
                        disabled={notAvaible}
                      >
                        {item.parent_id !== 0
                          ? tProduct('chooseOptions')
                          : isCartMatch
                          ? tProduct('viewCart')
                          : notAvaible
                          ? tProduct('notAvailable')
                          : tProduct('addToBasket')}
                      </AddToBasketButton>
                    </CartCardAllWrapper>
                  );
                })}
          </>
        )}
      </>
    </CartTableWrapper>
  );
};

export default WishListTable;
