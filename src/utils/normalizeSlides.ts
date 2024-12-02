import {
  MainPageSlideType,
  SlideType,
} from '@/types/components/global/sliders/BannerSlider';

export const normalizeSlides = (slides: SlideType[]) => {
  return slides.map((slide) => {
    const sliderItem = slide as MainPageSlideType;
    return {
      image: sliderItem.image_desc,
      mobileImage: sliderItem.image_mob,
      url: sliderItem.url,
    };
  });
};
