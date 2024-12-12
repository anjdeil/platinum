import { ReviewsRespType } from '@/types/services';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { CustomSwiper, ReviewsContainer } from './styles';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import ReviewsCard from '../ReviewsCard/ReviewsCard';
import 'swiper/css';

type ReviewsPropsType = {
  reviews: ReviewsRespType;
};

export const ReviewsSlider: FC<ReviewsPropsType> = ({ reviews }) => {
  const t = useTranslations('Product');
  const [opened, setOpened] = useState<number | null>(null);

  return (
    <ReviewsContainer>
      <CustomSwiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} style={{ height: "100%" }}>
            <ReviewsCard
              review={review}
              isOpen={opened === review.id}
              setOpened={setOpened}
            />
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </ReviewsContainer>
  );
};
