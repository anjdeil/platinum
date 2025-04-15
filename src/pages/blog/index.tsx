import { BlogCategoriesList } from '@/components/pages/blog/blogCategoriesList';
import { BlogPageBreadcrumbs } from '@/components/pages/blog/blogPageBreadcrumbs';
import BlogPagination from '@/components/pages/blog/blogPagination/BlogPagination';
import { BlogTitle } from '@/components/pages/blog/blogTitle';
import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import { PageTitle } from '@/components/pages/pageTitle';
import {
  RecommendContainer,
  SectionContainer,
} from '@/components/sections/styles';
import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper } from '@/styles/components';
import { BlogCategoryType, BlogParsedItemType } from '@/types/pages/blog';
import { CustomDataPostsType } from '@/types/services';
import { serverParseHTMLContent } from '@/utils/blog/serverParseHTMLContent';
import { validateWpBlogPage } from '@/utils/zodValidators/validateWpBlogPage';
import { omit } from 'lodash';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const selectedCategory = query.category ? String(query.category) : null;
  const PER_PAGE = 6;

  try {
    const responseData = await customRestApi.get(`posts`, {
      lang: locale,
      per_page: PER_PAGE,
      page,
      category: selectedCategory || undefined,
    });

    const categoriesResponseData = await customRestApi.get(`post-categories`, {
      lang: locale,
    });

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    if (!categoriesResponseData || categoriesResponseData.status !== 200) {
      return { notFound: true };
    }

    if (responseData) {
      try {
        validateWpBlogPage(responseData.data);
      } catch (error) {
        console.error('Server Error:', error);
        return {
          redirect: {
            destination: '/500',
            permanent: false,
          },
        };
      }
    }

    const categories = Array.isArray(categoriesResponseData?.data?.data?.items)
      ? categoriesResponseData.data.data.items
      : [];

    const pageResponseData = responseData.data as CustomDataPostsType;
    const postsData: BlogParsedItemType[] = pageResponseData.data.items.map(
      post => ({
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
        categories,
        totalPages,
        page,
        selectedCategory,
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
  categories: BlogCategoryType[];
  totalPages: number;
  page: number;
  selectedCategory: string | null;
}

const BlogPage: React.FC<BlogProps> = ({
  posts,
  categories,
  totalPages,
  page,
  selectedCategory,
}) => {
  const router = useRouter();

  const handleCategoryChange = (categorySlug: string | null) => {
    let newQuery = categorySlug
      ? { ...router.query, category: categorySlug }
      : omit(router.query, ['category']);

    newQuery = omit(newQuery, ['page']);

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <>
      <PageTitle nameSpace={'Breadcrumbs'} spaceKey={'blogPage'} />
      <Container>
        <StyledHeaderWrapper>
          <BlogPageBreadcrumbs />
          <BlogTitle title={'blogPage'} />
        </StyledHeaderWrapper>
        <BlogCategoriesList
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          categories={categories}
        />
        <SectionContainer>
          <RecommendContainer>
            <BlogListBlock posts={posts} />
            <BlogPagination page={page} count={totalPages} />
          </RecommendContainer>
        </SectionContainer>
      </Container>
    </>
  );
};

export default BlogPage;
