
import React, { useState } from 'react';
import { CouponBlock, CouponButton, CouponError, CouponForm, CouponInput, CouponSuccess, CouponText } from './style';
import { CustomInput } from '@/components/global/forms/CustomInput';
import theme from '@/styles/theme';
import { useForm } from 'react-hook-form';
import { useListAllCouponsQuery } from '@/store/rtk-queries/wooCustomApi';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/store';
import { addCoupon } from '@/store/slices/cartSlice';
import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { useResponsive } from '@/hooks/useResponsive';

const CartCouponBlock = () => {
    const { isMobile } = useResponsive();
    const t = useTranslations("Cart");
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: CouponsData, error: CouponsError, isLoading } = useListAllCouponsQuery()
    const [couponError, setCouponError] = useState<boolean>(false)
    const [couponSuc, setCouponSuc] = useState<boolean>(false)

    if (!isLoading) {
        console.log(CouponsData);

    }
    function onSubmit(data: any) {
        const IsCouponPass = CouponsData?.some(coupon => coupon.code === data.couponCode)
        if (IsCouponPass) {
            dispatch(
                addCoupon({
                    couponCode: data.couponCode
                })
            );
            setCouponError(false)
            setCouponSuc(true)
        } else {
            setCouponError(true)
        }
    };

    return (
        <CouponBlock>
            <CouponText uppercase marginBottom={'8px'}>
                {t('LoginAnd')}
                <span>&nbsp;-3%&nbsp;</span>{t('ForOrders')}&nbsp;{t('Above')}<span>&nbsp;500zł&nbsp;</span> ,
                <span>&nbsp;5%&nbsp;</span>{t('Above')}<span>&nbsp;1000zł&nbsp;</span>,
                <span>&nbsp;-10%&nbsp;</span>{t('Above')}<span>&nbsp;2000zł&nbsp;</span>
            </CouponText>
            <CouponText uppercase>
                {t('CouponText')}
            </CouponText>
            <CouponText>
                {t('ChooseCouponText')}
            </CouponText>
            <CouponForm onSubmit={handleSubmit(onSubmit)} >
                <CustomFormInput
                    width={isMobile ? '100%' : 'auto '}
                    label={false}
                    name='couponCode'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"}
                    height='28px'
                />
                <CouponButton type="submit" backgroundColor={theme.colors.primary}>Apply coupon</CouponButton>
            </CouponForm>
            {couponError && <CouponError>{t('ErrorCoupon')}</CouponError>}
            {couponSuc && <CouponSuccess>{t('CouponApply')}</CouponSuccess>}

        </CouponBlock>
    );
};

export default CartCouponBlock;
