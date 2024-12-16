import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import BlogPagination from '@/components/pages/blog/blogPagination/BlogPagination';
import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import {
  RecommendContainer,
  SectionContainer,
} from '@/components/sections/styles';
import { PagesNavigationWrapper } from '@/components/shop/Archive/styles';
import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper, Title } from '@/styles/components';
import { BlogParsedItemType } from '@/types/pages/blog';
import { CustomDataPostsType } from '@/types/services';
import { serverParseHTMLContent } from '@/utils/blog/serverParseHTMLContent';
import { validateWpBlogPage } from '@/utils/zodValidators/validateWpBlogPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const PER_PAGE = 2;

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
}

const BlogPage: React.FC<BlogProps> = ({ posts, totalPages }) => {
  const router = useRouter();
  const t = useTranslations('Breadcrumbs');

  const page = parseInt(router.query.page as string, 10) || 1;

  const breadcrumbsLinks = [
    {
      name: t('homePage'),
      url: '/',
    },
    {
      name: 'Blog',
      url: '',
    },
  ];

  return (
    <Container>
      <StyledHeaderWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Title as={'h1'} uppercase>
          Blog
        </Title>
      </StyledHeaderWrapper>
      <SectionContainer>
        <RecommendContainer>
          <BlogListBlock posts={posts} />
          <PagesNavigationWrapper>
            <BlogPagination page={page} count={totalPages} />
          </PagesNavigationWrapper>
        </RecommendContainer>
      </SectionContainer>
    </Container>
  );
};

export default BlogPage;
