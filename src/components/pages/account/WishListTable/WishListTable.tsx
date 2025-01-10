import React, { FC } from 'react';
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
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { CartItem } from '@/types/store/reducers/сartSlice';
import theme from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import {
  Circle,
  QuantityRow,
  WishlistCardAllWrapper,
  WishlistImgWrapper,
} from './style';
import TrashIcon from '@/components/global/icons/TrashIcon/TrashIcon';
import { useAppDispatch, useAppSelector } from '@/store';
import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import { useRouter } from 'next/router';
import { updateCart } from '@/store/slices/cartSlice';
import { WishListTableProps } from '@/types/components/pages/myAccount/wishlist';
import { LinkWrapper } from '@/styles/components';

const WishListTable: FC<WishListTableProps> = ({
  symbol,
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

  const checkCartMatch = (
    cartItems: CartItem[],
    product: ProductsMinimizedType
  ): boolean => {
    const { id, parent_id } = product;

    return parent_id === 0
      ? cartItems.some(({ product_id }) => product_id === id)
      : cartItems.some(
          ({ product_id, variation_id }) =>
            product_id === parent_id && variation_id === id
        );
  };

  function handleCartButtonClick(
    product: ProductsMinimizedType,
    isCartMatch: boolean
  ) {
    const { id, parent_id } = product;

    if (!isCartMatch) {
      dispatch(
        updateCart({
          product_id: parent_id === 0 ? id : parent_id,
          variation_id: parent_id === 0 ? undefined : id,
          quantity: 1,
        })
      );
    } else {
      router.push(`/${router.locale === 'en' ? '' : router.locale}/cart`);
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
              wishlist?.map(item => {
                const isCartMatch = checkCartMatch(cartItems, item);

                return (
                  <WishlistCardAllWrapper key={item.id} padding="16px">
                    <DeleteCell>
                      <TrashIcon onClick={() => handleDelete(item)} />
                    </DeleteCell>
                    <WishlistImgWrapper maxHeight="100px" maxWidth="100px">
                      <CartItemImg
                        src={item?.image.src}
                        alt={item.name}
                        width="50"
                      />
                    </WishlistImgWrapper>
                    <CardContent gap="12px">
                      <TextNameCell>
                        <LinkWrapper href={`/product/${item.slug}`}>
                          {item.name}
                        </LinkWrapper>
                      </TextNameCell>
                      <QuantityRow>
                        <Circle />
                        {item.stock_quantity}
                      </QuantityRow>
                      <OnePrice fontSize="1.1em">
                        {item.price && roundedPrice(item.price)}&nbsp;{symbol}
                      </OnePrice>
                    </CardContent>
                    <AddToBasketButton
                      active={isCartMatch}
                      onClick={() => handleCartButtonClick(item, isCartMatch)}
                    >
                      {isCartMatch
                        ? tProduct('viewCart')
                        : tProduct('addToBasket')}
                    </AddToBasketButton>
                  </WishlistCardAllWrapper>
                );
              })}
          </>
        ) : (
          <>
            {!isLoading &&
              wishlist?.map(item => {
                const isCartMatch = checkCartMatch(cartItems, item);
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
                          <LinkWrapper href={`/product/${item.slug}`}>
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
                            {item.price && roundedPrice(item.price)}&nbsp;
                            {symbol}
                          </OnePrice>
                        </ProductPrice>
                      </CardContent>
                    </CartCardWrapper>
                    <AddToBasketButton
                      active={isCartMatch}
                      onClick={() => handleCartButtonClick(item, isCartMatch)}
                    >
                      {isCartMatch
                        ? tProduct('viewCart')
                        : tProduct('addToBasket')}
                    </AddToBasketButton>
                  </CartCardAllWrapper>
                );
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
  );
};

export default WishListTable;
