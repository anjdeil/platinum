import React, { useState } from 'react';
import { CouponBlock, CouponButton, CouponError, CouponForm, CouponInput, CouponSuccess, CouponText } from './style';
import theme from '@/styles/theme';
import { useForm } from 'react-hook-form';
import { useListAllCouponsQuery } from '@/store/rtk-queries/wooCustomApi';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/store';
import { addCoupon } from '@/store/slices/cartSlice';
import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { useResponsive } from '@/hooks/useResponsive';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';

const CartCouponBlock = () => {
    const { isMobile } = useResponsive();
    const t = useTranslations('Cart');
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { data: coupons, isLoading } = useListAllCouponsQuery();

    const [couponState, setCouponState] = useState<'success' | 'error' | null>(null);

    const onSubmit = (data: any) => {
        const isValidCoupon = coupons?.some(coupon => coupon.code === data.couponCode);

        if (isValidCoupon) {
            dispatch(addCoupon({ couponCode: data.couponCode }));
            setCouponState('success');
        } else {
            setCouponState('error');
        }
    };

    return (
        <CouponBlock>
            <CouponText uppercase marginBottom="8px">
                {t('LoginAnd')} <span>-3%</span> {t('ForOrders')} {t('Above')} <span>500zł</span>,
                <span>5%</span> {t('Above')} <span>1000zł</span>, <span>-10%</span> {t('Above')} <span>2000zł</span>
            </CouponText>
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
                            height="28px"
                        />
                        <CouponButton type="submit" backgroundColor={theme.colors.primary}>
                            {t('CouponApplyBtn')}
                        </CouponButton>
                    </CouponForm>
                    {couponState === 'error' && <CouponError>{t('ErrorCoupon')}</CouponError>}
                    {couponState === 'success' && <CouponSuccess>{t('CouponApply')}</CouponSuccess>}
                </>
            )}
        </CouponBlock>
    );
};

export default CartCouponBlock;
