import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import DeleteIcon from '@/components/global/icons/DeleteIcon/DeleteIcon';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useResponsive } from '@/hooks/useResponsive';
import { FlexBox, LinkWrapper, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartTableProps } from '@/types/pages/cart';
import { lineOrderItems } from '@/types/store/reducers/сartSlice';
import checkProductAvailability from '@/utils/cart/checkProductAvailability';
import getProductSlug from '@/utils/cart/getProductSlug';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
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

const CartTable: FC<CartTableProps> = ({
  symbol,
  order,
  filteredOutItems,
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

  const { formatPrice } = useCurrencyConverter();

  const findProductSpec = (
    item: lineOrderItems
  ): ProductsMinimizedType | undefined => {
    return productsSpecs.find(product =>
      product.parent_id === 0
        ? product.id === item.product_id
        : product.parent_id === item.product_id &&
          product.id === item.variation_id
    );
  };

  const getItemUnitPrice = (item: lineOrderItems): string => {
    return formatPrice((+item.subtotal + +item.subtotal_tax) / item.quantity);
  };

  const getItemTotalPrice = (item: lineOrderItems): string => {
    return formatPrice(+item.subtotal + +item.subtotal_tax);
  };

  const renderMobileCartItems = (
    items: lineOrderItems[],
    isFiltered = false
  ) => {
    return items.map((item: lineOrderItems) => {
      const { resolveCount, isAvailable } = checkProductAvailability(
        item,
        productsSpecs
      );
      const productSpec = findProductSpec(item);

      const slug = getProductSlug(productSpec);

      return (
        <CartCardAllWrapper key={item.id}>
          <CartCardWrapper isLoadingItem={isLoadingOrder}>
            <CartImgWrapper>
              <CartItemImg src={item.image?.src} alt={item.name} width="50" />
            </CartImgWrapper>
            <CardContent>
              <ProducTitle>
                <LinkWrapper href={`/product/${slug}`}>
                  {productSpec?.parent_name
                    ? `${productSpec.parent_name}${
                        productSpec.attributes?.length
                          ? ' - ' +
                            productSpec.attributes
                              .map(attr => attr.option_name)
                              .join(', ')
                          : ''
                      }`
                    : productSpec?.name || item.name}
                </LinkWrapper>
                {/* <CloseIcon
                  onClick={() =>
                    handleChangeQuantity(
                      item.product_id,
                      'value',
                      item.variation_id,
                      0
                    )
                  }
                /> */}
                <CloseIcon
                  onClick={() =>
                    handleDeleteItem(item.product_id, item.variation_id)
                  }
                />
              </ProducTitle>
              <ProductPrice>
                <p>{getItemUnitPrice(item)}</p>
              </ProductPrice>
              <CartQuantity
                resolveCount={resolveCount}
                item={item}
                handleChangeQuantity={handleChangeQuantity}
                disabled={isFiltered}
              />
              <ProductPrice>
                <span>{t('summary')}</span>
                <OnePrice>{getItemTotalPrice(item)}</OnePrice>
              </ProductPrice>
            </CardContent>
          </CartCardWrapper>
          {(!isAvailable || isFiltered) && (
            <CartProductWarning
              onUpdate={() =>
                handleChangeQuantity(
                  item.product_id,
                  'value',
                  isFiltered ? undefined : item.variation_id,
                  isFiltered ? 0 : resolveCount
                )
              }
              resolveCount={resolveCount}
              isProductError={isFiltered}
            />
          )}
        </CartCardAllWrapper>
      );
    });
  };

  const renderCartItems = (items: lineOrderItems[], isFiltered = false) => {
    return (
      <>
        {items.map((item: lineOrderItems) => {
          const { resolveCount, isAvailable } = checkProductAvailability(
            item,
            productsSpecs
          );
          const productSpec = findProductSpec(item);

          const slug = getProductSlug(productSpec);

          return (
            <RowWrapper key={item.id} isLoadingItem={isLoadingOrder}>
              <GridRow>
                <DeleteCell>
                  <DeleteIcon
                    onClick={() =>
                      handleDeleteItem(item.product_id, item.variation_id)
                    }
                  />
                </DeleteCell>
                <CartImgWrapper>
                  <CartItemImg
                    src={item.image?.src}
                    alt={item.name}
                    width="50"
                  />
                </CartImgWrapper>
                <TextNameCell>
                  <LinkWrapper href={`/product/${slug}`}>
                    {productSpec?.parent_name
                      ? `${productSpec.parent_name}${
                          productSpec.attributes?.length
                            ? ' - ' +
                              productSpec.attributes
                                .map(attr => attr.option_name)
                                .join(', ')
                            : ''
                        }`
                      : productSpec?.name || item.name}
                  </LinkWrapper>
                </TextNameCell>
                <TextCell>{getItemUnitPrice(item)}</TextCell>
                <TextCell>
                  <CartQuantity
                    resolveCount={isFiltered ? undefined : resolveCount}
                    item={item}
                    handleChangeQuantity={handleChangeQuantity}
                    disabled={isFiltered}
                  />
                </TextCell>
                <TextCell>{getItemTotalPrice(item)}</TextCell>
              </GridRow>
              {(!isAvailable || isFiltered) && (
                <CartProductWarning
                  onUpdate={() =>
                    handleChangeQuantity(
                      item.product_id,
                      'value',
                      isFiltered ? undefined : item.variation_id,
                      isFiltered ? 0 : resolveCount
                    )
                  }
                  resolveCount={isFiltered ? undefined : resolveCount}
                  isProductError={isFiltered}
                />
              )}
            </RowWrapper>
          );
        })}
      </>
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

      {innercartItems.length !== cartItems.length &&
        order &&
        cartItems.length > 0 &&
        !isLoadingOrder && (
          <>
            <Notification type="warning" marginBottom="0">
              {t('errorFetchingProducts')}
            </Notification>
            <FlexBox
              alignItems="center"
              flexDirection="column"
              width="100%"
              margin="0 0 24px 0"
            ></FlexBox>
          </>
        )}

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
          {filteredOutItems &&
            (innercartItems.length > 0 || filteredOutItems?.length > 0) && (
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
                {renderCartItems(innercartItems)}
                {filteredOutItems && renderCartItems(filteredOutItems, true)}
              </CartTableGrid>
            )}
        </>
      ) : (
        <>
          {renderMobileCartItems(innercartItems)}
          {filteredOutItems && renderMobileCartItems(filteredOutItems, true)}
        </>
      )}
      {!!(!order && cartItems.length !== 0) && (
        <MenuSkeleton
          elements={isMobile ? 1 : 3}
          direction="column"
          width="100%"
          height={isMobile ? '230px' : '78px'}
          gap="5px"
          color={theme.background.skeletonSecondary}
        />
      )}
    </CartTableWrapper>
  );
};

export default CartTable;
