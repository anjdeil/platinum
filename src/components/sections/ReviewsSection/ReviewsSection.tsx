import { ReviewsSectionData } from '@/types/components/sections/index';
import { SectionContainer, StyledError } from "../styles";
import { SectionHeader } from "../SectionHeader";
import { ReviewRespType } from "@/types/services";
import { useGetProductsReviewsQuery } from "@/store/rtk-queries/wooCustomApi";
import { ReviewsSlider } from "./ReviewsSlider";
import { ReviewsSkeleton } from "./ReviewsSkeleton";
import { ValidateWooCustomRktApiReviews } from "@/utils/zodValidators/validatewooCustomRktApiReviews";

type ReviewsSectionProps = Omit<ReviewsSectionData, "_type">;

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  subtitle,
  title,
}) => {
  const { data, isLoading, isError } = useGetProductsReviewsQuery();

  const reviewsNotFound = (
    <SectionContainer>
      <SectionHeader title={title} subtitle={subtitle} />
      <StyledError>Reviews not found</StyledError>
    </SectionContainer>
  );

  if (data) {
    const isValidSectionsData = ValidateWooCustomRktApiReviews(data);
    if (!isValidSectionsData) {
      console.error("Invalid data format:");
      return reviewsNotFound;
    }
  }

  const reviews = data as ReviewRespType[];

  if (isLoading) {
    return (
      <SectionContainer>
        <SectionHeader title={title} subtitle={subtitle} />
        <ReviewsSkeleton />
      </SectionContainer>
    );
  }

  if (isError || !reviews.length) {
    return reviewsNotFound;
  }

  return (
    <SectionContainer>
      <SectionHeader title={title} subtitle={subtitle} />
      <ReviewsSlider reviews={reviews} />
    </SectionContainer>
  );
};
