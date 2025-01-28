import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import DeleteIcon from '@/components/global/icons/DeleteIcon/DeleteIcon';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useResponsive } from '@/hooks/useResponsive';
import { FlexBox, LinkWrapper, Title } from '@/styles/components';
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

const CartTable: FC<CartTableProps> = ({
  symbol,
  order,
  isLoadingOrder,
  firstLoad,
  productsSpecs,
  roundedPrice,
  hasConflict,
  cartItems,
  handleChangeQuantity,
}) => {
  const t = useTranslations('Cart');
  const { isMobile } = useResponsive();
  const [innercartItems, setCartItems] = useState(order?.line_items || []);

  useEffect(() => {
    setCartItems(
      order?.line_items.filter(lineItem =>
        cartItems.some(cartItem => cartItem.product_id == lineItem.product_id)
      ) || []
    );
    console.log('cartItems', cartItems);
    console.log('order?.line_items', order?.line_items);
    console.log('productsSpecs', productsSpecs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.line_items, cartItems]);

  const handleDeleteItem = (productId: number, variationId: number) => {
    const updatedCartItems = innercartItems.filter(
      item => item.product_id !== productId || item.variation_id !== variationId
    );
    setCartItems(updatedCartItems);

    handleChangeQuantity(productId, 'value', variationId, 0);
  };

  return (
    <CartTableWrapper>
      {!!(!isLoadingOrder && hasConflict && firstLoad) && (
        <Notification type="warning">{t('cartConflict')}</Notification>
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
          {cartItems.length !== 0 && (
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
                const { resolveCount, isAvailable } = checkProductAvailability(
                  item,
                  productsSpecs
                );
                console.log(item);

                const productSpec = productsSpecs.find(product => {
                  if (product.parent_id === 0) {
                    return product.id === item.product_id;
                  } else {
                    return product.parent_id === item.product_id;
                  }
                });

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
                        <LinkWrapper href={`/product/${productSpec?.slug}`}>
                          {productSpec?.name || item.name}
                        </LinkWrapper>
                      </TextNameCell>
                      <TextCell>
                        {roundedPrice(item.price)}&nbsp;{symbol}
                      </TextCell>
                      <TextCell>
                        <CartQuantity
                          resolveCount={resolveCount}
                          item={item}
                          handleChangeQuantity={handleChangeQuantity}
                        />
                      </TextCell>
                      <TextCell>
                        {roundedPrice(item.price * item.quantity)}&nbsp;
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
              elements={cartItems.length || 3}
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
          {cartItems.length !== 0 &&
            innercartItems.map(item => {
              const { resolveCount, isAvailable } = checkProductAvailability(
                item,
                productsSpecs
              );

              const productSpec = productsSpecs.find(product => {
                if (product.parent_id === 0) {
                  return product.id === item.product_id;
                } else {
                  return product.parent_id === item.product_id;
                }
              });

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
                        <p> {productSpec?.name || item.name}</p>
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
                          {roundedPrice(item.price)}&nbsp;{symbol}
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
                          {roundedPrice(item.price * item.quantity)}&nbsp;
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
              elements={cartItems.length}
              direction="column"
              width="100%"
              height="230px"
              gap="5px"
              color={theme.background.skeletonSecondary}
            />
          )}
        </>
      )}
    </CartTableWrapper>
  );
};

export default CartTable;
