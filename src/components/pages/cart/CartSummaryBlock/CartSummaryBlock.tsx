import { useAppDispatch, useAppSelector } from '@/store';
import { setCommentToOrder } from '@/store/slices/cartSlice';
import { StyledButton, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { CartSummaryBlockProps } from '@/types/pages/cart';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import router from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import PreOrderSummary from '../PreOrderSummary/PreOrderSummary';
import {
  CartCommentError,
  CartCommentHint,
  CartCommentInput,
  CartCommentsTitle,
  CartCommentsWrapper,
  CartSummaryBlockWrapper,
  CartSummaryCard,
  CartSummaryTitleWrapper,
  CartSummaryWrapper,
} from './style';

const MAX_LENGTH = 500;

const CartSummaryBlock: FC<CartSummaryBlockProps> = ({
  quote,
  isLoading,
  cartItems,
  userTotal,
  auth,
  quoteData,
  handleGetQuote,
}) => {
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const { commentToOrder } = useAppSelector(state => state.cartSlice);
  const [error, setError] = useState('');

  useEffect(() => {
    setInputValue(commentToOrder || '');
  }, [commentToOrder]);

  const validateComment = (value: string) => {
    if (value.length > MAX_LENGTH) {
      return t('OrderCommentTooLong');
    }
    if (/[<>]/.test(value)) {
      return t('OrderCommentInvalidChars');
    }
    return '';
  };
  console.log(error);
  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      const validationError = validateComment(value);
      setError(validationError);
      if (!validationError) {
        dispatch(setCommentToOrder(value));
      }
    }, 1300),
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedChangeHandler(value);
  };

  const showSummary = quote && quote.success;

  const handleGotoCheckout = async () => {
    if (quote) {
      router.push('/checkout');
    } else {
      const newQuote = await handleGetQuote();
      if (newQuote?.success) {
        router.push('/checkout');
      }
    }
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
        {error && (
          <CartCommentError>{error || t('OrderCommentError')}</CartCommentError>
        )}
        <CartCommentHint>{t('OrderCommentHint')}</CartCommentHint>
      </CartCommentsWrapper>

      <CartSummaryWrapper>
        <CartSummaryTitleWrapper>
          <Title as="h2" textalign="center" uppercase>
            {showSummary ? t('OrderSummary') : t('PreOrderSummary')}
          </Title>
        </CartSummaryTitleWrapper>
        <CartSummaryCard>
          <PreOrderSummary
            cartItems={cartItems}
            isLoading={isLoading}
            userTotal={userTotal}
            {...(showSummary ? { summary: quote.summary } : {})}
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
              onClick={handleGotoCheckout}
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
