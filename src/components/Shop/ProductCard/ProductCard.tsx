import AddToBasketButton from "@/components/Common/Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/Common/Buttons/FavoriteButton/FavoriteButton";
import ProductBadge from "@/components/Common/ProductBadge/ProductBadge";
import Rating from "@/components/Common/Rating/Rating";
import { ProductCardPropsType } from "@/types/layouts/Product";
import Image from "next/image";
import { BadgeWrapper, ProductImageWrapper, ProductPrice, ProductTitle, ProductWrapper, StyledProductCard, TitlePriceWrapper } from "./styles";

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) => {
    return (
        <StyledProductCard>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src={product.images[0].src || ''}
                        layout="fill"
                        objectFit="cover" 
                        alt="image"
                        unoptimized={true}
                    />
                </ProductImageWrapper>
                <Rating rating={5} />
                <TitlePriceWrapper>
                    <ProductTitle>{ product.name }</ProductTitle>
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