import { ReviewsSectionData } from '@/types/components/sections/index';
import { SectionContainer } from '../styles';
import { SectionHeader } from '../SectionHeader';
import { ReviewContainer } from './styles';
import { useEffect, useState } from 'react';
import {
  CustomSwiper,
  ReviewsContainer,
} from '@/components/global/reviews/Reviews/styles';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: string;
}

type ReviewsSectionProps = Omit<ReviewsSectionData, '_type'>;

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  subtitle,
  title,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/google-reviews');
        setReviews(response.data as Review[]);
      } catch (error) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <SectionContainer>
      <SectionHeader title={title} subtitle={subtitle} />
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
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewItem
                review={review}
                isOpen={opened === review.id}
                setOpened={setOpened}
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </ReviewsContainer>
    </SectionContainer>
  );
};
