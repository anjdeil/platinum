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
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper } from '@/styles/components';
import { BlogCategoryType, BlogParsedItemType } from '@/types/pages/blog';
import { CustomDataPostsType } from '@/types/services';
import { serverParseHTMLContent } from '@/utils/blog/serverParseHTMLContent';
import { validateWpBlogPage } from '@/utils/zodValidators/validateWpBlogPage';
import { omit } from 'lodash';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BASE_URL = 'https://platinumchetvertinovskaya.com';
const languageMap = {
  pl: 'pl-PL',
  en: 'en-US',
  de: 'de-DE',
  uk: 'uk-UA',
  ru: 'ru-RU',
};

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

    if (!postsData?.length) {
      return { notFound: true };
    }

    // Get post category
    let postCategoryTitle = 'Blog Category';
    let postCategoryDescription = 'Blog category description';

    if (selectedCategory) {
      try {
        const responsePostCategoryData = await customRestApi.get(
          `post-categories/${selectedCategory}`,
          {
            lang: locale,
          }
        );

        const postCategory = responsePostCategoryData?.data?.data
          ?.item as BlogCategoryType;

        postCategoryTitle =
          postCategory?.seo_data?.title ||
          postCategory?.name ||
          postCategoryTitle;

        postCategoryDescription =
          postCategory?.seo_data?.description ||
          postCategory?.name ||
          postCategoryDescription;
      } catch (err) {
        console.warn(
          `Could not load category: ${selectedCategory} or category is All`,
          err
        );
      }
    }

    return {
      props: {
        posts: postsData,
        categories,
        totalPages,
        page,
        selectedCategory,
        postCategoryTitle,
        postCategoryDescription,
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
  postCategoryTitle: string;
  postCategoryDescription: string;
}

const BlogPage: React.FC<BlogProps> = ({
  posts,
  categories,
  totalPages,
  page,
  selectedCategory,
  postCategoryTitle,
  postCategoryDescription,
}) => {
  const router = useRouter();
  const locale = router.locale ?? 'pl';
  const canonicalUrl = useCanonicalUrl();

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

  //SEO
  const pageDescription =
    locale === 'pl'
      ? 'Ekspercka kolekcja artykułów o stylizacji rzęs i brwi, nowościach branżowych, produktach premium PLATINUM oraz inspiracjach dla profesjonalistów beauty.'
      : 'An expert collection of articles on lash and brow styling, industry news, premium PLATINUM products, and inspiration for beauty professionals.';

  const structuredDataBlog = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: 'Blog',
        description: pageDescription,
        inLanguage: languageMap[locale as keyof typeof languageMap] ?? 'pl-PL',
        isPartOf: {
          '@id': `https://platinumchetvertinovskaya.com/${locale}/#website`,
        },
        author: {
          '@type': 'Organization',
          name: 'Platinum by Chetvertinovskaya Liubov',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Platinum by Chetvertinovskaya Liubov',
          logo: {
            '@type': 'ImageObject',
            url: 'https://platinumchetvertinovskaya.com/assets/icons/logo.png',
          },
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts?.map((product, index) => ({
            '@type': 'Article',
            position: index + 1,
            name: product.title,
            url: `${BASE_URL}/${locale}/blog/${product.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `https://platinumchetvertinovskaya.com/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `https://platinumchetvertinovskaya.com/${locale}/${
              selectedCategory ? `blog?category=${selectedCategory}` : 'blog'
            }`,
          },
        ],
      },
    ],
  };

  const schemaPostCategory = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: postCategoryTitle,
    description: postCategoryDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'Blog',
      name: postCategoryTitle,
      description: postCategoryDescription,
    },
  };

  return (
    <>
      <Head>
        <meta name="description" content={postCategoryDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={postCategoryTitle} />
        <meta property="og:description" content={postCategoryDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredDataBlog)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaPostCategory)}
        </script>
      </Head>
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
