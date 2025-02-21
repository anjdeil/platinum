import { useAppDispatch } from '@/store';
import { StyledButton, Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import React, { FC, useCallback, useState } from 'react';
import {
  CartCommentHint,
  CartCommentInput,
  CartCommentsTitle,
  CartCommentsWrapper,
  CartSummaryBlockWrapper,
  CartSummaryCard,
  CartSummaryTitleWrapper,
  CartSummaryWrapper,
} from './style';
import theme from '@/styles/theme';
import { debounce } from 'lodash';
import { setCommentToOrder } from '@/store/slices/cartSlice';
import OrderSummary from '../OrderSummary/OrderSummary';
import { CartSummaryBlockProps } from '@/types/pages/cart';
import router from 'next/router';

const CartSummaryBlock: FC<CartSummaryBlockProps> = ({
  symbol,
  order,
  isLoading,
  cartItems,
  auth,
}) => {
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      dispatch(setCommentToOrder(value));
    }, 1300),
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedChangeHandler(value);
  };

  return (
    <CartSummaryBlockWrapper>
      <CartCommentsWrapper>
        <CartCommentsTitle as="h2" textalign="left" uppercase>
          {t('OrderComments')}
        </CartCommentsTitle>
        <CartCommentInput
          placeholder={t('OrderCommentPlaceholder')}
          value={inputValue}
          onChange={handleInputChange}
        />
        <CartCommentHint>{t('OrderCommentHint')}</CartCommentHint>
      </CartCommentsWrapper>

      <CartSummaryWrapper>
        <CartSummaryTitleWrapper>
          <Title as="h2" textalign="center" uppercase>
            {t('OrderSummary')}
          </Title>
        </CartSummaryTitleWrapper>
        <CartSummaryCard>
          <OrderSummary
            symbol={symbol}
            order={order}
            isLoading={isLoading}
            noPaymentMethod
          />
        </CartSummaryCard>

        {!isLoading && (
          <>
            <StyledButton
              width="100%"
              height="56px"
              secondary={true}
              hoverColor={theme.colors.white}
              hoverBackgroundColor={theme.colors.primary}
              onClick={() => {
                router.push('/checkout');
              }}
              disabled={isLoading || cartItems.length === 0}
            >
              {t('Continue')}
            </StyledButton>
          </>
        )}
      </CartSummaryWrapper>
    </CartSummaryBlockWrapper>
  );
};

export default CartSummaryBlock;
