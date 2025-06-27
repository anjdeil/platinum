import { StyledText } from '@/components/sections/styles';
import { BlogItemUnionType } from '@/types/pages/blog';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import BlogItem from './BlogItem/BlogItem';
import { BlogListSkeleton } from './BlogListSkeleton';
import { BlogList, BlogListBlockContainer } from './styles';

interface BlogListBlockProps {
  posts: BlogItemUnionType[];
  isError?: boolean;
  isLoading?: boolean;
}

const BlogListBlock: FC<BlogListBlockProps> = ({
  posts,
  isError,
  isLoading,
}) => {
  const POSTS_SKELETON_LENGTH = 4;

  const t = useTranslations('BlogPostPage');

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
        <StyledText>
          Sorry, something went wrong... We can&apos;t get the posts.
        </StyledText>
      </BlogListBlockContainer>
    );
  }

  if (!posts || !posts.length) {
    return (
      <BlogListBlockContainer>
        <StyledText>{t('noPostsFound')}</StyledText>
      </BlogListBlockContainer>
    );
  }

  return (
    <BlogListBlockContainer>
      <BlogList>
        {posts.map(post => (
          <BlogItem key={post.id} post={post} />
        ))}
      </BlogList>
    </BlogListBlockContainer>
  );
};

export default BlogListBlock;
