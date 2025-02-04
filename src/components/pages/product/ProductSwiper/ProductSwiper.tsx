import React from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import BackArrow from '@/components/global/icons/BackArrow/BackArrow';
import ForwardArrow from '@/components/global/icons/ForwardArrow/ForwardArrow';
import useProductSwiper from '@/hooks/useProductSwiper';
import { SwiperProps } from '@/types/components/global/sliders/productSwiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {
  CustomWrapper,
  ImageStyled,
  ImageWrapper,
  MainSwiper,
  NavButton,
  SwiperContainer,
  SwiperSlideStyled,
  Thumbnail,
  ThumbnailWrapper,
  ThumbsSwiper,
} from './styles';

const ProductSwiper: React.FC<SwiperProps> = ({ data, handleFavorite }) => {
  const {
    thumbsSwiper,
    setThumbsSwiper,
    handlerOpen,
    handleSlideChange,
    swiperRef,
    heightRef,
  } = useProductSwiper({ data });

  const navPrevElId = `swiper-navPrev`;
  const navNextElId = `swiper-navNext`;

  return (
    <SwiperContainer>
      <MainSwiper
        ref={swiperRef}
        spaceBetween={10}
        centeredSlides={true}
        modules={[FreeMode, Thumbs]}
        style={{ minHeight: heightRef.current ? heightRef.current : 'auto' }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onSlideChange={handleSlideChange}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} onClick={handlerOpen}>
            <ImageWrapper>
              <ImageStyled
                unoptimized={true}
                priority
                src={item?.src || '/assets/images/not-found.webp'}
                alt={`Product ${index + 1}`}
                width={452}
                height={452}
              />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </MainSwiper>

      <CustomWrapper>
        <NavButton id={navPrevElId}>
          <BackArrow />
        </NavButton>
        <ThumbsSwiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          breakpoints={{
            768: {
              spaceBetween: 14,
            },
            1024: {
              spaceBetween: 40,
            },
          }}
          slidesPerView={3}
          navigation={{
            nextEl: `#${navNextElId}`,
            prevEl: `#${navPrevElId}`,
          }}
          modules={[Navigation, Thumbs]}
        >
          {data.map((item, index) => (
            <SwiperSlideStyled key={index}>
              <ThumbnailWrapper>
                <Thumbnail
                  unoptimized={true}
                  src={item?.src || '/assets/images/not-found.webp'}
                  alt={`Thumbnail ${index + 1}`}
                  width={92}
                  height={92}
                />
              </ThumbnailWrapper>
            </SwiperSlideStyled>
          ))}
        </ThumbsSwiper>
        <NavButton id={navNextElId}>
          <ForwardArrow />
        </NavButton>
      </CustomWrapper>
    </SwiperContainer>
  );
};

export default ProductSwiper;
