import { ProductCardList } from "@/components/shop/ProductCardsList";
import { useGetProductsQuery } from "@/store/rtk-queries/wpCustomApi";
import { Title } from "@/styles/components";
import { CustomProductListProps } from "@/types/components/shop";
import { ProductType } from "@/types/pages/shop";
import { useTranslations } from "next-intl";
import { RecommendContainer, StyledText, TitleBlock } from "./styles";

const CustomProductList: React.FC<CustomProductListProps> = ({ title, productIds  }) =>
{
    const t = useTranslations("Product");

    const { data } = useGetProductsQuery({ ids: productIds });

    const products: ProductType[] = data?.data?.items || [];

    return (
        <RecommendContainer>
            <TitleBlock>
                <StyledText>{t('bestForYou')}</StyledText>
                <Title as="h4" uppercase>{t(title)}</Title>
            </TitleBlock>
            <ProductCardList products={products}/>
        </RecommendContainer>
    );
};

export default CustomProductList;