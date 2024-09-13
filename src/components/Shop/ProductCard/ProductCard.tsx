import Badge from "@/components/Common/Badge/Badge";
import AddToBasketButton from "@/components/Common/Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/Common/Buttons/FavoriteButton/FavoriteButton";
import { ProductImageWrapper } from "@/components/Common/Product/ProductImageWrapper/ProductImageWrapper";
import { ProductWrapper } from "@/components/Common/Product/ProductWrapper/ProductWrapper";
import Rating from "@/components/Common/Rating/Rating";
import { ProductPrice } from "@/components/Common/Typography/ProductPrice/ProductPrice";
import { ProductTitle } from "@/components/Common/Typography/ProductTitle/ProductTitle";
import { ProductType } from "@/types/shop";
import Image from "next/image";
import styled from "styled-components";

const ProductCardStyled = styled.div`
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

const TitlePriceWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    justify-content: space-between;
    align-items: center;
`

const BadgeWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
`

interface ProductCardPropsType {
    product: ProductType,   
}

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) => {
    return (
        <ProductCardStyled>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src={product.images[0].src}
                        layout="fill"
                        objectFit="cover" 
                        alt="image"
                        unoptimized={true}
                    />
                </ProductImageWrapper>
                <Rating rating={4} />
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
        </ProductCardStyled>
    );
}

export default ProductCard;