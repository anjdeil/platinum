import { transformDate } from "@/services/transformers/transformDate";
import { Title } from "@/styles/components";
import { BlogItemTypeProps } from '@/types/pages/blog';
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
  TextContent,
} from './styles';
import { parseHtmlContent } from '@/utils/blog/parseHtmlContent';

const BlogItem: FC<BlogItemTypeProps> = ({ post }) => {
  const { title, content, thumbnail, slug, created } = post;
  const src = thumbnail?.src || '/assets/images/no-image.jpg';

  const t = useTranslations('Product');
  const formatDate = transformDate(created);

  const parsedContent = parseHtmlContent(content);

  return (
    <BlogItemContainer>
      <ImageBlock>
        <StyledImage src={src} alt={title} width={728} height={390} />
      </ImageBlock>
      <ContentBlock>
        <Title as='h4' fontWeight={500} uppercase textalign='left'>
          {post.title}
        </Title>
        <StyledDate>{formatDate}</StyledDate>
      </ContentBlock>
      <BottomContentBlock>
        <TextContent>{parsedContent}</TextContent>
        <StyledLink href={`/blog/${slug}`}>{t('readMore')}</StyledLink>
      </BottomContentBlock>
    </BlogItemContainer>
  );
};

export default BlogItem;