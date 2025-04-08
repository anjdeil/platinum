import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import BackArrow from '@/components/global/icons/BackArrow/BackArrow';
import ForwardArrow from '@/components/global/icons/ForwardArrow/ForwardArrow';
import useProductSwiper from '@/hooks/useProductSwiper';
import { SwiperProps } from '@/types/components/global/sliders/productSwiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
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
  VideoWrapper,
} from './styles';

const ProductSwiper: React.FC<SwiperProps> = ({ data }) => {
  const {
    thumbsSwiper,
    setThumbsSwiper,
    handlerOpen,
    handleSlideChange,
    swiperRef,
    heightRef,
  } = useProductSwiper({ data });

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const playerRefs = useRef<(ReactPlayer | null)[]>([]);

  const navPrevElId = `swiper-navPrev`;
  const navNextElId = `swiper-navNext`;

  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  const handleSlideChangeWithStop = (swiper: any) => {
    const prevIndex = activeSlide;
    const newIndex = swiper.activeIndex;

    setActiveSlide(newIndex);

    const prevPlayer = playerRefs.current[prevIndex];

    if (prevPlayer) {
      const internal = prevPlayer.getInternalPlayer?.();
      if (internal?.pauseVideo) {
        internal.pauseVideo();
      } else if (internal?.pause) {
        internal.pause();
      }
    }
  };

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
        onSlideChange={swiper => {
          handleSlideChange(swiper);
          handleSlideChangeWithStop(swiper);
        }}
      >
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === 'video' ? (
              <SwiperSlide>
                <VideoWrapper>
                  <ReactPlayer
                    ref={player => {
                      playerRefs.current[index] = player;
                    }}
                    url={item.src}
                    controls
                    max-width="452px"
                    height="100%"
                    style={{ overflow: 'hidden' }}
                    muted={true}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                  />
                </VideoWrapper>
              </SwiperSlide>
            ) : (
              <SwiperSlide onClick={handlerOpen}>
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
            )}
          </React.Fragment>
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
                  src={
                    item.type === 'video' && item.name === 'youtube'
                      ? getYouTubeThumbnail(item.src) ||
                        '/assets/images/video-thumbnail.jpg'
                      : item.type === 'video' && item.name !== 'youtube'
                      ? '/assets/images/video-thumbnail.jpg'
                      : item?.src || '/assets/images/not-found.webp'
                  }
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
