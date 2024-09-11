import Image from "next/image";
import styled from "styled-components";
import Badge from "../../Badge/Badge";
import AddToBasketButton from "../../Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "../../Buttons/AddToBasketButton/FavoriteButton/FavoriteButton";
import Rating from "../../Rating/Rating";
import { ProductPrice } from "../../Typography/ProductPrice/ProductPrice";
import { ProductTitle } from "../../Typography/ProductTitle/ProductTitle";
import { ProductImageWrapper } from "../ProductImageWrapper/ProductImageWrapper";
import { ProductWrapper } from "../ProductWrapper/ProductWrapper";

const ProductCardStyled = styled.div`
    grid-column: span 2;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;

        @media ${({ theme }) => theme.media.medium} {
            grid-column: span 3;
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

const ProductCard: React.FC = () => {
    return (
        <ProductCardStyled>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src="https://placehold.co/200x200"
                        layout="fill"
                        objectFit="cover" 
                        alt="image"
                        unoptimized={true}
                    />
                </ProductImageWrapper>
                <Rating rating={4} />
                <TitlePriceWrapper>
                    <ProductTitle>Клей Sapphire Platinum</ProductTitle>
                    <ProductPrice>68zl</ProductPrice>
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