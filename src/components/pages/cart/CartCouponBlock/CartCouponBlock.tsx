import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { addCoupon } from '@/store/slices/cartSlice';
import { CartCouponBlockProps } from '@/types/pages/cart';
import {
  discountMapping,
  userLoyalityStatusSchema,
} from '@/types/store/rtk-queries/wpApi';
import { useTranslations } from 'next-intl';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  CouponBlock,
  CouponButton,
  CouponError,
  CouponForm,
  CouponSuccess,
  CouponText,
} from './style';

const loyaltyCouponsCodes = ['silver', 'gold', 'platinum'];

const CartCouponBlock: FC<CartCouponBlockProps> = ({
  auth,
  userLoyaltyStatus,
  couponError,
  setCouponError,
  couponSuccess,
  isLoading,
  setIsCouponAppliedManually,
}) => {
  const { isMobile } = useResponsive();
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(s => s.cartSlice);

  const isValidStatus = userLoyalityStatusSchema.safeParse(userLoyaltyStatus);
  const validStatus = isValidStatus.data;

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (couponError) {
      setValue('couponCode', '');
    }
  }, [couponError, setValue]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setValue('couponCode', '');
      setCouponError(false);
    }
  }, [cartItems, dispatch, setValue, setCouponError, userLoyaltyStatus]);

  const onSubmit = async (data: any) => {
    if (!data.couponCode || loyaltyCouponsCodes.includes(data.couponCode))
      return;
    dispatch(addCoupon({ couponCode: data.couponCode }));
    setCouponError(false);

    setIsCouponAppliedManually(true);
  };

  return (
    <CouponBlock>
      {validStatus && (
        <CouponText uppercase marginBottom="8px">
          {t('UserLoyalityStatus', { validStatus: validStatus })}

          <span>&nbsp;{discountMapping[validStatus] as string} &nbsp;</span>
        </CouponText>
      )}

      <CouponText uppercase>{t('CouponText')}</CouponText>
      <CouponText>{t('ChooseCouponText')}</CouponText>

      <CouponForm onSubmit={handleSubmit(onSubmit)}>
        <CustomFormInput
          width={isMobile ? '100%' : 'auto'}
          label={false}
          name="couponCode"
          register={register}
          inputTag="input"
          inputType="text"
          setValue={setValue}
          placeholder={t('CouponInputPlaceholder')}
          height="100%"
          disabled={isLoading}
        />
        <CouponButton type="submit" disabled={isLoading}>
          {t('CouponApplyBtn')}
        </CouponButton>
      </CouponForm>
      {couponSuccess && !couponError && (
        <CouponSuccess>{t('couponApplied')}</CouponSuccess>
      )}
      {couponError && <CouponError>{t('couponIsNotApplied')}</CouponError>}
    </CouponBlock>
  );
};

export default CartCouponBlock;
