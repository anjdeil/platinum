import { StyledContainer } from './styles';
import BannerSlider from '@/components/global/sliders/BannerSlider/BannerSlider';
import { SlideType } from '@/types/components/global/sliders/BannerSlider';

interface SliderSectionData {
  slides: SlideType[];
}

export const SliderSection: React.FC<SliderSectionData> = ({ slides }) => {
  return (
    <StyledContainer>
      <BannerSlider slides={slides} isMainPage />
    </StyledContainer>
  );
};
