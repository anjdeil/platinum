import { useAppDispatch } from '@/store';
import { popupSet } from '@/store/slices/PopupSlice';
import { setCurrentSlide, setData } from '@/store/slices/SwiperModal';
import {
  SwiperProps,
  SwiperType,
} from '@/types/components/global/sliders/productSwiper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';

const useProductSwiper = ({ data }: SwiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useAppDispatch();
  const swiperRef = useRef<SwiperRef>(null);
  const heightRef = useRef<number | null>(null);

  const updateSwiperState = useCallback(
    (images: SwiperType[], slideNumber: number) => {
      dispatch(setData(images));
      dispatch(setCurrentSlide(slideNumber));
    },
    [dispatch]
  );

  const handlerOpen = () => {
    //updateSwiperState(data, activeSlide);

    const filteredData = data.filter(item => item.type !== 'video');
    const filteredIndex = filteredData.findIndex(
      item => item.id === data[activeSlide]?.id
    );
    updateSwiperState(filteredData, filteredIndex === -1 ? 0 : filteredIndex);
    dispatch(popupSet({ popupType: 'swiper-popup' }));
  };

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex);
  };

  const updateHeight = useCallback(() => {
    const swiperEl = swiperRef.current?.swiper?.el;
    if (swiperEl) {
      const currentHeight = swiperEl.offsetHeight;
      if (heightRef.current === null) {
        heightRef.current = currentHeight;
      }
    }
  }, []);

  const handleImagesLoad = useCallback(() => {
    updateHeight();
  }, [updateHeight]);

  useEffect(() => {
    const swiperEl = swiperRef.current?.swiper?.el;
    const images = swiperEl?.querySelectorAll('img');

    if (heightRef.current === null && images) {
      images.forEach(img => {
        if (img.complete) {
          handleImagesLoad();
        } else {
          img.addEventListener('load', handleImagesLoad);
          img.addEventListener('error', handleImagesLoad);
        }
      });
    }

    updateHeight();

    const handleResize = () => {
      heightRef.current = null;
      if (swiperRef.current) {
        swiperRef.current.swiper.el.style.minHeight = 'unset';
      }
      updateHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (images) {
        images.forEach(img => {
          img.removeEventListener('load', handleImagesLoad);
          img.removeEventListener('error', handleImagesLoad);
        });
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [data, handleImagesLoad, updateHeight]);

  return {
    thumbsSwiper,
    setThumbsSwiper,
    activeSlide,
    handlerOpen,
    handleSlideChange,
    swiperRef,
    heightRef,
  };
};

export default useProductSwiper;
