import {
  RecommendContainer,
  SectionContainer,
  StyledError,
} from '@/components/sections/styles';
import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper, Title } from '@/styles/components';
import {
  BlogItemType,
  BlogPostResponseType,
  BlogPostType,
} from '@/types/pages/blog';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { BlogHeader } from '@/components/pages/blog/blogHeader';
import { BlogPostContent } from '@/components/pages/blog/blogPostContent';
import { BlogTitle } from '@/components/pages/blog/blogTitle';
import { PostGroupNavigationButton } from '@/components/pages/blog/postGroupNavigationButton';
import { PostPageBreadcrumbs } from '@/components/pages/blog/postPageBreadcrumbs';
import BlogInfo from '@/components/pages/main/BlogListBlock/BlogInfo/BlogInfo';
import {
  CategoriesTagWrapper,
  StyledTag,
} from '@/components/pages/main/BlogListBlock/BlogItem/styles';
import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import { PageTitle } from '@/components/pages/pageTitle';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import {
  StyledBox,
  StyledContainer,
  StyledHeroImage,
} from '@/styles/blog/styles';
import Head from 'next/head';
import { getCleanText } from '@/utils/getCleanText';

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
  const { slug } = context.params as { slug: string };
  const { locale, req } = context;

  try {
    const response = await customRestApi.get(`posts/${slug}`, {
      lang: locale,
    });

    if (!response || response.status !== 200) {
      return { notFound: true };
    }

    const responseData = response.data as BlogPostResponseType;
    const postData = responseData.data.item as BlogPostType;

    if (!postData) {
      return { notFound: true };
    }

    // Get recommended posts

    const PER_PAGE = 5;
    const selectedCategory = postData.categories[0]?.slug || null;

    const baseCategory = selectedCategory
      ? selectedCategory.replace(/-(uk|ru|de|pl|en)$/, '')
      : null;

    const recommendedPostsResponse = await customRestApi.get(`posts`, {
      lang: locale,
      per_page: PER_PAGE,
      category: baseCategory || undefined,
    });

    const posts = recommendedPostsResponse?.data?.data?.items || [];

    let filteredRecommendedPosts = [];

    if (posts && posts.length > 0) {
      filteredRecommendedPosts = posts.filter(
        (post: BlogItemType) => post.id !== postData.id
      );
    }

    if (filteredRecommendedPosts && filteredRecommendedPosts.length > 4) {
      filteredRecommendedPosts = filteredRecommendedPosts.slice(0, 4);
    }

    const recommendedPosts: BlogItemType[] = filteredRecommendedPosts || [];

    // Get most viewed posts - popular posts

    const popularResponse = await customRestApi.get(`posts`, {
      lang: locale,
      per_page: PER_PAGE,
      order_by: 'views_count',
      order: 'desc',
    });

    const popularItems = popularResponse?.data?.data?.items || [];

    let filteredPopularItems = [];

    if (popularItems && popularItems.length > 0) {
      filteredPopularItems = popularItems.filter(
        (post: BlogItemType) => post.id !== postData.id
      );
    }

    if (filteredPopularItems && filteredPopularItems.length > 4) {
      filteredPopularItems = filteredPopularItems.slice(0, 4);
    }

    const popularPosts: BlogItemType[] = filteredPopularItems || [];

    // Construct full URL
    const defaultLocale = 'pl';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const pathWithLocale =
      locale === defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
    const fullUrl = `${protocol}://${host}${pathWithLocale}`;

    return {
      props: {
        post: postData,
        recommendedPosts,
        popularPosts,
        fullUrl,
        locale,
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

interface PageProps {
  post: BlogPostType;
  recommendedPosts: BlogItemType[];
  popularPosts: BlogItemType[];
  fullUrl: string;
  locale: string;
}

const BlogPostPage = ({
  post,
  recommendedPosts,
  popularPosts,
  fullUrl,
  locale,
}: PageProps) => {
  const canonicalUrl = useCanonicalUrl();
  const safeLocale = locale ?? 'pl';

  if (!post) {
    return <StyledError>No Post found</StyledError>;
  }

  const {
    title,
    content,
    thumbnail,
    prev_post,
    next_post,
    categories,
    created,
    modified,
    views_count,
  } = post;

  const mostViewedPosts =
    popularPosts.length > 0 ? (
      <Container>
        <RecommendContainer>
          <BlogHeader title={'blogSectionPopularTitle'} subtitle={'blogPage'} />
          <BlogListBlock posts={popularPosts} />
        </RecommendContainer>
      </Container>
    ) : null;

  //SEO
  const postTitle = post?.seo_data?.title || title;
  const fullText = getCleanText(content);
  const postDescription = post?.seo_data?.description || fullText.slice(0, 160);
  const postImage =
    post?.seo_data?.images?.[0]?.['image:loc'] || thumbnail?.src;
  const postUrl = fullUrl;

  const schemaPost = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${postUrl}#article`,
        headline: postTitle,
        description: postDescription,
        image:
          post?.seo_data?.images?.map(img => img['image:loc']) ||
          thumbnail?.src,
        datePublished: created,
        dateModified: modified,
        articleSection: categories.map(cat => cat.name).join(', '),
        inLanguage:
          languageMap[safeLocale as keyof typeof languageMap] ?? 'pl-PL',
        author: {
          '@type': 'Organization',
          name: 'Platinum by Chetvertinovskaya Liubov',
          url: 'https://platinumchetvertinovskaya.com',
        },
        publisher: {
          '@id': `${postUrl}#publisher`,
        },
        mainEntityOfPage: {
          '@id': `${postUrl}#webpage`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${postUrl}#publisher`,
        name: 'Platinum by Chetvertinovskaya Liubov',
        logo: {
          '@type': 'ImageObject',
          url: 'https://platinumchetvertinovskaya.com/assets/icons/logo.png',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${postUrl}#webpage`,
        url: postUrl,
        name: postTitle,
        inLanguage:
          languageMap[safeLocale as keyof typeof languageMap] ?? 'pl-PL',
        isPartOf: {
          '@id': `${postUrl}`,
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang={safeLocale} href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(schemaPost)}</script>
      </Head>
      <PageTitle title={title} />
      <SectionContainer>
        <StyledContainer>
          <StyledHeaderWrapper>
            <PostPageBreadcrumbs title={title} />
            <BlogTitle title={'blogPage'} />
            <Title as={'h2'} uppercase fontWeight={500}>
              {title}
            </Title>
          </StyledHeaderWrapper>
          <StyledBox>
            <StyledHeroImage
              src={thumbnail?.src || '/assets/images/no-image.webp'}
              alt={title}
              width={1280}
              height={477}
              priority
            />
            <CategoriesTagWrapper>
              {categories.map(
                category =>
                  category.name !== 'Uncategorized' && (
                    <StyledTag key={category.id}>{category.name}</StyledTag>
                  )
              )}
            </CategoriesTagWrapper>
          </StyledBox>
          <BlogInfo created={created} views_count={views_count ?? 0} postPage />
          <BlogPostContent content={content} />
          <PostGroupNavigationButton
            prev_post={prev_post}
            next_post={next_post}
          />
        </StyledContainer>
        {recommendedPosts.length > 0 ? (
          <Container>
            <RecommendContainer>
              <BlogHeader
                title={'blogSectionRelatedTitle'}
                subtitle={'blogPage'}
              />
              <BlogListBlock posts={recommendedPosts} />
            </RecommendContainer>
          </Container>
        ) : (
          mostViewedPosts
        )}
      </SectionContainer>
    </>
  );
};

export default BlogPostPage;
