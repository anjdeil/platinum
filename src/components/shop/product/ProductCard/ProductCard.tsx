import AddToBasketButton from "@/components/global/buttons/AddToBasketButton/AddToBasketButton";
import FavoriteButton from "@/components/global/buttons/FavoriteButton/FavoriteButton";
import Rating from "@/components/global/Rating/Rating";
import { Title } from "@/styles/components";
import { ProductCardPropsType } from "@/types/components/shop";
import Image from "next/image";
import ProductBadge from "../ProductBadge/ProductBadge";
import ProductBadgeWrapper from "../ProductBadgeWrapper/ProductBadgeWrapper";
import { ProductImageWrapper, ProductPrice, ProductWrapper, StyledProductCard, TitlePriceWrapper } from "./styles";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateCart } from "@/store/slices/cartSlice";

const ProductCard: React.FC<ProductCardPropsType> = ({ product }) => {

    const t = useTranslations("Product");

    const router = useRouter();

    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.cartSlice);

    const [isCartMatch, setIsCartMatch] = useState(false);

    useEffect(() => {
        const cartMatchIndex = cartItems.findIndex(({ product_id }) => product_id === product.id);
        if (cartMatchIndex >= 0) setIsCartMatch(true);
    }, [cartItems]);

    function handleCartButtonClick() {
        if (product?.type === 'variable') {
            router.push(`/${router.locale === "en" ? "" : router.locale}/product/${product.slug}`);
        }

        if (!isCartMatch) {
            dispatch(updateCart({
                product_id: product.id,
                quantity: 1
            }))
        } else {
            router.push(`/${router.locale === "en" ? "" : router.locale}/cart`);
        }
    }

    return (
        <StyledProductCard>
            <ProductWrapper>
                <ProductImageWrapper>
                    <Image
                        src={product.images[0]?.src || '/assets/images/not-found.webp'}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="image"
                        unoptimized={true}
                    />
                </ProductImageWrapper>
                <Rating rating={5} />
                {product.type}
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
            <>
                <AddToBasketButton onClick={handleCartButtonClick}>
                    {product?.type !== 'variable' ?
                        isCartMatch ? t("viewCart") : t("addToBasket") :
                        t("chooseOptions")
                    }
                </AddToBasketButton>
            </>
        </StyledProductCard>
    );
}

export default ProductCard;