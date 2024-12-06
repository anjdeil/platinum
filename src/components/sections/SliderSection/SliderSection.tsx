import BannerSlider from '@/components/global/sliders/BannerSlider/BannerSlider';
import { SlideType } from '@/types/components/global/sliders/BannerSlider';
import { SectionContainer } from '../styles';

interface SliderSectionData {
  slides: SlideType[];
}

export const SliderSection: React.FC<SliderSectionData> = ({ slides }) => {
  return (
    <SectionContainer>
      <BannerSlider slides={slides} isMainPage />
    </SectionContainer>
  );
};
