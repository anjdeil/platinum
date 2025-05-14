import { useAppSelector } from '@/store';
import { SwiperPopupProps } from '@/types/components/global/sliders/productSwiper';
import { useMemo } from 'react';
import { FreeMode, Navigation } from 'swiper/modules';
import BackArrow from '../../icons/BackArrow/BackArrow';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import ForwardArrow from '../../icons/ForwardArrow/ForwardArrow';
import {
  CloseWrapper,
  NavigationButton,
  PopupBody,
  PopupOverlay,
  SlideImage,
  StyledSwiper,
  StyledSwiperSlide,
} from './styles';

const SwiperPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
  const swiperId = `swiper-3`;
  const nextElId = `${swiperId}-next`;
  const prevElId = `${swiperId}-prev`;

  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const data = useAppSelector(
    useMemo(() => state => state.swiperModal.data, [])
  );

  const currentSlide = useAppSelector(
    useMemo(() => state => state.swiperModal.currentSlide, [])
  );

  return (
    <PopupOverlay onClick={handleClickBackground}>
      <PopupBody>
        <CloseWrapper>
          <CloseIcon onClick={onClose} />
        </CloseWrapper>
        <StyledSwiper
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          navigation={{
            nextEl: `#${nextElId}`,
            prevEl: `#${prevElId}`,
          }}
          modules={[FreeMode, Navigation]}
          initialSlide={currentSlide}
        >
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <StyledSwiperSlide key={item?.id || index}>
                <SlideImage
                  unoptimized
                  src={item?.src || '/assets/images/not-found.webp'}
                  alt={`Product image ${index + 1}`}
                  width={600}
                  height={600}
                />
              </StyledSwiperSlide>
            ))}
          <NavigationButton id={prevElId} prev={true}>
            <BackArrow />
          </NavigationButton>
          <NavigationButton id={nextElId} next={true}>
            <ForwardArrow />
          </NavigationButton>
        </StyledSwiper>
      </PopupBody>
    </PopupOverlay>
  );
};

export default SwiperPopup;
