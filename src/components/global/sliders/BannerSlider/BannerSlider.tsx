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
  SliderPlaceholder,
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
  const [isSliderInitialized, setIsSliderInitialized] = React.useState(false);

  const imageConfig = useMemo(
    () => ({
      width: isMobile ? 768 : 1440,
      height: isMobile
        ? 768 / (mobileProportion || 0.65)
        : 1440 / (proportion || 2.74),

      // imageSrc: (slide: BannerSlideType | MainPageSlideType) => {
      //   if ('image_desc' in slide && 'image_mob' in slide) {
      //     return isMobile ? slide.image_mob : slide.image_desc;
      //   }
      //   return isMobile ? slide.mobileImage : slide.image;
      // },
    }),
    [isMobile, proportion, mobileProportion]
  );

  const getSlideImages = (slide: BannerSlideType | MainPageSlideType) => {
    if ('image_mob' in slide && 'image_desc' in slide) {
      return {
        mobile: slide.image_mob,
        desktop: slide.image_desc,
      };
    }
    return {
      mobile: slide.mobileImage,
      desktop: slide.image,
    };
  };

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

      {!isSliderInitialized && slides[0] && (
        <SliderPlaceholder>
          {(() => {
            const { mobile, desktop } = getSlideImages(slides[0]);
            return (
              <picture>
                <source media="(max-width: 767px)" srcSet={mobile} />
                <ImageStyled
                  src={desktop}
                  alt="Banner"
                  width={imageConfig.width}
                  height={Math.floor(imageConfig.height)}
                  priority
                  fetchPriority="high"
                />
              </picture>
            );
          })()}
        </SliderPlaceholder>
      )}

      <CustomSwiper
        modules={slides.length > 1 ? [Pagination, Autoplay] : [Autoplay]}
        pagination={slides.length > 1 ? { clickable: true } : false}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        onAfterInit={() => setIsSliderInitialized(true)}
      >
        {slides.map(
          (slide: BannerSlideType | MainPageSlideType, index: number) => {
            const { mobile, desktop } = getSlideImages(slide);

            return (
              <SwiperSlide key={index}>
                {isMainPage && (
                  <Link href={slide.url || '#'} passHref>
                    <picture>
                      <source media="(max-width: 767px)" srcSet={mobile} />
                      <ImageStyled
                        src={desktop}
                        alt="Banner"
                        width={imageConfig.width}
                        height={Math.floor(imageConfig.height)}
                        priority={index === 0}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                      />
                    </picture>
                    {/* <ImageStyled
                      key={isMobile ? 'mobile' : 'desktop'}
                      priority={index === 0}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      src={imageUrl}
                      alt="Banner"
                      width={imageConfig.width}
                      height={Math.floor(imageConfig.height)}
                    /> */}
                  </Link>
                )}
              </SwiperSlide>
            );
          }
        )}
      </CustomSwiper>
    </BannerWrapper>
  );
};

export default BannerSlider;
