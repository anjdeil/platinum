import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch } from '@/store';
import { useListAllCouponsQuery } from '@/store/rtk-queries/wooCustomApi';
import { addCoupon } from '@/store/slices/cartSlice';
import theme from '@/styles/theme';
import { CartCouponBlockProps } from '@/types/pages/cart';
import {
  discountMapping,
  userLoyalityStatusSchema,
} from '@/types/store/rtk-queries/wpApi';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CouponBlock,
  CouponButton,
  CouponError,
  CouponForm,
  CouponSuccess,
  CouponText,
} from './style';

const CartCouponBlock: FC<CartCouponBlockProps> = ({
  symbol,
  auth,
  userLoyalityStatus,
}) => {
  const { isMobile } = useResponsive();
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();

  const isValidStatus = userLoyalityStatusSchema.safeParse(userLoyalityStatus);
  const validStatus = isValidStatus.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { data: coupons, isLoading } = useListAllCouponsQuery();

  const [couponState, setCouponState] = useState<'success' | 'error' | null>(
    null
  );

  const onSubmit = (data: any) => {
    const isValidCoupon = coupons?.some(
      coupon => coupon.code === data.couponCode
    );
    if (isValidCoupon) {
      dispatch(addCoupon({ couponCode: data.couponCode }));
      setCouponState('success');
    } else {
      setCouponState('error');
    }
  };

  return (
    <CouponBlock>
      {!auth && (
        <CouponText uppercase marginBottom="8px">
          {/*  need to add diff  DISCOUNT */}
          {t('LoginAnd')}
          <span>&nbsp;3%&nbsp;</span> {t('ForOrders')} {t('Above')}{' '}
          <span>&nbsp;500 {t('CouponCurrencySymbol')}</span>,
          <span>&nbsp;5%&nbsp;</span> {t('Above')}{' '}
          <span>&nbsp;1000 {t('CouponCurrencySymbol')}</span>,{' '}
          <span>&nbsp;10%&nbsp;</span> {t('Above')}{' '}
          <span>&nbsp;2000 {t('CouponCurrencySymbol')}&nbsp;</span>
        </CouponText>
      )}
      {validStatus && (
        <CouponText uppercase marginBottom="8px">
          {t('UserLoyalityStatus', { validStatus: validStatus })}

          <span>&nbsp;{discountMapping[validStatus] as string} &nbsp;</span>
        </CouponText>
      )}

      <CouponText uppercase>{t('CouponText')}</CouponText>
      <CouponText>{t('ChooseCouponText')}</CouponText>

      {isLoading ? (
        <MenuSkeleton
          elements={1}
          direction="column"
          width="50%"
          height="72px"
          gap="5px"
          color={theme.background.skeletonSecondary}
        />
      ) : (
        <>
          <CouponForm onSubmit={handleSubmit(onSubmit)}>
            <CustomFormInput
              width={isMobile ? '100%' : 'auto'}
              label={false}
              name="couponCode"
              register={register}
              errors={errors}
              inputTag="input"
              inputType="text"
              setValue={setValue}
              placeholder={t('CouponInputPlaceholder')}
              height="100%"
            />
            <CouponButton type="submit">{t('CouponApplyBtn')}</CouponButton>
          </CouponForm>
          {couponState === 'error' && (
            <CouponError>{t('ErrorCoupon')}</CouponError>
          )}
          {couponState === 'success' && (
            <CouponSuccess>{t('CouponApply')}</CouponSuccess>
          )}
        </>
      )}
    </CouponBlock>
  );
};

export default CartCouponBlock;
