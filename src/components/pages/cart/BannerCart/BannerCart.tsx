import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton'
import { useResponsive } from '@/hooks/useResponsive'
import { Title } from '@/styles/components'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { BannerWrapper, ContentWrapper, StyledText } from './styles'
import { BannerCartProps } from '@/types/pages/cart'

const BannerCart: React.FC<BannerCartProps> = ({ slug, image, mobileImage }) => {
  const t = useTranslations('Cart')
  const { isMobile } = useResponsive()

  return (
    <BannerWrapper href={`/product/${slug}`} passHref>
      <ContentWrapper>
        <StyledText>{t('welcomeToPlatinumShop')}</StyledText>
        <Title as="h2" uppercase>
          {t('theBest')}
          <br />
          {t('productForYou')}
        </Title>
        <AddToBasketButton />
      </ContentWrapper>
      {isMobile ? (
        <Image
          src={`/images/${mobileImage}`}
          alt="cosmetics"
          width={768}
          height={272}
          priority
        />
      ) : (
        <Image
          src={`/images/${image}`}
          alt="cosmetics"
          width={1440}
          height={1120}
          priority
        />
      )}
    </BannerWrapper>
  )
}

export default BannerCart
