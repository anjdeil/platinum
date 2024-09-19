import Image from "next/image";
import AddToBasketButton from "../../Buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "../../Buttons/FavoriteButton/FavoriteButton";
import Badge from "../../ProductBadge/ProductBadge";
import Rating from "../../Rating/Rating";
import { BadgeWrapper, ProductCardStyled, ProductImageWrapper, ProductPrice, ProductTitle, ProductWrapper, TitlePriceWrapper } from "./styles";

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