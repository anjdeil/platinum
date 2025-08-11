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
import { popupToggle } from '@/store/slices/PopupSlice';
import { LinkWrapper, StyledButton } from '@/styles/components';
import { WishListTableProps } from '@/types/components/pages/myAccount/wishlist';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/сartSlice';
import getProductSlug from '@/utils/cart/getProductSlug';
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

  const checkCartMatch = (
    cartItems: CartItem[],
    productId: number,
    parentId: number
  ) => {
    if (parentId === 0) {
      return cartItems.some(({ product_id }) => product_id === productId);
    } else {
      return cartItems.some(({ variation_id }) => variation_id === productId);
    }
  };

  function handleCartButtonClick(
    product: ProductsMinimizedType,
    isCartMatch: boolean
  ) {
    const isVariation = product.parent_id !== 0;
    const isVariableParent =
      product.parent_id === 0 && product.attributes.length > 0;

    if (isVariableParent) {
      router.push(
        `/${
          router.locale === router.defaultLocale ? '' : router.locale
        }/product/${product.slug}`
      );
      return;
    }

    if (!isCartMatch) {
      dispatch(
        updateCart(
          isVariation
            ? {
                product_id: product.parent_id,
                variation_id: product.id,
                quantity: 1,
              }
            : {
                product_id: product.id,
                quantity: 1,
              }
        )
      );
      if (!isMobile) {
        dispatch(popupToggle({ popupType: 'mini-cart' }));
      }
    } else {
      router.push(
        `/${router.locale === router.defaultLocale ? '' : router.locale}/cart`
      );
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

  function handleNotifyButtonClick(item: ProductsMinimizedType) {
    const { id, parent_id } = item;

    dispatch(
      popupToggle({
        popupType: 'notify',
        data: { productId: parent_id, variationId: id },
      })
    );
  }

  return (
    <CartTableWrapper>
      <>
        {!isTablet && !isMobile ? (
          <>
            {!isLoading &&
              wishlist &&
              wishlist?.length > 0 &&
              wishlist?.map(item => {
                const isCartMatch = checkCartMatch(
                  cartItems,
                  item.id,
                  item.parent_id
                );
                const { finalPrice } = getProductPrice(item.price);

                const convertedFinalPrice = convertCurrency(finalPrice || 0);

                const slug = getProductSlug(item);
                const notAvailable = finalPrice === null;

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
                        height="50"
                      />
                    </WishlistImgWrapper>
                    <CardContent gap="12px">
                      <TextNameCell>
                        <LinkWrapper href={`/product/${slug}`}>
                          {item?.parent_name
                            ? `${item.parent_name}${
                                item.attributes?.length
                                  ? ' - ' +
                                    item.attributes
                                      .map(attr => attr.option_name)
                                      .join(', ')
                                  : ''
                              }`
                            : item.name}
                        </LinkWrapper>
                      </TextNameCell>
                      <QuantityRow>
                        <Circle notAvailable={item.stock_quantity === 0} />
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

                    {notAvailable || item.stock_quantity === 0 ? (
                      <StyledButton
                        notify={true}
                        height="56px"
                        onClick={() => handleNotifyButtonClick(item)}
                      >
                        {tProduct('notifyWhenAvailable')}
                      </StyledButton>
                    ) : (
                      <AddToBasketButton
                        active={isCartMatch}
                        onClick={() => handleCartButtonClick(item, isCartMatch)}
                      >
                        {isCartMatch
                          ? tProduct('viewCart')
                          : tProduct('addToBasket')}
                      </AddToBasketButton>
                    )}
                  </WishlistCardAllWrapper>
                );
              })}
          </>
        ) : (
          <>
            {!isLoading &&
              wishlist &&
              wishlist?.length > 0 &&
              wishlist?.map(item => {
                const isCartMatch = checkCartMatch(
                  cartItems,
                  item.id,
                  item.parent_id
                );

                const { finalPrice } = getProductPrice(item.price);

                const convertedFinalPrice = convertCurrency(finalPrice || 0);
                const slug = getProductSlug(item);
                const notAvailable = finalPrice === null;

                return (
                  <CartCardAllWrapper key={item.id} padding="16px">
                    <CartCardWrapper>
                      <WishlistImgWrapper>
                        <CartItemImg
                          src={item.image?.src}
                          alt={item.name}
                          width="50"
                          height="50"
                        />
                      </WishlistImgWrapper>
                      <CardContent gap="8px" padding="0 0 4px 0">
                        <ProducTitle>
                          <LinkWrapper href={`/product/${slug}`}>
                            {item?.parent_name
                              ? `${item.parent_name}${
                                  item.attributes?.length
                                    ? ' - ' +
                                      item.attributes
                                        .map(attr => attr.option_name)
                                        .join(', ')
                                    : ''
                                }`
                              : item.name}
                          </LinkWrapper>
                          <TrashIcon
                            padding="0 10px 0 0"
                            onClick={() => handleDelete(item)}
                          />
                        </ProducTitle>
                        <QuantityRow>
                          <Circle notAvailable={item.stock_quantity === 0} />
                          {tMyAccount('availablePcs', {
                            quantity: item.stock_quantity,
                          })}
                        </QuantityRow>
                        <ProductPrice>
                          <OnePrice fontSize="1.3em">
                            {!currencyLoading ? (
                              <p>
                                {finalPrice && formatPrice(convertedFinalPrice)}
                              </p>
                            ) : (
                              <Skeleton width="50px" />
                            )}
                          </OnePrice>
                        </ProductPrice>
                      </CardContent>
                    </CartCardWrapper>
                    {notAvailable || item.stock_quantity === 0 ? (
                      <StyledButton
                        notify={true}
                        height="56px"
                        onClick={() => handleNotifyButtonClick(item)}
                      >
                        {tProduct('notifyWhenAvailable')}
                      </StyledButton>
                    ) : (
                      <AddToBasketButton
                        active={isCartMatch}
                        onClick={() => handleCartButtonClick(item, isCartMatch)}
                      >
                        {isCartMatch
                          ? tProduct('viewCart')
                          : tProduct('addToBasket')}
                      </AddToBasketButton>
                    )}
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
