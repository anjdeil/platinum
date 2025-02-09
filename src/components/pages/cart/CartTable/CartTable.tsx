import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import DeleteIcon from '@/components/global/icons/DeleteIcon/DeleteIcon';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useResponsive } from '@/hooks/useResponsive';
import { FlexBox, LinkWrapper, StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { CartTableProps } from '@/types/pages/cart';
import checkProductAvailability from '@/utils/cart/checkProductAvailability';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import CartProductWarning from '../CartProductWarning/CartProductWarning';
import CartQuantity from '../CartQuantity/CartQuantity';
import {
  CardContent,
  CartCardAllWrapper,
  CartCardWrapper,
  CartImgWrapper,
  CartItemImg,
  CartTableWrapper,
  DeleteCell,
  OnePrice,
  ProducTitle,
  ProductPrice,
  TextNameCell,
} from '../styles';
import {
  CartTableGrid,
  GridHeader,
  GridRow,
  RowWrapper,
  TextCell,
  TextCellHeader,
} from './style';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { lineOrderItems } from '@/types/store/reducers/сartSlice';
import { useAppDispatch } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';

const CartTable: FC<CartTableProps> = ({
  symbol,
  order,
  isLoadingOrder,
  firstLoad,
  productsSpecs,
  roundedPrice,
  hasConflict,
  cartItems,
  innercartItems,
  handleChangeQuantity,
  handleDeleteItem,
}) => {
  const t = useTranslations('Cart');
  const { isMobile } = useResponsive();

  const dispatch = useAppDispatch();

  const findProductSpec = (
    productsSpecs: ProductsMinimizedType[],
    item: lineOrderItems
  ): ProductsMinimizedType | undefined => {
    return productsSpecs.find(product =>
      product.parent_id === 0
        ? product.id === item.product_id
        : product.parent_id === item.product_id &&
          product.id === item.variation_id
    );
  };

  return (
    <CartTableWrapper>
      {!!(
        !isLoadingOrder &&
        hasConflict &&
        innercartItems.length > 0 &&
        firstLoad &&
        innercartItems.length === cartItems.length
      ) && <Notification type="warning">{t('cartConflict')}</Notification>}

      {cartItems.length == 0 && (
        <FlexBox flexDirection="column" margin="0 0 46px 0" alignItems="center">
          <Title fontSize="1.5em" as="h3" marginTop="46px" marginBottom="16px">
            {t('nothingInTheCart')}
          </Title>
          <p>{t('nothingInTheCartText')}</p>
        </FlexBox>
      )}
      {!isMobile ? (
        <>
          {innercartItems.length === cartItems.length &&
            innercartItems.length > 0 && (
              <CartTableGrid>
                <GridHeader>
                  <GridRow>
                    <div />
                    <div />
                    <TextCellHeader>{t('productName')}</TextCellHeader>
                    <TextCellHeader>{t('price')}</TextCellHeader>
                    <TextCellHeader>{t('quantity')}</TextCellHeader>
                    <TextCellHeader>{t('value')}</TextCellHeader>
                  </GridRow>
                </GridHeader>

                {innercartItems.map(item => {
                  const { resolveCount, isAvailable } =
                    checkProductAvailability(item, productsSpecs);

                  const productSpec = findProductSpec(productsSpecs, item);

                  return (
                    <RowWrapper key={item.id} isLoadingItem={isLoadingOrder}>
                      <GridRow>
                        <DeleteCell>
                          <div>
                            <DeleteIcon
                              onClick={() =>
                                handleDeleteItem(
                                  item.product_id,
                                  item.variation_id
                                )
                              }
                            />
                          </div>
                        </DeleteCell>
                        <CartImgWrapper>
                          <CartItemImg
                            src={item.image?.src}
                            alt={item.name}
                            width="50"
                          />
                        </CartImgWrapper>
                        <TextNameCell>
                          <LinkWrapper
                            href={`/product/${
                              productSpec?.parent_slug || productSpec?.slug
                            }`}
                          >
                            {productSpec?.name || item.name}
                          </LinkWrapper>
                        </TextNameCell>
                        <TextCell>
                          {roundedPrice(Number(item.subtotal) / item.quantity)}
                          &nbsp;
                          {symbol}
                        </TextCell>
                        <TextCell>
                          <CartQuantity
                            resolveCount={resolveCount}
                            item={item}
                            handleChangeQuantity={handleChangeQuantity}
                          />
                        </TextCell>
                        <TextCell>
                          {roundedPrice(Number(item.subtotal))}&nbsp;
                          {symbol}
                        </TextCell>
                      </GridRow>
                      {isAvailable === false && (
                        <GridRow padding="5px 16px 16px 16px">
                          <CartProductWarning
                            onUpdate={() =>
                              handleChangeQuantity(
                                item.product_id,
                                'value',
                                item.variation_id,
                                resolveCount
                              )
                            }
                            resolveCount={resolveCount}
                          />
                        </GridRow>
                      )}
                    </RowWrapper>
                  );
                })}
              </CartTableGrid>
            )}

          {!!(!order && cartItems.length !== 0) && (
            <MenuSkeleton
              elements={3}
              direction="column"
              width="100%"
              height="78px"
              gap="8px"
              color={theme.background.skeletonSecondary}
            />
          )}
        </>
      ) : (
        <>
          {innercartItems.length !== 0 &&
            innercartItems.map(item => {
              const { resolveCount, isAvailable } = checkProductAvailability(
                item,
                productsSpecs
              );

              const productSpec = findProductSpec(productsSpecs, item);

              return (
                <CartCardAllWrapper key={item.id}>
                  <CartCardWrapper isLoadingItem={isLoadingOrder}>
                    <CartImgWrapper>
                      <CartItemImg
                        src={item.image?.src}
                        alt={item.name}
                        width="50"
                      />
                    </CartImgWrapper>
                    <CardContent>
                      <ProducTitle>
                        <LinkWrapper
                          href={`/product/${
                            productSpec?.parent_slug || productSpec?.slug
                          }`}
                        >
                          {productSpec?.name || item.name}
                        </LinkWrapper>
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
                          {roundedPrice(Number(item.subtotal) / item.quantity)}
                          &nbsp;{symbol}
                        </p>
                      </ProductPrice>
                      <CartQuantity
                        resolveCount={resolveCount}
                        item={item}
                        handleChangeQuantity={handleChangeQuantity}
                      />
                      <ProductPrice>
                        <span>{t('summary')}</span>
                        <OnePrice>
                          {roundedPrice(Number(item.subtotal))}&nbsp;
                          {symbol}
                        </OnePrice>
                      </ProductPrice>
                    </CardContent>
                  </CartCardWrapper>
                  {isAvailable === false && (
                    <CartProductWarning
                      onUpdate={() =>
                        handleChangeQuantity(
                          item.product_id,
                          'value',
                          item.variation_id,
                          resolveCount
                        )
                      }
                      resolveCount={resolveCount}
                    />
                  )}
                </CartCardAllWrapper>
              );
            })}
          {!!(!order && cartItems.length !== 0) && (
            <MenuSkeleton
              elements={1}
              direction="column"
              width="100%"
              height="230px"
              gap="5px"
              color={theme.background.skeletonSecondary}
            />
          )}
        </>
      )}

      {innercartItems.length !== cartItems.length &&
        innercartItems.length > 0 &&
        order && (
          <>
            <Notification type="warning" marginTop="24px">
              Ошибка получения текущих товаров
            </Notification>
            <FlexBox
              alignItems="center"
              flexDirection="column"
              width="100%"
              margin="0 0 24px 0"
            >
              <StyledButton
                secondary
                height="58px"
                width="310px"
                minWidthMobile="100%"
                onClick={() => dispatch(clearCart())}
              >
                Очистить корзину
              </StyledButton>
            </FlexBox>
          </>
        )}
    </CartTableWrapper>
  );
};

export default CartTable;
