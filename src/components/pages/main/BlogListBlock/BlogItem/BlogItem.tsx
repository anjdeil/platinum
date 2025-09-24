import { Title } from '@/styles/components';
import { BlogItemUnionType } from '@/types/pages/blog';
import { parseHtmlContent } from '@/utils/blog/parseHtmlContent';
import { getPostUrl } from '@/utils/getPostUrl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import {
  BlogItemContainer,
  BottomContentBlock,
  CategoriesTagWrapper,
  ContentBlock,
  ImageBlock,
  StyledImage,
  StyledLink,
  StyledTag,
  StyledWrapperLink,
  TextContent,
} from './styles';
import BlogInfo from '../BlogInfo/BlogInfo';

interface BlogItemProps {
  post: BlogItemUnionType;
}

const BlogItem: FC<BlogItemProps> = ({ post }) => {
  const { title, thumbnail, slug, created, views_count } = post;
  const src = thumbnail?.src || '/assets/images/no-image.webp';
  const router = useRouter();
  const t = useTranslations('Product');

  const displayContent =
    'parsedContent' in post
      ? post.parsedContent
      : parseHtmlContent(post.content);

  const currentPath = router.pathname;
  const POST_URL = getPostUrl(slug, currentPath);

  return (
    <BlogItemContainer>
      <ImageBlock>
        <Link href={POST_URL} passHref>
          <StyledImage
            src={src}
            alt={title}
            width={632}
            height={335}
          />
        </Link>
      </ImageBlock>
      <CategoriesTagWrapper>
        {post.categories.map(
          category =>
            category.name !== 'Uncategorized' && (
              <StyledTag key={category.id}>{category.name}</StyledTag>
            )
        )}
      </CategoriesTagWrapper>
      <ContentBlock>
        <StyledWrapperLink href={POST_URL} passHref>
          <Title as="h4" fontWeight={500} uppercase textalign="left">
            {post.title}
          </Title>
        </StyledWrapperLink>
        <BlogInfo created={created} views_count={views_count ?? 0} />
      </ContentBlock>
      <BottomContentBlock>
        <TextContent>{displayContent}</TextContent>
        <StyledLink href={POST_URL}>{t('readMore')}</StyledLink>
      </BottomContentBlock>
    </BlogItemContainer>
  );
};

export default BlogItem;
