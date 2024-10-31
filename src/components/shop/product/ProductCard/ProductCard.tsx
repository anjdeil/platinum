import AddToBasketButton from "@/components/global/buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/global/buttons/FavoriteButton/FavoriteButton";
import Rating from "@/components/global/Rating/Rating";
import { Title } from "@/styles/components";
import { ProductCardPropsType } from "@/types/components/shop";
import Image from "next/image";
import ProductBadge from "../ProductBadge/ProductBadge";
import ProductBadgeWrapper from "../ProductBadgeWrapper/ProductBadgeWrapper";
import { ProductImageWrapper, ProductPrice, ProductWrapper, StyledProductCard, TitlePriceWrapper } from "./styles";

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) =>
{
    return (
        <StyledProductCard>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src={product.images[0]?.src || ''}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="image"
                        unoptimized={true}
                    />
                </ProductImageWrapper>
                <Rating rating={5} />
                <TitlePriceWrapper>
                    <Title
                        as="h3"
                        fontSize="16px"
                        uppercase
                        fontWeight={500}
                        mobFontSize="14px"
                    >{product.name}</Title>
                    <ProductPrice>{product.min_price} zl</ProductPrice>
                </TitlePriceWrapper>
                <ProductBadgeWrapper>
                    <ProductBadge type="sale" />
                    <FavoriteButton active={false} />
                </ProductBadgeWrapper>
            </ProductWrapper>
            <AddToBasketButton />
        </StyledProductCard>
    );
}

export default ProductCard;