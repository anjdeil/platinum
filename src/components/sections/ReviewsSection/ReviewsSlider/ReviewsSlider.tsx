import { ReviewsRespType } from '@/types/services';
import { FC, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import ReviewsCard from '../ReviewsCard/ReviewsCard';
import { CustomSwiper, ReviewsContainer } from './styles';

type ReviewsPropsType = {
  reviews: ReviewsRespType;
};

export const ReviewsSlider: FC<ReviewsPropsType> = ({ reviews }) => {
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
          540: {
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
        {reviews.map(review => (
          <SwiperSlide key={review.id} style={{ height: 'auto' }}>
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
