import AddToBasketButton from "@/components/Common/Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/Common/Buttons/FavoriteButton/FavoriteButton";
import ProductBadge from "@/components/Common/ProductBadge/ProductBadge";
import Rating from "@/components/Common/Rating/Rating";
import { Title } from "@/styles/components";
import { ProductCardPropsType } from "@/types/layouts/Product";
import Image from "next/image";
import { BadgeWrapper, ProductImageWrapper, ProductPrice, ProductWrapper, StyledProductCard, TitlePriceWrapper } from "./styles";

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) => {
    return (
        <StyledProductCard>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src={product.images[0].src || ''}
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
                        lineHeight="1.5rem"
                        fontWeight={500}
                        mobFontSize="14px"
                        mobFontWeight={400}
                    >{product.name}</Title>
                    <ProductPrice>{ product.min_price} zl</ProductPrice>
                </TitlePriceWrapper>
                <BadgeWrapper>
                    <ProductBadge type="sale" />
                    <FavoriteButton active={ false } />
                </BadgeWrapper>
            </ProductWrapper>
            <AddToBasketButton />
        </StyledProductCard>
    );
}

export default ProductCard;