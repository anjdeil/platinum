import AddToBasketButton from '@/components/global/buttons/AddToBasketButton/AddToBasketButton';
import FallbackImage from '@/components/global/FallbackImage/FallbackImage';
import { useResponsive } from '@/hooks/useResponsive';
import { Title } from '@/styles/components';
import { BannerCartProps } from '@/types/pages/cart';
import { useTranslations } from 'next-intl';
import React from 'react';
import { BannerWrapper, ContentWrapper, StyledText } from './styles';

const BannerCart: React.FC<BannerCartProps> = ({
  slug,
  image,
  mobileImage,
}) => {
  const t = useTranslations('Cart');
  const tProduct = useTranslations('Product');
  const { isMobile } = useResponsive();

  return (
    <BannerWrapper href={`/product/${slug}`} passHref>
      <ContentWrapper>
        <StyledText>{t('welcomeToPlatinumShop')}</StyledText>
        <Title as="h2" uppercase>
          {t('theBest')}
          <br />
          {t('productForYou')}
        </Title>
        <AddToBasketButton>{tProduct('addToBasket')}</AddToBasketButton>
      </ContentWrapper>
      {isMobile ? (
        <FallbackImage
          src={`/images/${mobileImage}`}
          alt="cosmetics"
          width={768}
          height={272}
          priority
        />
      ) : (
        <FallbackImage
          src={`/images/${image}`}
          alt="cosmetics"
          width={1440}
          height={1120}
          priority
        />
      )}
    </BannerWrapper>
  );
};

export default BannerCart;
