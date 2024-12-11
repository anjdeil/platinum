import {
  Circle,
  FlexWrapper,
  ReviewContainer,
  ReviewerWrapper,
  SkeletonAvatar,
  SkeletonContainer,
  SkeletonName,
  SkeletonText,
} from './styles';
import {} from '../ReviewsSlider/styles';
import { useMediaQuery } from '@mui/material';

export const ReviewsSkeleton: React.FC = () => {
  const isMediumScreen = useMediaQuery('(max-width: 767px)');
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  let skeletonLength: number = 0;
  if (isMediumScreen) {
    skeletonLength = 1;
  } else if (isLargeScreen) {
    skeletonLength = 3;
  }

  const skeletonItems = Array.from({ length: skeletonLength }, (_, index) => (
    <ReviewContainer key={index}>
      <FlexWrapper>
        <ReviewerWrapper>
          <SkeletonAvatar>
            <Circle />
          </SkeletonAvatar>
          <SkeletonName />
        </ReviewerWrapper>
        <SkeletonText />
        <SkeletonText />
      </FlexWrapper>
    </ReviewContainer>
  ));

  return <SkeletonContainer>{skeletonItems}</SkeletonContainer>;
};
