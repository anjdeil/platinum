import { useResponsive } from "@/hooks/useResponsive";
import { Title } from "@/styles/components";
import { BannerSliderProps, BannerSlideType } from "@/types/components/global/sliders/BannerSlider";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import AddToBasketButton from "../../buttons/AddToBasketButton/AddToBasketButton";
import { BannerWrapper, ContentWrapper, CustomSwiper, ImageStyled, StyledText } from "./styles";

const BannerSlider: React.FC<BannerSliderProps> = ({ slides, proportion, mobileProportion }) =>
{    
    const t = useTranslations('Cart');
    const { isMobile } = useResponsive();
    
    const imageConfig = useMemo(() => ({
        width: isMobile ? 768 : 1440,
        height: isMobile ? 768 / (mobileProportion || 0.65) : 1440 / (proportion || 3),
        imageSrc: (slide: BannerSlideType) => isMobile ? `/images/${slide.mobileImage}` : `/images/${slide.image}`
    }), [isMobile, proportion, mobileProportion]);
    
    return (
        <BannerWrapper proportion={proportion} mobileProportion={mobileProportion}>
            <ContentWrapper>
                <StyledText>{t('welcomeToPlatinumShop')}</StyledText>
                <Title as="h2" uppercase>
                    {t('theBest')}
                        <br/>
                    {t('productForYou')}
                </Title>
                <AddToBasketButton maxWidth="250px" mobileMaxWidth="160px" />
            </ContentWrapper>
            <CustomSwiper
                modules={slides.length > 1 ? [Pagination] : []}
                pagination={slides.length > 1 ? { clickable: true } : false}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
            >
                {slides.map(slide => (
                    <SwiperSlide key={0}>
                        <ImageStyled
                            unoptimized={true}
                            priority
                            src={imageConfig.imageSrc(slide)}
                            alt={`Banner`}
                            width={imageConfig.width}
                            height={imageConfig.height}
                        />
                    </SwiperSlide>
                ))}
			</CustomSwiper>
        </BannerWrapper>
    )
}

export default BannerSlider;