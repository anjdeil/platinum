import { BlogListBlockProps } from '@/types/pages/blog';
import { FC } from 'react';
import BlogItem from './BlogItem/BlogItem';
import { BlogList, BlogListBlockContainer } from './styles';
import { BlogListSkeleton } from './BlogListSkeleton';
import { StyledText } from '@/components/sections/styles';

const BlogListBlock: FC<BlogListBlockProps> = ({
  posts,
  isError,
  isLoading,
}) => {
  const POSTS_SKELETON_LENGTH = 4;

  if (isLoading) {
    return (
      <BlogListBlockContainer>
        <BlogListSkeleton length={POSTS_SKELETON_LENGTH} />
      </BlogListBlockContainer>
    );
  }

  if (isError) {
    return (
      <BlogListBlockContainer>
        <StyledText>We cannot get the products</StyledText>
      </BlogListBlockContainer>
    );
  }

  return (
    <BlogListBlockContainer>
      <BlogList>
        {posts.map((post) => (
          <BlogItem key={post.id} post={post} />
        ))}
      </BlogList>
    </BlogListBlockContainer>
  );
};

export default BlogListBlock;
