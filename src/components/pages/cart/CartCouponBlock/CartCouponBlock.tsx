import React, { FC, useState } from 'react'
import {
  CouponBlock,
  CouponButton,
  CouponError,
  CouponForm,
  CouponSuccess,
  CouponText,
} from './style'
import theme from '@/styles/theme'
import { useForm } from 'react-hook-form'
import { useListAllCouponsQuery } from '@/store/rtk-queries/wooCustomApi'
import { useTranslations } from 'next-intl'
import { useAppDispatch } from '@/store'
import { addCoupon } from '@/store/slices/cartSlice'
import { CustomFormInput } from '@/components/global/forms/CustomFormInput'
import { useResponsive } from '@/hooks/useResponsive'
import { MenuSkeleton } from '@/components/menus/MenuSkeleton'
import { CartCouponBlockProps } from '@/types/pages/cart'
import {
  discountMapping,
  userLoyalityStatusSchema,
} from '@/types/store/rtk-queries/wpApi'

const CartCouponBlock: FC<CartCouponBlockProps> = ({
  symbol,
  auth,
  userLoyalityStatus,
}) => {
  const { isMobile } = useResponsive()
  const t = useTranslations('Cart')
  const dispatch = useAppDispatch()

  const isValidStatus = userLoyalityStatusSchema.safeParse(userLoyalityStatus)
  const validStatus = isValidStatus.data

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { data: coupons, isLoading } = useListAllCouponsQuery()

  const [couponState, setCouponState] = useState<'success' | 'error' | null>(null)

  const onSubmit = (data: any) => {
    const isValidCoupon = coupons?.some((coupon) => coupon.code === data.couponCode)
    if (isValidCoupon) {
      dispatch(addCoupon({ couponCode: data.couponCode }))
      setCouponState('success')
    } else {
      setCouponState('error')
    }
  }

  return (
    <CouponBlock>
      {!auth && (
        <CouponText uppercase marginBottom="8px">
          {/*  need to add diff  DISCOUNT */}
          {t('LoginAnd')} <span>&nbsp;-3%&nbsp;</span> {t('ForOrders')} {t('Above')}{' '}
          <span>&nbsp;500 {symbol}&nbsp;</span>,<span>&nbsp;5%&nbsp;</span> {t('Above')}{' '}
          <span>&nbsp;1000{symbol}&nbsp;</span>, <span>&nbsp;-10%&nbsp;</span>{' '}
          {t('Above')} <span>&nbsp;2000{symbol}&nbsp;</span>
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
          {couponState === 'error' && <CouponError>{t('ErrorCoupon')}</CouponError>}
          {couponState === 'success' && <CouponSuccess>{t('CouponApply')}</CouponSuccess>}
        </>
      )}
    </CouponBlock>
  )
}

export default CartCouponBlock
