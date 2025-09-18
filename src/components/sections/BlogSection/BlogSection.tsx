import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import CategorieDescription from '@/components/shop/categories/CategorieDescription/CategorieDescription';
import { useGetPostsQuery } from '@/store/rtk-queries/wpCustomApi';
import { BlogSectionData } from '@/types/components/sections';
import { BlogItemType } from '@/types/pages/blog';
import { useRouter } from 'next/router';
import { SectionHeader } from '../SectionHeader';
import { SectionHeaderWithLink } from '../SectionHeaderWithLink';
import { RecommendContainer, SectionContainer } from '../styles';

type BlogSectionProps = Omit<BlogSectionData, '_type'>;

export const BlogSection: React.FC<BlogSectionProps> = ({
  subtitle,
  title,
  all_link,
  below_text,
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
    isFetching: isPostsFetching,
  } = useGetPostsQuery(PARAMS);
  const isComponentLoading = isPostsLoading || isPostsFetching;

  const posts: BlogItemType[] = postsData?.data?.items || [];

  return (
    <SectionContainer>
      <RecommendContainer>
        {all_link ? (
          <SectionHeaderWithLink
            title={title}
            subtitle={subtitle}
            all_link={all_link}
          />
        ) : (
          <SectionHeader title={title} subtitle={subtitle} />
        )}
        <BlogListBlock
          posts={posts}
          isError={!!postsError}
          isLoading={isComponentLoading}
        />
      </RecommendContainer>
      {below_text && <CategorieDescription content={below_text} />}
    </SectionContainer>
  );
};
