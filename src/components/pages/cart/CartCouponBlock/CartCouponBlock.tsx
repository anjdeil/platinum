import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLazyListAllCouponsQuery } from '@/store/rtk-queries/wooCustomApi';
import { addCoupon } from '@/store/slices/cartSlice';
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
import Notification from '@/components/global/Notification/Notification';

type CouponApplyingStatusType = {
  isError: boolean;
  message: string;
}

const loyaltyCouponsCodes = ['silver', 'gold', 'platinum'];

const CartCouponBlock: FC<CartCouponBlockProps> = ({
                                                     auth,
                                                     userLoyalityStatus,
                                                     isCouponsIgnored,
                                                   }) => {
  const { isMobile } = useResponsive();
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();

  const isValidStatus = userLoyalityStatusSchema.safeParse(userLoyalityStatus);
  const validStatus = isValidStatus.data;

  const [fetchCoupons, { isLoading: isCouponsLoading, isFetching: isCouponsFetching }] = useLazyListAllCouponsQuery();
  const isLoading = isCouponsLoading || isCouponsFetching;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { couponCodes } = useAppSelector(state => state.cartSlice);
  const isCartLoyaltyIncluded = couponCodes.some((coupon) => loyaltyCouponsCodes.includes(coupon));

  const [applyingStatus, setApplyingStatus] = useState<CouponApplyingStatusType>();

  const onSubmit = async (data: any) => {
    if (isLoading) return;

    if (loyaltyCouponsCodes.includes(data.couponCode)) {
      setApplyingStatus({
        isError: true,
        message: 'couponNotFound',
      });
      return;
    }

    const { data: coupons, error } = await fetchCoupons({ code: data.couponCode });

    if (coupons) {

      if (coupons.length !== 0 && coupons[0].code === data.couponCode) {
        setApplyingStatus({
          isError: false,
          message: 'couponApplied',
        });
        dispatch(addCoupon({ couponCode: data.couponCode }));
      } else {
        setApplyingStatus({
          isError: true,
          message: 'couponNotFound',
        });
        return;
      }

    } else if (error) {
      setApplyingStatus({
        isError: true,
        message: 'fetchError',
      });
    }
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
          errors={errors}
          inputTag="input"
          inputType="text"
          setValue={setValue}
          placeholder={t('CouponInputPlaceholder')}
          height="100%"
        />
        <CouponButton type="submit" disabled={isCouponsIgnored || isLoading}>
          {t('CouponApplyBtn')}
          {isLoading && <>...</>}
        </CouponButton>
      </CouponForm>

      {!applyingStatus && !isCouponsIgnored && isCartLoyaltyIncluded && (
        <Notification type={'warning'}>
          {t('overrideLoyaltyDiscount')}
        </Notification>
      )}
      {applyingStatus && !isCouponsIgnored && !applyingStatus.isError && (
        <CouponSuccess>{t(applyingStatus.message)}</CouponSuccess>
      )}
      {applyingStatus && !isCouponsIgnored && applyingStatus.isError && (
        <CouponError>{t(applyingStatus.message)}</CouponError>
      )}
      {isCouponsIgnored && <CouponError>{t('couponIsNotApplied')}</CouponError>}
    </CouponBlock>
  );
};

export default CartCouponBlock;
