import AddToBasketButton from "@/components/global/buttons/AddToBasketButton/AddToBasketButton";
import Rating from "@/components/global/Rating/Rating";
import { StyledButton, Title } from "@/styles/components";
import { ProductCardPropsType } from "@/types/components/shop";
import { useTranslations } from "next-intl";
import { FC, useEffect, useMemo, useState } from "react";
import PaymentList from "../PaymentList/PaymentList";
import ProductAvailable from "../ProductAvailable/ProductAvailable";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductPromotion from "../ProductPromotion/ProductPromotion";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import ProductSku from "../ProductSku/ProductSku";
import ProductSwiper from "../ProductSwiper/ProductSwiper";
import ProductViewing from "../ProductViewing/ProductViewing";
import ShippingList from "../ShippingList/ShippingList";
import { AddToBasketWrapper, ProductFlexWrapper, ProductImageWrapper, ProductInfoWrapper, ProductTitleWrapper, ProductWrapper } from "./styles";
import DetailsAccordion from "@/components/global/DetailsAccordeon/DetailsAccordion";
import { ProductOptionsPanel } from "../ProductOptionsPanel";
import { useRouter } from "next/router";
import { ProductVariationType } from "@/types/components/shop/product/products";
import { getCurrentVariation } from "@/utils/getCurrentVariation";


const ProductInfo: FC<ProductCardPropsType> = ({ product }) =>
{
    const [currentVariation, setCurrentVariation] = useState<ProductVariationType | null>(null);
    const stockQuantity = useMemo(() =>
    {
        if (!currentVariation?.stock_quantity && !product.stock_quantity) return 0;
        if (currentVariation?.stock_quantity) return currentVariation?.stock_quantity;
        if (product?.stock_quantity) return product?.stock_quantity;
        return 0;
    }, [currentVariation, product])
    const router = useRouter();

    useEffect(() =>
    {
        if (product)
        {
            console.log('product:', product);
        }
    }, [product])

    /** Set default attributes */
    useEffect(() =>
    {
        if (product.type === 'variable')
        {
            const variation = getCurrentVariation(product.variations, router.query);
            if (variation) setCurrentVariation(variation);
        }
    }, [router.query]);

    const t = useTranslations("Product");
    const [quantity, setQuantity] = useState<number>(1);

    const testimages = Array.from({ length: 4 }).map((_, index) => product.images[0]);

    return (
        <ProductWrapper>
            <ProductImageWrapper>
                <ProductSwiper data={testimages || []} />
            </ProductImageWrapper>
            <ProductTitleWrapper>
                <Title as="h1" uppercase textalign="left">{currentVariation?.name || product.name}</Title>
                <ProductFlexWrapper>
                    <ProductAvailable count={stockQuantity} />
                    <ProductViewing count={stockQuantity} />
                </ProductFlexWrapper>
                <ProductFlexWrapper>
                    {currentVariation?.sku || product.sku &&
                        <ProductSku sku={currentVariation?.sku || product.sku} />}
                    <Rating rating={product.average_rating} />
                </ProductFlexWrapper>
                {currentVariation && <ProductPrice minPrice={currentVariation.price} />}
                {!currentVariation && <ProductPrice minPrice={product.min_price} maxPrice={product.max_price} />}
            </ProductTitleWrapper>
            <ProductInfoWrapper>

                {/* Options */}
                {product.attributes && <ProductOptionsPanel
                    attributes={product.attributes}
                    defaultAttributes={product.default_attributes || []} />}
                {/* Options END*/}

                <ProductPromotion time={new Date("2024-10-30T00:00:00")} />
                <AddToBasketWrapper>
                    <ProductQuantity quantity={quantity} onChange={setQuantity} />
                    {(stockQuantity > 0)
                        ? <AddToBasketButton maxWidth="309px" />
                        : <StyledButton notify={true}>{t('notifyWhenAvailable')}</StyledButton>
                    }
                </AddToBasketWrapper>
                <PaymentList />
                <ShippingList />
                <DetailsAccordion summary="Descriptions">
                    {desc}
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