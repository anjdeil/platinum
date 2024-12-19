import { customRestApi } from '@/services/wpCustomApi';
import { Container, StyledHeaderWrapper, Title } from '@/styles/components';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { StyledError } from '@/components/sections/styles';
import { BlogPostResponseType, BlogPostType } from '@/types/pages/blog';
import { StyledContainer, StyledHeroImage } from './styles';
import { BlogPostContent } from '@/components/pages/blog/blogPostContent';
import { BlogSection } from '@/components/sections/BlogSection';
import { PostPageBreadcrumbs } from '@/components/pages/blog/postPageBreadcrumbs';
import { BlogTitle } from '@/components/pages/blog/blogTitle';
import { PostGroupNavigationButton } from '@/components/pages/blog/postGroupNavigationButton';

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

    return {
      props: {
        post: postData,
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
}

const BlogPostPage = ({ post }: PageProps) => {
  if (!post) {
    return <StyledError>No Post found</StyledError>;
  }

  const { title, content, thumbnail, prev_post, next_post } = post;

  return (
    <>
      <StyledContainer>
        <StyledHeaderWrapper>
          <PostPageBreadcrumbs title={title} />
          <BlogTitle title={'blogPage'} />
          <Title as={'h2'} uppercase fontWeight={500}>
            {title}
          </Title>
        </StyledHeaderWrapper>
        <StyledHeroImage
          src={thumbnail?.src || 'assets/images/no-image.jpg'}
          alt={title}
          width={1280}
          height={477}
          priority
        />
        <BlogPostContent content={content} />
        <PostGroupNavigationButton
          prev_post={prev_post}
          next_post={next_post}
        />
      </StyledContainer>
      <Container>
        <BlogSection />
      </Container>
    </>
  );
};

export default BlogPostPage;
