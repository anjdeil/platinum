import Badge from "@/components/Common/Badge/Badge";
import AddToBasketButton from "@/components/Common/Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/Common/Buttons/FavoriteButton/FavoriteButton";
import { BadgeWrapper } from "@/components/Common/Product/BadgeWrapper/BadgeWrapper";
import { ProductImageWrapper } from "@/components/Common/Product/ProductImageWrapper/ProductImageWrapper";
import { ProductWrapper } from "@/components/Common/Product/ProductWrapper/ProductWrapper";
import { TitlePriceWrapper } from "@/components/Common/Product/TitlePriceWrapper/TitlePriceWrapper";
import Rating from "@/components/Common/Rating/Rating";
import { ProductPrice } from "@/components/Common/Typography/ProductPrice/ProductPrice";
import { ProductTitle } from "@/components/Common/Typography/ProductTitle/ProductTitle";
import { ProductType } from "@/types/shop";
import styled from "@emotion/styled";
import Image from "next/image";

const StyledProductCard = styled.div`
    grid-column: span 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        padding: 16px 8px;
        row-gap: 16px;
    }
    @media ${({ theme }) => theme.media.large} {
        padding: 24px;
    }
`

interface ProductCardPropsType {
    product: ProductType,   
}

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
                    <Badge type="new" />
                    <FavoriteButton active={ true } />
                </BadgeWrapper>
            </ProductWrapper>
            <AddToBasketButton />
        </StyledProductCard>
    );
}

export default ProductCard;