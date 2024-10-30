import { ProductCardList } from "@/components/shop/ProductCardsList";
import { Title } from "@/styles/components";
import { ProductType } from "@/types/pages/shop";
import { useTranslations } from "next-intl";
import { RecommendContainer, StyledText, TitleBlock } from "./styles";

interface RecommendProductsProps {
    products: ProductType[];
}

const RecommendProducts: React.FC<RecommendProductsProps> = ({ products }) =>
{
    const t = useTranslations("Product");

    return (
        <RecommendContainer>
            <TitleBlock>
                <StyledText>{t('bestForYou')}</StyledText>
                <Title as="h4" uppercase>{t('recommendProduct')}</Title>
            </TitleBlock>
            <ProductCardList products={products}/>
        </RecommendContainer>
    );
};

export default RecommendProducts;