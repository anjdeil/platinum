import TitleBlock from "@/components/global/TitleBlock/TitleBlock";
import { BlogListBlockProps } from "@/types/pages/blog";
import { FC } from "react";
import BlogItem from "./BlogItem/BlogItem";
import { BlogList, BlogListBlockContainer } from "./styles";

const BlogListBlock: FC<BlogListBlockProps> = ({ posts }) =>
{   
    return (
        <BlogListBlockContainer>
            <TitleBlock title="lastedArticles" />
            <BlogList>
                {posts.map(post => (
                    <BlogItem key={ post.id } post={post} />
                ))}
            </BlogList>
        </BlogListBlockContainer>
    );
}

export default BlogListBlock;