import ReviewsCard from '@/components/sections/ReviewsSection/ReviewsCard/ReviewsCard';
import { useGetProductReviewsQuery } from '@/store/rtk-queries/wooCustomApi';
import { Title } from '@/styles/components';
import { ProductType } from '@/types/components/shop/product/products';
import { ReviewRespType } from '@/types/services';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import {
  CustomSwiper,
  ReviewsContainer,
  StyledText,
  TitleBlock,
} from './styles';

interface ReviewsPropsType {
  product: ProductType | undefined;
}

const Reviews: FC<ReviewsPropsType> = ({ product }) => {
  const t = useTranslations('Product');
  const [opened, setOpened] = useState<number | null>(null);

  const { data } = useGetProductReviewsQuery({
    product: product?.id || 0,
  });

  const reviews: ReviewRespType[] = data || [];

  if (!reviews.length) {
    return null;
  }

  return (
    <ReviewsContainer>
      <TitleBlock>
        <StyledText>{t('yourFeedback')}</StyledText>
        <Title as="h4" uppercase>
          {t('reviews')}
        </Title>
      </TitleBlock>
      <CustomSwiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          769: {
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
          <SwiperSlide key={review.id}>
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

export default Reviews;
