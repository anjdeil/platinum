import { transformDate } from '@/services/transformers/transformDate';
import { Title } from '@/styles/components';
import { BlogItemUnionType } from '@/types/pages/blog';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  BlogItemContainer,
  BottomContentBlock,
  ContentBlock,
  ImageBlock,
  StyledDate,
  StyledImage,
  StyledLink,
  StyledWrapperLink,
  TextContent,
} from './styles';
import { parseHtmlContent } from '@/utils/blog/parseHtmlContent';
import { useRouter } from 'next/router';
import { getPostUrl } from '@/utils/getPostUrl';
import Link from 'next/link';

interface BlogItemProps {
  post: BlogItemUnionType;
}

const BlogItem: FC<BlogItemProps> = ({ post }) => {
  const { title, thumbnail, slug, created } = post;
  const src = thumbnail?.src || '/assets/images/no-image.jpg';
  const router = useRouter();
  const t = useTranslations('Product');
  const formatDate = transformDate(created);

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
            width={728}
            height={390}
            priority
          />
        </Link>
      </ImageBlock>
      <ContentBlock>
        <StyledWrapperLink href={POST_URL} passHref>
          <Title as="h4" fontWeight={500} uppercase textalign="left">
            {post.title}
          </Title>
        </StyledWrapperLink>
        <StyledDate>{formatDate}</StyledDate>
      </ContentBlock>
      <BottomContentBlock>
        <TextContent>{displayContent}</TextContent>
        <StyledLink href={POST_URL}>{t('readMore')}</StyledLink>
      </BottomContentBlock>
    </BlogItemContainer>
  );
};

export default BlogItem;
