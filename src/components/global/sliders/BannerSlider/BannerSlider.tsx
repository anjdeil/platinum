import { useResponsive } from '@/hooks/useResponsive';
import { Title } from '@/styles/components';
import {
  BannerSliderProps,
  BannerSlideType,
  MainPageSlideType,
} from '@/types/components/global/sliders/BannerSlider';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import AddToBasketButton from '../../buttons/AddToBasketButton/AddToBasketButton';
import {
  BannerWrapper,
  ContentWrapper,
  CustomSwiper,
  ImageStyled,
  StyledText,
} from './styles';

const BannerSlider: React.FC<BannerSliderProps> = ({
  slides,
  proportion,
  mobileProportion,
  isMainPage,
}) => {
  const t = useTranslations('Cart');
  const { isMobile } = useResponsive();

  const imageConfig = useMemo(
    () => ({
      width: isMobile ? 768 : 1440,
      height: isMobile
        ? 768 / (mobileProportion || 0.65)
        : 1440 / (proportion || 3),

      imageSrc: (slide: BannerSlideType | MainPageSlideType) => {
        if ('image_desc' in slide && 'image_mob' in slide) {
          return isMobile ? slide.image_mob : slide.image_desc;
        }
        return isMobile ? slide.mobileImage : slide.image;
      },
    }),
    [isMobile, proportion, mobileProportion]
  );

  return (
    <BannerWrapper
      proportion={proportion}
      mobileProportion={mobileProportion}
      isMainPage
    >
      {!isMainPage && (
        <ContentWrapper>
          <StyledText>{t('welcomeToPlatinumShop')}</StyledText>
          <Title as="h2" uppercase>
            {t('theBest')}
            <br />
            {t('productForYou')}
          </Title>
          <AddToBasketButton maxWidth="250px">Add to basket</AddToBasketButton>
        </ContentWrapper>
      )}
      <CustomSwiper
        modules={slides.length > 1 ? [Pagination, Autoplay] : [Autoplay]}
        pagination={slides.length > 1 ? { clickable: true } : false}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map(
          (slide: BannerSlideType | MainPageSlideType, index: number) => (
            <SwiperSlide key={index}>
              {isMainPage && (
                <Link href={slide.url || '#'} passHref>
                  <ImageStyled
                    // unoptimized={true}
                    // priority={index === 0}
                    src={imageConfig.imageSrc(slide)}
                    alt="Banner"
                    width={imageConfig.width}
                    height={imageConfig.height}
                  />
                </Link>
              )}
              <ImageStyled
                // unoptimized={true}
                // priority={index === 0}
                src={imageConfig.imageSrc(slide)}
                alt="Banner"
                width={imageConfig.width}
                height={imageConfig.height}
              />
            </SwiperSlide>
          )
        )}
      </CustomSwiper>
    </BannerWrapper>
  );
};

export default BannerSlider;
