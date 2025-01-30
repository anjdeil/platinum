import { BlogCategoriesList } from '@/components/pages/blog/blogCategoriesList';
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

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    if (responseData) {
      validateWpBlogPage(responseData.data);
    }

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

// uncomment this when we have real categories in post
// const getCategoriesFromPosts = (posts: BlogParsedItemType[]) => {
//   const categoriesSet = new Set<string>();

//   posts.forEach(post => {
//     post.categories.forEach(category => {
//       categoriesSet.add(category.name);
//     });
//   });

//   return Array.from(categoriesSet);
// };

interface BlogProps {
  posts: BlogParsedItemType[];
  totalPages: number;
  page: number;
  selectedCategory: string | null;
}

const BlogPage: React.FC<BlogProps> = ({
  posts,
  totalPages,
  page,
  selectedCategory,
}) => {
  const router = useRouter();

  // uncomment this when we have real categories in post
  // const categories = getCategoriesFromPosts(posts);

  const handleCategoryChange = (category: string | null) => {
    let newQuery = category
      ? { ...router.query, category }
      : omit(router.query, ['category']);

    newQuery = omit(newQuery, ['page']);

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
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
  );
};

export default BlogPage;

// delete this when we have real categories in post
const categories = [
  'Glues',
  'Eyelashes',
  'UV system',
  'Workplace equipment',
  'Lifting and lamination',
  'Eyebrow styling',
];
