import { StyledButton, Title } from "@/styles/components";
import { CategoryItemProps } from "@/types/pages/shop";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { BackGroundImage, CategoryItemContainer, ContentWrapper, StyledLink } from "./styles";

const CategoryItem: FC<CategoryItemProps> = ({ category, double }) =>
{
    const t = useTranslations("Product");

    return (
        <CategoryItemContainer double={double}>
            <BackGroundImage
                src={category.image || ''}
                alt={category.name}
                width={650}
                height={390}
            />
            <ContentWrapper>
                <Title as="h3" uppercase>
                    {category.name}
                </Title>
                <StyledLink href={`/product-category/${category.slug}`}>
                    <StyledButton
                        minWidthDesktop="220px"
                        minWidthMobile="160px"
                    >{t('moreProduct')}</StyledButton>
                </StyledLink>
            </ContentWrapper>
        </CategoryItemContainer>
    );
}

export default CategoryItem;