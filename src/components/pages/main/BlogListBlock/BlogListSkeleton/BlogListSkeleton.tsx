import { BlogListSkeletonProps } from '@/types/pages/blog';
import { BlogItemContainer } from '../BlogItem/styles';
import { BlogList } from '../styles';
import { BlogItemSkeleton } from '../BlogItemSkeleton';

export const BlogListSkeleton: React.FC<BlogListSkeletonProps> = ({
  length,
}) => {
  const skeletonItems = Array.from({ length }, (_, index) => (
    <BlogItemContainer key={index}>
      <BlogItemSkeleton />
    </BlogItemContainer>
  ));

  return <BlogList>{skeletonItems}</BlogList>;
};
