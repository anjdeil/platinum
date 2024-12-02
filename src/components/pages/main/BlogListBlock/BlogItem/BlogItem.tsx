import { transformDate } from "@/services/transformers/transformDate";
import { Title } from "@/styles/components";
import { BlogItemProps } from "@/types/pages/blog";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { BlogItemContainer, BottomContentBlock, ContentBlock, ImageBlock, StyledDate, StyledImage, StyledLink, TextContent } from "./styles";

const BlogItem: FC<BlogItemProps> = ({ post }) =>
{   
    const t = useTranslations("Product");
    const formatDate = transformDate(post.created);

    return (
        <BlogItemContainer>
            <ImageBlock>
                <StyledImage
                    src={post.thumbnail || ''}
                    alt={post.title}
                    width={728}
                    height={390} 
                />
            </ImageBlock>
            <ContentBlock>
                <Title
                    as="h4"
                    fontWeight={500}
                    uppercase
                    textalign="left"
                >
                    {post.title}
                </Title>
                <StyledDate>{ formatDate }</StyledDate>
            </ContentBlock>
            <BottomContentBlock>
                <TextContent>{`${post.excerpt}..`}</TextContent>
                <StyledLink href={`/blog/${post.slug}`}>{t('readMore')}</StyledLink>
            </BottomContentBlock>
        </BlogItemContainer>
    );
}

export default BlogItem;