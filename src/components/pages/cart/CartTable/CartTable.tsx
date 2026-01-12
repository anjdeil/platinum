import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import DeleteIcon from '@/components/global/icons/DeleteIcon/DeleteIcon';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useResponsive } from '@/hooks/useResponsive';
import { FlexBox, LinkWrapper, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { ProductsWithCartDataTypeWithFinalPrice } from '@/types/components/shop/product/products';
import { CartTableProps } from '@/types/pages/cart';
import getProductSlug from '@/utils/cart/getProductSlug';
import { MAX_QUANTITY } from '@/utils/consts';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import CartProductWarning from '../CartProductWarning/CartProductWarning';
import CartQuantity, {
  adaptItemToCartQuantity,
} from '../CartQuantity/CartQuantity';
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
  productsWithCartData,
  loading,
  hasConflict,
  handleChangeQuantity,
  handleDeleteItem,
}) => {
  const t = useTranslations('Cart');
  const { isMobile } = useResponsive();

  const { formatPrice } = useCurrencyConverter();

  const renderMobileCartItems = (
    items: ProductsWithCartDataTypeWithFinalPrice[]
  ) => {
    return items.map((item: ProductsWithCartDataTypeWithFinalPrice) => {
      const slug = getProductSlug(item);

      return (
        <CartCardAllWrapper key={item.id}>
          <CartCardWrapper isLoadingItem={loading}>
            <CartImgWrapper>
              <CartItemImg
                src={item.image?.src || '/assets/images/not-found.webp'}
                alt={item.name}
                width="50"
                height="50"
              />
            </CartImgWrapper>
            <CardContent>
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
                    : item?.name || item.name}
                </LinkWrapper>
                <CloseIcon
                  onClick={() =>
                    handleDeleteItem(item.product_id, item.variation_id)
                  }
                />
              </ProducTitle>
              <ProductPrice>
                <p>{formatPrice(item.convertedFinalPrice)}</p>
              </ProductPrice>
              <CartQuantity
                resolveCount={item.resolveCount}
                item={adaptItemToCartQuantity(item)}
                handleChangeQuantity={handleChangeQuantity}
                disabled={!item.isAvailable}
              />
              <ProductPrice>
                <span>{t('summary')}</span>
                <OnePrice>{formatPrice(item.convertedTotalPrice)}</OnePrice>
              </ProductPrice>
            </CardContent>
          </CartCardWrapper>
          {!item.isAvailable && (
            <CartProductWarning
              onUpdate={() =>
                handleChangeQuantity(
                  item.product_id,
                  'value',
                  item.variation_id,
                  Math.min(item.resolveCount, MAX_QUANTITY)
                )
              }
              resolveCount={Math.min(item.resolveCount, MAX_QUANTITY)}
              isProductError={!item.isAvailable}
            />
          )}
        </CartCardAllWrapper>
      );
    });
  };

  const renderCartItems = (items: ProductsWithCartDataTypeWithFinalPrice[]) => {
    return (
      <>
        {items.map((item: ProductsWithCartDataTypeWithFinalPrice) => {
          const slug = getProductSlug(item);

          return (
            <RowWrapper key={item.id} isLoadingItem={!!loading}>
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
                    src={item.image?.src || '/assets/images/not-found.webp'}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                </CartImgWrapper>
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
                      : item?.name || item.name}
                  </LinkWrapper>
                </TextNameCell>
                <TextCell>{formatPrice(item.convertedFinalPrice)}</TextCell>
                <TextCell>
                  <CartQuantity
                    resolveCount={item.resolveCount}
                    item={adaptItemToCartQuantity(item)}
                    handleChangeQuantity={handleChangeQuantity}
                    disabled={!item.isAvailable}
                  />
                </TextCell>
                <TextCell>{formatPrice(item.convertedTotalPrice)}</TextCell>
              </GridRow>
              {!item.isAvailable && (
                <CartProductWarning
                  onUpdate={() =>
                    handleChangeQuantity(
                      item.product_id,
                      'value',
                      item.variation_id,
                      Math.min(item.resolveCount, MAX_QUANTITY)
                    )
                  }
                  resolveCount={Math.min(item.resolveCount, MAX_QUANTITY)}
                  isProductError={!item.isAvailable}
                />
              )}
            </RowWrapper>
          );
        })}
      </>
    );
  };

  if (productsWithCartData.length === 0) {
    return (
      <FlexBox flexDirection="column" margin="0 0 46px 0" alignItems="center">
        <Title fontSize="1.5em" as="h3" marginTop="46px" marginBottom="16px">
          {t('nothingInTheCart')}
        </Title>
        <p>{t('nothingInTheCartText')}</p>
      </FlexBox>
    );
  }

  return (
    <CartTableWrapper>
      {!!(hasConflict && productsWithCartData.length > 0) && (
        <Notification type="warning">{t('cartConflict')}</Notification>
      )}
      {loading ? (
        <MenuSkeleton
          elements={isMobile ? 1 : 3}
          direction="column"
          width="100%"
          height={isMobile ? '230px' : '78px'}
          gap="5px"
          color={theme.background.skeletonSecondary}
        />
      ) : !isMobile ? (
        <>
          {productsWithCartData && productsWithCartData.length > 0 && (
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
              {renderCartItems(productsWithCartData)}
            </CartTableGrid>
          )}
        </>
      ) : (
        <>{renderMobileCartItems(productsWithCartData)}</>
      )}
    </CartTableWrapper>
  );
};

export default CartTable;
