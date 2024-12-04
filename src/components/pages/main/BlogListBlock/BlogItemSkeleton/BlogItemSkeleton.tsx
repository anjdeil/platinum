import {
  SkeletonButton,
  SkeletonContainer,
  SkeletonContent,
  SkeletonDate,
  SkeletonImage,
  SkeletonText,
} from './styles';

export const BlogItemSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonText />
      <SkeletonDate />
      <SkeletonContent />
      <SkeletonButton />
    </SkeletonContainer>
  );
};
