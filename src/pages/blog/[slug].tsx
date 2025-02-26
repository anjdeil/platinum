import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper, Title } from '@/styles/components';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  RecommendContainer,
  SectionContainer,
  StyledError,
} from '@/components/sections/styles';
import {
  BlogItemType,
  BlogPostResponseType,
  BlogPostType,
} from '@/types/pages/blog';

import { BlogPostContent } from '@/components/pages/blog/blogPostContent';
import { PostPageBreadcrumbs } from '@/components/pages/blog/postPageBreadcrumbs';
import { BlogTitle } from '@/components/pages/blog/blogTitle';
import { PostGroupNavigationButton } from '@/components/pages/blog/postGroupNavigationButton';
import { BlogHeader } from '@/components/pages/blog/blogHeader';
import {
  StyledBox,
  StyledContainer,
  StyledHeroImage,
} from '@/styles/blog/styles';
import {
  CategoriesTagWrapper,
  StyledTag,
} from '@/components/pages/main/BlogListBlock/BlogItem/styles';
import BlogListBlock from '@/components/pages/main/BlogListBlock/BlogListBlock';
import { orderBy } from 'lodash';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.params as { slug: string };
  const { locale } = context;

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
    // TODO if categories.length === 1
    // ? related posts = posts from the same category
    // : related posts = posts from 1 or 2 or more categories

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

    // Get lasted posts
    const lastedResponse = await customRestApi.get(`posts`, {
      lang: locale,
      per_page: PER_PAGE,
      orderby: 'created',
      order: 'desc',
      status: 'publish',
    });

    const lastedItems = lastedResponse?.data?.data?.items || [];

    let filteredLastedItems = [];

    if (lastedItems && lastedItems.length > 0) {
      filteredLastedItems = lastedItems.filter(
        (post: BlogItemType) => post.id !== postData.id
      );
    }

    if (filteredLastedItems && filteredLastedItems.length > 4) {
      filteredLastedItems = filteredLastedItems.slice(0, 4);
    }

    const lastedPosts: BlogItemType[] = filteredLastedItems || [];

    return {
      props: {
        post: postData,
        recommendedPosts,
        lastedPosts,
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
  lastedPosts: BlogItemType[];
}

const BlogPostPage = ({ post, recommendedPosts, lastedPosts }: PageProps) => {
  if (!post) {
    return <StyledError>No Post found</StyledError>;
  }

  const { title, content, thumbnail, prev_post, next_post, categories } = post;

  const postsInStock =
    lastedPosts.length > 0 ? (
      <Container>
        <RecommendContainer>
          <BlogHeader title={'blogSectionLatestTitle'} subtitle={'blogPage'} />
          <BlogListBlock posts={lastedPosts} />
        </RecommendContainer>
      </Container>
    ) : null;

  return (
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
            src={thumbnail?.src || 'assets/images/no-image.jpg'}
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
        postsInStock
      )}
    </SectionContainer>
  );
};

export default BlogPostPage;
