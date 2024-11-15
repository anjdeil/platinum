import AddToBasketButton from "@/components/global/buttons/AddToBasketButton/AddToBasketButton";
import Rating from "@/components/global/Rating/Rating";
import { StyledButton, Title } from "@/styles/components";
import { ProductCardPropsType } from "@/types/components/shop";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ColorVariations from "../ColorVariations/ColorVariations";
import PaymentList from "../PaymentList/PaymentList";
import ProductAvailable from "../ProductAvailable/ProductAvailable";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductPromotion from "../ProductPromotion/ProductPromotion";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import ProductSku from "../ProductSku/ProductSku";
import ProductSwiper from "../ProductSwiper/ProductSwiper";
import ProductVariations from "../ProductVariations/ProductVariations";
import ProductViewing from "../ProductViewing/ProductViewing";
import ShippingList from "../ShippingList/ShippingList";
import { AddToBasketWrapper, ProductFlexWrapper, ProductImageWrapper, ProductInfoWrapper, ProductTitleWrapper, ProductWrapper } from "./styles";
import DetailsAccordion from "@/components/global/DetailsAccordeon/DetailsAccordion";
import { ProductVariation } from "@/types/components/shop/product/products";
import { CartItem } from "@/types/store/reducers/сartSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateCart } from "@/store/slices/cartSlice";

const ProductInfo: React.FC<ProductCardPropsType> = ({ product }) => {
    const { name, stock_quantity, sku, min_price, max_price, images, variations } = product;
    const t = useTranslations("Product");

    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.cartSlice);

    const sizeList = ['M', 'L', 'XL'];

    const [quantity, setQuantity] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<string>(sizeList[0]);
    const lengthList = ['8-14mm', '0.05mm', '0.07mm', '2mm'];
    const [currentLength, setCurrentLength] = useState<string>(lengthList[0]);
    const colorList = ['red', 'white', 'green', 'grey'];
    const [currentColor, setCurrentColor] = useState<string>(colorList[0]);
    const [cartMatch, setCartMatch] = useState<CartItem>();

    useEffect(() => {
        const cartMatch = cartItems.find(({ product_id }) => product_id === product.id);
        if (cartMatch) {
            setCartMatch(cartMatch);
            setQuantity(cartMatch.quantity);
        }
    }, [cartItems]);

    console.log(product);


    /**
     * Choosen variation
     */
    const [currentVariation, setCurrentVariation] = useState<ProductVariation>();

    // Temporary code (whole useEffect) for assigning the current variation
    useEffect(() => {
        setCurrentVariation(product?.variations[0])
    }, []);

    function renderCartButtonInnerText() {
        if (cartMatch) {
            if (cartMatch.quantity === quantity) return t("viewCart");
            return t("updateCart");
        } else {
            return t("addToBasket");
        }
    }

    function handleCartButtonClick() {
        dispatch(updateCart({
            product_id: product.id,
            quantity,
            ...(currentVariation && { variation_id: currentVariation.id })
        }));
    }

    const testimages = Array.from({ length: 4 }).map((_, index) => images[0]);

    return (
        <ProductWrapper>
            <ProductImageWrapper>
                <ProductSwiper data={testimages || []} />
            </ProductImageWrapper>
            <ProductTitleWrapper>
                <Title as="h1" uppercase textalign="left">{name}</Title>
                <ProductFlexWrapper>
                    <ProductAvailable count={stock_quantity || 0} />
                    <ProductViewing count={stock_quantity || 0} />
                </ProductFlexWrapper>
                <ProductFlexWrapper>
                    <ProductSku sku={sku || ""} />
                    <Rating rating={4} />
                </ProductFlexWrapper>
                <ProductPrice minPrice={min_price} maxPrice={max_price} />
            </ProductTitleWrapper>
            <ProductInfoWrapper>
                <ProductVariations
                    title="Curl"
                    list={sizeList}
                    currentVariation={currentSize}
                    onChange={setCurrentSize}
                />
                <ProductVariations
                    title="Length"
                    list={lengthList}
                    currentVariation={currentLength}
                    onChange={setCurrentLength}
                />
                <ColorVariations
                    list={colorList}
                    currentVariation={currentColor}
                    onChange={setCurrentColor}
                />
                <ProductPromotion time={new Date("2024-10-30T00:00:00")} />
                <AddToBasketWrapper>
                    <ProductQuantity quantity={quantity} onChange={setQuantity} />
                    {(stock_quantity !== null && stock_quantity > 0)
                        ? <AddToBasketButton maxWidth="309px" onClick={handleCartButtonClick}>
                            {renderCartButtonInnerText()}
                        </AddToBasketButton>
                        : <StyledButton notify={true}>{t('notifyWhenAvailable')}</StyledButton>
                    }
                </AddToBasketWrapper>
                <PaymentList />
                <ShippingList />
                <DetailsAccordion summary="Descriptions">
                    <p>PLATINUM Black eyelashes by Chetvertinovskaya Liubov:</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptas explicabo aut provident, ipsum quam quia ullam reiciendis molestias beatae id illo tempora, eos harum officia doloremque amet! Nam rerum exercitationem, adipisci veniam provident unde aliquam molestiae necessitatibus dolores in ratione, autem error tempora. Quisquam, iure? Corporis tenetur ad provident veritatis repellendus blanditiis, assumenda officia nam! Enim laboriosam beatae error veritatis praesentium culpa doloribus unde id magnam cum autem ipsam debitis maiores aliquid corporis expedita, hic dicta repellendus dolore fuga odit nihil aliquam maxime? Ipsam quasi ratione odio a minus, vitae voluptates iusto modi accusantium, quaerat, adipisci aut dolor asperiores?</p>
                </DetailsAccordion>
                <DetailsAccordion summary="Lashes lines">
                    <p>PLATINUM Black eyelashes by Chetvertinovskaya Liubov:</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptas explicabo aut provident, ipsum quam quia ullam reiciendis molestias beatae id illo tempora, eos harum officia doloremque amet! Nam rerum exercitationem, adipisci veniam provident unde aliquam molestiae necessitatibus dolores in ratione, autem error tempora. Quisquam, iure? Corporis tenetur ad provident veritatis repellendus blanditiis, assumenda officia nam! Enim laboriosam beatae error veritatis praesentium culpa doloribus unde id magnam cum autem ipsam debitis maiores aliquid corporis expedita, hic dicta repellendus dolore fuga odit nihil aliquam maxime? Ipsam quasi ratione odio a minus, vitae voluptates iusto modi accusantium, quaerat, adipisci aut dolor asperiores?</p>
                </DetailsAccordion>
            </ProductInfoWrapper>
        </ProductWrapper>
    );
}

export default ProductInfo;