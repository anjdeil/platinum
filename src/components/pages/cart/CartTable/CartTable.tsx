import React, { FC } from 'react'
import {
  CartTableGrid,
  GridHeader,
  GridRow,
  RowWrapper,
  TextCell,
  TextCellHeader,
} from './style'
import DeleteIcon from '@/components/global/icons/DeleteIcon/DeleteIcon'
import { useResponsive } from '@/hooks/useResponsive'
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon'
import checkProductAvailability from '@/utils/cart/checkProductAvailability'
import CartProductWarning from '../CartProductWarning/CartProductWarning'
import CartQuantity from '../CartQuantity/CartQuantity'
import { MenuSkeleton } from '@/components/menus/MenuSkeleton'
import theme from '@/styles/theme'
import { useTranslations } from 'next-intl'
import Notification from '@/components/global/Notification/Notification'
import {
  OnePrice,
  ProductPrice,
  CardContent,
  CartCardWrapper,
  CartTableWrapper,
  DeleteCell,
  CartImgWrapper,
  CartItemImg,
  TextNameCell,
  CartCardAllWrapper,
  ProducTitle,
} from '../styles'
import { CartTableProps } from '@/types/pages/cart'
import { FlexBox, Title } from '@/styles/components'

const CartTable: FC<CartTableProps> = ({
  symbol,
  order,
  isLoadingOrder,
  isLoadingProductsMin,
  productsSpecs,
  roundedPrice,
  hasConflict,
  cartItems,
  handleChangeQuantity,
  loadingItems,
}) => {
  const t = useTranslations('Cart')
  const { isMobile } = useResponsive()
  console.log(order)

  return (
    <CartTableWrapper>
      {!(isLoadingOrder || isLoadingProductsMin) && hasConflict && (
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

              {order?.line_items.map((item) => {
                const { resolveCount, isAvailable } = checkProductAvailability(
                  item,
                  productsSpecs
                )
                const isLoadingItem = loadingItems.includes(item.product_id)

                return (
                  <RowWrapper key={item.id} isLoadingItem={isLoadingItem}>
                    <GridRow>
                      <DeleteCell>
                        <div>
                          <DeleteIcon
                            onClick={() =>
                              handleChangeQuantity(
                                item.product_id,
                                'value',
                                item.variation_id,
                                0
                              )
                            }
                          />
                        </div>
                      </DeleteCell>
                      <CartImgWrapper>
                        <CartItemImg src={item.image?.src} alt={item.name} width="50" />
                      </CartImgWrapper>
                      <TextNameCell>{item.name}</TextNameCell>
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
                        {roundedPrice(item.price * item.quantity)}&nbsp;{symbol}
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
                )
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
            order?.line_items.map((item) => {
              const { resolveCount, isAvailable } = checkProductAvailability(
                item,
                productsSpecs
              )
              const isLoadingItem = loadingItems.includes(item.product_id)

              return (
                <CartCardAllWrapper key={item.id}>
                  <CartCardWrapper isLoadingItem={isLoadingItem}>
                    <CartImgWrapper>
                      <CartItemImg src={item.image?.src} alt={item.name} width="50" />
                    </CartImgWrapper>
                    <CardContent>
                      <ProducTitle>
                        <p>{item.name}</p>
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
                          {roundedPrice(item.price * item.quantity)}&nbsp;{symbol}
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
              )
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
  )
}

export default CartTable
