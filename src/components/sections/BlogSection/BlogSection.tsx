import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import { BlogSectionData } from '@/types/components/sections';
import { StyledContainer } from '../SliderSection/styles';
import { RecommendContainer } from '../styles';
import { useRouter } from 'next/router';
import { useGetPostsQuery } from '@/store/rtk-queries/wpCustomApi';
import { BlogItemType } from '@/types/pages/blog';
import { SectionHeader } from '../SectionHeader';

type BlogSectionProps = Omit<BlogSectionData, '_type'>;

export const BlogSection: React.FC<BlogSectionProps> = ({
  subtitle,
  title,
}) => {
  const router = useRouter();
  const PER_PAGE = 4;
  const PARAMS = {
    lang: router.locale,
    per_page: PER_PAGE,
  };

  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetPostsQuery(PARAMS);

  const posts: BlogItemType[] = postsData?.data?.items || [];

  return (
    <StyledContainer>
      <RecommendContainer>
        <SectionHeader title={title} subtitle={subtitle} />
        <BlogListBlock
          posts={posts}
          isError={!!postsError}
          isLoading={isPostsLoading}
        />
      </RecommendContainer>
    </StyledContainer>
  );
};
