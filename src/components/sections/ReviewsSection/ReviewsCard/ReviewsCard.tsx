import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import {
  FlexWrapper,
  ImageWrapper,
  MoreButton,
  ReviewContainer,
  ReviewName,
  ReviewText,
} from "./styles";
import { ReviewRespType } from "@/types/services";
import Rating from "@/components/global/Rating/Rating";
import "swiper/css";
import { parseHtmlContent } from "@/utils/blog/parseHtmlContent";

interface ReviewItemPropsType {
  review: ReviewRespType;
  isOpen: boolean;
  setOpened: (id: number | null) => void;
}

const ReviewItem: FC<ReviewItemPropsType> = ({ review, isOpen, setOpened }) => {
  const t = useTranslations("Product");
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const reviewTextRef = useRef<HTMLParagraphElement | null>(null);

  const {
    id,
    reviewer_avatar_urls,
    reviewer,
    rating,
    review: reviewContent,
  } = review;

  useEffect(() => {
    if (reviewTextRef.current) {
      const { scrollHeight } = reviewTextRef.current;
      setShowReadMore(scrollHeight > 48);
    }
  }, [review.review]);

  const reviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = reviewRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && isOpen) {
        setOpened(null);
      }
    });

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [review, isOpen, setOpened]);

  const parsedReview = parseHtmlContent(reviewContent);

  return (
    <ReviewContainer ref={reviewRef} isOpen={isOpen || !showReadMore}>
      <FlexWrapper>
        <ImageWrapper>
          <Image
            src={reviewer_avatar_urls[96] || "/assets/images/avatar.png"}
            width={64}
            height={64}
            alt={reviewer}
          />
        </ImageWrapper>
        <ReviewName>{reviewer}</ReviewName>
      </FlexWrapper>
      <Rating rating={rating} />
      <ReviewText
        ref={reviewTextRef}
        collapsedSize="3rem"
        in={isOpen}
        timeout="auto"
      >
        {parsedReview}
      </ReviewText>
      {showReadMore && !isOpen && (
        <MoreButton onClick={() => setOpened(id)}>{t("readMore")}</MoreButton>
      )}
    </ReviewContainer>
  );
};

export default ReviewItem;
