import { useGetProductReviewsQuery } from '@/store/rtk-queries/wpCustomApi';
import { Title } from '@/styles/components';
import { ProductType } from '@/types/components/shop/product/products';
import { ProductReviewType } from '@/types/pages/shop/reviews';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import ReviewItem from '../ReviewItem/ReviewItem';
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
  const [opened, setOpened] = useState(0);

  const { data } = useGetProductReviewsQuery({ slug: product?.slug });

  const reviews: ProductReviewType[] | undefined =
    data?.data?.items || tempReviews;

  // useEffect(() => {
  //   if (data) {
  //     console.log('reviews...', data);
  //   }
  // }, [data]);

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
            <ReviewItem
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

const tempReviews = [
  {
    id: 22,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit id ab facilis omnis. Voluptatibus sapiente asperiores harum aperiam, enim provident amet excepturi molestias officiis ducimus, veritatis accusamus nisi dolorem cupiditate. Corrupti dolores a aperiam cumque ea fugit cupiditate, quae id quod, ducimus molestias harum, doloribus repellat quos sapiente ratione modi.',
    rating: 5,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
  {
    id: 23,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing eamet excepturi molestias officiis ducimus, veritatis accusamus nisi dolorem cupiditate. Corrupti dolores a aperiam cumque ea fugit cupiditate, quae id quod, ducimus molestias harum, doloribus repellat quos sapiente ratione modi.',
    rating: 3,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
  {
    id: 24,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review: 'Nice album!',
    rating: 4,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
  {
    id: 25,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit id ab facilis omnis. Voluptatibus sapiente asperiores harum aperiam, enim provident amet excepturi molestias officiis ducimus, veritatis accusamus nisi dolorem cupiditate. Corrupti dolores a aperiam cumque ea fugit cupiditate, quae id quod, ducimus molestias harum, doloribus repellat quos sapiente ratione modi.',
    rating: 5,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
  {
    id: 26,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing eamet excepturi molestias officiis ducimus, veritatis accusamus nisi dolorem cupiditate. Corrupti dolores a aperiam cumque ea fugit cupiditate, quae id quod, ducimus molestias harum, doloribus repellat quos sapiente ratione modi.',
    rating: 3,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
  {
    id: 27,
    date_created: '2018-10-18T17:59:17',
    date_created_gmt: '2018-10-18T20:59:17',
    product_id: 22,
    status: 'approved',
    reviewer: 'John Doe',
    reviewer_email: 'john.doe@example.com',
    review: 'Nice album!',
    rating: 4,
    verified: false,
    reviewer_avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96&d=mm&r=g',
    },
    _links: {
      self: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews/22',
        },
      ],
      collection: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/reviews',
        },
      ],
      up: [
        {
          href: 'https://example.com/wp-json/wc/v3/products/22',
        },
      ],
    },
  },
];
