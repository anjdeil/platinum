import { BlogPageBreadcrumbs } from '@/components/pages/blog/blogPageBreadcrumbs';
import BlogPagination from '@/components/pages/blog/blogPagination/BlogPagination';
import { BlogTitle } from '@/components/pages/blog/blogTitle';
import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import {
  RecommendContainer,
  SectionContainer,
} from '@/components/sections/styles';
import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper } from '@/styles/components';
import { BlogParsedItemType } from '@/types/pages/blog';
import { CustomDataPostsType } from '@/types/services';
import { serverParseHTMLContent } from '@/utils/blog/serverParseHTMLContent';
import { validateWpBlogPage } from '@/utils/zodValidators/validateWpBlogPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const PER_PAGE = 6;

  try {
    const responseData = await customRestApi.get(`posts`, {
      lang: locale,
      per_page: PER_PAGE,
      page,
    });

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    if (responseData) {
      validateWpBlogPage(responseData.data);
    }

    const pageResponseData = responseData.data as CustomDataPostsType;
    const postsData: BlogParsedItemType[] = pageResponseData.data.items.map(
      (post) => ({
        ...post,
        parsedContent: serverParseHTMLContent(post.content),
      })
    );
    const postsCount = pageResponseData.data?.statistic?.posts_count;
    const totalPages = postsCount ? Math.ceil(postsCount / PER_PAGE) : 1;

    if (!postsData) {
      return { notFound: true };
    }

    return {
      props: {
        posts: postsData,
        totalPages,
        page,
      },
    };
  } catch (error) {
    console.error('Server Error:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

interface BlogProps {
  posts: BlogParsedItemType[];
  totalPages: number;
  page: number;
}

const BlogPage: React.FC<BlogProps> = ({ posts, totalPages, page }) => {
  return (
    <Container>
      <StyledHeaderWrapper>
        <BlogPageBreadcrumbs />
        <BlogTitle title={'blogPage'} />
      </StyledHeaderWrapper>
      <SectionContainer>
        <RecommendContainer>
          <BlogListBlock posts={posts} />
          <BlogPagination page={page} count={totalPages} />
        </RecommendContainer>
      </SectionContainer>
    </Container>
  );
};

export default BlogPage;
